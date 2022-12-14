import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env.local" });

export const mongoDB_url: string | undefined =
  process.env.DATABASE_HOST?.trim();
export const mongoDB_port = process.env.DATABASE_PORT || 27018;
export const mongoDB_pass = process.env.DATABASE_PASSWORD || 1234;
export const mongoDB_name = process.env.DATABASE_NAME || "test";
export const mongoDB_user = process.env.DATABASE_USER || "test";
export const expressJS_port = process.env.BACKEND_PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET || "my-secret-key";
