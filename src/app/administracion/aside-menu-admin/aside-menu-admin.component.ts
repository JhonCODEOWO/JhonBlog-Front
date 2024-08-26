import { Component } from '@angular/core';
import { faList, faUser, faRuler } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-aside-menu-admin',
  templateUrl: './aside-menu-admin.component.html',
  styleUrl: './aside-menu-admin.component.css'
})
export class AsideMenuAdminComponent {
  faList = faList;
  faUser = faUser;
  faRuler = faRuler;
}
