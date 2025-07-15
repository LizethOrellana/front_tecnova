import { Component } from '@angular/core';
import { Marca } from '../../models/Marca';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-marcas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css']  // corregido aquí
})
export class ListaMarcasComponent {
  marcas: Marca[] = [];
  marcaEditada: Marca | null = null;
  nombreBusqueda: string = '';

  constructor(private marcaService: MarcaService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas(): void {
    this.marcaService.obtenerTodas().subscribe(data => this.marcas = data);
  }

  editarMarca(marca: Marca): void {
    this.marcaEditada = { ...marca }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.marcaEditada && this.marcaEditada.id) {
      this.marcaService.actualizar(this.marcaEditada.id, this.marcaEditada).subscribe(() => {
        this.marcaEditada = null;
        this.cargarMarcas();
      });
    }
  }

  cancelarEdicion(): void {
    this.marcaEditada = null;
  }

  async eliminarMarca(id: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      this.marcaService.eliminar(id).subscribe(() => {
        this.cargarMarcas();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El producto fue eliminado correctamente',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }, (error) => {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      });
    }
  }

  crearMarca() {
    this.router.navigate(['/crearMarca']);
  }

  marcasPorPagina = 10;
  paginaActual = 1;

  get marcasPaginados() {
    const inicio = (this.paginaActual - 1) * this.marcasPorPagina;
    return this.marcas.slice(inicio, inicio + this.marcasPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.marcas.length / this.marcasPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  buscarMarcas(): void {
    console.log("Buscando..");
    if (!this.nombreBusqueda.trim()) {
      this.cargarMarcas();
      return;
    }

    this.marcaService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.marcas = res,
      error: (err) => console.error('Error al buscar marcas:', err)
    });
  }
}
