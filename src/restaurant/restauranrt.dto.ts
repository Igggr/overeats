import { ArgsType, InputType, Field, ObjectType } from "@nestjs/graphql";
import { Length, Max, Min } from "class-validator";

@ObjectType()
export class Restaurant {
    @Field(type => String)
    name: string;

    @Field(type => String)
    style: string;
}

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