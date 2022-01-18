const jwt = require("jsonwebtoken");
const config = process.env;

module.exports = {
  verifyToken: async (req, res, next) => {
    // console.log(req.headers);
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(403).json({ warning: "Token is required!" });
    }

    try {
      let payload = await jwt.verify(token, config.TOKEN_KEY);
      if (payload) {
        req.user = payload;
        return next();
      }
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
  },
};
