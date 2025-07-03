import { Component } from '@angular/core';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.menuEditado = { ...menu }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.menuEditado && this.menuEditado.id) {
      this.menuService.actualizar(this.menuEditado.id, this.menuEditado).subscribe(() => {
        this.menuEditado = null;
        this.cargarMenus();
      });
    }
  }

  cancelarEdicion(): void {
    this.menuEditado = null;
  }

  eliminarMenu(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.menuService.eliminar(id).subscribe(() => this.cargarMenus());
    }
  }

  crearMenu() {
    this.menuService.crear(this.menu).subscribe({
      next: () => {
        console.log('Menu creado');
      },
      error: (error) => console.error('Error al guardar', error)
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
    console.log("Buscando..")
    if (!this.nombreBusqueda.trim()) {
      this.cargarMenus(); // recarga todo si está vacío
      return;
    }

    this.menuService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.menus = res,
      error: (err) => console.error('Error al buscar menus:', err)
    });
  }
}
