"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function ContemporaryTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#2563eb";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "8px", borderBottom: `1px solid ${accent}40`, paddingBottom: "4px" }}>Profile</h2>
          <p style={{ fontSize: "12px", color: "#334155", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px", borderBottom: `1px solid ${accent}40`, paddingBottom: "4px" }}>Professional Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{job.role}</h3>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: accent, marginBottom: "8px" }}>{job.company} • {job.location}</div>
                <ul style={{ margin: 0, paddingLeft: "18px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11.5px", color: "#475569", lineHeight: "1.5", marginBottom: "4px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px", borderBottom: `1px solid ${accent}40`, paddingBottom: "4px" }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{edu.degree} in {edu.field}</h3>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{edu.endDate}</span>
              </div>
              <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0" }}>{edu.institution}{edu.grade ? ` • GPA: ${edu.grade}` : ""}</p>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px", borderBottom: `1px solid ${accent}40`, paddingBottom: "4px" }}>Core Competencies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {skillGroups.map(group => (
              <div key={group.id}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>{group.category}</h4>
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
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1e293b", padding: "60px 50px" }}>
      <header style={{ marginBottom: "40px", borderLeft: `6px solid ${accent}`, paddingLeft: "24px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-1px", textTransform: "uppercase", margin: 0, color: "#0f172a" }}>{p.fullName || "NAME"}</h1>
        <p style={{ fontSize: "14px", fontWeight: 600, color: accent, marginTop: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>{p.jobTitle || "PROFESSION"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "16px", fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
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
