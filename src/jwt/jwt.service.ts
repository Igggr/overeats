import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/users/services/user.service';
import { JWTModuleOptions } from './interfaces/jwt-module-options.interface';

@Injectable()
export class JwtService {
    constructor(
        @Inject("CONFIG_OPTIONS") private readonly options: JWTModuleOptions,
        // @Inject(UserService) private readonly userService: UserService,
    ) {}

    sign(userId: number): string {
        return jwt.sign({id: userId}, this.options.privateKey);
    }

    verify(token: string): string {
        // не используй decode - он не проверяет кем подписан токен
        const payload = jwt.verify(token, this.options.privateKey);
        const id = payload['id'] as string;
        console.log(id);
        return id
    }
}
