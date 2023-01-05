import * as express from "express";
import Publication from "../models/publication";
import User from "../models/user";

import * as jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";

export const putRouter = express.Router();

putRouter.put("/publication/:id", jwtAuthMiddleware, (req, res) => {
  const id = req.params.id;
  const liked = req.body.liked;
  // AÑADIR FILTRO PARA DECREMENTAR O INCREMENTAR SI EL USUARIO YA LE HA DADO LIKE O NO
  // const update = liked
  //   ? { $inc: { fav_count: 1 } }
  //   : { $inc: { fav_count: -1 } };
  Publication.findById(id)
    .populate("fav_users")
    .exec(function (err, publication) {
      if (err) throw err;
      const userID = res.locals.payload.id;
      if (!liked) {
        publication.fav_users = publication.fav_users.filter(
          (obj) => obj._id.toString() !== userID
        );
        publication
          .save()
          .then(() => {
            res.status(200).send({
              message: "-1",
            });
          })
          .catch((error) => {
            res.status(400).send({
              err: "Bad request \n" + error._message,
            });
          });
      }
      if (liked) {
        publication.fav_users.push(userID);
        publication
          .save()
          .then(() => {
            res.status(200).send({
              message: "+1",
            });
          })
          .catch((error) => {
            res.status(400).send({
              err: "Bad request \n" + error._message,
            });
          });
      }
    });
  // // .catch((error) => {
  // //   console.error(error);
  // //   res.status(400).send({
  // //     err: "Bad request \n" + error._message,
  // //   });
  // });
});

putRouter.put("/user/:id", jwtAuthMiddleware, (req, res) => {
  const id = req.params.id;
  const profile_changes = req.body.changes;
  if (profile_changes.pfp_url) {
    const update = {
      pfp_url: profile_changes.pfp_url,
    };
    User.findByIdAndUpdate(id, update)
      .then(() => {
        res.status(200).send({
          message: "PfP updated",
        });
      })
      .catch((error) => {
        res.status(400).send({
          err: "Bad request \n" + error._message,
        });
      });
  }
});
