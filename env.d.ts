declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      AUTH_SECRET: string;
      DATABASE_URL: string;
      R2_ACCOUNT_ID: string;
      R2_ACCESS_KEY: string;
      R2_SECRET_ACCESS_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}