import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../models/Carrito';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';  // <-- Importa SweetAlert2

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CheckoutComponent implements OnInit {
  carrito: { producto: any; cantidad: number }[] = [];
  total: number = 0;
  fecha: Date = new Date();

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        const parsed = JSON.parse(carritoGuardado);
        if (parsed.productos && Array.isArray(parsed.productos)) {
          this.carrito = parsed.productos;
          this.calcularTotal();
        }
      } else {
        this.carrito = [];
        console.warn('⚠️ No hay productos en el carrito');
      }
    }
  }

  calcularTotal() {
    this.total = this.carrito.reduce((acc, item) => {
      const precio = item.producto?.precio ?? 0;
      const cantidad = item.cantidad ?? 1;
      return acc + precio * cantidad;
    }, 0);
  }

  confirmarCompra() {
    const usuario = this.authService.getUserData();
    console.log('Usuario autenticado:', usuario);
    if (!usuario) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no autenticado',
        text: 'Debes iniciar sesión para completar la compra'
      });
      return;
    }

    const pedido: Pedido = {
      usuario: usuario,
      total: this.total,
      estado: 'pendiente',
      fechaPedido: new Date()
    };
    console.log('Pedido a registrar:', pedido);

    this.pedidoService.crear(pedido).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Pedido registrado',
          text: 'Tu pedido fue registrado exitosamente',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
        console.log('Pedido registrado exitosamente:', response);
        this.router.navigate(['/crearPago']);
        localStorage.setItem('pedido', JSON.stringify(response));
        console.log('Pedido registrado:', pedido);
      },
      (err) => {
        console.error('Error al registrar pedido:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el pedido. Intenta de nuevo.'
        });
      }
    );
  }

  volver() {
    this.router.navigate(['/']);
  }
}
