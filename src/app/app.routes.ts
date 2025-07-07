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

export const routes: Routes = [
    { path: 'sobrenosotros', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'productos', component: ListarProductosComponent },
    { path: '', component: CatalogoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'crearProducto', component: CrearProductoComponent },
    { path: 'editarEmpresa', component: EditarEmpresaComponent },
    { path: 'editarBanner', component: EditarBannerComponent },
    { path: 'crearProducto', component: CrearProductoComponent },
    { path: 'crearMarca', component: CrearMarcaComponent },
    { path: 'crearCategoria', component: CrearCategoriaComponent },
    { path: 'crearUsuario', component: CrearUsuarioComponent },
    { path: 'lista-marcas', component: ListaMarcasComponent },
    { path: 'lista-categorias', component: ListaCategoriasComponent },
    { path: 'lista-usuarios', component: ListarUsuariosComponent },
    { path: 'menus', component: MenusComponent },
    { path: 'actualizarFooter', component: ActualizarFooterComponent },
    { path: 'contactos', component: Contactos },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'historial', component: HistorialCarritoComponent }


];
