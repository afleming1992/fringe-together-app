
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "app/api/graphql/schema.ts",
  generates: {
    "lib/gql/types/": {
      plugins: ["typescript"],
      preset: "client"
    }
  }
};

export default config;
