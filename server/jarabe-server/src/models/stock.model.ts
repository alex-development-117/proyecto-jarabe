import {Entity, model, property} from '@loopback/repository';

@model()
export class Stock extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_stock?: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_id: number;

  @property({
    type: 'string',
    required: true,
  })
  cantidad: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_incorporacion: string;


  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;
