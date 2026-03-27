const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateRegistration = (email, password, name) => {
  if (!email || !password || !name) {
    return { valid: false, message: 'Name, email and password are required.' };
  }

  if (!isEmailValid(email)) {
    return { valid: false, message: 'Invalid email format.' };
  }

  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long.' };
  }

  if (name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters long.' };
  }

  return { valid: true };
};

const validateLogin = (email, password) => {
  if (!email || !password) {
    return { valid: false, message: 'Email and password are required.' };
  }

  if (!isEmailValid(email)) {
    return { valid: false, message: 'Invalid email format.' };
  }

  return { valid: true };
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const validation = validateRegistration(email, password, name);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword, name);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Logged in.',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = validateLogin(email, password);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}; 