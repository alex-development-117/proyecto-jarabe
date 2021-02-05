import {Entity, model, property} from '@loopback/repository';

@model()
export class Productos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_producto?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  SKU: string;

  @property({
    type: 'boolean',
    required: true,
  })
  eliminado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fecha_incorporacion: string;

  @property({
    type: 'object',
    required: true,
  })
  imagen: object;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
