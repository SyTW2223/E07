import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../env.backend";

export const jwtAuthMiddleware = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ err: "Missing token" });
  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      return res.status(403).send({ err: "Invalid token" });
    }
    res.locals.user = user;
    next();
  });
};
