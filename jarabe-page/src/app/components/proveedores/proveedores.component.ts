import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService} from '../../services/data-api.service';
import { ProveedorService, Proveedor } from '../../services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: [
    './proveedores.component.css'
  ]
})
export class ProveedoresComponent implements OnInit {

  proveedores: Proveedor[] = [];
  date = new Date();
  proveedor: Proveedor = {
      nombre_cuenta: "",
      fecha_registro:this.date,
      estado: "",
      telefono: "",
      RFC: "",
      passwd_cuenta: "",
      rol: ""
  }

  constructor(private _serviceDataAPI: ProveedorService) {

  }

  onSubmit(form: NgForm){
    this.proveedor.fecha_registro=this.date;
    this.proveedor.rol='proveedor';
    this._serviceDataAPI.postProveedor(this.proveedor).subscribe(res => {
      console.log(res);
    });

  }

  ngOnInit(): void {
    this.getAllProveedores();
  }

  getAllProveedores(){
    this._serviceDataAPI.getProveedores().subscribe(proveedor => this.getProveedores(proveedor));
  }

  getProveedores(proveedor){
    this.proveedores = proveedor;
    console.log(this.proveedores);
  }

}
