import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { TipoUsuario } from '../../models/TipoUsuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
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
    },
    pregunta: '',
  };

  tiposUsuario: TipoUsuario[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tipoUsuarioService: TipoUsuarioService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.obtenerTiposUsuario();
    }
  }

  obtenerTiposUsuario() {
    this.tipoUsuarioService.obtenerTodos().subscribe({
      next: (tipos) => {
        this.tiposUsuario = tipos;
      },
      error: (error) => console.error('Error al obtener tipos de usuario', error)
    });
  }

  async guardarUsuario() {
    if (!/^\d{10}$/.test(this.usuario.cedula)) {
      await Swal.fire({
        icon: 'warning',
        title: 'La cédula debe contener exactamente 10 dígitos numéricos',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }
    if (!/^\d{10}$/.test(this.usuario.telefono)) {
      await Swal.fire({
        icon: 'warning',
        title: 'El teléfono debe contener exactamente 10 dígitos numéricos',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }
    if (this.usuario.password.length < 6) {
      await Swal.fire({
        icon: 'warning',
        title: 'La contraseña debe tener al menos 6 caracteres',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }
    if (this.usuario.nombre === "" || this.usuario.apellido === "" || this.usuario.username === "" || this.usuario.tipoUsuario.secuencial === 0) {
      await Swal.fire({
        icon: 'warning',
        title: 'Llene todos los campos',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }

    this.usuarioService.crear(this.usuario).subscribe({
      next: async () => {
        await Swal.fire('¡Hecho!', 'Usuario creado con éxito', 'success');
        this.router.navigate(['/lista-usuarios']);
      },
      error: async () => {
        await Swal.fire('¡Algo salió mal!', 'Error al guardar usuario', 'error');
      }
    });
  }
}
