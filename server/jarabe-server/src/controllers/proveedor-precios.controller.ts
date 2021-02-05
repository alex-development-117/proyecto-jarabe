import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedor,
  Precios,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorPreciosController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/precios', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Precios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Precios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Precios>,
  ): Promise<Precios[]> {
    return this.proveedorRepository.precios(id).find(filter);
  }

  @post('/proveedors/{id}/precios', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Precios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proveedor.prototype.id_proveedor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Precios, {
            title: 'NewPreciosInProveedor',
            exclude: ['id_precio'],
            optional: ['proveedor_id']
          }),
        },
      },
    }) precios: Omit<Precios, 'id_precio'>,
  ): Promise<Precios> {
    return this.proveedorRepository.precios(id).create(precios);
  }

  @patch('/proveedors/{id}/precios', {
    responses: {
      '200': {
        description: 'Proveedor.Precios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Precios, {partial: true}),
        },
      },
    })
    precios: Partial<Precios>,
    @param.query.object('where', getWhereSchemaFor(Precios)) where?: Where<Precios>,
  ): Promise<Count> {
    return this.proveedorRepository.precios(id).patch(precios, where);
  }

  @del('/proveedors/{id}/precios', {
    responses: {
      '200': {
        description: 'Proveedor.Precios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Precios)) where?: Where<Precios>,
  ): Promise<Count> {
    return this.proveedorRepository.precios(id).delete(where);
  }
}
