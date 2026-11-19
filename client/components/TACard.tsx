interface TACardProps {
    name: string;
    course: string;
    officeHours: string;
}

export default function TACard({ name, course, officeHours }: TACardProps) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", marginBottom: "12px" }}>
            <h2>{name}</h2>
            <p><strong>Course:</strong> {course}</p>
            <p><strong>Office Hours:</strong> {officeHours}</p>
        </div>
    );
}