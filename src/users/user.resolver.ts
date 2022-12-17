import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput, UserObjectType } from "./dto/create-user.dto";
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
}