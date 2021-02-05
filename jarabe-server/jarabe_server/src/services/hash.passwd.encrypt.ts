import {inject} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';
import {PasswdHasherBindings} from '../keys';

export interface PasswdHasher<T = string> {
  hashPasswd(passwd: T): Promise<T>;
  comparePasswd(providedPass: T, storedPass: T): Promise<boolean>;
}

export class CryptHasher implements PasswdHasher<string> {
  constructor(
    @inject(PasswdHasherBindings.ROUNDS)
    public readonly rounds: number,
  ) {}

  async comparePasswd(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordMatched = await compare(providedPass, storedPass);
    return passwordMatched;
  }

  async hashPasswd(passwd: string) {
    const salt = await genSalt(this.rounds);
    return await hash(passwd, salt);
  }
}
