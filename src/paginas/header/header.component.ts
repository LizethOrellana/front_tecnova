import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/Menu';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/Empresa';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menus: Menu[] = [];
  panelAbierto = false;
  mostrarBoton = false;
  constructor(private empresaService: EmpresaService,private router: Router, private menuService: MenuService, public auth: LoginService, @Inject(PLATFORM_ID) private platformId: Object) {
    // Detectar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarBoton = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
      }
    });
   }

  empresa: Empresa = {
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners: [],
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.menuService.obtenerMenus().subscribe({
        next: (menus) => this.menus = menus,
        error: (err) => console.error('Error al obtener menús:', err)
      });
      this.cargarEmpresa();
    }
  }

  cargarEmpresa(): void {
    this.empresaService.obtener().subscribe({
      next: (data) => {
        this.empresa = data;
        console.log('Empresa cargada:', this.empresa);
      },
      error: (err) => {
        console.error('Error al obtener la empresa:', err);
      },
    });
  }







  

  abrirPanel() {
    this.panelAbierto = true;
  }

  cerrarPanel() {
    this.panelAbierto = false;
  }

  irAEditarEmpresa() {
    this.router.navigate(['/editarEmpresa']);
    this.cerrarPanel();
  }

  irAEditarBanner() {
    this.router.navigate(['/editarBanner']);
    this.cerrarPanel();
  }
}