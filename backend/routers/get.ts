import * as express from "express";

export const getRouter = express.Router();

getRouter.get("/", (_, res) => {
  res.json({
    message: "Behold The MEVN Stack!",
  });
});
