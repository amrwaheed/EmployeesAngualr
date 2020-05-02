import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/_services/employees.service';
import { Employees } from 'src/app/_modules/employees';

import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-emoployees',
  templateUrl: './emoployees.component.html',
  styleUrls: ['./emoployees.component.scss']
})
export class EmoployeesComponent implements OnInit {
  private employees :Employees [] =[]
  isLoading:boolean = false;

  constructor(
    private emoployeesService: EmployeesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.emoployeesService.get_all_employees()
      .subscribe(
        data =>{
          this.employees = data
          this.isLoading = false;
        },
        error => console.log(error)
    )
  }


  onDelete(id:number){
   this.emoployeesService.delete_employee(id)
   this.toastr.error('Delete Row Successfully!', 'Delete');
  }
}
