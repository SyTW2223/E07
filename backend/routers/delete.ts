import * as express from "express";
import User from "../models/user";
import Publication from "../models/publication";

import * as jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";
import { jwtSecret } from "../env.backend";

export const deleteRouter = express.Router();

deleteRouter.delete("/publication/:id", jwtAuthMiddleware, (req, res) => {
  const userID = res.locals.payload.id;
  User.findById(userID).then((user) => {
    if (
      user.publications.filter((obj) => obj._id.toString() == req.params.id).length
    ) {
      Publication.findByIdAndDelete(req.params.id)
        .then((publication) => {
          if (!publication) {
            res.status(404).send();
          } else {
            const id_publication = req.params.id;
            User.findById(userID)
              .then((user) => {
                const publications_copy = user.publications;
                //con some puedes parar el bucle con el return forEach no te deja.
                const filtered_publications = publications_copy.filter(
                  (obj) => obj._id.toString() !== req.params.id
                );
                // publications_copy.some((publication) => {
                //   if (publication == id_publication) {
                //     publications_copy.splice(
                //       publications_copy.indexOf(publication),
                //       1
                //     );
                //     return;
                //   }
                // });
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
