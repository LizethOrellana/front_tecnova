
// editar-empresa.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/Empresa';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit{
   empresa: Empresa = {
    secuencial: 0,
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners:[],
  };
  
  
  constructor(private router: Router, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.empresaService.obtener().subscribe(data => {
      this.empresa = data;
      console.log(data)
      console.log('dato real'+this.empresa)
    });
   }


  guardarCambios() {
    console.log('Datos guardados:', this.empresa);
    // Aquí podrías llamar a un servicio para actualizar los datos
    this.router.navigate(['/']); // redirige a inicio o dashboard
  }
}