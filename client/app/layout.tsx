import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}