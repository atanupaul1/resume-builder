"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function CrispTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#0f172a";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", marginBottom: "8px", borderLeft: `3px solid ${accent}`, paddingLeft: "10px" }}>Professional Summary</h2>
          <p style={{ fontSize: "11.5px", color: "#334155", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", marginBottom: "12px", borderLeft: `3px solid ${accent}`, paddingLeft: "10px" }}>Work History</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>{job.role}</h3>
                  <span style={{ fontSize: "10.5px", fontWeight: 600, color: "#64748b" }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "11.5px", fontWeight: 600, color: accent }}>{job.company}</div>
                <ul style={{ margin: "6px 0 0", paddingLeft: "18px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11px", color: "#475569", lineHeight: "1.5", marginBottom: "3px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", marginBottom: "12px", borderLeft: `3px solid ${accent}`, paddingLeft: "10px" }}>Academic Qualifications</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "12.5px", fontWeight: 700, color: "#1e293b" }}>{edu.degree} in {edu.field}</h3>
                <span style={{ fontSize: "10.5px", color: "#64748b" }}>{edu.endDate}</span>
              </div>
              <p style={{ fontSize: "11.5px", color: "#475569", margin: "2px 0 0" }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", marginBottom: "12px", borderLeft: `3px solid ${accent}`, paddingLeft: "10px" }}>Tech Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {skillGroups.map(group => (
              <div key={group.id}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#334155", marginBottom: "2px" }}>{group.category}</h4>
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
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1e293b", padding: "60px 45px" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid #e2e8f0`, paddingBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: accent, margin: 0, letterSpacing: "-1px" }}>{p.fullName || "NAME"}</h1>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#64748b", marginTop: "4px" }}>{p.jobTitle || "PROFESSION"}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "10.5px", color: "#64748b", lineHeight: "1.8", fontWeight: 500 }}>
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
          {p.linkedin && <div>linkedin.com/in/{p.linkedin}</div>}
        </div>
      </header>

      <main>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
