import { Skill } from "./../entities/skillEntity";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { skillsRepository } from "../repositories/skillsRepository";
@Resolver()
export class SkillResolver {
  @Query(() => [Skill])
  async getSkills(): Promise<Skill[]> {
    return await skillsRepository.find();
  }

  @Query(() => Skill, { nullable: true })
  async getSkill(@Arg("id", () => ID) id: number): Promise<Skill | null> {
    // return await skillsRepository.findOneBy({
    //   id,
    // });

    const result = await skillsRepository.findOneBy({
      id,
    });
    if (result === null) {
      throw new Error(`No existing skill for the id : ${id}`);
    }
    return result;
  }

  @Mutation(() => Skill)
  async addSkill(@Arg("name") name: string): Promise<Skill> {
    if (name === undefined) {
      throw new Error("Please enter a name");
    }

    const checkName = await skillsRepository.findOneBy({
      name,
    });

    if (checkName !== null) {
      throw new Error(`This skill with the name ${name} already exists`);
    }
    try {
      const skill = await skillsRepository.create({ name });
      return await skillsRepository.save(skill);
    } catch (error: any) {
      throw new Error(
        `Error while trying to add a skill  because ${error.message as string}`
      );
    }
  }

  @Mutation(() => Skill)
  async editSkill(
    @Arg("id", () => ID) id: number,
    @Arg("name", { nullable: true }) name: string
  ): Promise<Skill | null> {
    if (name === undefined) {
      throw new Error("Please enter a name");
    }

    const skill = await skillsRepository.findOneBy({
      id,
    });

    if (skill === null) {
      throw new Error(`No existing skill for the id : ${id}`);
    }

    const checkName = await skillsRepository.findOneBy({
      name,
    });

    if (checkName !== null) {
      throw new Error(`This skill with the name ${name} already exists`);
    }

    try {
      skillsRepository.merge(skill, { name });
      return await skillsRepository.save(skill);
    } catch (error: any) {
      throw new Error(
        `Error while trying to edit a skill  because of ${
          error.message as string
        }`
      );
    }
  }

  @Mutation(() => Boolean)
  async deleteSkill(@Arg("id", () => ID) id: number): Promise<boolean> {
    const skill = await skillsRepository.findOneBy({
      id,
    });
    if (skill === null) {
      throw new Error(`No existing skill for the id : ${id}`);
    }

    try {
      await skillsRepository.delete(id);
      return true;
    } catch (error: any) {
      throw new Error(
        `Error while trying to delete a skill  because ${
          error.message as string
        }`
      );
    }
  }
}
