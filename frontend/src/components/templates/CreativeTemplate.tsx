"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function CreativeTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#ec4899"; // Default pink-ish creative accent

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>The Gist</h2>
          <p style={{ fontSize: "14px", color: "#1e293b", lineHeight: "1.6", margin: 0, borderLeft: `4px solid ${accent}`, paddingLeft: "15px" }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "15px" }}>Adventures</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {workExperience.map(job => (
              <div key={job.id} style={{ position: "relative" }}>
                 <div style={{ position: "absolute", left: "-25px", top: "5px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: accent }} />
                <div style={{ borderLeft: `2px solid #f1f5f9`, paddingLeft: "25px", marginLeft: "-19px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700, color: accent, marginTop: "2px" }}>
                    <span>{job.company}</span>
                    <span>{job.startDate} — {job.endDate}</span>
                  </div>
                  <ul style={{ margin: "10px 0 0", paddingLeft: "18px" }}>
                    {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11.5px", color: "#475569", lineHeight: "1.5", marginBottom: "4px" }}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "15px" }}>Growth</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {education.map(edu => (
              <div key={edu.id} style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 800, color: "#1e293b" }}>{edu.degree}</h3>
                <p style={{ fontSize: "11px", color: accent, fontWeight: 700, margin: "2px 0" }}>{edu.field}</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{edu.institution} • {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "15px" }}>Superpowers</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skillGroups.map(group => group.skills.map((s, i) => (
              <span key={`${group.id}-${i}`} style={{ padding: "6px 14px", backgroundColor: accent, color: "white", borderRadius: "100px", fontSize: "11px", fontWeight: 700, boxShadow: `0 4px 6px -1px ${accent}44` }}>{s}</span>
            )))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", padding: "60px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "60px" }}>
        <div style={{ width: "140px", height: "140px", borderRadius: "30px", backgroundColor: accent, overflow: "hidden", transform: "rotate(-3deg)", flexShrink: 0, boxShadow: "20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff" }}>
          {p.photo ? <img src={p.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "60px", fontWeight: 900 }}>{p.fullName?.[0]}</div>}
        </div>
        <div>
          <h1 style={{ fontSize: "48px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-1.5px" }}>{p.fullName || "NAME"}</h1>
          <p style={{ fontSize: "20px", fontWeight: 700, color: accent, marginTop: "5px" }}>{p.jobTitle || "CREATIVE"}</p>
          <div style={{ display: "flex", gap: "15px", marginTop: "15px", fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
            {p.email && <span>{p.email}</span>}
            {p.location && <span>📍 {p.location}</span>}
            {p.linkedin && <span>🔗 in/{p.linkedin}</span>}
          </div>
        </div>
      </header>

      <main>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
