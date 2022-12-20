import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWTModuleOptions } from './interfaces/jwt-module-options.interface';

@Injectable()
export class JwtService {
    constructor(
        @Inject("CONFIG_OPTIONS") private readonly options: JWTModuleOptions,
    ) {}

    sign(payload): string {
        return jwt.sign(payload, this.options.privateKey);
    }
}
