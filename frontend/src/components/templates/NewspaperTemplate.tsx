"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function NewspaperTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = "#111";

  const renderSection = (key: SectionKey) => {
    switch(key) {
      case "summary": return summary ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", borderBottom: "4px double #111", paddingBottom: "2px", textAlign: "center", textTransform: "uppercase", marginBottom: "8px" }}>Editorial Summary</h2>
          <p style={{ fontSize: "12px", border: "1px solid #111", padding: "10px", fontStyle: "italic", margin: 0 }}>{summary}</p>
        </section>
      ) : null;
      case "workExperience": return workExperience.length > 0 ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, fontStyle: "italic", borderBottom: "1px solid #111", marginBottom: "12px", textTransform: "uppercase" }}>The Experience Record</h2>
          {workExperience.map(job => (
            <div key={job.id} style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 800, margin: 0, textDecoration: "underline" }}>{job.role.toUpperCase()}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, margin: "2px 0 6px" }}>
                <span>{job.company} — {job.location}</span>
                <span>{job.startDate} to {job.endDate}</span>
              </div>
              <ul style={{ paddingLeft: "14px", margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {job.bullets.map((b, i) => <li key={i} style={{ fontSize: "11.5px", textAlign: "justify" }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>
      ) : null;
      case "education": return education.length > 0 ? (
         <section key={key} style={{ marginBottom: "20px" }}>
           <h2 style={{ fontSize: "12px", borderLeft: "4px solid #111", paddingLeft: "8px", textTransform: "uppercase", marginBottom: "10px" }}>Educational Background</h2>
           {education.map(edu => (
             <div key={edu.id} style={{ marginBottom: "8px", fontSize: "12px" }}>
                <div style={{ fontWeight: 700 }}>{edu.institution}</div>
                <div>{edu.degree} in {edu.field} • {edu.endDate}</div>
             </div>
           ))}
         </section>
      ) : null;
      case "skills": return skillGroups.length > 0 ? (
        <section key={key} style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", background: "#111", color: "#fff", padding: "2px 8px", textTransform: "uppercase", textAlign: "center", marginBottom: "8px" }}>The Skill Index</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "11px" }}>
            {skillGroups.map(group => (
               <div key={group.id} style={{ border: "1px solid #eee", padding: "6px" }}>
                  <span style={{ fontWeight: 800, textDecoration: "underline" }}>{group.category}:</span> {group.skills.join(", ")}
               </div>
            ))}
          </div>
        </section>
      ) : null;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fdfbf7", fontFamily: "'Playfair Display', serif", color: "#111", padding: "60px" }}>
       <header style={{ textAlign: "center", borderBottom: "4px double #111", paddingBottom: "24px", marginBottom: "32px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, borderBottom: "1px solid #111", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>VOL. I ... NO. 001</span>
            <span>{new Date().toLocaleDateString().toUpperCase()}</span>
            <span>PRICE: PROFESSIONAL</span>
          </div>
          <h1 style={{ fontSize: "56px", fontWeight: 900, textTransform: "uppercase", margin: 0, letterSpacing: "-1px" }}>{p.fullName || "RESUME_GAZETTE"}</h1>
          <p style={{ fontSize: "14px", fontWeight: 700, fontStyle: "italic", margin: "8px 0 0" }}>{p.jobTitle || "THE SPECIALIST"} IN {p.location || "THE FIELD"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "10px", fontWeight: 700, borderTop: "1px solid #111", marginTop: "16px", paddingTop: "8px" }}>
            <span>{p.email}</span>
            <span>{p.phone}</span>
            <span>{p.website}</span>
          </div>
       </header>

       <main style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr", gap: "32px" }}>
          <div style={{ borderRight: "1px solid #eee", paddingRight: "32px" }}>
             {sectionOrder.map(key => renderSection(key))}
          </div>
          <div>
            <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
              <h4 style={{ fontWeight: 900, marginBottom: "8px", borderBottom: "2px solid #111" }}>IN THIS ISSUE</h4>
              <p>Special coverage on <b>{p.fullName}</b>'s career milestones, featuring in-depth analysis of major projects and strategic achievements.</p>
              <div style={{ width: "100%", height: "1px", background: "#111", margin: "12px 0" }} />
              <p style={{ fontStyle: "italic" }}>Looking to build teams of future-proof experts? {p.fullName} offers a unique blend of industry experience and technical foresight.</p>
            </div>
          </div>
       </main>
    </div>
  );
}
