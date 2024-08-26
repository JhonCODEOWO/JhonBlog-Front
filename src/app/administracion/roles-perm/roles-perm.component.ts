import { AfterViewInit, Component, OnInit } from '@angular/core';
import { general_data } from '../general_data.service';
import { DataCSRF } from '../../dataCSRF.service';

@Component({
  selector: 'app-roles-perm',
  templateUrl: './roles-perm.component.html',
  styleUrl: './roles-perm.component.css'
})
export class RolesPermComponent implements OnInit {
  constructor(private generalData: general_data, private csrfService: DataCSRF){}
  tittle: string = 'Roles y permisos';

  ngOnInit(): void {
    this.generalData.setTittle(this.tittle);
  }
}
