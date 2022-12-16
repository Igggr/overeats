import { GraphQLWsSubscriptionsConfig } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entity/core.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type UserRole = "client" | "owner" | "delivery";

@Entity()
export class User extends CoreEntity {

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;
}
