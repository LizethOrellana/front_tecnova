import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/Carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private router: Router, private productoService: ProductoServiceService,
    @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.productoService.obtenerTodos().subscribe({
        next: (data) => this.productos = data,
        error: (err) => {
          console.error('Error al obtener productos:', err);
          this.productos = [];
        }
      });

      // 🛒 Cargar carrito del localStorage (si existe)
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
        this.actualizarTotal();
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      this.productoService.obtenerTodos().subscribe({
        next: (data) => this.productos = data,
        error: (err) => {
          console.error('Error al obtener productos:', err);
          this.productos = [];
        }
      });
    }
  }
  mostrarCarrito: boolean = false;
  carrito: any[] = [];
  total: number = 0;

  anadirAlCarrito(producto: any) {
    this.carrito.push(producto);
    this.actualizarTotal();
    localStorage.setItem('carrito', JSON.stringify(this.carrito)); // guardar
  }


  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.actualizarTotal();
    localStorage.setItem('carrito', JSON.stringify(this.carrito)); // guardar
  }

  actualizarTotal() {
    this.total = this.carrito.reduce((suma, item) => suma + item.precio, 0);
  }

  irAPagar() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.router.navigate(['/checkout']);
  }


  verDetalle(producto: Producto): void {
    console.log('Vista previa:', producto);
  }


  editarProducto(producto: any): void {
    console.log('Editar producto:', producto);
    // Aquí podrías redirigir a un formulario de edición
  }

  eliminarProducto(nombre: string): void {
    console.log('Eliminar producto con nombre:', nombre);
    // Aquí podrías hacer una llamada al backend para eliminarlo
    this.productos = this.productos.filter(p => p.nombre !== nombre);

  }
  verHistorial() {
    this.router.navigate(['/historial']);

  }
}
