"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function PortfolioTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#f43f5e";

  const sections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <section key="summary" style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "20px" }}>The Profile</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6", fontWeight: 400, color: "#1a1a1a" }}>{summary}</p>
      </section>
    ) : null,
    workExperience: (
      <section key="workExperience" style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "30px" }}>Chronicle</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
           {workExperience.map(job => (
             <div key={job.id}>
                <div style={{ fontSize: "12px", color: accent, fontWeight: 700, marginBottom: "8px" }}>{job.startDate} — {job.current ? "ACTIVE" : job.endDate}</div>
                <h3 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "4px" }}>{job.role}</h3>
                <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>{job.company} • {job.location}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {job.bullets.map((b, i) => (
                    <div key={i} style={{ fontSize: "13px", color: "#444", padding: "16px", background: "#f8f9fa", borderRadius: "12px", border: "1px solid #eee" }}>{b}</div>
                  ))}
                </div>
             </div>
           ))}
        </div>
      </section>
    ),
    skills: (
      <section key="skills" style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "30px" }}>Weaponry</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {skillGroups.map(group => (
            <div key={group.id} style={{ background: "#000", color: "#fff", padding: "24px", borderRadius: "20px" }}>
              <h4 style={{ fontSize: "11px", fontWeight: 800, color: accent, marginBottom: "16px", textTransform: "uppercase" }}>{group.category}</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                 {group.skills.map(s => <span key={s} style={{ fontSize: "11px", fontWeight: 600, color: "#eee" }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    education: null, personalInfo: null, contact: null
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Sora', sans-serif", color: "#000", padding: "80px" }}>
       <header style={{ marginBottom: "100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 style={{ fontSize: "84px", fontWeight: 900, letterSpacing: "-5px", lineHeight: "0.8", marginBottom: "20px" }}>{p.fullName || "NAME"}</h1>
              <p style={{ fontSize: "20px", fontWeight: 500, color: accent, letterSpacing: "2px", textTransform: "uppercase" }}>{p.jobTitle || "CREATIVE"}</p>
            </div>
            <div style={{ textAlign: "right", fontSize: "12px", fontWeight: 500, color: "#666" }}>
              <div>{p.email}</div>
              <div>{p.phone}</div>
              <div>{p.location}</div>
            </div>
          </div>
       </header>

       <main>
          {sectionOrder.map(key => sections[key])}
       </main>
    </div>
  );
}
