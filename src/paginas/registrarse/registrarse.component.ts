import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
    estaActivo: 1, // Por defecto, el usuario está activo
    tipoUsuario: {
      secuencial: 0,
      nombre: 'Cliente', // Asignar un tipo de usuario por defecto
      estado: true
    }
  }
  confirmPassword: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  guardarUsuario() {
    if (!/^\d{10}$/.test(this.usuario.cedula)) {
      alert('La cédula debe contener exactamente 10 dígitos numéricos');
    }
    if (!/^\d{10}$/.test(this.usuario.telefono)) {
      alert('La cédula debe contener exactamente 10 dígitos numéricos');
    }
    if (this.usuario.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    } else {
      this.usuario.tipoUsuario = {
        secuencial: 2, // Asignar un tipo de usuario por defecto
        nombre: 'Usuario',
        estado: true
      }
      this.usuario.estaActivo = 1;
      this.usuarioService.crear(this.usuario).subscribe({
        next: () => {
          console.log('Usuario creado');
          this.router.navigate(['/login']);
        },
        error: (error) => console.error('Error al guardar', error)
      });
    }

  }
}
