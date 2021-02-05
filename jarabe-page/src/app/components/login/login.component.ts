import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Credentials, ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential: Credentials ={
    nombre_cuenta: '',
    passwd_cuenta: '',
  };

  constructor(private _proveedorService: ProveedorService) { }

  ngOnInit(): void {
  }

  sendDataLoginProveedor(form: NgForm){

    if(this.credential.nombre_cuenta===''){
      throw new Error('Rellena el campo de usuario');
    }
    if(this.credential.passwd_cuenta===''){
      throw new Error('Rellena el campo de contraseña');
    }

    this._proveedorService.loginProveedor(this.credential);
  }

}
