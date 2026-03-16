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
  if (!sf && !ef) return ""; if (!sf) return ef; if (!ef) return sf; return `${sf} – ${ef}`;
}
function SectionTitle({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", marginBottom: "10px", paddingBottom: "4px" }}>
      <h2 style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: accent, margin: 0 }}>{label}</h2>
    </div>
  );
}

export default function MinimalTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#111827";

  const sections: Record<SectionKey, React.ReactNode> = {
    personalInfo: (p.fullName || p.jobTitle) ? (
      <div key="personalInfo" style={{ borderBottom: `2px solid ${accent}`, paddingBottom: "14px", marginBottom: "22px" }}>
        {p.fullName && <h1 style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, color: "#0f0f0f" }}>{p.fullName}</h1>}
        {p.jobTitle && <p style={{ fontSize: "11px", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", margin: "6px 0 0" }}>{p.jobTitle}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", marginTop: "10px", fontFamily: "sans-serif", fontSize: "11px", color: "#6b7280" }}>
          {p.email && <span>✉ {p.email}</span>}{p.phone && <span>✆ {p.phone}</span>}
          {p.location && <span>⌖ {p.location}</span>}{p.linkedin && <span>in {p.linkedin}</span>}
          {p.website && <span>⬡ {p.website}</span>}
        </div>
      </div>
    ) : null,

    summary: summary ? (
      <section key="summary" style={{ marginBottom: "20px" }}>
        <SectionTitle label="Summary" accent={accent} />
        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#374151", lineHeight: "1.7", margin: 0 }}>{summary}</p>
      </section>
    ) : null,

    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "20px" }}>
        <SectionTitle label="Experience" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {workExperience.map((job) => (
            <div key={job.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "sans-serif", fontWeight: 600, fontSize: "12px", margin: 0, color: "#111827" }}>{job.role}</p>
                  <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#6b7280", margin: "2px 0 0" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                </div>
                <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap", marginTop: "2px" }}>{dateRange(job.startDate, job.endDate, job.current)}</p>
              </div>
              {job.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: "6px 0 0", padding: 0, listStyle: "none" }}>
                  {job.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontFamily: "sans-serif", fontSize: "12px", color: "#374151", lineHeight: "1.6", marginBottom: "3px" }}>
                      <span style={{ color: "#9ca3af", flexShrink: 0, marginTop: "2px" }}>•</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" style={{ marginBottom: "20px" }}>
        <SectionTitle label="Education" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontFamily: "sans-serif", fontWeight: 600, fontSize: "12px", margin: 0, color: "#111827" }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#6b7280", margin: "2px 0 0" }}>{edu.institution}{edu.location ? ` · ${edu.location}` : ""}</p>
                {edu.grade && <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>Grade: {edu.grade}</p>}
              </div>
              <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap", marginTop: "2px" }}>{dateRange(edu.startDate, edu.endDate, edu.current)}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: skillGroups.length > 0 ? (
      <section key="skills" style={{ marginBottom: "20px" }}>
        <SectionTitle label="Skills" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {skillGroups.map((group) => (
            <div key={group.id} style={{ display: "flex", gap: "8px", fontFamily: "sans-serif", fontSize: "12px" }}>
              {group.category && <span style={{ fontWeight: 600, color: "#374151", minWidth: "110px", flexShrink: 0 }}>{group.category}:</span>}
              <span style={{ color: "#6b7280" }}>{group.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    contact: null,
  };

  return (
    <div className="bg-white w-full min-h-full" style={{ fontFamily: "'Georgia','Times New Roman',serif", fontSize: "13px", lineHeight: "1.5", color: "#1a1a1a" }}>
      <div style={{ padding: "48px 52px" }}>
        {sectionOrder.map((key) => sections[key])}
      </div>
    </div>
  );
}
