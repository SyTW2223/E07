import * as express from "express";
import User from "../models/user";
import Publication from "../models/publication";

export const postRouter = express.Router();

postRouter.post("/user", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.date = new Date();
  user
    .save()
    .then(() => {
      res.status(200).send({
        message: "User saved suscessfully",
      });
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

/*
 * Inicio de sesion
 */
postRouter.post("/login", (req, res) => {
  const filter = req.body.email ? { email: req.body.email.toString() } : {};
  User.findOne(filter)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send("The user cannot be found or the password is not correct");
      } else {
        if (user.password == req.body.password) {
          res.status(201).send({
            message: "Login successful",
          });
        } else {
          res.status(403).send({
            message: "Password incorrect",
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
