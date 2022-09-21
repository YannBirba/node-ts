import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upvote } from "./upvoteEntity";

@Entity({ name: "wilders" })
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  city: string;

  @OneToMany(() => Upvote, "wilder")
  upvotes: Upvote[];
}
