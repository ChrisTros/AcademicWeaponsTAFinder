export interface User {
    id: string;
    name: string;
    email: string;
    role: "student" | "TA";
    enrolledCourseIds: string[];
}

export interface Course {
    id: string;
    code: string;
    name: string;
}

export interface OfficeHourSession {
    id: string;
    courseId: string;
    taName: string;
    taEmail: string;
    day: string;
    timeRange: string;
    location: string;
    virtualLink?: string;
    status: "active" | "canceled";
    attendanceCount: number;
    userHasIntent: boolean;
}

// Toggle role between "student" and "TA" to test US8 permissions later
// export const mockCurrentUser: User = {
//     id: "u1",
//     name: "Jordan Lee",
//     email: "jlee@university.edu",
//     role: "student",
//     enrolledCourseIds: ["c1", "c2"], // Only enrolled in c1 and c2 (US1)
// };

export const mockCurrentUser: User = {
    id: "ta1",
    name: "Alex Rivera",
    email: "arivera@university.edu",
    role: "TA",
    enrolledCourseIds: ["c1", "c2"],
};

export const mockCourses: Course[] = [
    { id: "c1", code: "CS 0449", name: "Intro to Systems Software" },
    { id: "c2", code: "CS 1501", name: "Algorithms and Data Structures 2" },
    { id: "c3", code: "CS 1550", name: "Operating Systems" }, // Should NOT appear for mockCurrentUser
];

export const mockSessions: OfficeHourSession[] = [
    {
        id: "s1",
        courseId: "c1",
        taName: "Alex Rivera",
        taEmail: "arivera@university.edu",
        day: "Tuesday",
        timeRange: "2:00 PM - 4:00 PM",
        location: "Sennott Square 5502",
        virtualLink: "https://zoom.us/j/123456789",
        status: "active",
        attendanceCount: 4,
        userHasIntent: false,
    },
    {
        id: "s2",
        courseId: "c1",
        taName: "Samira Patel",
        taEmail: "spatel@university.edu",
        day: "Thursday",
        timeRange: "11:00 AM - 1:00 PM",
        location: "Sennott Square 5313",
        status: "canceled",
        attendanceCount: 2,
        userHasIntent: false,
    },
    {
        id: "s3",
        courseId: "c2",
        taName: "Marcus Chen",
        taEmail: "mchen@university.edu",
        day: "Wednesday",
        timeRange: "3:00 PM - 5:00 PM",
        location: "Virtual Only",
        virtualLink: "https://zoom.us/j/987654321",
        status: "active",
        attendanceCount: 7,
        userHasIntent: true,
    },
    {
        id: "s4",
        courseId: "c3",
        taName: "Taylor Kim",
        taEmail: "tkim@university.edu",
        day: "Friday",
        timeRange: "1:00 PM - 3:00 PM",
        location: "Sennott Square 6110",
        status: "active",
        attendanceCount: 1,
        userHasIntent: false,
    },
];