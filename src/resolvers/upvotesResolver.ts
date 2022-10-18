import { upvotesRepository } from "../repositories/upvotesRepository";
import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Upvote } from "../entities/upvoteEntity";

@Resolver()
export class UpvoteRessolver {
  @Query(() => [Upvote])
  async getUpvotes(): Promise<Upvote[]> {
    return await upvotesRepository.find({
      relations: ["skill", "wilder"],
    });
  }

  @Query(() => Upvote)
  async getUpvote(@Arg("id", () => ID) id: number): Promise<Upvote> {
    const result = await upvotesRepository.findOne({
      where: { id },
      relations: ["skill", "wilder"],
    });
    if (result === null) {
      throw new Error("Upvote not found");
    }
    return result;
  }

  @Mutation(() => Upvote)
  async addUpvote(
    @Arg("skillId", () => ID) skillId: number,
    @Arg("wilderId", () => ID) wilderId: number,
    @Arg("upvote", () => Int) upvote: number
  ): Promise<Upvote> {
    if (skillId === undefined || wilderId === undefined) {
      throw new Error("Please enter a skill id and a wilder id");
    }

    const exitingUpvote = await upvotesRepository.findOne({
      where: {
        skill: { id: skillId },
        wilder: { id: wilderId },
      },
      relations: ["wilder", "skill"],
    });

    if (exitingUpvote !== null) {
      throw new Error(
        "The upvote already exist for this skill and this wilder"
      );
    }

    try {
      const upvoteCreated = await upvotesRepository.create({
        upvote: upvote !== undefined ? upvote : 0,
        skill: { id: skillId },
        wilder: { id: wilderId },
      });
      return await upvotesRepository.save(upvoteCreated);
    } catch (error: any) {
      throw new Error(
        `Error while trying to add upvote  because ${error.message as string}`
      );
    }
  }

  @Mutation(() => Upvote)
  async editUpvote(
    @Arg("id", () => ID) id: number,
    @Arg("upvote", () => Int) upvote: number
  ): Promise<Upvote> {
    if (upvote === undefined) {
      throw new Error("Please enter a upvote number");
    }

    const upvoteFound = await upvotesRepository.findOneBy({
      id,
    });

    if (upvoteFound === null) {
      throw new Error("The upvote does not exist");
    }

    try {
      upvoteFound.upvote = upvote;
      return await upvotesRepository.save(upvoteFound);
    } catch (error: any) {
      throw new Error(
        `Error while trying to edit upvote because ${error.message as string}`
      );
    }
  }

  @Mutation(() => Boolean)
  async deleteUpvote(@Arg("id", () => ID) id: number): Promise<boolean> {
    const upvote = await upvotesRepository.findOneBy({
      id,
    });

    if (upvote === null) {
      throw new Error(`The upvote with the id : ${id} does not exist`);
    }

    try {
      await upvotesRepository.delete(id);
      return true;
    } catch (error: any) {
      throw new Error(
        `Error while trying to delete upvote because ${error.message as string}`
      );
    }
  }

  @Mutation(() => Int)
  async upvote(@Arg("id", () => ID) id: number): Promise<Upvote> {
    const upvote = await upvotesRepository.findOneBy({
      id,
    });

    if (upvote === null) {
      throw new Error(`The upvote with the id : ${id} does not exist`);
    }

    upvote.upvote += 1;

    try {
      return await upvotesRepository.save(upvote);
    } catch (error: any) {
      throw new Error(
        `Error while trying to upvote because ${error.message as string}`
      );
    }
  }
}
