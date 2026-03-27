const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// To create the table if not exist
const initializeTables = require('./utils/initDb');
initializeTables();  

const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => 
    console.log(`Server succesfully started on port ${PORT}`)
);