const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers and handle Bearer format
  const token = req.header('Authorization')?.split(' ')[1]; // Split "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Log for debugging
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
