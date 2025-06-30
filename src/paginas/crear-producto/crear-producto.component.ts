import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  

  constructor(private productoService: ProductoServiceService, private router: Router) {}
  ngOnInit(): void {
    
  }

  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen_url: '',
    categoria_id: 1,
    marca_id: 1,
    fecha_creacion: ''
  };

  guardarProducto() {
    this.producto.fecha_creacion = new Date().toISOString().split('T')[0];
    this.productoService.crear(this.producto).subscribe({
      next: () => {
        console.log('Producto creado');
        this.router.navigate(['/productos']);
      },
      error: (error) => console.error('Error al guardar', error)
    });
  }

  selectedFile: File | null = null;

onFileSelected(event: any): void {
  let file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    file = this.producto.imagen_url
  }
}
}
