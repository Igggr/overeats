import { Field, GraphQLWsSubscriptionsConfig, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entity/core.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type UserRole = "client" | "owner" | "delivery";


@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Field(type => String)
    @Column()
    email: string;

    @Field(type => String)
    @Column()
    password: string;

    @Field(type => String)
    @Column()
    role: UserRole;
}
