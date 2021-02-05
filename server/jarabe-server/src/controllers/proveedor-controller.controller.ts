import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';
import {Credentials} from '../repositories/proveedor.repository';
import {AuthService} from '../services/auth.service';
import {EncryptDecrypct} from '../services/encrypt-decrypt.service';

export class ProveedorControllerController {
  authService: AuthService;
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository: ProveedorRepository,
  ) {
    this.authService = new AuthService(this.proveedorRepository);
  }

  @post('/proveedores/signup', {
    responses: {
      '200': {
        description: 'proveedor',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'nuevoProveedor',
            exclude: ['id_proveedor'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'id_proveedor'>,
  ): Promise<Proveedor> {
    // //VALIDACIÓN DE CREDENCIALES
    // validateCredentials(_.pick(proveedor, ['nombre_cuenta', 'passwd_cuenta']));
    // //ENCRIPTACIÓN DE LAS CONTRASEÑAS
    proveedor.passwd_cuenta = new EncryptDecrypct(
      keys.LOGIN_CRYPT_METHOD,
    ).encrypt(proveedor.passwd_cuenta);
    let savedProveedor = await this.proveedorRepository.create(proveedor);
    savedProveedor.passwd_cuenta = '';
    return savedProveedor;
  }

  @post('/proveedores/login', {
    responses: {
      '200': {
        description: 'Login proveedor',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'Proveedor',
                },
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'Los parametros del login',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['nombre_cuenta', 'passwd_cuenta'],
            properties: {
              nombre_cuenta: {
                type: 'string',
                example: 'Roberto Alameda',
              },
              passwd_cuenta: {
                type: 'string',
                minLength: 8,
              },
            },
          },
        },
      },
    })
    credentials: Credentials,
  ): Promise<{data: Proveedor; token: string}> {
    console.log('Hola');
    let proveedor = await this.authService.identify(
      credentials.nombre_cuenta,
      credentials.passwd_cuenta,
    );
    console.log('Hola');
    if (proveedor) {
      let token = await this.authService.generateToken(proveedor);
      console.log({data: proveedor, token: token});
      return {data: proveedor, token: token};
    } else {
      throw new HttpErrors[401]('User or password invalid');
    }
  }

  @post('/proveedores', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedor',
            exclude: ['id_proveedor'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'id_proveedor'>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.create(proveedor);
  }

  @get('/proveedores/count', {
    responses: {
      '200': {
        description: 'Proveedor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.count(where);
  }

  @authenticate('TokenStrategy')
  @get('/proveedores', {
    responses: {
      '200': {
        description: 'Array of Proveedor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Proveedor, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Proveedor) filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.proveedorRepository.find(filter);
  }

  @patch('/proveedores', {
    responses: {
      '200': {
        description: 'Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.updateAll(proveedor, where);
  }

  @get('/proveedores/{id}', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proveedor, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Proveedor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Proveedor>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.findById(id, filter);
  }

  @patch('/proveedores/{id}', {
    responses: {
      '204': {
        description: 'Proveedor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.updateById(id, proveedor);
  }

  @put('/proveedores/{id}', {
    responses: {
      '204': {
        description: 'Proveedor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.replaceById(id, proveedor);
  }

  @del('/proveedores/{id}', {
    responses: {
      '204': {
        description: 'Proveedor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proveedorRepository.deleteById(id);
  }
}
