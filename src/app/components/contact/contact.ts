import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  phoneEC: string = '+593-963388467'; 
  phoneArg: string = '+54 3772-655932';  // cambia a tu número
  email: string = 'jeffer.mio@gmail.com'; 
  whatsappLink: string = 'https://wa.me/593963388467'; // WhatsApp directo
  linkedin: string = 'https://www.linkedin.com/in/jefferson-mi%C3%B1o-b28058293/';
  github: string = 'https://gitlab.com/JeffersonM';
}
