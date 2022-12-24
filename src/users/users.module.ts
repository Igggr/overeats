import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entity/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from 'src/jwt/jwt.module';
import { Verification } from './entity/verification.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Verification]),
    ],
    providers: [UserResolver, UserService,], // JwtService] // <- нельзя. Конаиги просрутся
    exports: [UserService],
})
export class UsersModule {}
