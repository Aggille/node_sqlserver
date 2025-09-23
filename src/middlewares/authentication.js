const { decryptedToken } = require("../utils/token");
const { decrypt } = require("../utils/crypt");
const logger = require("../logger");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      logger.error("Token is required");
      return res.status(401).json({ message: "Token is required" });
    }

    try {
      const { userId } = await decryptedToken(token);
      req.userId = parseInt(decrypt(userId));
    } catch (error) {
      logger.error("Invalid Tokem");
      return res.status(401).json({ message: "Invalid token" });
    }

    return next();
  } catch (error) {
    logger.error(error.message);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = verifyJwt;
