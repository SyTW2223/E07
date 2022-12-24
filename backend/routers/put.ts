import * as express from "express";
import Publication from "../models/publication";

import * as jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "../middleware/jwt-auth";


export const putRouter = express.Router();

putRouter.put("/publication/:id", /*jwtAuthMiddleware,*/ (req, res) => {
    const id = req.params.id;
    const liked = req.body.liked;
    const update = liked ? { $inc: { fav_count: 1 } } : { $inc: { fav_count: -1 } };
    Publication.findByIdAndUpdate(id, update)
      .then(() => { res.status(200).send()})
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: error.message });
      });
});