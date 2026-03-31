"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function EssentialTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#334155";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", fontWeight: 700, color: accent, textTransform: "uppercase", marginBottom: "8px" }}>Professional Profile</h2>
          <p style={{ fontSize: "11.5px", color: "#1e293b", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", fontWeight: 700, color: accent, textTransform: "uppercase", marginBottom: "10px" }}>Experience Highlights</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{job.role}</h3>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569", fontStyle: "italic", marginBottom: "6px" }}>{job.company} | {job.location}</div>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11px", color: "#334155", lineHeight: "1.5", marginBottom: "3px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", fontWeight: 700, color: accent, textTransform: "uppercase", marginBottom: "10px" }}>Academic History</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{edu.degree} in {edu.field}</h3>
                <span style={{ fontSize: "11px", color: "#64748b" }}>{edu.endDate}</span>
              </div>
              <p style={{ fontSize: "11px", color: "#475569", margin: "2px 0 0" }}>{edu.institution}{edu.grade ? ` | GPA: ${edu.grade}` : ""}</p>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", fontWeight: 700, color: accent, textTransform: "uppercase", marginBottom: "10px" }}>Skills & Tools</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {skillGroups.map(group => (
              <div key={group.id} style={{ flex: "1 1 200px" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#334155", marginBottom: "3px" }}>{group.category}</h4>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{group.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1a202c", padding: "60px 45px" }}>
      <header style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", margin: "0 0 8px 0", letterSpacing: "-1px" }}>{p.fullName || "YOUR FULL NAME"}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", fontSize: "11px", color: "#4b5563", fontWeight: 500 }}>
          {p.email && <span>{p.email}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.linkedin && <span>• linkedin.com/in/{p.linkedin}</span>}
        </div>
      </header>

      <main>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
