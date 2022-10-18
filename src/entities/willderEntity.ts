import { Field, ID, ObjectType } from "type-graphql";
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

  @Field((type) => [Upvote], { nullable: true })
  @OneToMany(() => Upvote, "wilder")
  upvotes: Upvote[];
}
