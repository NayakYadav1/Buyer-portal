const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const initializeTables = require('./utils/initDb');
initializeTables().catch(err => console.error('initDb failed:', err));

const authRoutes = require('./routes/auth');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => 
    console.log(`Server succesfully started on port ${PORT}`)
);