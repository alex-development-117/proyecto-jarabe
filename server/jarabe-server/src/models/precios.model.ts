import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';

@model()
export class Precios extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_precio?: number;

  @property({
    type: 'string',
    required: true,
  })
  precio: string;

  @property({
    type: 'number',
    required: true,
  })
  producto_id: number;
  @property({
    type: 'string',
    required: true,
  })
  numero_stock: string;

  @belongsTo(() => Proveedor, {name: 'precios'})
  proveedor_id: number;

  constructor(data?: Partial<Precios>) {
    super(data);
  }
}

export interface PreciosRelations {
  // describe navigational properties here
}

export type PreciosWithRelations = Precios & PreciosRelations;
