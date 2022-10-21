import { Wilder } from "./willderEntity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Skill } from "./skillEntity";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ name: "upvotes" })
@Unique("skillId_wilderId_unique", ["wilder", "skill"])
export class Upvote {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: 0 })
  upvote: number;

  @Field(() => Wilder)
  @ManyToOne(() => Wilder, "upvotes", { onDelete: "CASCADE" })
  wilder: Wilder;

  @Field(() => Skill)
  @ManyToOne(() => Skill, "upvotes", { onDelete: "CASCADE" })
  skill: Skill;
}