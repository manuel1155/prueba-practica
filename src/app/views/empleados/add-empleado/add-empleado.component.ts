import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.scss']
})
export class AddEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup;
  done:boolean=true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) { 
    this.empleadoForm = this.fb.group({
      'name': ['', [
        Validators.maxLength(30),
        Validators.required
      ]],
      'last_name': ['', [
        Validators.maxLength(30),
        Validators.required
      ]],
      'birthday': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  goToEmployees(){
    this.router.navigate(['/empleados']);
  }

  addEmpleado(post:any){

    let url='https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/manuel_esq';

    let empleado = {
      name:post.name,
      last_name:post.last_name,
      birthday: post.birthday.substring(0,4)+"/"+post.birthday.substring(5,7)+"/"+post.birthday.substring(8,10)
    }


    this.http.post<any>(url,empleado).subscribe(data => {
        console.log(data);
        console.log('Se guardo correctamente');
        Swal.fire({
          icon: 'success',
          title: 'Empleado almacenado',
          text: 'Los datos del empleado fueron almacenados correctamente en la base de datos.',
        });
        this.empleadoForm.reset();
    });

    console.log(empleado);
  }

}
