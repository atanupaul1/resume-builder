"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function CurrentTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1e293b";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "8px" }}>Profile</h2>
          <p style={{ fontSize: "12px", color: "#334155", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>Professional History</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{job.role}</h3>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: accent, marginBottom: "6px" }}>{job.company} • {job.location}</div>
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
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>Education</h2>
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
        <section key={key} style={{ marginBottom: "15px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>Expertise</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skillGroups.map(group => group.skills.map((s, i) => (
              <span key={`${group.id}-${i}`} style={{ padding: "4px 10px", backgroundColor: "#f1f5f9", borderRadius: "100px", fontSize: "11px", fontWeight: 600, color: "#475569", border: "1px solid #e2e8f0" }}>{s}</span>
            )))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#f8fafc", fontFamily: "'Inter', sans-serif", color: "#1e293b" }}>
      <header style={{ backgroundColor: accent, padding: "50px 45px", color: "#fff", clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-1.5px", lineHeight: "1" }}>{p.fullName || "YOUR NAME"}</h1>
        <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginTop: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{p.jobTitle || "PROFESSIONAL TITLE"}</p>
        <div style={{ display: "flex", gap: "16px", marginTop: "24px", fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• in/{p.linkedin}</span>}
        </div>
      </header>

      <main style={{ padding: "40px 45px", backgroundColor: "white", margin: "0 20px 20px", borderRadius: "0 0 8px 8px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
