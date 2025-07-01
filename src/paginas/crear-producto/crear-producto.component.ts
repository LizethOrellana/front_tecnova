import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../models/Marca';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  categorias: Categoria[] = [];
  marcas: Marca[] = [];


  constructor(private marcaService: MarcaService, private categoriaService: CategoriaService, @Inject(PLATFORM_ID) private platformId: Object, private productoService: ProductoServiceService, private router: Router) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.obtenerCategorias();
      this.obtenerMarcas();
    }
  }

  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: '',
    categoriaId: 1,
    marcaId: 1,
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
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    // Opcional: crea una vista previa local
    const reader = new FileReader();
    reader.onload = () => {
      this.producto.imagenUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    console.log('Archivo seleccionado:', this.selectedFile);
  }
}

  obtenerCategorias() {
    this.categoriaService.obtenerTodas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => {
        console.error('Error al obtener categorias:', err);
        this.categorias = [];
      }
    });
  }

  obtenerMarcas() {
    this.marcaService.obtenerTodas().subscribe({
      next: (data) => this.marcas = data,
      error: (err) => {
        console.error('Error al obtener marcas:', err);
        this.marcas = [];
      }
    });
  }
}
