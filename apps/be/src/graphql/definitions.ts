import { readFileSync } from "fs";
import { Resolvers } from "./generated/graphql";

// export const typeDefs = `#graphql
//   type User {
//     email: String
//     name: String
//   }

//   type Query {
//     users: [User]
//   }
// `;

export const typeDefs = readFileSync("apps/be/src/graphql/schema.graphql", { encoding: "utf-8" });

// export const users = [
//   {
//     email: "one@mail.com",
//     name: "One",
//   },
//   {
//     email: "two@mail.com",
//     name: "Two",
//   },
// ];

export const resolvers: Resolvers = {
  // Query: {
  //   users: () => users,
  // },
  Query: {
    users: async (_parent, _args, { dataSources }) => dataSources.users.getUsers(),
  },
};
