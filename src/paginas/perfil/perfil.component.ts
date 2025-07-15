import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    secuencial: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    username: '',
    password: '',
    pregunta: '',
    estaActivo: 1,
    tipoUsuario: {
      secuencial: 0,
      nombre: '',
      estado: true,
    }
  };

  constructor(private usuarioService: UsuarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUserData();
  }

  guardarUsuario() {
    const nivelAcceso = this.authService.getNivelAcceso();
    if (!this.usuario) {
      Swal.fire('Error', 'No hay usuario para actualizar', 'error');
      return;
    }

    if (nivelAcceso === 1) {
      this.usuario.tipoUsuario = {
        secuencial: 1,
        nombre: 'Admin',
        estado: true
      };
    } else if (nivelAcceso === 2) {
      this.usuario.tipoUsuario = {
        secuencial: 2,
        nombre: 'Usuario',
        estado: true
      };
    } else {
      Swal.fire('Acceso inválido', 'Nivel de acceso no válido', 'warning');
      return;
    }

    this.usuarioService.actualizar(this.usuario.secuencial, this.usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado correctamente',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
      }
    });
  }
}
