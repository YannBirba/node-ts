import { Wilder } from "../entities/willderEntity";
import { dataSource } from "../utils/datasource";

export const wildersRepository = dataSource.getRepository(Wilder);
