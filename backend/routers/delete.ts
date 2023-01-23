import * as express from "express";
import User from "../models/user";
import Publication from "../models/publication";

import { jwtAuthMiddleware } from "../middleware/jwt-auth";

export const deleteRouter = express.Router();

/*
 * Deletes the publication that matches the id given, the userID that makes the petition must match the one in the jwtToken (not secure)
 */
deleteRouter.delete("/publication/:id", jwtAuthMiddleware, (req, res) => {
  const userID = res.locals.payload.id;
  User.findById(userID).then((user) => {
    if (
      user.publications.filter((obj) => obj._id.toString() == req.params.id)
        .length
    ) {
      Publication.findByIdAndDelete(req.params.id)
        .then((publication) => {
          if (!publication) {
            res.status(404).send();
          } else {
            User.findById(userID)
              .then((user) => {
                const publications_copy = user.publications;
                const filtered_publications = publications_copy.filter(
                  (obj) => obj._id.toString() !== req.params.id
                );
                User.updateOne(
                  { username: user.username },
                  { publications: filtered_publications }
                )
                  .then(() => {
                    res.status(200).send({ message: "Deletion successful" });
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
        })
        .catch(() => {
          res.status(400).send();
        });
    } else {
      res.status(403).send({
        err: "Unauthorized, publication not owned",
      });
    }
  });
});
