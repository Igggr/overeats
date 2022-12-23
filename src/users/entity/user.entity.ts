import { Field, GraphQLWsSubscriptionsConfig, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entity/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { ConnectableObservable } from "rxjs";

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

    @BeforeInsert()
    @BeforeUpdate() // will re-hash pasword if we just update email ?!
    async hashPassword(): Promise<void> {
        try {
            console.log("change password");
            console.log(this.password);
            this.password = await bcrypt.hash(this.password, 10);
            console.log(this.password);
        } catch (e) {
            console.log(e)
            throw InternalServerErrorException;
        }
    }

    checkPassword(pasword): Promise<boolean> {
        try {
            const ok =  bcrypt.compare(pasword, this.password);
            return ok;
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        } 
    } 
}
