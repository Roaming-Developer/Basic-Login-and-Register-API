const jwt = require("jsonwebtoken");
const config = process.env;

module.exports = {
  verifyToken: (req, res, next) => {
    console.log(req);
    const token =
      req.body.token || req.query.token || req.header["x-access-token"];

    if (!token) {
      return res.status(403).json({ warning: "Token is required!" });
    }

    try {
      const decode = jwt.verify(token, config.TOKEN_KEY);
      req.user = decode;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  },
};
