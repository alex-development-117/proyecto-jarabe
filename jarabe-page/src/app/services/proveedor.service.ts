import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ProveedorService{

  proveedores: Proveedor[] = [];
  proveedor: Proveedor;

  httpHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjU4MDM3NjU1OTYwMDAsImRhdGEiOnsiX2lkIjoxOCwidXNlcm5hbWUiOiJBUUYiLCJyb2xlIjoicHJvdmVlZG9yIn0sImlhdCI6MTYxMjIzMDkzNn0.atPKDRFdtF3hzq0QZWUmYd2_eLqaRV5zYuLQ2QywCiE'
  });

  private readonly url_api_proveedores: string = 'http://127.0.0.1:3000/proveedores/signup';
  private readonly url_api_proveedores_get: string = 'http://127.0.0.1:3000/proveedores';
  private readonly url_api_proveedores_login: string = 'http://127.0.0.1:3000/proveedores/login';



  constructor(private http: HttpClient){
    console.log(`Servicio de proveedores listo para usar`);
  }

  getProveedores() {
    return this.http.get(this.url_api_proveedores_get, {headers: this.httpHeader});
  }

  getProveedor(id: string) {
    return this.http.get(this.url_api_proveedores + `/${id}`, {headers: this.httpHeader});
  }

  postProveedor(proveedor: Proveedor) {
    return this.http.post(this.url_api_proveedores, proveedor, {
      headers: this.httpHeader,
    });
  }

  updateProveedor(proveedor: Proveedor, id: string) {
    return this.http.put(this.url_api_proveedores + `/${id}`, proveedor);
  }

  deleteProveedor(id: string) {
    return this.http.delete(this.url_api_proveedores + `/${id}`);
  }

  loginProveedor(credentials: Credentials){
    return this.http.post(this.url_api_proveedores_login, credentials, {headers: this.httpHeader}).subscribe(res => console.log(res));
  }

  getTokenProveedor(){
    localStorage.setItem('token', 'js');
  }

}

export interface Credentials{

  nombre_cuenta:  string,
  passwd_cuenta:  string,

}

export interface Proveedor {
  nombre_cuenta: string;
  fecha_registro: Date;
  estado: string;
  telefono: string;
  RFC: string;
  passwd_cuenta: string;
  rol: string;
}
