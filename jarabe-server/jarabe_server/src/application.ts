import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {JWTStrategy} from './authentication-strategies/jwt-strategy';
import {
  PasswdHasherBindings,
  ProveedorServiceBindings,
  TokenServiceBindings,
  TokenServiceConstants,
} from './keys';
import {MySequence} from './sequence';
import {CryptHasher} from './services/hash.passwd.encrypt';
import {JWTService} from './services/jwt-service';
import {MyProveedorService} from './services/proveedor.service';

export {ApplicationConfig};

export class JarabeServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // set up bindings
    this.setUpBinding();
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTStrategy);
    // Set up the custom sequence
    this.sequence(MySequence);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBinding(): void {
    this.bind(PasswdHasherBindings.PASSWD_HASHER).toClass(CryptHasher);
    this.bind(PasswdHasherBindings.ROUNDS).to(10);
    this.bind(ProveedorServiceBindings.PROVEEDOR_SERVICE).toClass(
      MyProveedorService,
    );
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );
  }
}
