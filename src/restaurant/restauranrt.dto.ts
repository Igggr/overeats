import { ArgsType, InputType, Field, ObjectType } from "@nestjs/graphql";
import exp from "constants";

@ObjectType()
export class Restaurant {
    @Field(type => String)
    name: string;

    @Field(type => String)
    style: string;
}

@InputType()
export class CreateRestaurant {
    @Field()
    name: string;

    @Field()
    rating: string
}