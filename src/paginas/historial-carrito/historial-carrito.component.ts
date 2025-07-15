import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';

@Component({
  selector: 'app-historial-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-carrito.component.html',
  styleUrls: ['./historial-carrito.component.css']
})
export class HistorialCarritoComponent implements OnInit {
  historial: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    const usuarioId = 1; // Idealmente: this.authService.getUserId()
    this.pedidoService.obtenerPedidosPorUsuario(usuarioId).subscribe({
      next: (data: Pedido[]) => {
        this.historial = data;
        console.log('Pedidos cargados', data);
      },
      error: (err: any) => {
        console.error('Error al cargar historial', err);
      }
    });
  }

  eliminarPedido(id: number | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de eliminar este pedido?')) {
      this.pedidoService.eliminar(id).subscribe({
        next: () => {
          this.historial = this.historial.filter(p => p.id !== id);
          alert('✅ Pedido eliminado');
        },
        error: (err: any) => {
          console.error('Error al eliminar pedido', err);
          alert('❌ No se pudo eliminar el pedido');
        }
      });
    }
  }
}
