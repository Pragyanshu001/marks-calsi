const jwt = require("jsonwebtoken");

const genToken = (userId, role, email) => {
  return jwt.sign(
    { id: userId, role: role, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const decToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { genToken, decToken };
