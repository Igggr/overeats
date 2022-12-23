import { Field, InputType, IntersectionType, ObjectType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/mutation-output.dto";
import { User } from "../entity/user.entity";


@ObjectType()
export class EditProfileOutput extends CoreOutput {
   @Field(type => User, { nullable: true })
   user?: User;
}


@InputType()
export class EditProfileInput extends PartialType(PickType(User, ['email', 'password'], InputType), InputType){}