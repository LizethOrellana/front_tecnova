import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Marca } from '../../models/Marca';
import { MarcaService } from '../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-marca',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css'
})
export class CrearMarcaComponent {
  marca: Marca = {
    nombre: '',
    paisOrigen: '',
    estado: false
  };

  constructor(private marcaService: MarcaService, private router: Router) { }

  guardarMarca() {
    if (this.marca.nombre === "" || this.marca.paisOrigen === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llene todos los campos antes de continuar.'
      });
    } else {
      this.marcaService.crear(this.marca).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Marca creada',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/lista-marcas']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la marca. Intente de nuevo.'
          });
          console.error('Error al guardar', error);
        }
      });
    }
  }
}
