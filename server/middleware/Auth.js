// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.sendState(401);
    }

    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.secret_key);
    console.log(decodedData);
    req.user = decodedData;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
