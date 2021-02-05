import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProductosComponent } from './components/productos/productos.component';
import { APP_ROUTING } from './app.routes';
import { ProductoComponent } from './components/producto/producto.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule } from '@angular/forms';

// Services
import { DataApiService } from './services/data-api.service';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import {ProveedorService } from './services/proveedor.service';
import { GraphicsService } from './services/graphics.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    InventarioComponent,
    ProveedoresComponent,
    ProductosComponent,
    ProductoComponent,
    AddProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [
    ProductsService,
    DataApiService,
    ProveedorService,
    GraphicsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
