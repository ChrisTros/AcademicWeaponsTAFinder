const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

//attendance intent
router.post('/', async (req, res) => {
    try {
        const {studentId, officeHourId} = req.body;
        if (!Number.isInteger(studentId) || !Number.isInteger(officeHourId)) {
            return res.status(400).json({ message: 'Valid Student ID and Office Hours are required'});
        }
        const attendanceIntent = await prisma.attendanceIntent.create({ data: {studentId, officeHourId}});
        const attendanceCount = await prisma.attendanceIntent.count({where: {officeHourId}});
        res.status(201).json({message: 'You have marked your intent to attend', attendanceIntent, attendanceCount});
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'You already signed up for this session'});
        }
        if (error.code === 'P2003') {
            return res.status (404).json({ message: 'Student Id or office hours not found'});
        }
        console.error(error);
        res.status(500).json({message: 'Failed to mark your intent to attend'});
    }
});
//Remove attendance intent
router.delete('/', async (req, res) => {
    try {
        const { studentId, officeHourId } = req.body;
        if ( !Number.isInteger(studentId) || !Number.isInteger(officeHourId)) {
            return res.status(400).json ({ message: 'Valid Student ID and Office Hours are required'});
        }
        const existingIntent = await prisma.attendanceIntent.findUnique({
            where: { studentId_officeHourId: { studentId, officeHourId}}});
        if (!existingIntent) {
            return res.status(404).json({ message: 'Your intent to attend has not been found'});
        }
        await prisma.attendanceIntent.delete({
            where: { studentId_officeHourId: {studentId, officeHourId}}});
        const attendanceCount = await prisma.attendanceIntent.count({
            where: {officeHourId}});
        res.status(200).json({ message: 'Your mark to attend has been removed', attendanceCount});

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove your mark to attend'});
}
});
module.exports = router;
