const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

const {getOfficeHours} = require('../controllers/officeHoursController');

// GET /api/office-hourse
router.get('/', async (req, res) => {
    try {
        const officeHours = await prisma.officeHour.findMany({
            include: {
                ta: true,
                course: true
            }
        });

        res.status(200).json(officeHours);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve office hours'
        });
    }
});

//POST /api/office-hours
//Makes a new office-hour record in db
router.post('/', async (req, res) => {
    try {
        const {
            day,
            startTime,
            endTime,
            location,
            taId,
            courseId
        } = req.body;

        // Check required fields
        if (!day || !startTime || !endTime ||
            !location || !Number.isInteger(taId) ||
            !Number.isInteger(courseId)) {
            return res.status(400).json({
                message: 'Missing or invalid required fields'
            });
        }

        //Put new office-hour into db
        const newOfficeHour = await prisma.officeHour.create({
            data: {
                day,
                startTime,
                endTime,
                location,
                taId,
                courseId
            }
        });
        
        //return new office-hour
        res.status(201).json(newOfficeHour);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to create office hour'
        });
    }
});

// Export to server.js
module.exports = router;