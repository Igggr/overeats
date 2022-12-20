import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entity/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserResolver, UserService, JwtService]
})
export class UsersModule {}
