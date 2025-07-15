import { Component, OnInit } from '@angular/core';
import { Footer } from '../../models/Footer';
import { FooterService } from '../../services/footer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-actualizar-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './actualizar-footer.component.html',
  styleUrls: ['./actualizar-footer.component.css']  // corregido aquí
})
export class ActualizarFooterComponent implements OnInit {
  footer: Footer = {
    id: undefined,
    descripcion: '',
    autores: ''
  }

  constructor(private footerServices: FooterService) { }

  ngOnInit(): void {
    this.obtenerFooters();
  }

  obtenerFooters() {
    this.footerServices.obtenerTodos().subscribe(footers => {
      footers.forEach(footer => {
        this.footer = footer;
      })
    });
  }

  actualizarFooter() {
    if (this.footer.autores === "" || this.footer.descripcion === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'LLene todos los campos'
      });
    } else {
      if (this.footer.id) {
        this.footerServices.actualizar(this.footer.id, this.footer).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Footer actualizado correctamente',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });
        }, error => {
          console.error('Error al actualizar el footer', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el footer'
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el footer, ID no encontrado'
        });
      }
    }
  }
}
