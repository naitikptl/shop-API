const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateToken(user) {
  const token = await jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return token;
}

module.exports = {
  generateToken,
};
