"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function IndigoTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#4f46e5";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "26px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>About Me</h2>
          <p style={{ fontSize: "11.5px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{summary}</p>
        </section>
      ) : null;

      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "26px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>{job.role}</h3>
                  <span style={{ fontSize: "10.5px", fontWeight: 600, color: accent }}>{job.startDate} — {job.endDate}</span>
                </div>
                <div style={{ fontSize: "11.5px", fontWeight: 600, color: "#64748b", margin: "2px 0 8px" }}>{job.company} • {job.location}</div>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11px", color: "#475569", lineHeight: "1.5", marginBottom: "3px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;

      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "26px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Academic</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{edu.degree} in {edu.field}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                <span>{edu.institution}</span>
                <span>{edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>
      ) : null;

      case "skills": return null; // Skills in sidebar
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#1e293b", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: "240px", backgroundColor: "#f8fafc", padding: "50px 30px", borderRight: "1px solid #e2e8f0" }}>
        <div style={{ width: "100px", height: "100px", backgroundColor: "#e2e8f0", borderRadius: "20px", marginBottom: "30px", overflow: "hidden" }}>
           {p.photo ? <img src={p.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "40px", fontWeight: 900 }}>{p.fullName?.[0]}</div>}
        </div>

        <section style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Contact</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "10.5px", color: "#64748b" }}>
            {p.email && <div>✉️ {p.email}</div>}
            {p.phone && <div>📞 {p.phone}</div>}
            {p.location && <div>📍 {p.location}</div>}
            {p.linkedin && <div>🔗 in/{p.linkedin}</div>}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Skillset</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {skillGroups.map(group => group.skills.map((s, i) => (
              <span key={`${group.id}-${i}`} style={{ padding: "4px 8px", backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "10px", fontWeight: 600, color: "#475569" }}>{s}</span>
            )))}
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "50px 45px" }}>
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-1px" }}>{p.fullName || "NAME"}</h1>
          <p style={{ fontSize: "15px", fontWeight: 600, color: accent, marginTop: "4px" }}>{p.jobTitle || "PROFESSIONAL ROLE"}</p>
        </header>

        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
}
