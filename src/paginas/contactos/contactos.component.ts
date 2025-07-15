import { Component, ElementRef, ViewChild } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'contactos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})

export class Contactos {
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;


  constructor() {
    emailjs.init('bC7AexD-t9KmGWnY3');
  }

  enviar() {
    if (!this.formRef) {
      console.error('Formulario no encontrado');
      return;
    }

    emailjs.sendForm('email.123', 'template_d27x2uj', this.formRef.nativeElement)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Gracias por contactarnos, te responderemos pronto.',
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
        this.formRef.nativeElement.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No pudimos enviar tu mensaje, intenta nuevamente.'
        });
      });
  }
}
