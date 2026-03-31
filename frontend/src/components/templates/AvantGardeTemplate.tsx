"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function AvantGardeTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#000000";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "32px", position: "relative" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px", color: accent, borderLeft: `8px solid ${accent}`, paddingLeft: "15px" }}>Manifesto</h2>
          <p style={{ fontSize: "13px", color: "#1a1a1a", lineHeight: "1.8", margin: 0, fontWeight: 500 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "20px", color: accent, borderLeft: `8px solid ${accent}`, paddingLeft: "15px" }}>Chronicle</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {workExperience.map(job => (
              <div key={job.id} style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#000", margin: 0 }}>{job.role}</h3>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: accent, marginTop: "4px" }}>{job.company} — {job.location}</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: accent, color: "#fff", padding: "4px 8px" }}>{job.startDate} • {job.endDate}</span>
                </div>
                <ul style={{ margin: "12px 0 0", paddingLeft: "20px", listStyleType: "square" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "12px", color: "#333", lineHeight: "1.6", marginBottom: "6px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "20px", color: accent, borderLeft: `8px solid ${accent}`, paddingLeft: "15px" }}>Foundation</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#000" }}>{edu.degree} in {edu.field}</h3>
                <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0" }}>{edu.institution}</p>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: accent }}>{edu.endDate}</span>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "16px", color: accent, borderLeft: `8px solid ${accent}`, paddingLeft: "15px" }}>Capabilities</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skillGroups.map(group => group.skills.map((s, i) => (
              <span key={`${group.id}-${i}`} style={{ padding: "6px 12px", border: `2px solid ${accent}`, fontSize: "11px", fontWeight: 800, color: accent, textTransform: "uppercase" }}>{s}</span>
            )))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", padding: "60px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "60px", borderBottom: `10px solid ${accent}`, paddingBottom: "30px" }}>
        <div style={{ maxWidth: "60%" }}>
          <h1 style={{ fontSize: "52px", fontWeight: 900, color: "#000", margin: 0, letterSpacing: "-3px", lineHeight: "0.9" }}>{p.fullName || "NAME"}</h1>
          <p style={{ fontSize: "18px", fontWeight: 700, color: accent, marginTop: "10px", textTransform: "uppercase", letterSpacing: "4px" }}>{p.jobTitle || "ROLE"}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#000" }}>
          {p.email && <div style={{ marginBottom: "4px" }}>{p.email}</div>}
          {p.phone && <div style={{ marginBottom: "4px" }}>{p.phone}</div>}
          {p.location && <div style={{ marginBottom: "4px" }}>{p.location}</div>}
          {p.linkedin && <div>linkedin.com/in/{p.linkedin}</div>}
        </div>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
