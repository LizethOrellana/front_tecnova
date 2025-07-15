import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  usuario: Usuario = {
    secuencial: 0,
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    username: '',
    password: '',
    estaActivo: 1,
    tipoUsuario: {
      secuencial: 0,
      nombre: 'Cliente',
      estado: true
    },
    pregunta: ''
  }

  confirmPassword: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  guardarUsuario() {
    if (!/^\d{10}$/.test(this.usuario.cedula)) {
      Swal.fire('Error de validación', 'La cédula debe contener exactamente 10 dígitos numéricos', 'warning');
      return;
    }

    if (!/^\d{10}$/.test(this.usuario.telefono)) {
      Swal.fire('Error de validación', 'El teléfono debe contener exactamente 10 dígitos numéricos', 'warning');
      return;
    }

    if (this.usuario.password !== this.confirmPassword) {
      Swal.fire('Error de validación', 'Las contraseñas no coinciden', 'error');
      return;
    }

    this.usuario.tipoUsuario = {
      secuencial: 2,
      nombre: 'Usuario',
      estado: true
    };

    this.usuario.estaActivo = 1;

    this.usuarioService.crear(this.usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Ahora puedes iniciar sesión',
          confirmButtonText: 'Ir al login'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        console.error('Error al guardar', error);
        Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
      }
    });
  }
}
