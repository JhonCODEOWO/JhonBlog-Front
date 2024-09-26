import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-element',
  templateUrl: './button-element.component.html',
  styleUrl: './button-element.component.css'
})
export class ButtonElementComponent {
  @Input() type: string | null = 'button';
  @Input() text: string | null = null;
}
