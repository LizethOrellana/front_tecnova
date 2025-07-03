import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Empresa } from '../../models/Empresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-editar-banner',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-banner.component.html',
  styleUrl: './editar-banner.component.css'
})
export class EditarBannerComponent implements OnInit{
    empresa: Empresa = {
    id: 0,
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners:[],
    };
    banner = {
      secuencial: '',
      descripcion: '',
      estaBaner: '',
      url:'',
      empresaSecuencial: ''
    };
  
    constructor(private router: Router, private empresaService: EmpresaService ) {}
  
    ngOnInit(): void {
      this.empresaService.obtener().subscribe(data => {
      this.empresa = data;
    });

    }
    


    guardarCambios() {
      this.empresaService.guardarBanner(this.empresa).subscribe({
        next: (respuesta) => {
      alert('Banner actualizado correctamente recargue la página para reflejar los cambios');
          this.router.navigate(['/']); // Redirige a la página principal o donde desees

          // aquí podrías navegar o mostrar un mensaje
        },
        error: (err) => {
          console.error('Error al guardar empresa:', err);
        }
      });

    }
  }