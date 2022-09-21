import { DataSource } from "typeorm";
import { Skill } from "../entities/skillEntity";
import { Upvote } from "../entities/upvoteEntity";
import { Wilder } from "../entities/willderEntity";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "wildersdb.db",
  synchronize: true,
  entities: [Wilder, Skill, Upvote],
  logging: ["error", "query"],
});
