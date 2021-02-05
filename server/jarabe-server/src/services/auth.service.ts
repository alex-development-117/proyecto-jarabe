import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Proveedor} from '../models/proveedor.model';
import {ProveedorRepository} from '../repositories/proveedor.repository';
import {EncryptDecrypct} from './encrypt-decrypt.service';
const jwt = require('jsonwebtoken');

export class AuthService {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository: ProveedorRepository,
  ) {}

  async identify(username: string, passwd: string): Promise<Proveedor | false> {
    let proveedor = await this.proveedorRepository.findOne({
      where: {nombre_cuenta: username},
    });
    if (proveedor) {
      let cryptPass = new EncryptDecrypct(keys.LOGIN_CRYPT_METHOD).encrypt(
        passwd,
      );
      if (proveedor.passwd_cuenta == cryptPass) {
        return proveedor;
      }
    }
    return false;
  }

  async generateToken(proveedor: Proveedor): Promise<string> {
    proveedor.passwd_cuenta = '';
    let token = jwt.sign(
      {
        exp: keys.TOKEN_EXPIRATION_TIME,
        data: {
          _id: proveedor.id_proveedor,
          username: proveedor.nombre_cuenta,
          role: proveedor.rol,
        },
      },
      keys.JWT_SECRET_KEY,
    );
    return token;
  }

  async verifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY);
      return data;
    } catch (error) {
      return false;
    }
  }
}
