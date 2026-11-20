"use client";

import { useState, useEffect } from "react";
import { OfficeHourSession, mockCourses } from "@/data/mockData";

interface TAEditorModalProps {
    isOpen: boolean;
    initialSession: OfficeHourSession | null; // null = creating a new session
    onClose: () => void;
    onSave: (data: {
        courseId: string;
        day: string;
        timeRange: string;
        location: string;
        virtualLink: string;
    }) => void;
}

export default function TAEditorModal({
    isOpen,
    initialSession,
    onClose,
    onSave,
}: TAEditorModalProps) {
    const [courseId, setCourseId] = useState(mockCourses[0].id);
    const [day, setDay] = useState("Monday");
    const [timeRange, setTimeRange] = useState("");
    const [location, setLocation] = useState("");
    const [virtualLink, setVirtualLink] = useState("");

    useEffect(() => {
        if (initialSession) {
            setCourseId(initialSession.courseId);
            setDay(initialSession.day);
            setTimeRange(initialSession.timeRange);
            setLocation(initialSession.location);
            setVirtualLink(initialSession.virtualLink ?? "");
        } else {
            setCourseId(mockCourses[0].id);
            setDay("Monday");
            setTimeRange("");
            setLocation("");
            setVirtualLink("");
        }
    }, [initialSession, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ courseId, day, timeRange, location, virtualLink });
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#fff",
                    color: "#111",
                    padding: "24px",
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: "440px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
            >
                <h2 style={{ marginTop: 0 }}>
                    {initialSession ? "Edit Office Hours" : "Add Office Hours"}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <label>
                        <strong>Course</strong>
                        <select
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                        >
                            {mockCourses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.code} - {c.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <strong>Day</strong>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                        >
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <strong>Time Range</strong>
                        <input
                            type="text"
                            required
                            placeholder="e.g., 2:00 PM - 4:00 PM"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "4px", boxSizing: "border-box" }}
                        />
                    </label>

                    <label>
                        <strong>Physical Location</strong>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Sennott Square 5502 or Virtual Only"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "4px", boxSizing: "border-box" }}
                        />
                    </label>

                    <label>
                        <strong>Virtual Meeting Link (Optional)</strong>
                        <input
                            type="url"
                            placeholder="https://zoom.us/j/..."
                            value={virtualLink}
                            onChange={(e) => setVirtualLink(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "4px", boxSizing: "border-box" }}
                        />
                    </label>

                    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                backgroundColor: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: "10px",
                                borderRadius: "6px",
                                border: "none",
                                backgroundColor: "#111",
                                color: "#fff",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}