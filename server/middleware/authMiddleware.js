const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access Denied' });

    const token = authHeader.split(' ')[1]; // Extract token if "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
      const decoded = jwt.verify(token, 'my_secret_key'); // Verify token
      req.user = decoded;

      // Check if user has the required role(s)
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Forbidden' });
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  };
};
