import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { TipoUsuario } from '../../models/TipoUsuario';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit {
  usuario: Usuario = {
    secuencial: 0,
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    username: '',
    password: '',
    estaActivo: 0,
    tipoUsuario: {
      secuencial: 0,
      nombre: '',
      estado: false
    }
  };

  tiposUsuario: TipoUsuario[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private tipoUsuarioService: TipoUsuarioService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.obtenerTiposUsuario();
    }
  }

  obtenerTiposUsuario() {
    this.tipoUsuarioService.obtenerTodos().subscribe({
      next: (tipos) => {
        this.tiposUsuario = tipos; // Asignar el primer tipo de usuario por defecto
      },
      error: (error) => console.error('Error al obtener tipos de usuario', error)
    });
  }

  guardarUsuario() {
    if (!/^\d{10}$/.test(this.usuario.cedula)) {
      alert('La cédula debe contener exactamente 10 dígitos numéricos');
    }
    if (!/^\d{10}$/.test(this.usuario.telefono)) {
      alert('La cédula debe contener exactamente 10 dígitos numéricos');
    }
    if (this.usuario.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    this.usuarioService.crear(this.usuario).subscribe({
      next: () => {
        console.log('Usuario creado');
        this.router.navigate(['/lista-usuarios']);
      },
      error: (error) => console.error('Error al guardar', error)
    });
  }

}
