const prisma = require('../config/prisma');

// Gets all office-hours with its TA and course
const getAllOfficeHours = async () => {
    return await prisma.officeHour.findMany({
        include: {
            ta: true,
            course: true
        }
    });
};

module.exports = { getAllOfficeHours };