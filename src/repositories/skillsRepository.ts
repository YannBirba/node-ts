import { Skill } from "../entities/skillEntity";
import { dataSource } from "../utils/datasource";

export const skillsRepository = dataSource.getRepository(Skill);
