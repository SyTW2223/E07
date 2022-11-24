import express from "express";
import * as dotenv from "dotenv";
import { defaultRouter } from "../routers/default";
import { postRouter } from "../routers/post";
import { getRouter } from "../routers/get";
import "../db/mongoose";

const express_app = express();

express_app.use(express.json());
express_app.use(postRouter);
express_app.use(getRouter);
express_app.use(defaultRouter);

dotenv.config({ path: ".env.local" });

const port = process.env.API_PORT || 3000;
express_app.listen(port, () => {
  console.log(`listening on ${port}`);
});
