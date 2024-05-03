declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      AUTH_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}