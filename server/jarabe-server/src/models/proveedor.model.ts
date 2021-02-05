import {Entity, hasMany, model, property} from '@loopback/repository';
import {Precios} from './precios.model';

@model()
export class Proveedor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_proveedor?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_cuenta: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_registro: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  RFC: string;

  @property({
    type: 'string',
    required: true,
  })
  passwd_cuenta: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @hasMany(() => Precios, {keyTo: 'proveedor_id'})
  precios: Precios[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
