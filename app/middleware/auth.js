const { verifyToken } = require('../services/tokenService');

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      if (!token) return res.status(401).json({ message: 'Missing token' });

      const decoded = verifyToken(token);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = auth;