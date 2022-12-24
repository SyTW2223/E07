import * as express from "express";
import User from "../models/user"
import Publication from "../models/publication";

import * as jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";
import { jwtSecret } from "../env.backend";

export const deleteRouter = express.Router();

deleteRouter.delete("/publication/:id", jwtAuthMiddleware, (req, res) => {
  Publication.findByIdAndDelete(req.params.id)
    .then((publication) => {
        if (!publication) {
          res.status(404).send();
        } else {
            const userID = res.locals.payload.id;
            const id_publication = req.params.id;
            User.findById(userID)
            .then((user) => {
              let publications_copy = user.publications;
              //con some puedes parar el bucle con el return forEach no te deja.
              publications_copy.some((publication) => {
                if (publication == id_publication) {
                  publications_copy.splice(publications_copy.indexOf(publication), 1);
                  return;
                }
              });
              User.updateOne(
                { username: user.username },
                { publications: publications_copy }
              )
                .then(() => {
                  res.status(200).send();
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
        }
    }).catch(() => {
        res.status(400).send();
    });
})