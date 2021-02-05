import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {PasswdHasherBindings} from '../keys';
import {Proveedor} from '../models';
import {Credentials} from '../repositories';
import {ProveedorRepository} from '../repositories/proveedor.repository';
import {CryptHasher} from './hash.passwd.encrypt';

export class MyProveedorService implements UserService<Proveedor, Credentials> {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository: ProveedorRepository,
    @inject(PasswdHasherBindings.PASSWD_HASHER)
    public hasher: CryptHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Proveedor> {
    const foundProveedor = await this.proveedorRepository.findOne({
      where: {
        nombre_cuenta: credentials.nombre_cuenta,
      },
    });
    if (!foundProveedor) {
      throw new HttpErrors.NotFound(
        `El nombre de cuenta "${credentials.nombre_cuenta}" no ha sido encontrado.`,
      );
    }
    const passwordMatched = await compare(
      credentials.passwd_cuenta,
      foundProveedor.passwd_cuenta,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(`La contraseña es incorrecta`);
    }

    return foundProveedor;
  }
  convertToUserProfile(proveedor: Proveedor): UserProfile {
    const userName = proveedor.nombre_cuenta;
    return {
      [securityId]: `${proveedor.id_proveedor}`,
      name: userName,
      id: proveedor.id_proveedor,
    };
  }
}
