const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(402).json({
        massage: "token is missing ",
      });
    } else {
      const encoded = jwt.verify(token, process.env.JWT_SECRET);

      res.user = encoded;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      massage: "invalid token",
    });
  }
}
module.exports = verifyToken;
