import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/Pago';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']  // Corregido aquí
})
export class ListaComprasComponent implements OnInit {
  pagos: Pago[] = [];

  pagosPorPagina = 10;
  paginaActual = 1;

  constructor(private pagoService: PagoService) { }

  ngOnInit(): void {
    this.pagoService.obtenerTodos().subscribe({
      next: (data) => {
        this.pagos = data;
        console.log('Lista de compras:', data);
      },
      error: (err) => {
        console.error('Error al cargar lista de compras', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo cargar la lista de compras',
          toast: true,
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }

  get pagosPaginados() {
    const inicio = (this.paginaActual - 1) * this.pagosPorPagina;
    return this.pagos.slice(inicio, inicio + this.pagosPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.pagos.length / this.pagosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }
}
