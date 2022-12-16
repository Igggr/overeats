import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Restaurant {
    
    @PrimaryGeneratedColumn()
    @Field(type => String)
    id: number;

    @Length(2, 20)
    @IsString()
    @Field(type => String)
    @Column()
    name: string;

    @Length(2, 20)
    @Column()
    @IsString()
    @Field(type => String)
    style: string;

    @IsString()
    @IsOptional()
    @Column()
    @Field(type => String)
    addres?: string;
}