import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Wilder } from "../entities/willderEntity";
import { wildersRepository } from "../repositories/wildersRepository";

@Resolver()
export class WilderResolver {
  @Query(() => [Wilder])
  async getWilders(): Promise<Wilder[]> {
    return await wildersRepository.find({
      relations: ["upvotes", "upvotes.skill"],
    });
  }

  @Query(() => Wilder)
  async getWilder(@Arg("id", () => ID) id: number): Promise<Wilder> {
    const result = await wildersRepository.findOne({
      where: { id },
      relations: ["upvotes", "upvotes.skill"],
    });
    if (result === null) {
      throw new Error(`No existing wilder for the id : ${id}`);
    }
    return result;
  }

  @Mutation(() => Wilder)
  async addWilder(
    @Arg("name") name: string,
    @Arg("city", { nullable: true }) city: string
  ): Promise<Wilder> {
    if (name === undefined) {
      throw new Error("Please enter a name");
    }
    try {
      const wilder = await wildersRepository.create({ name, city });
      return await wildersRepository.save(wilder);
    } catch (error: any) {
      throw new Error(
        `Error while trying to add a wilder because ${
          error.message as string
        }`
      );
    }
  }

  @Mutation(() => Wilder, { nullable: true })
  async editWilder(
    @Arg("id", () => ID) id: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("city", { nullable: true }) city: string
  ): Promise<Wilder | null> {
    if (name === undefined && city === undefined) {
      throw new Error("Please enter a name or a city");
    }
    const wilder = await wildersRepository.findOneBy({
      id,
    });
    if (wilder === null) {
      throw new Error(`No existing wilder for the id : ${id}`);
    }

    try {
      wildersRepository.merge(wilder, { name, city });
      return await wildersRepository.save(wilder);
    } catch (error: any) {
      throw new Error(
        `Error while trying to edit a wilder because ${
          error.message as string
        }`
      );
    }
  }

  @Mutation(() => Boolean)
  async deleteWilder(@Arg("id", () => ID) id: number): Promise<boolean> {
    const wilder = await wildersRepository.findOneBy({
      id,
    });
    if (wilder === null) {
      throw new Error(`No existing wilder for the id : ${id}`);
    }
    try {
      await wildersRepository.delete(id);
      return true;
    } catch (error: any) {
      throw new Error(
        `Error while trying to delete a wilder because ${
          error.message as string
        }`
      );
    }
  }
}
