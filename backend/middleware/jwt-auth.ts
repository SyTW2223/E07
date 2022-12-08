import * as jwt from "jsonwebtoken";

export const jwtAuthMiddleware = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "my-secret-key", (err: any, user: any) => {
    if (err) {
      return res.status(403);
    }
    res.locals.user = user;
    next();
  });
};
