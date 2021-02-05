import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Precios,
  Proveedor,
} from '../models';
import {PreciosRepository} from '../repositories';

export class PreciosProveedorController {
  constructor(
    @repository(PreciosRepository)
    public preciosRepository: PreciosRepository,
  ) { }

  @get('/precios/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Precios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.number('id') id: typeof Precios.prototype.id_precio,
  ): Promise<Proveedor> {
    return this.preciosRepository.precios(id);
  }
}
