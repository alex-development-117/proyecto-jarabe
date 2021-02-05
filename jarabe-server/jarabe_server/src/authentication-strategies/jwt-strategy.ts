import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {TokenServiceBindings} from '../keys';
import {JWTService} from '../services/jwt-service';

export class JWTStrategy implements AuthenticationStrategy {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  name: string = 'jwt';
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = await this.extractCredentials(request);
    console.log(token);
    const userProfile = await this.jwtService.verifyToken(token);
    return Promise.resolve(userProfile);
  }

  async extractCredentials(request: Request): Promise<string> {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized('Authorization header is missing');
    }
    const authHeaderValue = request.headers.authorization;
    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not type of Bearer`,
      );
    }
    const parts = authHeaderValue.split(' ');
    const token = parts[1];
    return Promise.resolve(token);
  }
}
