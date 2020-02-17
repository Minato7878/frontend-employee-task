import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EmployeeDataSource } from './employee.datasource';
import { fromEvent, merge } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  lenght: number;
  pageSize: number;
  displayedColumns: string[] = ['id', 'name', 'isActive', 'departmentName', 'action'];
  dataSource: EmployeeDataSource;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  ngOnInit() {
    this.employeeService.getCount().subscribe(data => {
      this.lenght = data;
    });
    this.dataSource = new EmployeeDataSource(this.employeeService);
    this.dataSource.loadEmployees('', 'asc', 0, 5);
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Delete') {
        this.employeeService.delete(result.data.id).subscribe(
          () => this.ngOnInit()
        );
      }
    });
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadEmployeesPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEmployeesPage())
      )
      .subscribe();
  }

  loadEmployeesPage() {
    this.dataSource.loadEmployees(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
