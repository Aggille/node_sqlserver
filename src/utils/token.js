const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const decryptedToken = async (authHeader) => {
  if (!authHeader) throw new Error("No token provided");

  // pega somente a segunda parte do token bearer token
  const [, token] = authHeader.split(" ");
  if (!token) throw new Error("Invalid token format");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Failed to authenticate token");
  }
};

module.exports = {
  decryptedToken,
};
