import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth-service';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Menu } from '../../models/Menu';
import { Router, RouterModule } from '@angular/router';
import { Empresa } from '../../models/Empresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  empresa: Empresa = {
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners: []
  }

  menus: Menu[] = [];
  nivelUsuario: number = 0;

  constructor(
    private empresaService: EmpresaService, // Asumiendo que tienes un servicio para obtener la empresa
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.nivelUsuario = this.authService.getNivelAcceso(); // Obtén el nivel del usuario
      console.log('NivelAcceso:', this.nivelUsuario);
      this.menuService.obtenerMenus().subscribe({
        next: (menus) => {
          // Filtra solo activos y que nivel de acceso sea menor o igual al usuario actual
          this.menus = menus.filter(menu => menu.activo && menu.nivel_acceso! === this.nivelUsuario);

        },
        error: (err) => console.error('Error al obtener menús:', err)
      });
      this.cargarEmpresa();
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  cargarEmpresa() {
    this.empresaService.obtener().subscribe({
      next: (empresa) => {
        this.empresa = empresa;
        localStorage.setItem('empresa', JSON.stringify(empresa));
      },
      error: (err) => console.error('Error al cargar la empresa:', err)
    });
  }

  mostrarMenu: boolean = false;

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
