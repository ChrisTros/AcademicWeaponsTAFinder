const { PrismaClient } = require('@prisma/client');

// Prisma instance to interactice with db
const prisma = new PrismaClient();

//export for routes and services
module.exports = prisma;
