import { ArgsType, InputType, Field, OmitType } from "@nestjs/graphql";
import { Length, Max, Min } from "class-validator";
import { Restaurant } from "./entity/restaurant.entity";


@InputType()
export class CreateRestaurant extends OmitType (
    Restaurant,
    ['id'],
    InputType,  // в результате дожен получиться InputType
    ) 
{};


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