import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/Carrito';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'] // ← CORRECTO
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  carrito: Carrito = {
    id: 0,
    fechaCreacion: new Date(),
    usuario: { secuencial: 0 },
    estado: true,
    estado_proceso: 'creado',
    productos: []
  };
  userId: number | null = null;
  tieneCarritoActivo: boolean = false;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router,
    private productoService: ProductoServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = this.authService.getUserId();

      if (this.userId !== null) {
        this.carritoService.obtenerCarritoActivo(this.userId).subscribe({
          next: (carritoActivo) => {
            if (carritoActivo) {
              this.carrito = carritoActivo;
              this.tieneCarritoActivo = true;
              localStorage.setItem('carrito', JSON.stringify(this.carrito));
              this.actualizarTotal();
            }
          },
          error: (err) => {
            console.warn('No se pudo obtener carrito activo:', err);
          }
        });
      }

      this.productoService.obtenerTodos().subscribe({
        next: (data) => this.productos = data,
        error: (err) => {
          console.error('Error al obtener productos:', err);
          this.productos = [];
        }
      });

      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    }
  }

  mostrarCarrito: boolean = false;
  total: number = 0;

  anadirAlCarrito(producto: Producto) {
    const userId = this.userId;

    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Para añadir productos al carrito debes iniciar sesión'
      });
      return;
    }
    console.log("Usuario ID:", userId);

    if (!this.carrito.id || this.carrito.estado_proceso !== 'creado') {
      this.carritoService.obtenerCarritoActivo(userId).subscribe({
        next: (carritoExistente) => {
          if (carritoExistente) {
            this.carrito = carritoExistente;
            this.agregarProductoYGuardar(producto);
          } else {
            this.carrito = {
              usuario: { secuencial: userId },
              fechaCreacion: new Date(),
              estado: true,
              estado_proceso: 'creado',
              productos: []
            };
            this.agregarProductoYGuardar(producto);
            this.actualizarTotal();
          }
        },
        error: (err) => {
          console.error('Error al obtener carrito activo:', err);
        }
      });
    } else {
      this.agregarProductoYGuardar(producto);
    }
  }

  agregarProductoYGuardar(producto: any) {
    if (this.carrito?.id) {
      this.carritoService.incrementarProducto(this.carrito.id, producto.id).subscribe({
        next: () => {
          const local = this.carrito.productos.find(p => p.producto.id === producto.id);
          if (local) {
            local.cantidad++;
          } else {
            this.carrito.productos.push({ producto, cantidad: 1 });
          }
          localStorage.setItem('carrito', JSON.stringify(this.carrito));
          this.actualizarTotal();

          Swal.fire({
            icon: 'success',
            title: 'Producto añadido',
            text: `${producto.nombre} agregado al carrito.`,
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true
          });
        },
        error: err => console.error('Error al incrementar producto:', err)
      });
    } else {
      this.carrito.productos.push({ producto, cantidad: 1 });

      this.carritoService.crear(this.carrito).subscribe({
        next: (nuevoCarrito) => {
          this.carrito = nuevoCarrito;
          localStorage.setItem('carrito', JSON.stringify(this.carrito));
          this.actualizarTotal();
          console.log('Carrito creado y producto añadido:', this.carrito);

          Swal.fire({
            icon: 'success',
            title: 'Carrito creado',
            text: `${producto.nombre} agregado al carrito.`,
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true
          });
        }
      });
    }
  }

  eliminarDelCarrito(productoId: number) {
    this.carrito.productos = this.carrito.productos.filter(
      item => item.producto.id !== productoId
    );
  }

  incrementarCantidad(productoId: number) {
    const item = this.carrito.productos.find(p => p.producto.id === productoId);
    if (item) {
      item.cantidad++;
    }
  }

  disminuirCantidad(productoId: number) {
    const item = this.carrito.productos.find(p => p.producto.id === productoId);
    if (item && item.cantidad > 1) {
      item.cantidad--;
    }
  }

  actualizarCarrito() {
    this.actualizarTotal();
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    console.log('Carrito actualizado en localStorage:', this.carrito);
    this.carritoService.actualizar(this.carrito.id!, this.carrito).subscribe({
      next: () => {
        console.log('Carrito actualizado en el backend');
        Swal.fire({
          icon: 'success',
          title: 'Carrito actualizado',
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true
        });
      },
      error: err => {
        console.error('Error al actualizar carrito:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el carrito'
        });
      }
    });
  }

  actualizarTotal() {
    if (!this.carrito?.productos) {
      this.total = 0;
      return;
    }
    this.total = this.carrito.productos.reduce((suma, item) => {
      return suma + (item.producto.precio * item.cantidad);
    }, 0);
  }

  crearPedido() {
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
    this.productos = this.productos.filter(p => p.nombre !== nombre);
  }

  verHistorial() {
    this.router.navigate(['/historial']);
  }
}
