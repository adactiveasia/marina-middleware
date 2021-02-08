const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      return;
    });
  } else {
    res.sendStatus(401);
  }
};
