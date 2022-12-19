import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/mutation-output.dto";


@InputType()
export class LoginInput {
    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;
}


@ObjectType()
export class LoginOutput extends MutationOutput {

    @Field(type => String, {nullable: true})
    token?: string;
}