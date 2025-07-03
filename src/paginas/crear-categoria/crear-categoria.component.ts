import { Component } from '@angular/core';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.categoriaService.crear(this.categoria).subscribe({
      next: () => {
        console.log('Categoria creado');
        this.router.navigate(['/lista-categorias']);
      },
      error: (error) => console.error('Error al guardar', error)
    });
  }

}
