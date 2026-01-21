const User = require("../model/User");
const { decToken } = require("../config/genToken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = decToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role != "Teacher" && decoded.role != "Principal") {
      return res.status(401).json({
        message: "Unauthorized aap student ho",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { auth };
