import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Restaurant {
    
    @PrimaryGeneratedColumn()
    @Field(type => String)
    id: number;

    @Field(type => String)
    @Column()
    name: string;

    @Column()
    @Field(type => String)
    style: string;
}