import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/Pago';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.css'
})
export class ListaComprasComponent implements OnInit {
  pagos: Pago[] = [];

  constructor(private pagoService: PagoService) { }
  ngOnInit(): void {
    this.pagoService.obtenerTodos().subscribe({
      next: (data) => {
        this.pagos = data;
        console.log('Lista de compras:', data);
      },
      error: (err) => {
        console.error('Error al cargar lista de compras', err);
      }
    });
  }

  comprasPorPagina = 10;
  paginaActual = 1;

  get marcasPaginados() {
    const inicio = (this.paginaActual - 1) * this.comprasPorPagina;
    return this.pagos.slice(inicio, inicio + this.comprasPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.pagos.length / this.comprasPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

}
