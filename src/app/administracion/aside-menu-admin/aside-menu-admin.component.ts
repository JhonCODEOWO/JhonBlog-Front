import { Component, OnInit } from '@angular/core';
import { faList, faUser, faRuler } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../login/login.service';
import { Permission } from '../permission.model';
import { Utils } from '../../utils';
@Component({
  selector: 'app-aside-menu-admin',
  templateUrl: './aside-menu-admin.component.html',
  styleUrl: './aside-menu-admin.component.css'
})
export class AsideMenuAdminComponent implements OnInit {
  constructor(private loginServices: LoginService){}
  faList = faList;
  faUser = faUser;
  faRuler = faRuler;
  permissions: Permission[] | null = [];

  ngOnInit(): void {
      this.loginServices.userPermissions$.subscribe({
        next: (data: Permission[] | null)=>{
          this.permissions = data;
        }
      })
  }

  findPermission(permissionName: string): boolean{
    return Utils.findPermission(permissionName, this.permissions);
  }
}
