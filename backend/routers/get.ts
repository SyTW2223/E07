import * as express from "express";
import User from "../models/user";
import Publication from "../models/publication";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";
import { resolve } from "path";

export const getRouter = express.Router();

/*
 * Busca un usuario por su nombre de usuario y devuelve sus publicaciones
 */
getRouter.get("/user", (req, res) => {
  const filter = req.query.username
    ? { username: req.query.username.toString() }
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
        const selectedUserData = {
          publications: user.publications,
          pfp_url: user.pfp_url,
        };
        res.status(200).send(selectedUserData);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
 * Devuelve un usuario a partir de su id
 */
getRouter.get("/user/:id", jwtAuthMiddleware, (req, res) => {
  const userID: string = res.locals.payload.id;
  if (userID !== req.params.id) {
    res.status(403).send({
      err: "Unauthorized",
    });
    return;
  }
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          err: "The user cannot be found",
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
 * Todas las publicaciones
 */
getRouter.get("/publication", jwtAuthMiddleware, (req, res) => {
  const userID: string = res.locals.payload.id;
  Publication.find({})
    .then(async (dbPublications) => {
      if (!dbPublications) {
        res.status(404).send({
          err: "The publications can not be found",
        });
      } else {
        const publications = await Promise.all(
          dbPublications.map(async (publication) => {
            const requesterLiked = Boolean(
              publication.fav_users.filter(
                (user) => user._id.toString() == userID
              ).length
            );
            return await User.findOne({
              username: publication.owner_username,
            }).then((dbUser) => {
              return Promise.resolve({
                _id: publication.id,
                content: publication.content,
                owner_username: publication.owner_username,
                date: publication.date,
                fav_count: publication.fav_users.length,
                comments: publication.comments,
                liked: requesterLiked,
                pfp_url: dbUser.pfp_url,
              });
            });
          })
        );
        res.status(200).send(publications);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
 * Devuelve una publicación a partir de su id
 */
getRouter.get("/publication/:id", jwtAuthMiddleware, (req, res) => {
  const userID: string = res.locals.payload.id;
  Publication.findById(req.params.id)
    .then((dbPublication) => {
      if (!dbPublication) {
        res.status(404).send({
          err: "The publication cannot be found",
        });
      } else {
        const requesterLiked = Boolean(
          dbPublication.fav_users.filter(
            (user) => user._id.toString() == userID
          ).length
        );
        User.findOne({ username: dbPublication.owner_username })
          .then((dbUser) => {
            const publication = {
              _id: dbPublication.id,
              content: dbPublication.content,
              owner_username: dbPublication.owner_username,
              date: dbPublication.date,
              fav_count: dbPublication.fav_users.length,
              comments: dbPublication.comments,
              liked: requesterLiked,
              pfp_url: dbUser.pfp_url,
            };
            res.status(200).send(publication);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
