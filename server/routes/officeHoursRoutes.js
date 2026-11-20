const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

const officeHours = [
    {
        id: 1,
        taName: "John Cena",
        course: "CS 1501",
        day: "Monday",
        startTime: "14:00",
        endTime: "16:00"
    },
    {
        id: 2,
        taName: "John Doe",
        course: "CS 1502",
        day: "Tuesday",
        startTime: "12:00",
        endTime: "14:00"
    }
];

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

        res.status(201).json(newOfficeHour);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to create office hour'
        });
    }
});

module.exports = router;