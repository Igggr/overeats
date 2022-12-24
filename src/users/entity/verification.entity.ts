import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entity/core.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuidv4 } from 'uuid';


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
    @Column()
    @Field(type => String)
    code: string;

    @Field(type => User)
    @OneToOne(Taype => User)
    @JoinColumn()
    user: User;

    @BeforeInsert()
    createCode(): void {
    
        this.code =     uuidv4();
    }

}