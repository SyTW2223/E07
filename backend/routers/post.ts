import * as express from "express";
import User from "../models/user";
import Publication from "../models/publication";

export const postRouter = express.Router();

postRouter.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(200).send("User saved successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

postRouter.post("/publication", (req, res) => {
  const publication = new Publication(req.body);
  publication
    .save()
    .then(() => {
      res.status(200).send("Publication saved successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
