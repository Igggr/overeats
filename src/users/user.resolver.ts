import { Resolver, Query } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./services/user.service";


@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    getAllUsers(): Promise<User[]> {
        return this.userService.findAll()
    }
}