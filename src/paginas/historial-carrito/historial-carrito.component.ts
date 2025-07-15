import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-historial-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-carrito.component.html',
  styleUrls: ['./historial-carrito.component.css']
})
export class HistorialCarritoComponent implements OnInit {
  historial: Pedido[] = [];
  categoriasPorPagina = 10;
  paginaActual = 1;

  constructor(private pedidoService: PedidoService, private authService: AuthService) { }

  ngOnInit(): void {
    const usuarioId = this.authService.getUserId()
    if (usuarioId) {
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

  get categoriasPaginados() {
    const inicio = (this.paginaActual - 1) * this.categoriasPorPagina;
    return this.historial.slice(inicio, inicio + this.categoriasPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.historial.length / this.categoriasPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }
}
