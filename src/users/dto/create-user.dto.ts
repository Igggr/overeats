import { InputType, OmitType } from "@nestjs/graphql";
import { User } from "../entity/user.entity";


@InputType()
export class CreateUserDTO extends OmitType(User, ['id'], InputType)
{}