"use client";

import { OfficeHourSession } from "../data/mockData";

interface TADetailsModalProps {
    session: OfficeHourSession | null;
    courseCode: string;
    onClose: () => void;
}

export default function TADetailsModal({
    session,
    courseCode,
    onClose,
}: TADetailsModalProps) {
    if (!session) return null;

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
                    maxWidth: "420px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ margin: 0 }}>{session.taName}</h2>
                    <button
                        onClick={onClose}
                        style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}
                    >
                        ✕
                    </button>
                </div>

                <p style={{ color: "#555", marginTop: "4px" }}>
                    {courseCode} • {session.day}, {session.timeRange}
                </p>

                <hr style={{ margin: "16px 0", borderColor: "#eee" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                        <strong>Email:</strong>{" "}
                        <a href={`mailto:${session.taEmail}`} style={{ color: "#2563eb" }}>
                            {session.taEmail}
                        </a>
                    </div>
                    <div>
                        <strong>Location:</strong> {session.location}
                    </div>
                    {session.virtualLink && (
                        <div>
                            <strong>Virtual Link:</strong>{" "}
                            <a
                                href={session.virtualLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#2563eb" }}
                            >
                                Join Online Session
                            </a>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
}