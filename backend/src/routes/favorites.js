const express = require('express'); 
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoritesController'); 
const auth = require('../middleware/auth'); 

const router = express.Router(); 

router.get('/', auth, getFavorites); 
router.post('/', auth, addFavorite); 
router.delete('/:propertyId', auth, removeFavorite); 

module.exports = router;