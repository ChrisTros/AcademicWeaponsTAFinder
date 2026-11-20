"use client";

import { useState } from "react";
import Link from "next/link";
import {
    mockCurrentUser,
    mockCourses,
    mockSessions,
    OfficeHourSession,
} from "@/data/mockData";
import TAEditorModal from "@/components/TAEditorModal";

export default function TAPortalPage() {
    // US8: Block regular students from accessing TA editing tools
    if (mockCurrentUser.role !== "TA") {
        return (
            <main style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", fontFamily: "sans-serif" }}>
                <h1 style={{ color: "#dc2626" }}>Access Denied</h1>
                <p style={{ color: "#555" }}>
                    This page is restricted to Teaching Assistants. Your current account ({mockCurrentUser.email}) does not have TA permissions.
                </p>
                <Link
                    href="/dashboard"
                    style={{
                        display: "inline-block",
                        marginTop: "16px",
                        padding: "10px 18px",
                        backgroundColor: "#111",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "6px",
                    }}
                >
                    Return to Student Dashboard
                </Link>
            </main>
        );
    }

    // US8: Restrict TAs to modifying ONLY their own assigned office hours
    const [mySessions, setMySessions] = useState<OfficeHourSession[]>(
        mockSessions.filter((s) => s.taEmail === mockCurrentUser.email)
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<OfficeHourSession | null>(null);

    const getCourseCode = (courseId: string) =>
        mockCourses.find((c) => c.id === courseId)?.code ?? "Unknown";

    const handleOpenCreate = () => {
        setEditingSession(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (session: OfficeHourSession) => {
        setEditingSession(session);
        setIsModalOpen(true);
    };

    // US6: Save new or updated office hours
    const handleSaveSession = (data: {
        courseId: string;
        day: string;
        timeRange: string;
        location: string;
        virtualLink: string;
    }) => {
        if (editingSession) {
            setMySessions((prev) =>
                prev.map((s) =>
                    s.id === editingSession.id
                        ? { ...s, ...data, virtualLink: data.virtualLink || undefined }
                        : s
                )
            );
        } else {
            const newSession: OfficeHourSession = {
                id: `s-${Date.now()}`,
                courseId: data.courseId,
                taName: mockCurrentUser.name,
                taEmail: mockCurrentUser.email,
                day: data.day,
                timeRange: data.timeRange,
                location: data.location,
                virtualLink: data.virtualLink || undefined,
                status: "active",
                attendanceCount: 0,
                userHasIntent: false,
            };
            setMySessions((prev) => [...prev, newSession]);
        }
        setIsModalOpen(false);
    };

    // US7: Cancel an active office hour session
    const handleCancelSession = (sessionId: string) => {
        setMySessions((prev) =>
            prev.map((s) => (s.id === sessionId ? { ...s, status: "canceled" } : s))
        );
    };

    return (
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px", fontFamily: "sans-serif" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                    <h1 style={{ margin: "0 0 6px 0" }}>TA Portal</h1>
                    <p style={{ margin: 0, color: "#666" }}>
                        Manage your assigned office hours, {mockCurrentUser.name}
                    </p>
                </div>

                <button
                    onClick={handleOpenCreate}
                    style={{
                        padding: "10px 16px",
                        backgroundColor: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    + Add Office Hours
                </button>
            </header>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {mySessions.length === 0 ? (
                    <p style={{ color: "#666" }}>You have no scheduled office hours yet.</p>
                ) : (
                    mySessions.map((session) => {
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
                                }}
                            >
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ fontWeight: "bold", color: "#2563eb" }}>
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
                                    <p style={{ margin: "6px 0 4px 0", fontWeight: "bold" }}>
                                        {session.day} • {session.timeRange}
                                    </p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
                                        Location: {session.location}
                                    </p>
                                    <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
                                        {session.attendanceCount} student{session.attendanceCount === 1 ? "" : "s"} planning to attend
                                    </p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "160px" }}>
                                    <button
                                        onClick={() => handleOpenEdit(session)}
                                        style={{
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                            backgroundColor: "#fff",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit Details
                                    </button>

                                    {!isCanceled && (
                                        <button
                                            onClick={() => handleCancelSession(session.id)}
                                            style={{
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                border: "none",
                                                backgroundColor: "#dc2626",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel Office Hours
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <TAEditorModal
                isOpen={isModalOpen}
                initialSession={editingSession}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSession}
            />
        </main>
    );
}