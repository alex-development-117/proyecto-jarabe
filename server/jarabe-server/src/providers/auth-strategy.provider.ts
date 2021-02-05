import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {ProveedorRepository} from '../repositories/proveedor.repository';
import {AuthService} from '../services/auth.service';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(ProveedorRepository)
    proveedorRepository: ProveedorRepository,
  ) {
    this.authService = new AuthService(proveedorRepository);
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verifyProveedor.bind(this));
    } else if (name === 'TokenStrategy') {
      return new BearerStrategy(this.verifyToken.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verifyProveedor(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    let proveedor = this.authService.identify(username, password);
    return cb(null, proveedor);
  }

  verifyToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.verifyToken(token).then(verification => {
      if (verification) {
        return cb(null, verification);
      }
      return cb(null, false);
    });
  }
}
