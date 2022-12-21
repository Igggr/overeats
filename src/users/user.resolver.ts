import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutput, UserObjectType } from "./dto/create-user.dto";
import { LoginInput, LoginOutput } from "./dto/login-input.dto";
import { UserProfileInput, UserProfileOutput } from "./dto/user-profile.dto";
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

    @Query(returns => UserObjectType)
    @UseGuards(AuthGuard)
    me(
        @AuthUser() authUser: User,
    ): User {
        console.log("context:");
        console.log(authUser);
        return authUser;
    }


    @Query(returns => UserProfileOutput)
    @UseGuards(AuthGuard)
    async userProfile(@Args() userProfile: UserProfileInput): Promise<UserProfileOutput> {
        try {
            const user = await this.userService.findById(userProfile.id);
            if (!user) {
                return { ok: false, error: "User not found"}
            }
            return { ok: true, user: user }
        }
        catch (e) {
            return { ok: false, error: e}
        }

    }
  
}