import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { general_data } from '../general_data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  constructor(private generalData: general_data){}
  tittle: string = 'Inicio';

  ngOnInit(): void {
      this.generalData.setTittle(this.tittle);
  }
}
