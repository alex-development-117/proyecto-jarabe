import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService, Producto } from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  date = new Date();
  producto: Producto = {
    nombre_producto: "",
    descripcion_producto: "",
    eliminado: false,
    fecha_incorporacion: null,
    SKU:    "",
    imagen: null
  }

  constructor(private _productService: ProductsService) { }

  ngOnInit(): void {
  }

  upload(ngForm: NgForm){
    this.producto.fecha_incorporacion=this.date;
    console.log(this.producto);
    this._productService.postProducto(this.producto).subscribe(
      datos => console.log(datos)
    );
  }

  seleccionarArchivo(event){
    var files = event.target.files;
    this.producto.imagen = files[0];
  }

}
