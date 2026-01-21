const jwt = require("jsonwebtoken");

const jwtEncode = (id, email) => {
  return jwt.sign({ id: id, email: email }, "secret", {
    expiresIn: "300m",
  });
};

const jwtDecode = (token) => {
  return jwt.verify(token, "secret");
};
module.exports = {
  jwtEncode,
  jwtDecode,
};
