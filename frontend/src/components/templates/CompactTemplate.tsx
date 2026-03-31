"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function CompactTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1f2937";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "12px" }}>
          <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", marginBottom: "6px" }}>Summary</h2>
          <p style={{ fontSize: "10.5px", lineHeight: "1.4", margin: 0 }}>{summary}</p>
        </section>
      ) : null;
      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "12px" }}>
          <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", marginBottom: "8px" }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {workExperience.map(job => (
              <div key={job.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700 }}>{job.role}</span>
                  <span style={{ fontSize: "9.5px", color: "#666" }}>{job.startDate} - {job.endDate}</span>
                </div>
                <div style={{ fontSize: "10px", color: accent, fontWeight: 600 }}>{job.company}</div>
                <ul style={{ margin: "3px 0 0", paddingLeft: "12px" }}>
                  {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "9.5px", lineHeight: "1.4" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null;
      case "education": return education.length > 0 ? (
         <section key={key} style={{ marginBottom: "12px" }}>
           <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", marginBottom: "6px" }}>Education</h2>
           {education.map(edu => (
             <div key={edu.id} style={{ marginBottom: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px" }}>
                  <span style={{ fontWeight: 700 }}>{edu.degree}</span>
                  <span>{edu.endDate}</span>
                </div>
                <div style={{ fontSize: "9.5px" }}>{edu.institution} • {edu.field}</div>
             </div>
           ))}
         </section>
      ) : null;
      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "12px" }}>
          <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", borderBottom: `1.5px solid ${accent}`, paddingBottom: "2px", marginBottom: "6px" }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {skillGroups.map(group => (
               <div key={group.id} style={{ display: "flex", gap: "4px", fontSize: "9.5px" }}>
                  <span style={{ fontWeight: 700 }}>{group.category}:</span>
                  <span>{group.skills.join(", ")}</span>
               </div>
            ))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Roboto', sans-serif", color: "#111", padding: "40px" }}>
       <header style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>{p.fullName || "NAME"}</h1>
            <p style={{ fontSize: "12px", color: accent, fontWeight: 700, marginTop: "2px" }}>{p.jobTitle || "ROLE"}</p>
          </div>
          <div style={{ textAlign: "right", fontSize: "9.5px", color: "#666", lineHeight: "1.5" }}>
            <div>{p.email} | {p.phone}</div>
            <div>{p.location} | {p.linkedin}</div>
          </div>
       </header>

       <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div className="col-1">
             {sectionOrder.slice(0, Math.ceil(sectionOrder.length/2)).map(key => renderSection(key))}
          </div>
          <div className="col-2">
             {sectionOrder.slice(Math.ceil(sectionOrder.length/2)).map(key => renderSection(key))}
          </div>
       </main>
    </div>
  );
}
