import * as express from "express";
import User from "../models/user";
import Publication from "../models/publication";

export const getRouter = express.Router();

/*
 * Busca un usuario por su nombre de usuario
 */
getRouter.get("/user", (req, res) => {
  const filter = req.query.username
    ? { username: req.query.username.toString() }
    : {};
  if (!filter.username) {
    res.status(404).send("The username is required");
    return;
  }

  User.findOne(filter)
    .then((user) => {
      if (!user) {
        res.status(404).send("The user cannot be found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
 * Devuelve un usuario a partir de su id
 */
getRouter.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status(404).send("The user cannot be found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

/*
 * Busca una publicación por su id
 */
// getRouter.get("/publication", (req, res) => {
//   const filter = req.query.id ? { id: req.query.id.toString() } : {};

//   if (!filter.id) {
//     res.status(404).send("The id is required");
//     return;
//   }
//   Publication.findOne(filter)
//     .then((publication) => {
//       if (!publication) {
//         res.status(404).send("The publication cannot be found");
//       } else {
//         res.status(201).send(publication);
//       }
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

/*
 * Devuelve una publicación a partir de su id
 */
getRouter.get("/publication/:id", (req, res) => {
  Publication.findById(req.params.id)
    .then((publication) => {
      if (!publication) {
        res.status(404).send("The user cannot be founded");
      } else {
        res.status(200).send(publication);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
