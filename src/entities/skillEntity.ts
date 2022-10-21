import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upvote } from "./upvoteEntity";
import { Field, ID, ObjectType } from "type-graphql";
@ObjectType()
@Entity({ name: "skills" })
export class Skill {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Upvote], { nullable: true })
  @OneToMany(() => Upvote, "skill")
  upvotes: Upvote[];
}