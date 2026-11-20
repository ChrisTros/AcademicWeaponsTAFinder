-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeHour" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "taId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "OfficeHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceIntent" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "officeHourId" INTEGER NOT NULL,

    CONSTRAINT "AttendanceIntent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_key" ON "Course"("courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceIntent_studentId_officeHourId_key" ON "AttendanceIntent"("studentId", "officeHourId");

-- AddForeignKey
ALTER TABLE "OfficeHour" ADD CONSTRAINT "OfficeHour_taId_fkey" FOREIGN KEY ("taId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfficeHour" ADD CONSTRAINT "OfficeHour_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceIntent" ADD CONSTRAINT "AttendanceIntent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceIntent" ADD CONSTRAINT "AttendanceIntent_officeHourId_fkey" FOREIGN KEY ("officeHourId") REFERENCES "OfficeHour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
