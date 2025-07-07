import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/Carrito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-carrito.component.html',
  styleUrls: ['./historial-carrito.component.css']
})
export class HistorialCarritoComponent implements OnInit {
  historial: Carrito[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    const usuarioId = 1;
    this.carritoService.obtenerHistorialPorUsuario(usuarioId).subscribe({
      next: (data) => {
        this.historial = data;
        console.log('Historial cargado', data);
      },
      error: (err) => {
        console.error('Error al cargar historial', err);
      }
    });
  }

  calcularTotal(carrito: Carrito): number {
    return carrito.productos?.reduce(
      (acc, p) => acc + (p.producto?.precio || 0) * (p.cantidad || 1),
      0
    ) || 0;
  }
  eliminarCarrito(id: number) {
    if (confirm('¿Estás seguro de eliminar este carrito?')) {
      this.carritoService.eliminar(id).subscribe({
        next: () => {
          // ✅ Aquí corregido el filtro
          this.historial = this.historial.filter(c => c.id !== id);
          alert('✅ Compra eliminada');
        },
        error: (err) => {
          console.error('Error al eliminar carrito', err);
          alert('❌ No se pudo eliminar el carrito');
        }
      });
    }
  }
}
