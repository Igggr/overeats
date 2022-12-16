import { InputType, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { User } from "../entity/user.entity";


@InputType()
export class UpdateUserDTO extends IntersectionType(
   PartialType(OmitType(User, ['id'], InputType), InputType),
   PickType(User, ['id'], InputType),
){}