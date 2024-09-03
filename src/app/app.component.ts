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
      this.csrfService.getCsrfToken();
  }

  ngOnDestroy(): void {
      this.csrfService.tokenActual = '';
  }
}