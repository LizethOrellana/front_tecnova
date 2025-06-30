import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoServiceService } from '../../services/producto.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit{
  productos: Producto[] = [];

  constructor(private productoService: ProductoServiceService,
    @Inject(PLATFORM_ID) private platformId: Object) {}
    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.productoService.obtenerTodos().subscribe({
          next: (data) => this.productos = data,
          error: (err) => {
            console.error('Error al obtener productos:', err);
            this.productos = [];
          }
        });
      }
    }
  
  cargarProductos(): void {
    
  }

  

  verDetalle(producto: Producto): void {
    console.log('Vista previa:', producto);
  }

  
  

  

  editarProducto(producto: any): void {
    console.log('Editar producto:', producto);
    // Aquí podrías redirigir a un formulario de edición
  }

  eliminarProducto(nombre: string): void {
    console.log('Eliminar producto con nombre:', nombre);
    // Aquí podrías hacer una llamada al backend para eliminarlo
    this.productos = this.productos.filter(p => p.nombre !== nombre);
  }




}
