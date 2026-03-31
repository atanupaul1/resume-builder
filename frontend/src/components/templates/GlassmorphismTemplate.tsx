"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

export default function GlassmorphismTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#a855f7";

  const sections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <div key="summary" className="glass-card">
        <h2 style={{ color: accent }}>Profile</h2>
        <p>{summary}</p>
      </div>
    ) : null,
    workExperience: workExperience.length > 0 ? (
      <div key="workExperience" className="glass-card">
        <h2 style={{ color: accent }}>Experience</h2>
        <div className="experience-list">
          {workExperience.map((job) => (
            <div key={job.id} className="item">
              <div className="item-header">
                <h3>{job.role}</h3>
                <span className="badge" style={{ backgroundColor: `${accent}20`, color: accent }}>
                   {job.startDate} - {job.current ? "Present" : job.endDate}
                </span>
              </div>
              <p className="subtitle">{job.company} • {job.location}</p>
              <ul>{job.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    ) : null,
    education: education.length > 0 ? (
      <div key="education" className="glass-card">
        <h2 style={{ color: accent }}>Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="item">
            <h3>{edu.degree}</h3>
            <p className="subtitle">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </div>
    ) : null,
    skills: skillGroups.length > 0 ? (
      <div key="skills" className="glass-card">
        <h2 style={{ color: accent }}>Skills</h2>
        <div className="skills-grid">
           {skillGroups.map(group => (
             <div key={group.id}>
               <h4>{group.category}</h4>
               <div className="tags">
                 {group.skills.map(s => <span key={s} style={{ background: `${accent}15`, color: accent }}>{s}</span>)}
               </div>
             </div>
           ))}
        </div>
      </div>
    ) : null,
    personalInfo: null, contact: null
  };

  return (
    <div className="glass-container">
      <div className="sidebar">
        {p.photo && <img src={p.photo} className="avatar" />}
        <h1>{p.fullName || "Name"}</h1>
        <p className="job-title">{p.jobTitle || "Role"}</p>
        <div className="contact-info">
          <p>{p.email}</p>
          <p>{p.phone}</p>
          <p>{p.location}</p>
        </div>
      </div>
      <div className="main">
        {sectionOrder.map(key => sections[key])}
      </div>

      <style jsx>{`
        .glass-container {
          display: flex;
          min-height: 1123px;
          background: linear-gradient(135deg, ${accent}22 0%, #ffffff 100%);
          font-family: 'Outfit', sans-serif;
          color: #1e293b;
        }
        .sidebar {
          width: 250px;
          padding: 50px 30px;
          border-right: 1px solid rgba(0,0,0,0.05);
        }
        .avatar { width: 100px; height: 100px; borderRadius: 24px; objectFit: cover; marginBottom: 20px; border: 4px solid #fff; box-shadow: 0 10px 25px -10px rgba(0,0,0,0.1); }
        .sidebar h1 { font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
        .job-title { color: ${accent}; font-weight: 600; font-size: 14px; margin-top: 4px; }
        .contact-info { margin-top: 30px; font-size: 11px; color: #64748b; line-height: 2; }
        
        .main { flex: 1; padding: 50px 40px; display: flex; flexDirection: column; gap: 24px; }
        .glass-card {
           background: rgba(255, 255, 255, 0.4);
           backdrop-filter: blur(12px);
           border: 1px solid rgba(255, 255, 255, 0.6);
           border-radius: 20px;
           padding: 24px;
           box-shadow: 0 10px 15px -10px rgba(0,0,0,0.05);
        }
        .glass-card h2 { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .item h3 { font-size: 15px; font-weight: 700; margin: 0; }
        .item-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .badge { font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 8px; }
        .subtitle { font-size: 12px; color: #64748b; margin: 4px 0 12px; }
        ul { padding-left: 18px; margin: 0; }
        li { font-size: 12px; line-height: 1.6; color: #475569; margin-top: 4px; }
        
        .skills-grid { display: grid; gap: 16px; }
        h4 { font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tags span { font-size: 10px; padding: 4px 12px; border-radius: 8px; font-weight: 600; }
      `}</style>
    </div>
  );
}
