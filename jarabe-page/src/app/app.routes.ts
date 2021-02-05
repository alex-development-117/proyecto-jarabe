import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProductsService } from './services/products.service';
import { ProductoComponent } from './components/producto/producto.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';


export const APP_ROUTES: Routes = [
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'inventario', component: InventarioComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'añadir-producto', component: AddProductComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'proveedores'},
  {path: '', pathMatch: 'full', redirectTo: 'proveedores'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
