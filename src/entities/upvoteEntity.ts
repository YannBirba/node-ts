import { Wilder } from "./willderEntity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Skill } from "./skillEntity";

@Entity({ name: "upvotes" })
@Unique("skillId_wilderId_unique", ["wilder", "skill"])
export class Upvote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  upvote: number;

  @ManyToOne(() => Wilder, "upvotes", { onDelete: "CASCADE" })
  wilder: Wilder;

  @ManyToOne(() => Skill, "upvotes", { onDelete: "CASCADE" })
  skill: Skill;
}
