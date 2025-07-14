import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Pedido } from '../../models/Pedido';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pago } from '../../models/Pago';
import { AuthService } from '../../services/auth-service';
import { PagoService } from '../../services/pago.service';
import { Carrito } from '../../models/Carrito';
import { Producto } from '../../models/Producto';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

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
    usuario: { secuencial: 0, nombre: '', apellido: '', cedula: '', telefono: '', username: '', password: '', estaActivo: 1, tipoUsuario: { secuencial: 0, nombre: '', estado: true } },
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

  constructor(private carritoService: CarritoService, private router: Router, private pagoService: PagoService, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pedidoGuardado = localStorage.getItem('pedido');
      if (pedidoGuardado) {
        const parsed = JSON.parse(pedidoGuardado);
        this.pedido = parsed
      } else {
        console.warn('⚠️ No hay pedido');
      }

      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        const parsed = JSON.parse(carritoGuardado);
        if (parsed.productos && Array.isArray(parsed.productos)) {
          this.carrito = parsed;
          console.log("Carrito ", this.carrito)
        }
      } else {
        console.warn('⚠️ No hay productos en el carrito');
      }
    }
  }

  guardar() {
    if (!this.pago.metodoPago || !this.pago.fechaPago) {
      this.errorMessage = true;
    } else {
      this.pago.pedido = this.pedido;
      this.pago.estadoPago = "realizado";
      this.pago.pedido.estado = "pagado";
      this.pagoService.crear(this.pago).subscribe(
        (response) => {
          console.log('Pago guardado exitosamente:', response);
          localStorage.removeItem('pedido');
          localStorage.removeItem('carrito');
          alert('Pago realizado exitosamente');
          if (this.carrito.id) {
            this.carritoService.marcarComoPagado(this.carrito.id).subscribe({
              next: (carrito) => {
                this.carrito = carrito;
                alert('🟢 Carrito marcado como pagado');
              },
              error: (err) => {
                console.error('Error al marcar como pagado:', err);
                alert('❌ Ocurrió un error al finalizar la compra');
              }
            });
          }
          this.router.navigate(['/']);
        });
      console.log('Pago a guardar:', this.pago);
    }
  }


}
