import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentDto } from 'src/app/model/department.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeDto } from 'src/app/model/employee.model';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, 
    private empService: EmployeeService, private depService: DepartmentService) { }

  addForm: FormGroup;
  employeeDto: EmployeeDto;
  departmentList: DepartmentDto[];

  ngOnInit() {
    this.depService.getAll().subscribe(
      data => this.departmentList = data);
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      isActive: ['', Validators.required],
      departmentId: [null, Validators.required]
    });

  }

  onSubmit() {
    this.empService.create(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['home']);
      });
  }

}
