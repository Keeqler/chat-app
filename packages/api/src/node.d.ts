declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    JWT_SECRET: string
    WEB_URL: string
  }
}
