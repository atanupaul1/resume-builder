"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function IconicTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#111827";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "32px", padding: "20px", background: "#f8fafc", borderRadius: "16px", border: "1px dashed #cbd5e1" }}>
          <p style={{ fontSize: "14px", color: "#334155", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: accent, marginBottom: "20px" }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: accent }} />
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                </div>
                <div style={{ paddingLeft: "20px", borderLeft: `2px solid #f1f5f9`, marginLeft: "3px" }}>
                   <div style={{ fontSize: "13px", fontWeight: 700, color: accent, marginBottom: "10px" }}>{job.company} • {job.startDate} — {job.endDate}</div>
                   <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6", marginBottom: "6px" }}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: accent, marginBottom: "20px" }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "15px", display: "flex", gap: "20px" }}>
               <div style={{ width: "45px", height: "45px", background: "#f1f5f9", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "20px" }}>🎓</div>
               <div>
                 <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#1e293b" }}>{edu.degree} in {edu.field}</h3>
                 <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0" }}>{edu.institution} | {edu.endDate}</p>
               </div>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: accent, marginBottom: "20px" }}>Expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {skillGroups.map(group => group.skills.map((s, i) => (
              <div key={`${group.id}-${i}`} style={{ padding: "10px 15px", backgroundColor: "#fff", border: `2px solid #f1f5f9`, borderRadius: "12px", fontSize: "12px", fontWeight: 700, color: "#334155", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: accent }}>★</span> {s}
              </div>
            )))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", padding: "60px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "60px", padding: "40px", backgroundColor: accent, borderRadius: "24px", color: "white" }}>
        <div>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-1.5px" }}>{p.fullName || "NAME"}</h1>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginTop: "4px" }}>{p.jobTitle || "ROLE"}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", fontWeight: 600, lineHeight: "1.8", color: "rgba(255,255,255,0.8)" }}>
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
        </div>
      </header>

      <main>
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
