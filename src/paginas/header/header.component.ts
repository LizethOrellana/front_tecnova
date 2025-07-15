import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth-service';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Menu } from '../../models/Menu';
import { Router, RouterModule } from '@angular/router';
import { Empresa } from '../../models/Empresa';
import { EmpresaService } from '../../services/empresa.service';
import Swal from 'sweetalert2';

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

  mostrarMenu: boolean = false;

  constructor(
    private empresaService: EmpresaService,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.nivelUsuario = this.authService.getNivelAcceso();
      console.log('NivelAcceso:', this.nivelUsuario);
      this.menuService.obtenerMenus().subscribe({
        next: (menus) => {
          this.menus = menus.filter(menu => menu.activo && menu.nivel_acceso! === this.nivelUsuario);
        },
        error: (err) => console.error('Error al obtener menús:', err)
      });
      this.cargarEmpresa();
    }
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  async logout() {
    const result = await Swal.fire({
      title: '¿Estás seguro que quieres salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      this.authService.logout();
      await this.router.navigate(['/login']);
      window.location.reload();
    }
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
}
