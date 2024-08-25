import { Component } from '@angular/core';
import { faFacebook, faInstagram, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faGithub = faGithub;
  faXTwitter = faXTwitter;
}
