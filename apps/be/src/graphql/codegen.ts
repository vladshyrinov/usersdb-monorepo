
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./apps/be/src/graphql/schema.graphql",
  // schema: "http://localhost:4000",
  generates: {
    "apps/be/src/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../user-context#UserContext"
      }
    },
  }
};

export default config;
