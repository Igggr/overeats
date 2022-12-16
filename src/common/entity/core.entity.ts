import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class CoreEntity {
    
    @Field(type => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @UpdateDateColumn()
    updatedAt: Date;
}