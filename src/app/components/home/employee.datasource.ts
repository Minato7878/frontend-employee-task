import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { EmployeeViewDto } from 'src/app/model/employee.view.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { finalize } from 'rxjs/internal/operators/finalize';
import { EmployeeService } from 'src/app/service/employee.service';

export class EmployeeDataSource implements DataSource<EmployeeViewDto> {

    private employeeSubject = new BehaviorSubject<EmployeeViewDto[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private employeeSevice: EmployeeService) { }

    connect(collectionViewer: CollectionViewer): Observable<EmployeeViewDto[]> {
        return this.employeeSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.employeeSubject.complete();
        this.loadingSubject.complete();
    }

    loadEmployees(filter = '', sortDirection = 'asc', pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);

        this.employeeSevice.getPageableView(filter, sortDirection, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(employees => this.employeeSubject.next(employees));
    }
}