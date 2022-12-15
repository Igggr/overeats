import { ArgsType, InputType, Field, ObjectType } from "@nestjs/graphql";
import { Length, Max, Min } from "class-validator";


@InputType()
export class CreateRestaurant {
    @Field(type => String)
    name: string;

    @Field(type => String)
    rating: string
}


@ArgsType()
export class ReviewArgs {
    @Min(1)
    @Max(5)
    @Field(type => Number)
    rating: number;

    @Length(10, 20)
    @Field(type => String)
    review: string;
}