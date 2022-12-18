import express from "express";
import cors from "cors";
import { defaultRouter } from "../routers/default";
import { postRouter } from "../routers/post";
import { getRouter } from "../routers/get";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";
import "../db/mongoose";
import { expressJS_port } from "../env.backend";

const express_app = express();

express_app.use(express.json());

express_app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

express_app.use(cors());

express_app.use(postRouter);
express_app.use(getRouter);
express_app.use(defaultRouter);

express_app.use(jwtAuthMiddleware);

express_app.listen(expressJS_port, () => {
  console.log(`Current Timestamp ${Date()}`);
  console.log(`listening on ${expressJS_port}`);
});
