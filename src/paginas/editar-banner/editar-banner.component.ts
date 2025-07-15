import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Empresa } from '../../models/Empresa';
import { Banner } from '../../models/Banner';
import { EmpresaService } from '../../services/empresa.service';
import { BannerService } from '../../services/banner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-banner.component.html',
  styleUrls: ['./editar-banner.component.css']
})
export class EditarBannerComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    nombre: '',
    logo: '',
    mision: '',
    vision: '',
    banners: [],
  };

  banners: Banner[] = [];
  bannerNuevo: Banner = {
    url: '',
    descripcion: '',
    estaBanner: 1,
    empresa: {} as Empresa,
  };

  bannerEditando: Banner | null = null;
  nombreBusqueda: string = '';

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private bannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.empresaService.obtener().subscribe(data => {
      this.empresa = data;
      this.cargarBanners();
    });
  }

  cargarBanners() {
    this.bannerService.obtenerPorEmpresa(this.empresa.id!).subscribe(data => {
      this.banners = data;
    });
  }

  async crearBanner() {
    if (this.bannerNuevo.descripcion.trim() === "" || this.bannerNuevo.url.trim() === "") {
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

    const nuevoBanner: Banner = {
      ...this.bannerNuevo,
      empresa: this.empresa
    };

    this.bannerService.crear(nuevoBanner).subscribe(() => {
      this.bannerNuevo = { url: '', descripcion: '', estaBanner: 1, empresa: this.empresa };
      this.cargarBanners();
      Swal.fire({
        icon: 'success',
        title: 'Banner creado exitosamente',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    });
  }

  editarBanner(banner: Banner) {
    this.bannerEditando = { ...banner }; // clonamos para evitar modificar en vivo
  }

  cancelarEdicion() {
    this.bannerEditando = null;
  }

  guardarEdicion() {
    if (!this.bannerEditando) return;

    this.bannerService.actualizar(this.bannerEditando.secuencial!, this.bannerEditando).subscribe(() => {
      this.bannerEditando = null;
      this.cargarBanners();
      Swal.fire({
        icon: 'success',
        title: 'Banner actualizado',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    });
  }

  async eliminarBanner(id: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro de eliminar este banner?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      this.bannerService.eliminar(id).subscribe(() => {
        this.cargarBanners();
        Swal.fire({
          icon: 'success',
          title: 'Banner eliminado',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      });
    }
  }

  bannersPorPagina = 10;
  paginaActual = 1;

  get bannersPaginados() {
    const inicio = (this.paginaActual - 1) * this.bannersPorPagina;
    return this.banners.slice(inicio, inicio + this.bannersPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.banners.length / this.bannersPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  /*buscarMenus(): void {
    console.log("Buscando..")
    if (!this.nombreBusqueda.trim()) {
      this.cargarBanners(); // recarga todo si está vacío
      return;
    }

    this.menuService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (res) => this.menus = res,
      error: (err) => console.error('Error al buscar menus:', err)
    });
  }*/
}
