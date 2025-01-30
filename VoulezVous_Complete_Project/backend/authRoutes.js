
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET = 'voulezvous_secret_key';

// Mock database for demonstration purposes
const users = [];

// Register a new user with roles
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newUser = { id: users.length + 1, name, email, password, role: role || 'customer' };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Login and generate token with role
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Middleware to check roles
const verifyRole = (role) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRET);

      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = { router, verifyRole };
