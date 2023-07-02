declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: "production" | "development" | "test" | "staging";

    MONGODB_URL: string;
    POSTGRES_URL: string;
  }
}
