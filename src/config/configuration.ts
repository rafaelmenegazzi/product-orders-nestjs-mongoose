export interface DatabaseConfig {
  uri: string;
}

interface Config {
  database: DatabaseConfig;
}

export default (): Config => ({
  database: {
    uri: process.env.DATABASE_URI,
  },
});
