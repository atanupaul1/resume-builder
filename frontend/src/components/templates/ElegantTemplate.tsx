"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function ElegantTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1e293b";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "8px" }}>Professional Profile</h2>
          <p style={{ fontSize: "11.5px", color: "#334155", lineHeight: "1.7", margin: 0, fontStyle: "italic" }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "16px" }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: accent, margin: "2px 0 8px" }}>{job.company} • {job.location}</div>
                <ul style={{ margin: 0, paddingLeft: "18px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11px", color: "#475569", lineHeight: "1.6", marginBottom: "4px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "16px" }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{edu.degree} in {edu.field}</h3>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{edu.endDate}</span>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0" }}>{edu.institution}{edu.grade ? ` • GPA: ${edu.grade}` : ""}</p>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>Skills & Expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "x" }}>
            {skillGroups.map(group => (
              <div key={group.id} style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>{group.category}: </span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>{group.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1e293b", padding: "60px 50px" }}>
      <header style={{ marginBottom: "50px", borderBottom: `2px solid ${accent}`, paddingBottom: "30px" }}>
        <h1 style={{ fontSize: "38px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-1.5px", textAlign: "center", textTransform: "uppercase" }}>{p.fullName || "FULL NAME"}</h1>
        <p style={{ fontSize: "14px", fontWeight: 700, color: accent, marginTop: "8px", letterSpacing: "3px", textTransform: "uppercase", textAlign: "center" }}>{p.jobTitle || "PROFESSIONAL TITLE"}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• linkedin.com/in/{p.linkedin}</span>}
        </div>
      </header>

      <main>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
