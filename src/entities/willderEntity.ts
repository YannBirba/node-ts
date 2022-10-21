import { IsString, Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upvote } from "./upvoteEntity";
@ObjectType()
@Entity({ name: "wilders" })
export class Wilder {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field(() => [Upvote], { nullable: true })
  @OneToMany(() => Upvote, "wilder")
  upvotes: Upvote[];
}

@InputType()
export class WilderInput {
  @IsString()
  @Length(2, 50)
  @Field()
  name: string;

  @IsString()
  @Length(0, 100)
  @Field({ nullable: true })
  city: string;
}
