import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "../entity/user.entity";


@InputType()
export class CreateAccountInput extends OmitType(User, ['id', 'createdAt', 'updatedAt', 'verified'], InputType)
{}

@ObjectType()
export class CreateAccountOutput {
    @Field(type => String, {nullable: true})
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}


@ObjectType()
export class UserObjectType extends OmitType(User, [], ObjectType)
{}
