import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaEditada: Categoria | null = null;
  nombreBusqueda: string = '';

  categoriasPorPagina = 10;
  paginaActual = 1;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerTodas().subscribe({
      next: data => this.categorias = data,
      error: err => {
        console.error('Error al cargar categorías', err);
        Swal.fire('Error', 'No se pudo cargar las categorías', 'error');
      }
    });
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaEditada = { ...categoria }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.categoriaEditada && this.categoriaEditada.id) {
      this.categoriaService.actualizar(this.categoriaEditada.id, this.categoriaEditada).subscribe({
        next: () => {
          this.categoriaEditada = null;
          this.cargarCategorias();
          Swal.fire('¡Éxito!', 'Categoría actualizada correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al actualizar categoría', err);
          Swal.fire('Error', 'No se pudo actualizar la categoría', 'error');
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.categoriaEditada = null;
  }

  eliminarCategoria(id: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.categoriaService.eliminar(id).subscribe({
          next: () => {
            this.cargarCategorias();
            Swal.fire('Eliminado', 'Categoría eliminada correctamente', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar categoría', err);
            Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
          }
        });
      }
    });
  }

  crearCategoria() {
    this.router.navigate(['/crearCategoria']);
  }

  get categoriasPaginados() {
    const inicio = (this.paginaActual - 1) * this.categoriasPorPagina;
    return this.categorias.slice(inicio, inicio + this.categoriasPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.categorias.length / this.categoriasPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  buscarCategorias(): void {
    if (!this.nombreBusqueda.trim()) {
      this.cargarCategorias();
      return;
    }

    this.categoriaService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.categorias = res,
      error: (err) => {
        console.error('Error al buscar categorías:', err);
        Swal.fire('Error', 'No se pudo realizar la búsqueda', 'error');
      }
    });
  }
}
