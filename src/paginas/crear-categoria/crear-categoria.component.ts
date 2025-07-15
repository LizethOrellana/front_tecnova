import { Component } from '@angular/core';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  categoria: Categoria = {
    nombre: '',
    descripcion: '',
    estado: false
  };

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  guardarCategoria() {
    if (this.categoria.nombre === "" || this.categoria.descripcion === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar.'
      });
    } else {
      this.categoriaService.crear(this.categoria).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Categoría creada!',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });
          this.router.navigate(['/lista-categorias']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la categoría. Intente de nuevo.'
          });
          console.error('Error al guardar', error);
        }
      });
    }
  }
}
