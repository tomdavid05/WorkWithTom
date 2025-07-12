const jwt = require('jsonwebtoken');
const { sql } = require('../db');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const result = await sql.query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. User not found.' 
      });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token format.' 
      });
    }
    
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

module.exports = auth; 