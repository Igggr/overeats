import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "src/users/services/user.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JWTMiddleware implements NestMiddleware {
    constructor(
        // @Inject(JwtService)
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        ) {}

    async use(req: Request, res: Response, next) {
        // console.log(req.headers);
        if ('x-jwt' in req.headers) {
            const token: string = req.headers["x-jwt"] as string;
            // console.log(token);
            try {
                const id = this.jwtService.verify(token);
                const user = await this.userService.findById(+id);
                // console.log(user);
                req['user'] = user;
            } catch (e) {

            }
        }
        next();
    }
}


// export function jwtMiddleware (req: Request, res: Response, next) {
//     console.log(req.headers);
//     next();
// }
