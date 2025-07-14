import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario = {
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
    if (this.usuario) {
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
        // Opcional: tipoUsuario por defecto o error
        alert('Nivel de acceso no válido');
        return;
      }

      this.usuarioService.actualizar(this.usuario.secuencial, this.usuario).subscribe({
        next: () => alert('Perfil actualizado correctamente'),
        error: (err) => {
          console.error('Error al actualizar el perfil', err);
          alert('Error al actualizar el perfil');
        }
      });
    } else {
      alert('No hay usuario para actualizar');
    }
  }

}
