"use client";

import { useRouter } from "next/navigation";
import { mockCurrentUser } from "@/data/mockData";

export default function LoginPage() {
    const router = useRouter();

    const handleUniversityLogin = () => {
        // Later, this will trigger your real university SSO / Express auth endpoint
        router.push("/dashboard");
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9fafb",
                fontFamily: "sans-serif",
                padding: "20px",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "40px 32px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                }}
            >
                <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>TA Finder</h1>
                <p style={{ margin: "0 0 28px 0", color: "#555", fontSize: "14px" }}>
                    Sign in with your university credentials to view your enrolled courses and TA office hours.
                </p>

                <button
                    onClick={handleUniversityLogin}
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "#1d4ed8",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "15px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Sign in with University Credentials
                </button>

                <p style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>
                    Dev Mode: Signing in as <strong>{mockCurrentUser.name}</strong> ({mockCurrentUser.role})
                </p>
            </div>
        </main>
    );
}