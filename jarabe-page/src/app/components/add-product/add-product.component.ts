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
  file: File;
  producto: Producto = {
    nombre_producto: "",
    descripcion_producto: "",
    eliminado: false,
    fecha_incorporacion: null,
    SKU:    "",
    imagen: ""
  }

  constructor(private _productService: ProductsService) { }

  ngOnInit(): void {
  }

  upload(ngForm: NgForm){
    this.producto.fecha_incorporacion=this.date;
    const formData = new FormData();
    formData.append('file', this.file);
    this._productService.postImageProductos(formData).subscribe(res => this.getFileName(res.filename)
    );
  }

  seleccionarArchivo(event){
    var files = event.target.files;
    this.file = <File>files[0];
  }

  getFileName(filename: string){
    this.producto.imagen = filename;
    this._productService.postProducto(this.producto).subscribe(res => res);
    console.log(this.producto);
  }

}
