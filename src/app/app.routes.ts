import { Routes } from '@angular/router';
import { HomeComponent } from '../paginas/home/home.component';
import { ListarProductosComponent } from '../paginas/listar-productos/listar-productos.component';
import { HeaderComponent } from '../paginas/header/header.component';
import { FooterComponent } from '../paginas/footer/footer.component';
import { LoginComponent } from '../paginas/login/login.component';
import { CrearProductoComponent } from '../paginas/crear-producto/crear-producto.component';
import { CatalogoComponent } from '../paginas/catalogo/catalogo.component';
import { EditarEmpresaComponent } from '../paginas/editar-empresa/editar-empresa.component';
import { EditarBannerComponent } from '../paginas/editar-banner/editar-banner.component';
import { CrearMarcaComponent } from '../paginas/crear-marca/crear-marca.component';
import { ListaMarcasComponent } from '../paginas/lista-marcas/lista-marcas.component';
import { ListaCategoriasComponent } from '../paginas/lista-categorias/lista-categorias.component';
import { CrearCategoriaComponent } from '../paginas/crear-categoria/crear-categoria.component';
import { ListarUsuariosComponent } from '../paginas/listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from '../paginas/crear-usuario/crear-usuario.component';
import { MenusComponent } from '../paginas/menus/menus.component';
import { ActualizarFooterComponent } from '../paginas/actualizar-footer/actualizar-footer.component';
import { Contactos } from '../paginas/contactos/contactos.component';
import { CheckoutComponent } from '../paginas/checkout/checkout.component';
import { HistorialCarritoComponent } from '../paginas/historial-carrito/historial-carrito.component';
import { CrearPagoComponent } from '../paginas/crear-pago/crear-pago.component';
import { ListaComprasComponent } from '../paginas/lista-compras/lista-compras.component';
import { RegistrarseComponent } from '../paginas/registrarse/registrarse.component';
import { PerfilComponent } from '../paginas/perfil/perfil.component';
import { ActualizarContraseniaComponent } from '../paginas/actualizar-contrasenia/actualizar-contrasenia.component';
import { authGuard } from './guards/auth.guard'; // asegúrate que ruta correcta

export const routes: Routes = [

    // Nivel 2 (usuarios) + nivel 1 (admin)
    { path: 'perfil', component: PerfilComponent, canActivate: [authGuard], data: { niveles: [2, 1] } },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], data: { niveles: [2, 1] } },
    { path: 'crearPago', component: CrearPagoComponent, canActivate: [authGuard], data: { niveles: [2, 1] } },

    // Nivel 1 (admin) solo
    { path: 'productos', component: ListarProductosComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'crearProducto', component: CrearProductoComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'editarEmpresa', component: EditarEmpresaComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'editarBanner', component: EditarBannerComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'crearMarca', component: CrearMarcaComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'crearCategoria', component: CrearCategoriaComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'crearUsuario', component: CrearUsuarioComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'lista-marcas', component: ListaMarcasComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'lista-categorias', component: ListaCategoriasComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'lista-usuarios', component: ListarUsuariosComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'menus', component: MenusComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'actualizarFooter', component: ActualizarFooterComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'historial', component: HistorialCarritoComponent, canActivate: [authGuard], data: { niveles: [1, 2] } },
    { path: 'lista-pagos', component: ListaComprasComponent, canActivate: [authGuard], data: { niveles: [1] } },
    { path: 'actualizarContrasenia', component: ActualizarContraseniaComponent, canActivate: [authGuard], data: { niveles: [1] } },

    // Rutas públicas sin protección
    { path: 'login', component: LoginComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'sobrenosotros', component: HomeComponent }, // todos pueden
    { path: 'contactos', component: Contactos },
    { path: '', component: CatalogoComponent },
];
