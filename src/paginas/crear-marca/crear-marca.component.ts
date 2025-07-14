import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Marca } from '../../models/Marca';
import { MarcaService } from '../../services/marca.service';

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
    if (this.marca.nombre == "" || this.marca.paisOrigen == "") {
      alert("Llene todos los campos")
    } else {
      this.marcaService.crear(this.marca).subscribe({
        next: () => {
          console.log('Marca creado');
          this.router.navigate(['/lista-marcas']);
        },
        error: (error) => console.error('Error al guardar', error)
      });
    }
  }

}
