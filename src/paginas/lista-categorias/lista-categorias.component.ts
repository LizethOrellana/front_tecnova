import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.css'
})
export class ListaCategoriasComponent {
  categorias: Categoria[] = [];
  categoriaEditada: Categoria | null = null;
  nombreBusqueda: string = '';


  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerTodas().subscribe(data => this.categorias = data);
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaEditada = { ...categoria }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.categoriaEditada && this.categoriaEditada.id) {
      this.categoriaService.actualizar(this.categoriaEditada.id, this.categoriaEditada).subscribe(() => {
        this.categoriaEditada = null;
        this.cargarCategorias();
      });
    }
  }

  cancelarEdicion(): void {
    this.categoriaEditada = null;
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.categoriaService.eliminar(id).subscribe(() => this.cargarCategorias());
    }
  }

  crearCategoria() {
    this.router.navigate(['/crearCategoria']);
  }


  categoriasPorPagina = 10;
  paginaActual = 1;

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
    console.log("Buscando..")
    if (!this.nombreBusqueda.trim()) {
      this.cargarCategorias(); // recarga todo si está vacío
      return;
    }

    this.categoriaService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Error al buscar marcas:', err)
    });
  }
}
