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
    secuencial: 0,
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
      console.log(data)
      console.log('dato real'+this.empresa)
    });

    }
    guardarCambios() {
      console.log('Datos guardados:', this.banner);
      // Aquí podrías llamar a un servicio para actualizar los datos
      this.router.navigate(['/']); // redirige a inicio o dashboard
    }

}
