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
function SidebarTitle({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, margin: 0 }}>{label}</p>
      <div style={{ height: "2px", backgroundColor: accent, borderRadius: "2px", marginTop: "4px", width: "24px" }} />
    </div>
  );
}
function MainTitle({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
      <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#111827", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
    </div>
  );
}

export default function ModernTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#6C63FF";
  const accentLight = `${accent}18`;

  // Split sectionOrder into sidebar (skills, education, contact) vs main (rest)
  const sidebarKeys: SectionKey[] = ["skills", "education", "contact"];
  const mainKeys: SectionKey[] = ["summary", "workExperience"];

  // Ordered lists respecting sectionOrder
  const orderedSidebar = sectionOrder.filter((k) => sidebarKeys.includes(k));
  const orderedMain = sectionOrder.filter((k) => mainKeys.includes(k));

  const sidebarSections: Record<SectionKey, React.ReactNode> = {
    contact: (p.email || p.phone || p.location || p.linkedin || p.website) ? (
      <div key="contact" style={{ marginBottom: "24px" }}>
        <SidebarTitle label="Contact" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {p.email && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>✉</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.email}</span></div>}
          {p.phone && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>✆</span><span style={{ fontSize: "10px", color: "#374151" }}>{p.phone}</span></div>}
          {p.location && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>⌖</span><span style={{ fontSize: "10px", color: "#374151" }}>{p.location}</span></div>}
          {p.linkedin && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>in</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.linkedin}</span></div>}
          {p.website && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>⬡</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.website}</span></div>}
        </div>
      </div>
    ) : null,

    skills: skillGroups.length > 0 ? (
      <div key="skills" style={{ marginBottom: "24px" }}>
        <SidebarTitle label="Skills" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {skillGroups.map((group) => (
            <div key={group.id}>
              {group.category && <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#374151", margin: "0 0 5px" }}>{group.category}</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {group.skills.map((skill) => (
                  <span key={skill} style={{ fontSize: "10px", padding: "2px 8px", backgroundColor: accentLight, color: accent, borderRadius: "20px", fontWeight: 500, border: `1px solid ${accent}30` }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : null,

    education: education.length > 0 ? (
      <div key="education">
        <SidebarTitle label="Education" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {education.map((edu) => (
            <div key={edu.id}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#111827", margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "2px 0 0" }}>{edu.institution}</p>
              {edu.grade && <p style={{ fontSize: "10px", color: "#9ca3af", margin: "2px 0 0" }}>{edu.grade}</p>}
              <p style={{ fontSize: "10px", color: "#9ca3af", margin: "2px 0 0" }}>{dateRange(edu.startDate, edu.endDate, edu.current)}</p>
            </div>
          ))}
        </div>
      </div>
    ) : null,

    personalInfo: null, summary: null, workExperience: null,
  };

  const mainSections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <section key="summary" style={{ marginBottom: "24px" }}>
        <MainTitle label="About Me" />
        <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.75", margin: 0 }}>{summary}</p>
      </section>
    ) : null,

    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "24px" }}>
        <MainTitle label="Experience" />
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {workExperience.map((job) => (
            <div key={job.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "13px", color: "#111827", margin: 0 }}>{job.role}</p>
                  <p style={{ fontSize: "12px", color: accent, fontWeight: 500, margin: "2px 0 0" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                </div>
                <span style={{ fontSize: "10px", padding: "3px 10px", backgroundColor: accentLight, color: accent, borderRadius: "20px", whiteSpace: "nowrap", fontWeight: 500, marginTop: "2px" }}>
                  {dateRange(job.startDate, job.endDate, job.current)}
                </span>
              </div>
              {job.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                  {job.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "12px", color: "#4b5563", lineHeight: "1.65", marginBottom: "4px" }}>
                      <span style={{ color: accent, flexShrink: 0, fontWeight: 700, marginTop: "1px" }}>›</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    personalInfo: null, education: null, skills: null, contact: null,
  };

  return (
    <div className="bg-white w-full min-h-full" style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif", fontSize: "13px", color: "#1a1a1a" }}>
      {/* Header band */}
      <div style={{ backgroundColor: accent, padding: "32px 40px 28px", color: "white" }}>
        {p.fullName && <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>{p.fullName}</h1>}
        {p.jobTitle && <p style={{ fontSize: "13px", opacity: 0.85, margin: "6px 0 0", fontWeight: 400, letterSpacing: "0.04em" }}>{p.jobTitle}</p>}
      </div>
      {/* Body */}
      <div style={{ display: "flex", minHeight: "900px" }}>
        {/* Sidebar */}
        <div style={{ width: "200px", flexShrink: 0, backgroundColor: "#f9f9fb", borderRight: "1px solid #ebebf0", padding: "24px 20px" }}>
          {orderedSidebar.map((key) => sidebarSections[key])}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: "28px 32px" }}>
          {orderedMain.map((key) => mainSections[key])}
        </div>
      </div>
    </div>
  );
}
