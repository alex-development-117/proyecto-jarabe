import { Component, OnInit } from '@angular/core';
import { ProductsService, Producto } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [
    './productos.component.css'
  ]
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = []

  constructor(private _productsService: ProductsService) {

  }

  ngOnInit(): void {
    // this.productos = this._productsService.getProductos(); Cambiar
  }

}
