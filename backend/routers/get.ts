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
 * Busca todos los usuarios o los que cumplan el termino de busqueda
 */
getRouter.get("/users", jwtAuthMiddleware, (req, res) => {
  const filter = req.query.searchTerm
    ? { username: new RegExp("^" + req.query.searchTerm.toString()) }
    : {};
  User.find(filter)
    .then((users) => {
      // console.log("---------------------------------------------------------------------");
      // console.log("called");
      const filteredUserList = users.map((user) => {
        return {
          username: user.username,
          pfp_url: user.pfp_url,
        };
      });
      res.status(200).send(filteredUserList);
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
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          err: "The user cannot be found",
        });
      } else {
        if (userID !== req.params.id) {
          res.status(403).send({
            err: "Unauthorized",
          });
          return;
        }
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
 * Todas las publicaciones  o las que cumplan el termino de busqueda
 */
getRouter.get("/publications", jwtAuthMiddleware, (req, res) => {
  const userID: string = res.locals.payload.id;
  const filter = req.query.searchTerm
    ? {
        "content.text": new RegExp(
          "\\b" + req.query.searchTerm.toString() + "\\b",
          "i"
        ),
      }
    : {};
  Publication.find(filter)
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
                comments_count: publication.comments.length,
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
 * Publicaciones del usuario y a los que sigue
 */
getRouter.get("/userfeed/:id", jwtAuthMiddleware, (req, res) => {
  const userID: string = res.locals.payload.id;
  User.findById(req.params.id)
    .populate("follows")
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).send({
          err: "The user cannot be found",
        });
      } else {
        if (userID !== req.params.id) {
          res.status(403).send({
            err: "Unauthorized",
          });
          return;
        }
        const usersNames_to_search = dbUser.follows.map((user) => {
          return user.username;
        });
        usersNames_to_search.push(dbUser.username);
        // console.log(usersNames_to_search);
        const filter = { owner_username: { $in: usersNames_to_search } };
        Publication.find(filter)
          .sort({ date: "desc" })
          .then(async (dbPublications) => {
            // console.log(dbPublications)
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
                      comments_count: publication.comments.length,
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
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .exec(function (err, dbPublication) {
      if (err) throw err;
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
            const comments = dbPublication.comments.map((comment: any) => {
              let pfp_url = dbUser.pfp_url;
              if (!dbUser.pfp_url) pfp_url = "/E07/logo_without_letters.png";
              return {
                user: {
                  username: dbUser.username,
                  pfp_url: pfp_url,
                },
                text: comment.text,
              };
            });
            const publication = {
              _id: dbPublication.id,
              content: dbPublication.content,
              owner_username: dbPublication.owner_username,
              date: dbPublication.date,
              fav_count: dbPublication.fav_users.length,
              comments: comments,
              comments_count: comments.length,
              liked: requesterLiked,
              pfp_url: dbUser.pfp_url,
            };
            res.status(200).send(publication);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
});

/*
 * Devuelve si el usuario sigue a otro usuario
 */
getRouter.get("/user/follows/:username", jwtAuthMiddleware, (req, res) => {
  const filter = req.params.username
    ? { username: req.params.username.toString() }
    : {};
  const userID: string = res.locals.payload.id;
  User.findById(userID)
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).send({
          err: "The user cannot be found",
        });
      } else {
        User.findOne(filter)
          .then((followedUser) => {
            res.status(200).send(dbUser.follows.includes(followedUser.id));
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
