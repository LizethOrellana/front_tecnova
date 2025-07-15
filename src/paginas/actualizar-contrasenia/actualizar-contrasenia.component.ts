import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // <--- Importa SweetAlert2

@Component({
  selector: 'app-actualizar-contrasenia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-contrasenia.component.html',
  styleUrls: ['./actualizar-contrasenia.component.css']
})
export class ActualizarContraseniaComponent {
  cedula: string = "";
  pregunta: string = "";
  preguntaEscrita: string = "";
  nuevaPassword: string = "";
  repetirContrasenia: string = "";

  mostrarCedula: boolean = true;
  mostrarPregunta: boolean = false;
  mostrarActualizar: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  verificar() {
    if (!/^\d{10}$/.test(this.cedula)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cédula debe contener exactamente 10 dígitos numéricos'
      });
      return;
    }

    this.usuarioService.obtenerPreguntaPorCedula(this.cedula).subscribe({
      next: (pregunta: string) => {
        this.pregunta = pregunta;
        this.mostrarCedula = false;
        this.mostrarPregunta = true;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La cédula ingresada no está registrada.'
        });
      }
    });
  }

  confirmarVeracidad() {
    if (this.preguntaEscrita.trim().toLowerCase() === this.pregunta.trim().toLowerCase()) {
      this.mostrarPregunta = false;
      this.mostrarActualizar = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Incorrecto',
        text: 'Respuesta incorrecta. Intenta nuevamente.'
      });
    }
  }

  actualizarcontrasenia() {
    if (!this.nuevaPassword || !this.repetirContrasenia) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Por favor, rellene ambos campos de contraseña.'
      });
      return;
    }
    if (this.nuevaPassword !== this.repetirContrasenia) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.'
      });
      return;
    }

    this.usuarioService.actualizarPassword(this.cedula, this.nuevaPassword).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contraseña actualizada correctamente',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la contraseña'
        });
        console.error(err);
      }
    });
  }

  resetearFormulario() {
    this.cedula = "";
    this.pregunta = "";
    this.preguntaEscrita = "";
    this.nuevaPassword = "";
    this.repetirContrasenia = "";
    this.mostrarCedula = true;
    this.mostrarPregunta = false;
    this.mostrarActualizar = false;
  }
}
