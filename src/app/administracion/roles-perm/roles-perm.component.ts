import { Component } from '@angular/core';
import { general_data } from '../general_data.service';

@Component({
  selector: 'app-roles-perm',
  templateUrl: './roles-perm.component.html',
  styleUrl: './roles-perm.component.css'
})
export class RolesPermComponent {
  constructor(private generalData: general_data){}
  tittle: string = 'Roles y permisos';

  ngAfterViewInit(): void {
      this.generalData.setTittle(this.tittle);
  }
}
