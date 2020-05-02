import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeesService } from 'src/app/_services/employees.service';
import { Employees } from 'src/app/_modules/employees';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  private mode = 'create';
  form:FormGroup;
  imagePreview : string;

  constructor(
    public route: ActivatedRoute,
    private employeeServices:EmployeesService
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'id' : new FormControl(null ),
      'name' : new FormControl(null, { validators:[ Validators.required, Validators.minLength(3) ] } ),
      'email' : new FormControl(null, { validators: [ Validators.required, Validators.email  ] }),
      'phone' : new FormControl(null, { validators: [ Validators.required, Validators.minLength(11),Validators.maxLength(14) ] }),
      'password' : new FormControl(null, { validators: [ Validators.required ,  Validators.minLength(8) ] }),
      "imageUrl" : new FormControl(null , {validators: [ Validators.required ]})
    });

    this.route.paramMap.subscribe(
      (paramMap:ParamMap) =>{

        if(paramMap.has('id')){
          this.mode = 'edit'
          this.employeeServices.get_employee_by_id(+paramMap.get('id')).subscribe(
            employeeData => {
            
                
                this.form.setValue({
                  "id": employeeData.id, 
                  "name": employeeData.name, 
                  "email": employeeData.email,
                  "password":  employeeData.password,
                  "phone":  employeeData.phone,
                  "imageUrl":  employeeData.imageUrl,
                });
                this.imagePreview = employeeData.imageUrl;
            }
          )
        }else{
          this.mode = 'create';
        }
      }

    )
  
  }

  get name(){return this.form.get('name')}
  get password(){return this.form.get('password')}
  get email(){return this.form.get('email')}
  get phone(){return this.form.get('phone')}
  
  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0]; // convert to html input and catch the file
    this.form.patchValue({'imageUrl':file}) // call the single property of form [image] and assined to file
    this.form.get('imageUrl').updateValueAndValidity() // when change image value will be updated
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string); // url
    }

    reader.readAsDataURL(file); // preview url 


  }

  onSaveEmployee(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      let random = Math.round(Math.max(Math.random()*8)*12);
      this.form.value.id = random;
      this.form.value.imageUrl = `https://i.picsum.photos/id/${random}/200/200.jpg`;

        this.employeeServices.create_new_employee(this.form.value)
    }else{

      this.employeeServices.update_employee(this.form.value)
    
    }
    this.form.reset();
  }

}
