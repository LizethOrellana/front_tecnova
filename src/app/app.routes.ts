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

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: '', component: HomeComponent },
    { path: 'productos', component: ListarProductosComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'crearProducto', component: CrearProductoComponent },
    { path: 'editarEmpresa', component: EditarEmpresaComponent },
    { path: 'editarBanner', component: EditarBannerComponent }

];
