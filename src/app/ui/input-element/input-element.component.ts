import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-element',
  templateUrl: './input-element.component.html',
  styleUrl: './input-element.component.css'
})
export class InputElementComponent {
  @Input() name: string = '';
  @Input() value: any;
  @Input() id: string | null = '';
  @Input() placeholder: string | null = '';
  @Input() type: string | null = '';
  @Input() title: string | null = '';
}
