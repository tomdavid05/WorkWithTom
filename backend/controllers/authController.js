const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, isPostgreSQL } = require('../db');

// Register user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    let existingUser;
    if (isPostgreSQL) {
      existingUser = await sql.query(
        'SELECT id FROM users WHERE email = $1 OR username = $2',
        [email, username]
      );
    } else {
      existingUser = await sql.query`
        SELECT id FROM users WHERE email = ${email} OR username = ${username}
      `;
    }

    if ((isPostgreSQL ? existingUser.rows.length : existingUser.recordset.length) > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    let result;
    let user;
    
    if (isPostgreSQL) {
      result = await sql.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
        [username, email, hashedPassword]
      );
      user = result.rows[0];
    } else {
      result = await sql.query`
        INSERT INTO users (username, email, password)
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.email, INSERTED.created_at
        VALUES (${username}, ${email}, ${hashedPassword})
      `;
      user = result.recordset[0];
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at
        },
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    let result;
    if (isPostgreSQL) {
      result = await sql.query(
        'SELECT id, username, email, password, created_at FROM users WHERE email = $1',
        [email]
      );
    } else {
      result = await sql.query`
        SELECT id, username, email, password, created_at
        FROM users 
        WHERE email = ${email}
      `;
    }

    if ((isPostgreSQL ? result.rows.length : result.recordset.length) === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = isPostgreSQL ? result.rows[0] : result.recordset[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  register,
  login,
  getMe
}; 