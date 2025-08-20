const { decryptedToken } = require("../utils/token");
const { decrypt } = require("../utils/crypt");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    try {
      const { userId } = await decryptedToken(token);
      console.log("decrypted token", userId);

      req.userId = parseInt(decrypt(userId));
      console.log("user id", req.userId);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = verifyJwt;
