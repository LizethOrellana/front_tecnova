import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../models/Carrito';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CheckoutComponent implements OnInit {
  carrito: { producto: any; cantidad: number }[] = [];
  usuarioId: number = 1;

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      console.log('🛒 Carrito cargado para confirmar compra:', this.carrito);
    } else {
      this.carrito = [];
      console.warn('⚠️ No hay productos en el carrito');
    }
  }

  confirmarCompra() {
    const carritoData: Carrito = {
      id: 0,
      fechaCreacion: new Date(),
      usuario: { secuencial: this.usuarioId },
      productos: this.carrito
    };

    this.carritoService.crear(carritoData).subscribe({
      next: () => {
        alert('✅ Compra registrada');
        localStorage.removeItem('carrito');
        this.router.navigate(['/historial']);
      },
      error: (err) => {
        console.error('Error al registrar compra:', err);
      }
    });
  }

  calcularTotal(): number {
    return this.carrito.reduce((acc, p) => {
      return acc + (p.producto?.precio || 0) * (p.cantidad || 1);
    }, 0);
  }
}
