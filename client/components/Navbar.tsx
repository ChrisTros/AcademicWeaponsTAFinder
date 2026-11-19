"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockCurrentUser } from "@/data/mockData";

export default function Navbar() {
    const pathname = usePathname();

    // Don't show the navbar on the login screen
    if (pathname === "/login") return null;

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 24px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#fff",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <Link
                    href="/dashboard"
                    style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        textDecoration: "none",
                        color: "#111",
                    }}
                >
                    TA Finder
                </Link>

                <div style={{ display: "flex", gap: "16px" }}>
                    <Link
                        href="/dashboard"
                        style={{
                            textDecoration: "none",
                            color: pathname === "/dashboard" ? "#2563eb" : "#555",
                            fontWeight: pathname === "/dashboard" ? "bold" : "normal",
                        }}
                    >
                        Dashboard
                    </Link>

                    {/* US8: Only show TA Portal link to TAs */}
                    {mockCurrentUser.role === "TA" && (
                        <Link
                            href="/ta-portal"
                            style={{
                                textDecoration: "none",
                                color: pathname === "/ta-portal" ? "#2563eb" : "#555",
                                fontWeight: pathname === "/ta-portal" ? "bold" : "normal",
                            }}
                        >
                            TA Portal
                        </Link>
                    )}
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "14px" }}>
                <span style={{ color: "#555" }}>
                    {mockCurrentUser.name} ({mockCurrentUser.role})
                </span>
                <Link
                    href="/login"
                    style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        textDecoration: "none",
                        color: "#111",
                        fontSize: "13px",
                    }}
                >
                    Sign Out
                </Link>
            </div>
        </nav>
    );
}