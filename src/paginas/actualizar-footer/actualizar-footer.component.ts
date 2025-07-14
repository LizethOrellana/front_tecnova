import { Component, OnInit } from '@angular/core';
import { Footer } from '../../models/Footer';
import { FooterService } from '../../services/footer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actualizar-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './actualizar-footer.component.html',
  styleUrl: './actualizar-footer.component.css'
})
export class ActualizarFooterComponent implements OnInit {
  footer: Footer = {
    id: undefined,
    descripcion: '',
    autores: ''
  }

  constructor(private footerServices: FooterService) { }
  ngOnInit(): void {
    this.obtenerFooters();
  }

  obtenerFooters() {
    this.footerServices.obtenerTodos().subscribe(footers => {
      footers.forEach(footer => {
        this.footer = footer;
      })
    });
  }

  actualizarFooter() {
    if (this.footer.autores == "" || this.footer.descripcion == "") {
      alert("LLene todos los campos")
    } else {
      if (this.footer.id) {
        this.footerServices.actualizar(this.footer.id, this.footer).subscribe(() => {
          alert('Footer actualizado correctamente');
        }, error => {
          console.error('Error al actualizar el footer', error);
        });
      } else {
        alert('No se pudo actualizar el footer, ID no encontrado');
      }
    }
  }
}
