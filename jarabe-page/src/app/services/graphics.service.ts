import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  constructor() { }
}

export class Graphics{


  constructor(private ctx: CanvasRenderingContext2D){
  }

  dibujarGrafica() {
    // Tamaño
    let tamanio=1;
    // Coordenadas de las lineas que forman la gráfica
    // Tamaño de las lineas

    let tamanioV=
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    //
    // Lineas que ejecutan las medidas
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawLine(iX: number, iY: number, fX: number, fY: number){
    this.ctx.moveTo(iX,iY);
    this.ctx.lineTo(fX,fY);
  }

  drawGraphic(){

  }

}
