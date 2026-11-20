const express = require('express');
const cors = require('cors');
require('dotenv').config();
const prisma = require('./config/prisma');

// Initialize Express and middleware
const app = express();
app.use(express.json());
app.use(cors());

// Routes for managing TA office hours
const officeHoursRoutes = require('./routes/officeHoursRoutes');
app.use('/api/office-hours', officeHoursRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'TA Finder Backend Skeleton is running!' });
});

//Temp Database check endpoint
app.get('/api/test-db', async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({
            message: 'Database connection successful!',
            users: users
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Database connection failed'
        });
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});