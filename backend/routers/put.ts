import * as express from "express";
import Publication from "../models/publication";
import User from "../models/user";

import * as jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";

export const putRouter = express.Router();

putRouter.put("/publication/like/:id", jwtAuthMiddleware, (req, res) => {
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
  if (profile_changes.follows) {
    User.findById(id)
    .populate("follows")
      .then((dbUser) => {
        const filter = profile_changes.follows.username
          ? { username: profile_changes.follows.username.toString() }
          : {};
        User.findOne(filter)
        .populate("followed_by")
          .then((dbFollowedUser) => {
            if (profile_changes.follows.follow_status == true) {
              dbUser.follows.push(dbFollowedUser._id);
              dbFollowedUser.followed_by.push(dbUser._id);
              dbUser
                .save()
                .then(() => {
                  dbFollowedUser.save();
                  res.status(200).send({
                    message: "User followed",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(400).send({
                    err: "Bad request \n" + error._message,
                  });
                });
            }
            if (profile_changes.follows.follow_status == false) {
              const index: number = dbUser.follows.map((user) => {
                return user.id;
              }).indexOf(dbFollowedUser.id);
              if (index !== -1) {
                dbUser.follows.splice(index, 1);
              }
              const index2: number = dbFollowedUser.followed_by.map((user) => {
                return user.id;
              }).indexOf(dbUser.id);
              if (index !== -1) {
                dbFollowedUser.followed_by.splice(index2, 1);
              }
              dbUser
                .save()
                .then(() => {
                  dbFollowedUser.save();
                  res.status(200).send({
                    message: "User unfollowed",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(400).send({
                    err: "Bad request \n" + error._message,
                  });
                });
            }
          })
          .catch((error) => {
            console.log(error);
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
});

putRouter.put("/publication/comment/:id", jwtAuthMiddleware, (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  console.log(id);
  console.log(comment);
  Publication.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .exec(function (err, publication) {
      if (err) throw err;

      const filter = comment.user.username
        ? { username: comment.user.username.toString() }
        : {};
      if (!filter.username) {
        res.status(404).send({
          err: "Username field is required",
        });
        return;
      }

      User.findOne(filter)
        .then((user) => {
          if (!user) {
            res.status(404).send({
              err: "The user cannot be found",
            });
          } else {
            comment.user = user;
            publication.comments.push(comment);
            publication
              .save()
              .then(() => {
                res.status(200).send({
                  message: "Comment added",
                });
              })
              .catch((error) => {
                res.status(400).send({
                  err: "Bad request \n" + error._message,
                });
              });
          }
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  // // .catch((error) => {
  // //   console.error(error);
  // //   res.status(400).send({
  // //     err: "Bad request \n" + error._message,
  // //   });
  // });
});
