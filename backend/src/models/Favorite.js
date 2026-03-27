const pool = require('../utils/db');

// Function to add a favorite for a user
async function addFavorite(userId, propertyId) {
  try {
    const query = 'INSERT INTO favorites (user_id, property_id) VALUES ($1, $2) RETURNING *';
    const values = [userId, propertyId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to add favorite: ${err.message}`);
  }
}

// Function to get all favorites for a specific user
async function getFavoritesByUser(userId) {
  try {
    const query = 'SELECT * FROM favorites WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (err) {
    throw new Error(`Failed to get favorites: ${err.message}`);
  }
}

// Function to remove (delete) a favorite
async function removeFavorite(userId, propertyId) {
  try {
    const query = 'DELETE FROM favorites WHERE user_id = $1 AND property_id = $2';
    await pool.query(query, [userId, propertyId]);
    return { success: true, message: 'Favorite removed' };
  } catch (err) {
    throw new Error(`Failed to remove favorite: ${err.message}`);
  }
}

module.exports = {
  addFavorite,
  getFavoritesByUser,
  removeFavorite
};