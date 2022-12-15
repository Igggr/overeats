import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Restaurant {
    
    @PrimaryGeneratedColumn()
    @Field(type => String)
    id: number;

    @Column(type => String)
    @Field(type => String)
    name: string;

    @Column(type => String)
    @Field(type => String)
    style: string;
}