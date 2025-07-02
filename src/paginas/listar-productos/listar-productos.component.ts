import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent {
  productos: Producto[] = [];
  productoEditando: Producto | null = null;

  constructor(private productoService: ProductoServiceService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerTodos().subscribe(data => this.productos = data);
  }

  editarProducto(producto: Producto): void {
    this.productoEditando = { ...producto }; // Clonamos para no modificar directamente
  }

  guardarEdicion(): void {
    if (this.productoEditando && this.productoEditando.id) {
      this.productoService.actualizar(this.productoEditando.id, this.productoEditando).subscribe(() => {
        this.productoEditando = null;
        this.cargarProductos();
      });
    }
  }

  cancelarEdicion(): void {
    this.productoEditando = null;
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => this.cargarProductos());
    }
  }
}
