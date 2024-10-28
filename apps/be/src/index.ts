import "reflect-metadata";
import { container } from "tsyringe";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./graphql/definitions";
import { UserContext } from "./graphql/user-context";
import { UserDataSource } from "./graphql/datasources/user-datasource";
import { PrismaService } from "./prisma/service";

const server = new ApolloServer<UserContext>({
  typeDefs,
  resolvers,
});

const prismaService = container.resolve(PrismaService);

async function main() {
  // First step: Prisma
  // await prisma.user.create({
  //     data: {
  //         name: 'Alice',
  //         email: 'alice@prisma.io',
  //         posts: {
  //             create: {
  //                 title: 'Hello World'
  //             }
  //         },
  //         profile: {
  //             create: {
  //                 bio: 'I like turtles'
  //             }
  //         }
  //     }
  // });

  // const allUsers = await prisma.user.findMany({
  //     include: {
  //         posts: true,
  //         profile: true
  //     }
  // });
  // console.dir(allUsers, { depth: null });

  // Second step: Prisma
  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true },
  // });
  // console.log(post);

  // Third step: Apollo Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async (): Promise<UserContext> => ({
      dataSources: {
        users: container.resolve(UserDataSource),
      },
    }),
  })

  console.log(`🚀  Server ready at: ${url}`);
}

process.on("SIGINT", async () => {
  await prismaService.$disconnect();
  process.exit(0);
});

main()
  .then(async () => {
    await prismaService.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaService.$disconnect();
    process.exit(1);
  });

