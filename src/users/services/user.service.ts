import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "../dto/create-user.dto";
import { User } from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) {}


    findAll(): Promise<User[]> {
        return this.users.find();
    }

    createUser(createAccount: CreateAccountInput) {
        const user = this.users.create(createAccount);
        this.users.save(user);
    }

}