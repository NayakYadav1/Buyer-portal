const pool = require('../utils/db');

// Function to create a new user
async function createUser(email, password, name, role = 'buyer') {
  try {
    const query = 'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [email, password, name, role];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
}

// Function to find a user by email
async function findUserByEmail(email) {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to find user: ${err.message}`);
  }
}

// Function to find a user by ID
async function findUserById(id) {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to find user: ${err.message}`);
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};