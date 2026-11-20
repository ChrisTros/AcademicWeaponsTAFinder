require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    // Create a sample TA
    const ta = await prisma.user.upsert({
        where: { email: 'ta.demo@example.com' },
        update: {},
        create: {
            name: 'John Cena',
            email: 'ta.demo@example.com',
            role: 'TA'
        }
    });

    // Create a sample course
    const course = await prisma.course.upsert({
        where: { courseCode: 'CS 1501' },
        update: {},
        create: {
            courseCode: 'CS 1501',
            courseName: 'Algorithms'
        }
    });

    console.log('Sample TA:', ta);
    console.log('Sample course:', course);

    const officeHour = await prisma.officeHour.create({
    data: {
        day: "Monday",
        startTime: "14:00",
        endTime: "16:00",
        location: "Sennott Square",

        taId: ta.id,
        courseId: course.id
        }
    });

console.log('Sample office hour:', officeHour);

}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });