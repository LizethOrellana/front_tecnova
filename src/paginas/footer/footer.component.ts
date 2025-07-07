import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { Footer } from '../../models/Footer';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
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
}
