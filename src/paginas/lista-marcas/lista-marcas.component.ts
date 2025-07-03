import { Component } from '@angular/core';
import { Marca } from '../../models/Marca';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-marcas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-marcas.component.html',
  styleUrl: './lista-marcas.component.css'
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

  eliminarMarca(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.marcaService.eliminar(id).subscribe(() => this.cargarMarcas());
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
    console.log("Buscando..")
    if (!this.nombreBusqueda.trim()) {
      this.cargarMarcas(); // recarga todo si está vacío
      return;
    }

    this.marcaService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.marcas = res,
      error: (err) => console.error('Error al buscar marcas:', err)
    });
  }
}
