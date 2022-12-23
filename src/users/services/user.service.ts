import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "../dto/create-user.dto";
import { LoginInput, LoginOutput } from "../dto/login-input.dto";
import { User } from "../entity/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "../dto/edit-profile.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}


    findAll(): Promise<User[]> {
        return this.users.find();
    }

    findById(id: number): Promise<User> {
        return this.users.findOneBy({id: id})
    }

    async createUser(createAccount: CreateAccountInput): Promise<string | undefined> {
        // if new user - 1) create user 2) hash password

        try {
            const exist = await this.users.findOneBy({ email: createAccount.email });
            if (exist) {
                return "User with this email already exist";
            }
            const user = this.users.create(createAccount);
            user.password = createAccount.password;
            await this.users.save(user);
        } catch (e) {
            return "Could n't create account";
        }
    }

    async login({email, password}: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOneBy({ email: email});
            if (user === null) {
                return { ok: false, error: "User with this email doesn't exist" };
            }
            const passwordCorrect = await user.checkPassword(password);
            
            if (passwordCorrect) {
                const token = this.jwtService.sign(user.id) ;
                return { ok: true, token }
            } else {
                return { ok: false, error: "wrong Password"};
            }
        } catch (e) {
            return { ok: false, error: e};
        }
        
        return {ok: true}
    }


    async editProfile(id: number, { email, password }: EditProfileInput) {
        return await this.users.update({ id }, { email, password})
    }
}