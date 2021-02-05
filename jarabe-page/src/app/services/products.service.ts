import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly base_url='http://localhost:3000';

  constructor(private httpClient: HttpClient) {
    console.log('Funcionando');
  }

  postProducto(producto: Producto){
    const post_product_url='/productos';
    return this.httpClient.post(this.base_url+post_product_url, producto);
  }

}

export interface Producto {
  nombre_producto: string,
  descripcion_producto: string,
  eliminado: boolean;
  fecha_incorporacion: Date,
  SKU:    string,
  imagen: Blob
}
