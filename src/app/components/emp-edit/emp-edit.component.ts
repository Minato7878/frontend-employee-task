import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeDto } from 'src/app/model/employee.model';
import { DepartmentDto } from 'src/app/model/department.model';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.css']
})
export class EmpEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private empService: EmployeeService, private depService: DepartmentService) { }

  editForm: FormGroup;
  employeeId: number;
  departmentList: DepartmentDto[];

  ngOnInit() {
    this.depService.getAll().subscribe(
      data => this.departmentList = data);
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      isActive: ['', Validators.required],
      departmentId: [null, Validators.required]
    });
    this.activatedRoute.params.subscribe(params => {
      this.employeeId = params['id'];
      this.empService.get(this.employeeId).subscribe(employee => {
        this.editForm.controls['name'].setValue(employee.name);
        this.editForm.controls['isActive'].setValue(employee.isActive);
        if (employee.departmentId != 0) {
          this.depService.get(employee.departmentId).subscribe(department => {
            this.editForm.controls['departmentId'].setValue(department.id);
          });
        } else {
          this.editForm.controls['departmentId'].setValue(null);
        }
      });
    });
  }

  onSubmit() {
    this.empService.update(this.editForm.value, this.employeeId)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['home']);
      });
  }

}
