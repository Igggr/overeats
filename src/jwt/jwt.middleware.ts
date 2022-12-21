import { NestMiddleware } from "@nestjs/common";


export class JWTMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next) {
        console.log(req.headers);
        next();
    }
}


export function jwtMiddleware (req: Request, res: Response, next) {
    console.log(req.headers);
    next();
}
