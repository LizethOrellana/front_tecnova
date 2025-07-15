import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']  // corregido el nombre
})
export class ListarUsuariosComponent {
  usuarios: Usuario[] = [];
  usuarioEditado: Usuario | null = null;
  nombreBusqueda: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerTodas().subscribe(data => this.usuarios = data);
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioEditado = { ...usuario }; // clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.usuarioEditado && this.usuarioEditado.secuencial) {
      this.usuarioService.actualizar(this.usuarioEditado.secuencial, this.usuarioEditado).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado correctamente',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
        this.usuarioEditado = null;
        this.cargarUsuarios();
      }, error => {
        Swal.fire('Error', 'No se pudo editar el usuario', 'error');
      });
    }
  }

  cancelarEdicion(): void {
    this.usuarioEditado = null;
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminar(id).subscribe(() => {
          this.cargarUsuarios();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El usuario ha sido eliminado.',
            timer: 2000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
          });
        }, error => {
          Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        });
      }
    });
  }

  crearUsuario() {
    this.router.navigate(['/crearUsuario']);
  }

  usuariosPorPagina = 10;
  paginaActual = 1;

  get usuariosPaginados() {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    return this.usuarios.slice(inicio, inicio + this.usuariosPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.usuarios.length / this.usuariosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  buscarUsuarios(): void {
    if (!this.nombreBusqueda.trim()) {
      this.cargarUsuarios(); // recarga todo si está vacío
      return;
    }

    this.usuarioService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => {
        if (!res) {
          Swal.fire({
            icon: 'info',
            title: 'No se encontró ningún usuario',
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarUsuarios();
        } else {
          // Si la búsqueda devuelve un solo usuario
          if (Array.isArray(res)) {
            this.usuarios = res;
          } else {
            this.usuarios = [res];
          }
        }
      },
      error: (err) => {
        console.error('Error al buscar usuarios:', err);
        Swal.fire('Error', 'Error al buscar usuarios', 'error');
      }
    });
  }
}
