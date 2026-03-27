const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

exports.register = async (req, res) => { 
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name){
      return res.status(400).json({ error: 'All fields required' });
    }
    if (await findUserByEmail(email)){
      return res.status(409).json({ error: 'Email exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await createUser(email, hashedPassword, name); 
    res.status(201).json({ message: 'User registered' }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }); 
  } 
}; 

exports.login = async (req, res) => { 
  try { 
    const { email, password } = req.body; 
    const user = await findUserByEmail(email); 
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' }); 
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.json({ token, user: { name: user.name, role: user.role } }); 
  } catch (err) { 
    res.status(500).json({ error: 'Server error' }); 
  } 
}; 