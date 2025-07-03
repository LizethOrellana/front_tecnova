import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
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
    this.usuarioEditado = { ...usuario }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.usuarioEditado && this.usuarioEditado.secuencial) {
      this.usuarioService.actualizar(this.usuarioEditado.secuencial, this.usuarioEditado).subscribe(() => {
        this.usuarioEditado = null;
        this.cargarUsuarios();
      });
    }
  }

  cancelarEdicion(): void {
    this.usuarioEditado = null;
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.usuarioService.eliminar(id).subscribe(() => this.cargarUsuarios());
    }
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
    console.log("Buscando..")
    if (!this.nombreBusqueda.trim()) {
      this.cargarUsuarios(); // recarga todo si está vacío
      return;
    }

    this.usuarioService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => console.error('Error al buscar marcas:', err)
    });
  }
}
