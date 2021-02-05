import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {Proveedor} from './models';
import {Credentials} from './repositories/proveedor.repository';
import {PasswdHasher} from './services/hash.passwd.encrypt';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'jK%7@Agx';
  export const TOKEN_EXPIRES_IN_VALUE = '7h';
}

export namespace TokenServiceBindings {
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.jwt.service',
  );
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expiresIn',
  );
}

export namespace PasswdHasherBindings {
  export const PASSWD_HASHER = BindingKey.create<PasswdHasher>(
    'services.hasher',
  );

  export const ROUNDS = BindingKey.create<number>('service.hasher.rounds');
}

export namespace ProveedorServiceBindings {
  export const PROVEEDOR_SERVICE = BindingKey.create<
    UserService<Credentials, Proveedor>
  >('services.proveedor.service');
}

// export namespace PasswdHasherBindings{

//   export const PASSWD_HASHER = BindingKey.create<PasswdHasher>(
//     'services.hasher'
//   );

// }
