const verifyToken = async (req, response, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return response.status(401).json({ error: "Token not found" });
  } else {
    return next();
  }
  // try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded;
  //     next();
  // } catch (error) {
  //     return response.status(401).json({error: "Token inválido"});
  // }
};

module.exports = { verifyToken };
