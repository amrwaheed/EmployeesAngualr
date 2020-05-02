import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable , of } from 'rxjs';

import { Employees } from '../_modules/employees';
import { employees } from '../employees.data';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private router : Router
  ) { }

  get_all_employees() : Observable<Employees[]> {
    return of(employees)
  }

  get_employee_by_id(id:number) : Observable<Employees> {
    return of(employees.find(employee => employee.id === id)) ;
  }

  create_new_employee(employee : Employees){
   
    employees.push(employee)
    this.router.navigate(['/employees'])
  }

  delete_employee(id:number):void {
    employees.splice(id,1)

  }

  update_employee(employee :Employees):void{
    employees.find(employe =>{
      if(employe.id === employee.id){
        employe.name = employee.name
        employe.email = employee.email
        employe.phone = employee.phone
        employe.password = employee.password
        employe.imageUrl = employee.imageUrl
      } 
    })
    this.router.navigate(['/employees'])
  }





}
