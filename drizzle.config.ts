import type { Config } from 'drizzle-kit';

export default {
  schema: './src/infra/database/entities/*.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
} satisfies Config;
