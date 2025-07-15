import { Component } from '@angular/core';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css'
})
export class MenusComponent {
  menus: Menu[] = [];
  menuEditado: Menu | null = null;
  nombreBusqueda: string = '';
  menu: Menu = {
    id: 0,
    nombre: '',
    ruta: '',
    activo: false
  };

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus(): void {
    this.menuService.obtenerMenus().subscribe(data => this.menus = data);
  }

  editarMenu(menu: Menu): void {
    this.menuEditado = { ...menu };
  }

  guardarEdicion(): void {
    if (this.menuEditado && this.menuEditado.id) {
      this.menuService.actualizar(this.menuEditado.id, this.menuEditado).subscribe(() => {
        Swal.fire('Editado', 'El menú fue actualizado correctamente', 'success');
        this.menuEditado = null;
        this.cargarMenus();
      });
    }
  }

  cancelarEdicion(): void {
    this.menuEditado = null;
  }

  eliminarMenu(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción eliminará el menú!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.eliminar(id).subscribe(() => {
          Swal.fire('Eliminado', 'Menú eliminado correctamente', 'success');
          this.cargarMenus();
        });
      }
    });
  }

  crearMenu() {
    if (!this.menu.nombre || !this.menu.ruta) {
      Swal.fire('Campos requeridos', 'Debes llenar todos los campos', 'warning');
      return;
    }

    this.menuService.crear(this.menu).subscribe({
      next: () => {
        Swal.fire('Creado', 'Menú creado exitosamente', 'success');
        this.menu = { id: 0, nombre: '', ruta: '', activo: false };
        this.cargarMenus();
      },
      error: (error) => {
        console.error('Error al guardar', error);
        Swal.fire('Error', 'No se pudo crear el menú', 'error');
      }
    });
  }

  menusPorPagina = 10;
  paginaActual = 1;

  get menusPaginados() {
    const inicio = (this.paginaActual - 1) * this.menusPorPagina;
    return this.menus.slice(inicio, inicio + this.menusPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.menus.length / this.menusPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  buscarMenus(): void {
    if (!this.nombreBusqueda.trim()) {
      this.cargarMenus();
      return;
    }

    this.menuService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.menus = res,
      error: (err) => {
        console.error('Error al buscar menus:', err);
        Swal.fire('Error', 'No se pudieron cargar los menús', 'error');
      }
    });
  }
}
