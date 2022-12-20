import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    constructor(private readonly configService: ConfigService) {}

    sign(payload): string {
        return jwt.sign(payload, this.configService.get("TOKEN_SECRET"));
    }
}
