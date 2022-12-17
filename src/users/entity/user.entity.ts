import { Field, GraphQLWsSubscriptionsConfig, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entity/core.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
    Client,
    Owner,
    Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });


@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Field(type => String)
    @Column()
    email: string;

    @Field(type => String)
    @Column()
    password: string;

    @Field(type => UserRole)
    @Column({type: 'enum', enum: UserRole})
    role: UserRole;
}
