const { decToken } = require("../config/genToken");
const { jwtDecode } = require("./authorization");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { id } = decToken(token.split(" ")[1]);
    if (!id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.id = id;
    console.log(req.id, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { verifyToken };
