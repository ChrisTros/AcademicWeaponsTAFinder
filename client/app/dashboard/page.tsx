"use client";

import { useState } from "react";
import {
    mockCurrentUser,
    mockCourses,
    mockSessions,
    OfficeHourSession,
} from "@/data/mockData";
import TADetailsModal from "@/components/TADetailsModal";

export default function DashboardPage() {
    // Filter courses to only what the student is enrolled in (US1)
    const enrolledCourses = mockCourses.filter((course) =>
        mockCurrentUser.enrolledCourseIds.includes(course.id)
    );

    const [selectedCourseId, setSelectedCourseId] = useState<string>("ALL");
    const [sessions, setSessions] = useState<OfficeHourSession[]>(
        mockSessions.filter((s) => mockCurrentUser.enrolledCourseIds.includes(s.courseId))
    );
    const [selectedSession, setSelectedSession] = useState<OfficeHourSession | null>(null);

    // Filter displayed sessions based on selected course pill (US1)
    const visibleSessions =
        selectedCourseId === "ALL"
            ? sessions
            : sessions.filter((s) => s.courseId === selectedCourseId);

    // Toggle "Intent to Attend" / "Remove Intent" (US4 & US5)
    const handleToggleIntent = (sessionId: string) => {
        setSessions((prev) =>
            prev.map((session) => {
                if (session.id !== sessionId) return session;
                const nextIntent = !session.userHasIntent;
                return {
                    ...session,
                    userHasIntent: nextIntent,
                    attendanceCount: nextIntent
                        ? session.attendanceCount + 1
                        : Math.max(0, session.attendanceCount - 1),
                };
            })
        );
    };

    const getCourseCode = (courseId: string) =>
        mockCourses.find((c) => c.id === courseId)?.code ?? "Unknown";

    return (
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px", fontFamily: "sans-serif" }}>
            <header style={{ marginBottom: "24px" }}>
                <h1 style={{ margin: "0 0 6px 0" }}>TA Office Hours</h1>
                <p style={{ margin: 0, color: "#666" }}>
                    Welcome back, {mockCurrentUser.name}
                </p>
            </header>

            {/* Course Filter Pills (US1) */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                <button
                    onClick={() => setSelectedCourseId("ALL")}
                    style={{
                        padding: "8px 14px",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: selectedCourseId === "ALL" ? "#111" : "#fff",
                        color: selectedCourseId === "ALL" ? "#fff" : "#111",
                    }}
                >
                    All Enrolled Courses
                </button>

                {enrolledCourses.map((course) => (
                    <button
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "20px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            backgroundColor: selectedCourseId === course.id ? "#111" : "#fff",
                            color: selectedCourseId === course.id ? "#fff" : "#111",
                        }}
                    >
                        {course.code}
                    </button>
                ))}
            </div>

            {/* Session List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {visibleSessions.map((session) => {
                    const isCanceled = session.status === "canceled";

                    return (
                        <div
                            key={session.id}
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                padding: "16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: isCanceled ? "#fef2f2" : "#fff",
                                opacity: isCanceled ? 0.8 : 1,
                            }}
                        >
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2563eb" }}>
                                        {getCourseCode(session.courseId)}
                                    </span>
                                    {isCanceled && (
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                color: "#b91c1c",
                                                backgroundColor: "#fee2e2",
                                                padding: "2px 8px",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            CANCELED
                                        </span>
                                    )}
                                </div>

                                <h3 style={{ margin: "6px 0 4px 0" }}>{session.taName}</h3>
                                <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
                                    {session.day} • {session.timeRange} • {session.location}
                                </p>
                                <p style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#666" }}>
                                    {session.attendanceCount} student{session.attendanceCount === 1 ? "" : "s"} planning to attend
                                </p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "150px" }}>
                                <button
                                    onClick={() => setSelectedSession(session)}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        border: "1.5px solid #111827",
                                        backgroundColor: "#f9fafb",
                                        color: "#111827",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                >
                                    View TA Details
                                </button>

                                <button
                                    disabled={isCanceled}
                                    onClick={() => handleToggleIntent(session.id)}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        border: "none",
                                        cursor: isCanceled ? "not-allowed" : "pointer",
                                        backgroundColor: isCanceled
                                            ? "#d1d5db"
                                            : session.userHasIntent
                                                ? "#dc2626"
                                                : "#16a34a",
                                        color: "#fff",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {isCanceled
                                        ? "Unavailable"
                                        : session.userHasIntent
                                            ? "Remove Intent"
                                            : "Intent to Attend"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* TA Details Modal (US2) */}
            <TADetailsModal
                session={selectedSession}
                courseCode={selectedSession ? getCourseCode(selectedSession.courseId) : ""}
                onClose={() => setSelectedSession(null)}
            />
        </main>
    );
}