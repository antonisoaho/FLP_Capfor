const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const JWT_TOKEN = process.env.JWT_TOKENKEY;
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(err);
  }
  return next();
};

module.exports = auth;
