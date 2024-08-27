import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DataCSRF } from './dataCSRF.service';
import { Csrf } from './csrf.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'jhonblog-frontend';
  logeado: boolean = true;

  constructor(private csrfService:DataCSRF){}
  
  ngOnInit(): void {
      //Ejecuta la petición y asigna el resultado a la propiedad tokenActual del servicio
      this.csrfService.getCsrfToken().subscribe(
        {
          next: (response:Csrf)=>{
            console.log(response);
            // this.csrfService.tokenActual = response.token;
          },
          error: (error) =>{
            console.log(error);
          }
        }
      );
  }

  ngOnDestroy(): void {
      this.csrfService.tokenActual = '';
  }
}