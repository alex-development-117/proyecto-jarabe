import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
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
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {
  PasswdHasherBindings,
  ProveedorServiceBindings,
  TokenServiceBindings,
} from '../keys';
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';
import {Credentials} from '../repositories/proveedor.repository';
import {CryptHasher} from '../services/hash.passwd.encrypt';
import {JWTService} from '../services/jwt-service';
import {MyProveedorService} from '../services/proveedor.service';
import {validateCredentials} from '../services/validator';

export class ProveedorController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository: ProveedorRepository,
    @inject(PasswdHasherBindings.PASSWD_HASHER)
    public hasher: CryptHasher,
    @inject(ProveedorServiceBindings.PROVEEDOR_SERVICE)
    public userService: MyProveedorService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

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

  //CONTROLADORES PROPIOS

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
    //VALIDACIÓN DE CREDENCIALES
    validateCredentials(_.pick(proveedor, ['nombre_cuenta', 'passwd_cuenta']));
    //ENCRIPTACIÓN DE LAS CONTRASEÑAS
    proveedor.passwd_cuenta = await this.hasher.hashPasswd(
      proveedor.passwd_cuenta,
    );
    const savedProveedor = await this.proveedorRepository.create(proveedor);
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
  ): Promise<{token: string}> {
    //VERIFICAMOS LAS CREDENCIALES
    const proveedor = await this.userService.verifyCredentials(credentials);
    //DESPUES CONVERTIMOS LA INFORMACIÓN DEL USUARIO A UserProfile
    const userProfile = this.userService.convertToUserProfile(proveedor);
    //Generar jsonwebtoken
    const token = await this.jwtService.generateToken(userProfile);
    console.log('Ejecutado');
    return Promise.resolve({token});
  }

  @get('/proveedores/me')
  @authenticate('jwt')
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    console.log(currentUser);
    return Promise.resolve(currentUser);
  }

  //FIN DE CONTROLADORES PROPIOS

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
