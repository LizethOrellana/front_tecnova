import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/Menu';
import { RouterModule } from '@angular/router';
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

  constructor(private empresaService: EmpresaService, private menuService: MenuService, public auth: LoginService, @Inject(PLATFORM_ID) private platformId: Object) { }

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
}