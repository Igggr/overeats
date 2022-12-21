import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/mutation-output.dto";


@InputType()
export class LoginInput {
    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;
}


@ObjectType()
export class LoginOutput extends CoreOutput {

    @Field(type => String, {nullable: true})
    token?: string;
}