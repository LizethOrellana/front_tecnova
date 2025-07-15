import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/Empresa';
import Swal from 'sweetalert2';

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

  async guardarCambios() {
    if (this.empresa.nombre.trim() === "" || this.empresa.mision.trim() === "" || this.empresa.vision.trim() === "" || this.empresa.logo.trim() === "") {
      await Swal.fire({
        icon: 'warning',
        title: 'Llene todos los campos',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      });
      return;
    }

    this.empresaService.guardar(this.empresa).subscribe({
      next: async (respuesta) => {
        await Swal.fire({
          icon: 'success',
          title: 'Empresa actualizada correctamente',
          text: 'Recargue la página para reflejar los cambios',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/productos']);
      },
      error: async (error) => {
        console.error('Error al actualizar empresa', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la empresa',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
