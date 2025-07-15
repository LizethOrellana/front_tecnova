import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Pedido } from '../../models/Pedido';
import { FormsModule } from '@angular/forms';
import { Pago } from '../../models/Pago';
import { AuthService } from '../../services/auth-service';
import { PagoService } from '../../services/pago.service';
import { Carrito } from '../../models/Carrito';
import { Producto } from '../../models/Producto';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ProductoServiceService } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-pago',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-pago.component.html',
  styleUrl: './crear-pago.component.css'
})
export class CrearPagoComponent implements OnInit {
  pedido: Pedido = {
    id: 0,
    usuario: { secuencial: 0, nombre: '', apellido: '', cedula: '', telefono: '', username: '', password: '', estaActivo: 1, tipoUsuario: { secuencial: 0, nombre: '', estado: true }, pregunta: '' },
    total: 0,
    estado: 'pendiente',
    fechaPedido: new Date()
  };

  pago: Pago = {
    id: 0,
    pedido: this.pedido,
    metodoPago: "",
    estadoPago: "",
    fechaPago: new Date()
  };
  carrito: Carrito = {
    id: 0,
    fechaCreacion: new Date(),
    usuario: { secuencial: 0 },
    estado: true,
    estado_proceso: 'creado',
    productos: []
  };

  productos: Producto[] = [];

  fechaActual: Date = new Date();

  errorMessage: boolean = false;

  constructor(
    private productoService: ProductoServiceService,
    private carritoService: CarritoService,
    private router: Router,
    private pagoService: PagoService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pedidoGuardado = localStorage.getItem('pedido');
      if (pedidoGuardado) {
        const parsed = JSON.parse(pedidoGuardado);
        this.pedido = parsed;
      } else {
        console.warn('⚠️ No hay pedido');
      }

      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        const parsed = JSON.parse(carritoGuardado);
        if (parsed.productos && Array.isArray(parsed.productos)) {
          this.carrito = parsed;
          console.log("Carrito ", this.carrito);
        }
      } else {
        console.warn('⚠️ No hay productos en el carrito');
      }
    }
  }

  guardar() {
    if (!this.pago.metodoPago || !this.pago.fechaPago) {
      this.errorMessage = true;
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa el método de pago y la fecha de pago.'
      });
    } else {
      this.pago.pedido = this.pedido;
      this.pago.estadoPago = "realizado";
      this.pago.pedido.estado = "pagado";
      this.pagoService.crear(this.pago).subscribe(
        (response) => {
          console.log('Pago guardado exitosamente:', response);
          localStorage.removeItem('pedido');
          localStorage.removeItem('carrito');

          Swal.fire({
            icon: 'success',
            title: 'Pago realizado',
            text: 'El pago se realizó exitosamente.',
            confirmButtonText: 'OK'
          }).then(() => {
            if (this.carrito.id) {
              this.carritoService.marcarComoPagado(this.carrito.id).subscribe({
                next: (carrito) => {
                  this.carrito = carrito;
                  Swal.fire({
                    icon: 'success',
                    title: 'Carrito actualizado',
                    text: 'El carrito fue marcado como pagado.',
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false
                  });
                },
                error: (err) => {
                  console.error('Error al marcar como pagado:', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al finalizar la compra.'
                  });
                }
              });

              for (const item of this.carrito.productos) {
                const id = item.producto?.id;
                const cantidadARestar = item.cantidad;

                if (id !== undefined) {
                  this.productoService.disminuirStock(id, cantidadARestar).subscribe({
                    next: (productoActualizado) => {
                      console.log(`✅ Stock actualizado para producto ${id}:`, productoActualizado.stock);
                      this.router.navigate(['/']);
                    },
                    error: (err) => {
                      console.error(`❌ Error al disminuir stock del producto ${id}`, err);
                    }
                  });
                } else {
                  console.warn("❗ Producto no tiene ID válido:", item);
                }
              }
            }
          });

        },
        (error) => {
          console.error('Error al guardar pago:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo realizar el pago, intenta nuevamente.'
          });
        }
      );
      console.log('Pago a guardar:', this.pago);
    }
  }
}
