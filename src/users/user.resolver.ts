import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput, UserObjectType } from "./dto/create-user.dto";
import { LoginInput, LoginOutput } from "./dto/login-input.dto";
import { User } from "./entity/user.entity";
import { UserService } from "./services/user.service";


@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => [UserObjectType])
    getAllUsers(): Promise<UserObjectType[]> {
        return this.userService.findAll()
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        const error = await this.userService.createUser(createAccountInput)
        if (error) {
            return { error, ok: false};
        } else {
            return { ok : true};
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('login') login: LoginInput): Promise<LoginOutput> {
        console.log(login);
        try {
            return this.userService.login(login);
        } catch (error) {
            return {ok: false, error};
        }
    }

    @Query(returns => User)
    async me(): Promise<UserObjectType> {
        return (await this.userService.findAll())[1];
    }
  
}