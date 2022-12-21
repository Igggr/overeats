import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlArgumentsHost, GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        console.log(context);
        const gqlContext =  GqlExecutionContext.create(context).getContext();
        const user = gqlContext['user'];
        console.log(user);
        if (!user) {
            return false;
        }
        return true;
    }
}