import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-resources',
  templateUrl: './no-resources.component.html',
  styleUrl: './no-resources.component.css'
})
export class NoResourcesComponent {
  @Input() nameElement = '';
}
