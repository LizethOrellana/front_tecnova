
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
export class EditarEmpresaComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners: [],
  };


  constructor(private router: Router, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.obtener().subscribe(data => {
      this.empresa = data;
    });
  }


  guardarCambios() {
    if (this.empresa.nombre == "" || this.empresa.mision == "" || this.empresa.vision == "" || this.empresa.logo == "") {
      alert("Llene todos los campos")
    } else {
      this.empresaService.guardar(this.empresa).subscribe({
        next: (respuesta) => {
          alert('Empresa actualizada correctamente recargue la página para reflejar los cambios');
          this.router.navigate(['/productos']); // Redirige a la página principal o donde desees// Recargar la página para reflejar los cambios
          // Puedes mostrar un mensaje de éxito o redireccionar
        },
        error: (error) => {
          console.error('Error al actualizar empresa', error);
        }
      });
    }
  }
}