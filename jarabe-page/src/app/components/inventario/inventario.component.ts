import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private info: GraphicData = {
    verticalData: [100, 300, 400, 217, 220, 221, 200, 205],
    horizontalData: [1, 2, 4, 7, 8, 8.5, 9, 9.1],
  };

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawGraphic(0, 10, 0, 1000, this.info);
  }

  drawLine(iX: number, iY: number, fX: number, fY: number, color: string) {
    this.ctx.beginPath();
    this.ctx.strokeStyle=color;
    this.ctx.moveTo(iX, iY);
    this.ctx.lineTo(fX, fY);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawPoint(x0: number, y0: number){
    this.ctx.beginPath();
    this.ctx.fillRect(x0 - 2, y0 - 2, 4, 4);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  getPoints(info: GraphicData, lH: number, lV: number, maxHValue: number, maxVValue: number): cooGraph{
    let coo: cooGraph = new cooGraph();
    let lenghtPerPixelH = lH/maxHValue;
    let lenghtPerPixelV = lV/maxVValue;
    for(let i=0 ; i<info.horizontalData.length ; i++){
      coo.cooX.push(lenghtPerPixelH*Number(info.horizontalData[i]));
      coo.cooY.push(lenghtPerPixelV*Number(info.verticalData[i]));
    }
    return coo;
  }

  drawInfoLines(x0: number, y0: number, lH: number, lV: number, maxHValue: number, maxVValue: number, info: GraphicData) {
    let coo: cooGraph = this.getPoints(info, lH, lV, maxHValue, maxVValue);
    for(var i=0 ; i<coo.cooX.length ; i++){
      this.drawPoint(x0 - coo.cooX[i],y0 - coo.cooY[i]);
      if(i<coo.cooX.length - 1){
        if(i==0){
          this.drawLine(x0, y0,x0 - coo.cooX[i],y0 - coo.cooY[i], '#3B9BEE');
          this.drawLine(x0 - coo.cooX[i],y0 - coo.cooY[i],x0 - coo.cooX[i+1],y0 - coo.cooY[i+1], '#3B9BEE')
        }else{
          this.drawLine(x0 - coo.cooX[i],y0 - coo.cooY[i],x0 - coo.cooX[i+1],y0 - coo.cooY[i+1], '#3B9BEE')
        }
      }
    }
  }

  drawBasicLines(
    iXV: number,
    iYV: number,
    fXV: number,
    fYV: number,
    iXH: number,
    iYH: number,
    fXH: number,
    fYH: number,
    divisiones: number,
    lH: number,
    lV: number,
    tamanio: number,
    minHValue: number,
    maxHValue: number,
    minVValue: number,
    maxVValue: number
  ) {
    // Lineas que ejecutan el ancho y largo de la gráfica
    this.drawLine(iXV, iYV, fXV, fYV, "black");
    for (var i = 0; i < divisiones; i++) {
      this.drawLine(fXV - 5, iYV + lV * i * 0.1, fXV + 5, iYV + lV * i * 0.1, "black");
      this.ctx.fillText(
        `${maxVValue - maxVValue * i * 0.1 + minVValue}`,
        fXV - 30,
        iYV + lV * i * 0.1 + 5 * tamanio
      );
    }
    this.drawLine(iXH, iYH, fXH, fYH, "black");
    for (var i = 0; i < divisiones; i++) {
      this.drawLine(fXH + lH * i * 0.1, iYH - 5, fXH + lH * i * 0.1, iYH + 5, "black");
      this.ctx.fillText(
        `${maxHValue - maxHValue * i * 0.1 + minHValue}`,
        fXH + lH * i * 0.1 - 10 * tamanio,
        iYH + 15
      );
    }
    this.ctx.fillText(
      'Inventario',
      iXV - 12 * tamanio,
      fYV - lV - 10 * tamanio
    );
    this.ctx.fillText('Ultimas entradas', fXH + 6 * tamanio, fYH + 2 * tamanio);
  }

  drawGraphic(
    minHValue: number,
    maxHValue: number,
    minVValue: number,
    maxVValue: number,
    info: GraphicData
  ) {
    //
    let divisiones = 10;
    let tamanio = 1.2;
    let iXV = 100,
      iYV = 100,
      fXV = 100,
      fYV = 250 * tamanio,
      iXH = 100,
      iYH = 250 * tamanio,
      fXH = 320 * tamanio,
      fYH = 250 * tamanio;
    let lH = iXH - fXH;
    let lV = fYV - iYV;
    this.drawBasicLines(
      iXV,
      iYV,
      fXV,
      fYV,
      iXH,
      iYH,
      fXH,
      fYH,
      divisiones,
      lH,
      lV,
      tamanio,
      minHValue,
      maxHValue,
      minVValue,
      maxVValue
    );
    this.drawInfoLines(iXH, iYH, lH, lV, maxHValue, maxVValue, info);
  }

}

export interface GraphicData {
  verticalData: number[];
  horizontalData: number[];
}

export class cooGraph{
  cooX: number[] = [];
  cooY: number[] = [];
}
