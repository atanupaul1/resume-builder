"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function TimelineTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#10b981";

  const renderTimelineItem = (date: string, title: string, subtitle: string, bullets: string[] = []) => (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "32px", position: "relative", marginBottom: "32px" }}>
      <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textAlign: "right", marginTop: "4px", paddingRight: "16px" }}>{date}</div>
      <div style={{ position: "relative", paddingLeft: "32px" }}>
        {/* The Dot & Line */}
        <div style={{ position: "absolute", left: "-6px", top: "8px", width: "11px", height: "11px", borderRadius: "50%", backgroundColor: accent, border: "3px solid #fff", zIndex: 10 }} />
        <div style={{ position: "absolute", left: "-1px", top: "16px", bottom: "-48px", width: "1px", backgroundColor: "#e2e8f0" }} />
        
        <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>{title}</h3>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 12px" }}>{subtitle}</p>
        <ul style={{ paddingLeft: "18px", margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {bullets.map((b, i) => <li key={i} style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>{b}</li>)}
        </ul>
      </div>
    </div>
  );

  const sections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <section key="summary" style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "16px" }}>Story</h2>
        <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.7", margin: 0 }}>{summary}</p>
      </section>
    ) : null,
    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "24px" }}>Career Progress</h2>
        <div>
          {workExperience.map(job => renderTimelineItem(
            `${job.startDate} — ${job.current ? "Now" : job.endDate}`,
            job.role,
            `${job.company} • ${job.location}`,
            job.bullets
          ))}
        </div>
      </section>
    ) : null,
    education: education.length > 0 ? (
       <section key="education" style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "24px" }}>Education</h2>
        {education.map(edu => renderTimelineItem(
           `${edu.startDate} — ${edu.endDate}`,
           edu.degree,
           `${edu.institution} • ${edu.field}`
        ))}
       </section>
    ) : null,
    skills: skillGroups.length > 0 ? (
      <section key="skills" style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "20px" }}>Tech Radar</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {skillGroups.map(group => (
            <div key={group.id}>
              <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>{group.category}</h4>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{group.skills.join(" • ")}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,
    personalInfo: null, contact: null
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'DM Sans', sans-serif", padding: "60px 50px" }}>
       <header style={{ marginBottom: "60px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #f1f5f9", paddingBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-1px", margin: 0 }}>{p.fullName || "NAME"}</h1>
            <p style={{ fontSize: "14px", fontWeight: 500, color: accent, marginTop: "4px" }}>{p.jobTitle || "ROLE"}</p>
          </div>
          <div style={{ textAlign: "right", fontSize: "11px", color: "#94a3b8", lineHeight: "1.6" }}>
            <div>{p.email}</div>
            <div>{p.phone}</div>
            <div>{p.location}</div>
          </div>
       </header>

       <main>
          {sectionOrder.map(key => sections[key])}
       </main>
    </div>
  );
}
