"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function ProfessionalTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1e3a8a";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "8px" }}>Professional Profile</h2>
          <p style={{ fontSize: "12px", color: "#1e293b", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Work Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{job.role}</h3>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: accent, margin: "2px 0 6px" }}>{job.company} | {job.location}</div>
                <ul style={{ margin: 0, paddingLeft: "18px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11.5px", color: "#334155", lineHeight: "1.5", marginBottom: "4px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{edu.degree} in {edu.field}</h3>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>{edu.endDate}</span>
              </div>
              <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0" }}>{edu.institution}{edu.grade ? ` | GPA: ${edu.grade}` : ""}</p>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Technical Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skillGroups.map(group => (
              <div key={group.id} style={{ width: "100%", display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#1e293b", minWidth: "120px" }}>{group.category}:</span>
                <span style={{ fontSize: "11.5px", color: "#475569" }}>{group.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1a202c", padding: "60px 50px" }}>
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "38px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-1px" }}>{p.fullName || "NAME"}</h1>
        <p style={{ fontSize: "16px", fontWeight: 600, color: accent, marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{p.jobTitle || "PROFESSIONAL"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "16px", fontSize: "11.5px", color: "#475569", fontWeight: 500 }}>
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
