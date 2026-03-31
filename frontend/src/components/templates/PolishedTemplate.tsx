"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function PolishedTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1e293b";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "8px" }}>Profile</h2>
          <p style={{ fontSize: "11.5px", color: "#334155", lineHeight: "1.7", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "16px" }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {workExperience.map(job => (
              <div key={job.id} style={{ display: "flex", gap: "24px" }}>
                <div style={{ width: "100px", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", paddingTop: "4px" }}>
                  {job.startDate} — {job.endDate}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: accent, margin: "2px 0 8px" }}>{job.company} • {job.location}</div>
                  <ul style={{ margin: 0, paddingLeft: "16px" }}>
                    {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11px", color: "#475569", lineHeight: "1.6", marginBottom: "4px" }}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "16px" }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ display: "flex", gap: "24px", marginBottom: "12px" }}>
              <div style={{ width: "100px", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", paddingTop: "2px" }}>
                {edu.endDate}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{edu.degree} in {edu.field}</h3>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0" }}>{edu.institution}{edu.grade ? ` • GPA: ${edu.grade}` : ""}</p>
              </div>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>Proficiencies</h2>
          <div style={{ paddingLeft: "124px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {skillGroups.map(group => (
                <div key={group.id}>
                  <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#334155", marginBottom: "2px" }}>{group.category}</h4>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{group.skills.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1e293b", padding: "70px 60px" }}>
      <header style={{ marginBottom: "50px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-1.5px", lineHeight: "1" }}>{p.fullName || "NAME"}</h1>
        <p style={{ fontSize: "15px", fontWeight: 600, color: accent, marginTop: "8px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{p.jobTitle || "PROFESSION"}</p>
        <div style={{ display: "flex", gap: "16px", marginTop: "24px", fontSize: "11px", color: "#64748b", fontWeight: 500, borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
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
