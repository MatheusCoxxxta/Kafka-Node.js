declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_SECRET_ACCESS_KEY: string;
      AWS_ACCESS_KEY_ID: string;
    }
  }
}

export {};
