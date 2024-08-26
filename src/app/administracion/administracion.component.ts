import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { general_data } from './general_data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit{
  constructor(private generalData: general_data, private cdRef: ChangeDetectorRef){}
  tittlePage: string = '';

  //Propiedad que ejecuta la suscripción al BehaviorSubject
  tittleSuscription !: Subscription;

  ngOnInit(): void {
      this.tittleSuscription = this.generalData.tittle$.subscribe(title =>{
        this.tittlePage = title;
        this.cdRef.detectChanges();
      })
  }
}
