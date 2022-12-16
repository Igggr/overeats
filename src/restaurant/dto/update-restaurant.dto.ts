import { InputType, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { string } from "joi";
import { Restaurant } from "../entity/restaurant.entity";

@InputType()
export class UpdateRestaurantDTO extends IntersectionType(
    PartialType(OmitType(Restaurant, ['id'], InputType), InputType),
    PickType(Restaurant, ['id'], InputType)
)
{}