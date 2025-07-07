import { Component, ElementRef, ViewChild } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contactos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})

export class Contactos {
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  mensajeExito = false;
  mensajeError = false;

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
        this.mensajeExito = true;
        this.mensajeError = false;
        this.formRef.nativeElement.reset();
      })
      .catch(() => {
        this.mensajeError = true;
        this.mensajeExito = false;
      });
  }
}
