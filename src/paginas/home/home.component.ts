import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/Empresa';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  empresa: Empresa = {
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners: [],
  };
  slideIndex: number = 0;
  intervalId: any;

  constructor(private empresaService: EmpresaService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarEmpresa();
      this.startSlider();
    }
  }

  startSlider(): void {
    this.intervalId = setInterval(() => {
      if (this.empresa?.banners?.length) {
        this.slideIndex = (this.slideIndex + 1) % this.empresa.banners.length;
      }
    }, 3000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  cargarEmpresa(): void {
    const empresaLocal = localStorage.getItem('empresa');
    if (empresaLocal) {
      try {
        this.empresa = JSON.parse(empresaLocal);
        console.log('Empresa cargada desde localStorage:', this.empresa);
      } catch (error) {
        console.error('Error al parsear empresa desde localStorage:', error);
      }
    } else {
      console.warn('No se encontró empresa en localStorage');
    }
  }
}
