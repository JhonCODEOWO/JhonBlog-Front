import { Component, OnInit } from '@angular/core';
import { general_data } from '../general_data.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  constructor(private generalData: general_data){}
  tittle: string = 'Categorías';

  ngOnInit(): void {
    this.generalData.setTittle(this.tittle);
  }
}
