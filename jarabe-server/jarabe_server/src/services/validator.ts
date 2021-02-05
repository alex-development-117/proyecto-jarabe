import {HttpErrors} from '@loopback/rest';
import {Credentials} from '../repositories/proveedor.repository';

export function validateCredentials(credentials: Credentials) {
  if (credentials.nombre_cuenta.split(' ').length <= 1) {
  }

  if (credentials.passwd_cuenta.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'Tu password debe de tener más de 8 caracteres',
    );
  }
}
