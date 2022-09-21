import { Upvote } from "../entities/upvoteEntity";
import { dataSource } from "../utils/datasource";

export const upvotesRepository = dataSource.getRepository(Upvote);
