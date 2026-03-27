const { getFavoritesByUser, addFavorite, removeFavorite } = require('../models/Favorite');

const validatePropertyId = (propertyId) => {
  if (!propertyId || propertyId.trim() === '') {
    return { valid: false, message: 'Property ID is required.' };
  }
  return { valid: true };
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await getFavoritesByUser(req.user.id);
    return res.status(200).json({ success: true, data: favorites, count: favorites.length });
  } catch (err) {
    console.error('getFavorites error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const validation = validatePropertyId(propertyId);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const favorite = await addFavorite(req.user.id, propertyId);
    return res.status(201).json({ success: true, message: 'Favorite added', data: favorite });
  } catch (err) {
    console.error('addFavorite error:', err);
    if (err.message && err.message.includes('duplicate')) {
      return res.status(409).json({ success: false, message: 'This property is already in favorites.' });
    }
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const validation = validatePropertyId(propertyId);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    await removeFavorite(req.user.id, propertyId);
    return res.status(200).json({ success: true, message: 'Favorite removed' });
  } catch (err) {
    console.error('removeFavorite error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};