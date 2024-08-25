import { Component, Input, input } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),  // Estado inicial cuando el elemento no está presente en el DOM
      transition(':enter, :leave', [          // Transición para entrar y salir del DOM
        animate(300)                          // Duración de la animación en ms
      ])
    ])
  ]
})
export class HeaderComponent {
  //Iconos usados
  faCaredDown = faCaretDown;
  faCaredUp = faCaretUp;

  role: string = 'administrador';
  @Input() logeado !:boolean;
  menuVisible: Boolean = false;

  deslogear(){
    this.logeado=false;
  }

  showMenu(){
    if (this.menuVisible) {
      this.menuVisible = false;
    }else{
      this.menuVisible = true;
    }
  }
}
