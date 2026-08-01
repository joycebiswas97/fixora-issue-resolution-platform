const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 1. Protect routes (Verify JWT)
exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is passed in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (Format is usually "Bearer eyJhbG...")
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database and attach them to the request object
      // .select('-password') ensures we don't accidentally pass the hashed password around
      req.user = await User.findById(decoded.id).select('-password');

      // Move on to the actual controller function
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 2. Role Authorization
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the current user's role is in the array of allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Role '${req.user.role}' is not authorized to access this route.` 
      });
    }
    // If they have the right role, let them through
    next();
  };
};