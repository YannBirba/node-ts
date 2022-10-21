import { SkillResolver } from "./resolvers/skillsResolver";
import { WilderResolver } from "./resolvers/wildersResolver";
import { dataSource } from "./utils/datasource";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UpvoteRessolver } from "./resolvers/upvotesResolver";

const start = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver, UpvoteRessolver],
  });
  const server = new ApolloServer({
    schema,
  });
  try {
    await dataSource.initialize();
    console.log("Successfully connected to the database");
    try {
      const { url } = await server.listen(5000);

      console.log(`🚀  Server ready at: ${url}`);
    } catch (error: any) {
      throw new Error(`Unable to start the app : ${error.message as string}`);
    }
  } catch (error: any) {
    throw new Error(
      `Error while trying to connecting to database : ${
        error.message as string
      }`
    );
  }
};

start().catch((error) => {
  throw new Error(`Unable to start the app : ${error.message as string}`);
});
