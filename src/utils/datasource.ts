import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Skill } from "../entities/skillEntity";
import { Upvote } from "../entities/upvoteEntity";
import { Wilder } from "../entities/willderEntity";

dotenv.config();

if (
  process.env.DB_PASSWORD === undefined ||
  process.env.DB_NAME === undefined ||
  process.env.DB_USER === undefined
) {
  throw new Error(
    "Please provide a valid database credientials in .env file with : DB_USER, DB_PASSWORD, DB_NAME"
  );
}

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  entities: [Wilder, Skill, Upvote],
  logging: ["error", "query"],
});
