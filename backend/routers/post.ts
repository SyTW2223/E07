import * as express from "express";
import User from "../models/user";
import Publication, { PublicationInterface } from "../models/publication";

import * as jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";
import { jwtSecret } from "../env.backend";
import { ObjectID } from "bson";

export const postRouter = express.Router();

postRouter.post("/user", (req, res) => {
  const user = new User(req.body);
  user.date = new Date();
  user
    .save()
    .then(() => {
      res.status(200).send({
        message: "User saved successfully",
      });
    })
    .catch((error) => {
      // HAY QUE MANEJAR TODOS LOS ERRORES AL CREAR LA CUENTA
      console.log(error);
      res.status(400).send({
        err: "Bad request \n" + error.errmsg,
      });
    });
});

postRouter.post("/publication", jwtAuthMiddleware, (req, res) => {
  User.findById({ _id: res.locals.payload.id }).then((user) => {
    const newPublication = {
      content: {
        text: req.body.content.text,
        media_path: req.body.content.media_path,
      },
      owner_username: user.username,
      date: req.body.date,
      fav_users: [],
      comments: [],
    };
    const dbPublication = new Publication(newPublication);
    dbPublication
      .save()
      .then((savedDoc) => {
        const id_publication = savedDoc._id;
        const userID = res.locals.payload.id;
        User.findById(userID)
          .then((user) => {
            // eslint-disable-next-line prefer-const
            let publications_copy = user.publications;
            publications_copy.push(id_publication.toString());
            User.updateOne(
              { username: user.username },
              { publications: publications_copy }
            )
              .then(() => {
                const publication = {
                  _id: dbPublication.id,
                  content: dbPublication.content,
                  owner_username: dbPublication.owner_username,
                  date: dbPublication.date,
                  fav_count: 0,
                  comments: [],
                  liked: false,
                };
                res.status(200).send(publication);
              })
              .catch((error) => {
                res.status(400).send({
                  err: "Bad request \n" + error._message,
                });
              });
          })
          .catch((error) => {
            res.status(400).send({
              err: "Bad request \n" + error._message,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          err: "Bad request \n" + error._message,
        });
      });
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
        res.status(404).send({
          err: "Email or password incorrect",
        });
      } else {
        if (user.password == req.body.password) {
          const payload = {
            id: user._id,
          };
          const secret = jwtSecret;
          const token = jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: "1h",
          });
          res.status(201).send({
            token: token,
          });
        } else {
          res.status(403).send({
            err: "Email or password incorrect",
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({
        err: "Bad request \n" + error.errmsg,
      });
    });
});
