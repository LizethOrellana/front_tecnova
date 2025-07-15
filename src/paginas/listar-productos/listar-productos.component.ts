import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../models/Marca';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']  // Corregido
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  productoEditando: Producto | null = null;
  productosFiltrados: Producto[] = [];
  nombreBusqueda: string = '';
  buscarTabla: Boolean = false;
  datosListos = false;

  constructor(
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private productoService: ProductoServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.datosListos = false;
    Promise.all([
      this.cargarProductosPromise(),
      this.cargarCategoriasPromise(),
      this.cargarMarcasPromise()
    ]).then(() => {
      this.datosListos = true;
    });
  }

  cargarProductosPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.productoService.obtenerTodos().subscribe({
        next: (data) => {
          this.productos = data;
          resolve();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
          reject(err);
        }
      });
    });
  }

  cargarCategoriasPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoriaService.obtenerTodas().subscribe({
        next: (data) => {
          this.categorias = data;
          resolve();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
          reject(err);
        }
      });
    });
  }

  cargarMarcasPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.marcaService.obtenerTodas().subscribe({
        next: (data) => {
          this.marcas = data;
          resolve();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudieron cargar las marcas', 'error');
          reject(err);
        }
      });
    });
  }

  editarProducto(producto: Producto): void {
    this.productoEditando = { ...producto }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.productoEditando && this.productoEditando.id) {
      this.productoService.actualizar(this.productoEditando.id, this.productoEditando).subscribe(() => {
        this.productoEditando = null;
        this.cargarProductosPromise();
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
      }, error => {
        Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
      });
    }
  }

  cancelarEdicion(): void {
    this.productoEditando = null;
  }

  async eliminarProducto(id: number): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      this.productoService.eliminar(id).subscribe(() => {
        this.cargarProductosPromise();
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
      }, error => {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      });
    }
  }

  crearProducto() {
    this.router.navigate(['/crearProducto']);
  }

  productosPorPagina = 10;
  paginaActual = 1;

  get productosPaginados() {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    return this.productos.slice(inicio, inicio + this.productosPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  buscarProductos(): void {
    if (!this.nombreBusqueda.trim()) {
      this.cargarProductosPromise();
      return;
    }

    this.productoService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.productos = res,
      error: (err) => Swal.fire('Error', 'No se pudo buscar productos', 'error')
    });
  }

  obtenerNombreMarca(id?: number): string {
    const idNum = Number(id);
    const marca = this.marcas.find(m => Number(m.id) === idNum);
    return marca ? marca.nombre : 'Sin marca';
  }

  obtenerNombreCategoria(id?: number): string {
    const idNum = Number(id);
    const categoria = this.categorias.find(c => Number(c.id) === idNum);
    return categoria ? categoria.nombre : 'Sin categoría';
  }
}
