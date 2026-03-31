"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function SkillBasedTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#6366f1";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>Skill Dashboard</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {skillGroups.map(group => (
              <div key={group.id} style={{ background: "#f8fafc", padding: "16px", borderRadius: "16px", border: "1px solid #e2e8f0 shadow-sm" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>{group.category}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.skills.map(s => (
                    <span key={s} style={{ fontSize: "10px", padding: "4px 10px", backgroundColor: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px", fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null;
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Objective</h2>
          <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>{summary}</p>
        </section>
      ) : null;
      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>Professional History</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
             {workExperience.map(job => (
               <div key={job.id}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                   <h3 style={{ fontSize: "13px", fontWeight: 700 }}>{job.role} @ {job.company}</h3>
                   <span style={{ fontSize: "10px", color: "#94a3b8" }}>{job.startDate} to {job.endDate}</span>
                 </div>
                 <ul style={{ paddingLeft: "14px", margin: "8px 0 0" }}>
                   {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11.5px", color: "#475569", marginBottom: "4px" }}>{b}</li>)}
                 </ul>
               </div>
             ))}
          </div>
        </section>
      ) : null;
      case "education": return education.length > 0 ? (
        <section key={key} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>Academic</h2>
           {education.map(edu => (
             <div key={edu.id} style={{ marginBottom: "12px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700 }}>{edu.degree} in {edu.field}</h3>
                <p style={{ fontSize: "11.5px", color: "#64748b", margin: "2px 0 0" }}>{edu.institution} | GPA: {edu.grade} | {edu.endDate}</p>
             </div>
           ))}
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "60px 48px" }}>
       <header style={{ marginBottom: "48px", borderBottom: `2px solid #f1f5f9`, paddingBottom: "32px" }}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <div>
             <h1 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-1.5px", margin: 0, color: "#0f172a" }}>{p.fullName || "NAME"}</h1>
             <p style={{ fontSize: "14px", fontWeight: 600, color: accent, marginTop: "4px" }}>{p.jobTitle || "DEVELOPER"}</p>
           </div>
           <div style={{ textAlign: "right", fontSize: "11px", color: "#94a3b8", lineHeight: "1.7", fontWeight: 500 }}>
             <div>{p.email} | {p.phone}</div>
             <div>{p.location} | {p.website}</div>
           </div>
         </div>
       </header>

       <main>
          {/* We force 'skills' to be rendered towards the top if present, regardless of order slightly for the 'Vibe' */}
          {sectionOrder.map(key => renderSection(key))}
       </main>
    </div>
  );
}
