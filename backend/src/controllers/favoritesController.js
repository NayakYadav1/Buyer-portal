const { getFavoritesByUser, addFavorite, removeFavorite } = require('../models/Favorite');

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await getFavoritesByUser(req.user.id);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId) return res.status(400).json({ error: 'Property ID required' });
    const favorite = await addFavorite(req.user.id, propertyId);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    await removeFavorite(req.user.id, propertyId);
    res.json({ message: 'Removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};