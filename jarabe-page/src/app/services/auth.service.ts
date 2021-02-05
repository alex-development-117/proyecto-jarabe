import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) {}

  httpHeaders: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registrarProveedor(nombre_cuenta: String,  estado: String, telefono: string, RFC: string){
    const url_api = "http://localhost:3000/proveedores";
    let date = new Date();
    return this.http.post(url_api, {
      nombre_cuenta: nombre_cuenta,
      fecha_registro: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      estado: estado,
      telefono: telefono,
      RFC: RFC
    }, {headers: this.httpHeaders}).pipe(map(data => data));

  }

  // loginUser(nombre_cuenta: string): Observable<any>{
  //   const url_api = "http://localhost:3000/proveedores";
  //   // return this.http.post(url_api);
  // }

  setToken(){

  }

  getToken(){
    return "token"
  }

}
