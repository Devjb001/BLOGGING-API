const jwt = require('jsonwebtoken');
require("dotenv")

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, pls enter a token or make sure you are loged in' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token, also make sure youre loged in' });
  }
}

module.exports = verifyToken;

