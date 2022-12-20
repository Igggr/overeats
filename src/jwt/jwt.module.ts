import { DynamicModule, Global, Module } from '@nestjs/common';
import { JWTModuleOptions } from './interfaces/jwt-module-options.interface';
import { JwtService } from './jwt.service';

@Module({})
//@Global() // не придется импортировать сервисы этого модуля
export class JwtModule {

    static forRoot(options: JWTModuleOptions): DynamicModule {
        return {
            module: JwtModule,
            exports: [JwtService],
            providers: [JwtService],
        }
    }
}
