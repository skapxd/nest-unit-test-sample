import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'staging' ||
  process.env.NODE_ENV === 'test';

export const Env = {
  isDev,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  isStaging: process.env.NODE_ENV === 'staging',
  urlFront: 'http://localhost:3000',
  urlBack: 'http://localhost:8000',
};
