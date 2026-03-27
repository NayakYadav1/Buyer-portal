const pool = require('./db');

async function initializeTables() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        role VARCHAR DEFAULT 'buyer'
      )
    `);
    console.log('Users table created successfully');

    // Create favorites table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        property_id VARCHAR NOT NULL UNIQUE
      )
    `);
    console.log('Favorites table created successfully');

  } catch (err) {
    console.error('Error creating tables:', err);
  }
}

module.exports = initializeTables;