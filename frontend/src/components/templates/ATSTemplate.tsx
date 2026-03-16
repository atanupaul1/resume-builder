"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

function formatDate(d: string) {
  if (!d) return "";
  const [year, month] = d.split("-");
  if (!year || !month) return d;
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(month)-1]} ${year}`;
}
function dateRange(s: string, e: string, current: boolean) {
  const sf = formatDate(s); const ef = current ? "Present" : formatDate(e);
  if (!sf && !ef) return ""; if (!sf) return ef; if (!ef) return sf; return `${sf} - ${ef}`;
}
function ATSTitle({ label }: { label: string }) {
  return (
    <div style={{ borderBottom: "1.5px solid #000", marginBottom: "8px", paddingBottom: "3px" }}>
      <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em", margin: 0 }}>{label}</h2>
    </div>
  );
}

export default function ATSTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;

  const sections: Record<SectionKey, React.ReactNode> = {
    personalInfo: (p.fullName || p.email) ? (
      <div key="personalInfo" style={{ textAlign: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1.5px solid #000" }}>
        {p.fullName && <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "0.02em", margin: "0 0 4px" }}>{p.fullName.toUpperCase()}</h1>}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px 12px", fontSize: "11px", color: "#222" }}>
          {p.email && <span>{p.email}</span>}{p.phone && <span>| {p.phone}</span>}
          {p.location && <span>| {p.location}</span>}{p.linkedin && <span>| {p.linkedin}</span>}
          {p.website && <span>| {p.website}</span>}
        </div>
      </div>
    ) : null,

    summary: summary ? (
      <section key="summary" style={{ marginBottom: "14px" }}>
        <ATSTitle label="PROFESSIONAL SUMMARY" />
        <p style={{ fontSize: "12px", color: "#111", lineHeight: "1.65", margin: 0 }}>{summary}</p>
      </section>
    ) : null,

    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "14px" }}>
        <ATSTitle label="WORK EXPERIENCE" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {workExperience.map((job) => (
            <div key={job.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "12px" }}>{job.role}</span>
                  {job.company && <span>{" | "}{job.company}</span>}
                  {job.location && <span>{" | "}{job.location}</span>}
                </div>
                <span style={{ fontSize: "12px" }}>{dateRange(job.startDate, job.endDate, job.current)}</span>
              </div>
              {job.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: "5px 0 0", paddingLeft: "18px" }}>
                  {job.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ fontSize: "12px", color: "#111", lineHeight: "1.6", marginBottom: "2px" }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" style={{ marginBottom: "14px" }}>
        <ATSTitle label="EDUCATION" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {education.map((edu) => (
            <div key={edu.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontWeight: 700 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ""}</span>
                  {edu.institution && <span>{" | "}{edu.institution}</span>}
                  {edu.location && <span>{" | "}{edu.location}</span>}
                </div>
                <span>{dateRange(edu.startDate, edu.endDate, edu.current)}</span>
              </div>
              {edu.grade && <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#444" }}>GPA/Grade: {edu.grade}</p>}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: skillGroups.length > 0 ? (
      <section key="skills" style={{ marginBottom: "14px" }}>
        <ATSTitle label="SKILLS" />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {skillGroups.map((group) => (
            <div key={group.id} style={{ display: "flex", gap: "6px", fontSize: "12px" }}>
              {group.category && <span style={{ fontWeight: 700, minWidth: "130px", flexShrink: 0 }}>{group.category}:</span>}
              <span>{group.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    // ATS usually embeds contact inside personalInfo, so we return null for explicit 'contact' block
    contact: null,
  };

  return (
    <div className="bg-white w-full min-h-full" style={{ fontFamily: "'Arial','Helvetica',sans-serif", fontSize: "12px", color: "#000000" }}>
      <div style={{ padding: "36px 48px" }}>
        {/* Render dynamically based on sectionOrder preference */}
        {sectionOrder.map((key) => sections[key])}
      </div>
    </div>
  );
}
