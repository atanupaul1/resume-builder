"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props { data: ResumeData; }

function formatDate(d: string) {
  if (!d) return "";
  const [year, month] = d.split("-");
  if (!year || !month) return d;
  return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(month) - 1]} ${year}`;
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

  // Split sectionOrder into sidebar (skills, education, personalInfo) vs main (rest)
  const sidebarKeys: SectionKey[] = ["skills", "education", "personalInfo", "custom", "publications"];
  const mainKeys: SectionKey[] = ["summary", "workExperience", "custom", "publications"];

  // Ordered lists respecting sectionOrder
  const orderedSidebar = sectionOrder.filter((k) => sidebarKeys.includes(k));
  const orderedMain = sectionOrder.filter((k) => mainKeys.includes(k));

  const sidebarSections: Record<SectionKey, React.ReactNode> = {
    personalInfo: (p.email || p.phone || p.location || p.linkedin || p.website || p.github) ? (
      <div key="personalInfo" style={{ marginBottom: "24px" }}>
        <SidebarTitle label="Contact" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {p.email && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>✉</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.email}</span></div>}
          {p.phone && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>✆</span><span style={{ fontSize: "10px", color: "#374151" }}>{p.phone}</span></div>}
          {p.location && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>⌖</span><span style={{ fontSize: "10px", color: "#374151" }}>{p.location}</span></div>}
          {p.linkedin && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>in</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.linkedin}</span></div>}
          {p.website && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>⬡</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.website}</span></div>}
          {p.github && <div style={{ display: "flex", gap: "6px" }}><span style={{ fontSize: "10px", color: "#9ca3af" }}>gh</span><span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{p.github}</span></div>}
          {(p.customFields || []).map((field) => (
            field.label && field.value && (
              <div key={field.id} style={{ display: "flex", gap: "6px" }}>
                <span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, minWidth: "14px" }}>{field.label[0].toUpperCase()}</span>
                <span style={{ fontSize: "10px", color: "#374151", wordBreak: "break-all" }}>{field.value}</span>
              </div>
            )
          ))}
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
                  <span key={skill} style={{ display: "inline-block", fontSize: "10px", padding: "0 10px", height: "18px", lineHeight: "19px", backgroundColor: accentLight, color: accent, borderRadius: "20px", fontWeight: 500, border: `1px solid ${accent}30`, textAlign: "center", verticalAlign: "top" }}>{skill}</span>
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
    custom: (data.customSections || []).length > 0 ? (
      <div key="custom">
        {(data.customSections || []).map((section) => (
          <div key={section.id} style={{ marginBottom: "20px" }}>
            <SidebarTitle label={section.title} accent={accent} />
            <p style={{ fontSize: "10px", color: "#374151", lineHeight: "1.6", margin: 0, whiteSpace: "pre-wrap" }}>{section.content}</p>
          </div>
        ))}
      </div>
    ) : null,

    publications: (data.publications || []).length > 0 ? (
      <div key="publications">
        <SidebarTitle label="Publications" accent={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {(data.publications || []).map((pub) => (
            <div key={pub.id} style={{ fontSize: "10px", color: "#374151", lineHeight: "1.4" }}>
              <span style={{ fontWeight: 700 }}>{pub.title}</span>. <i>{pub.venue}</i> ({pub.year}).
            </div>
          ))}
        </div>
      </div>
    ) : null,

    summary: null, workExperience: null,
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
                <span style={{ display: "inline-block", fontSize: "10px", padding: "0 10px", height: "18px", lineHeight: "19px", backgroundColor: accentLight, color: accent, borderRadius: "20px", whiteSpace: "nowrap", fontWeight: 500, marginTop: "2px", textAlign: "center", verticalAlign: "top" }}>
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
    custom: (data.customSections || []).length > 0 ? (
      <div key="custom">
        {(data.customSections || []).map((section) => (
          <section key={section.id} style={{ marginBottom: "24px" }}>
            <MainTitle label={section.title} />
            <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.75", margin: 0, whiteSpace: "pre-wrap" }}>{section.content}</p>
          </section>
        ))}
      </div>
    ) : null,
    publications: (data.publications || []).length > 0 ? (
      <section key="publications" style={{ marginBottom: "24px" }}>
        <MainTitle label="Publications" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(data.publications || []).map((pub) => (
            <div key={pub.id}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#111827", margin: 0 }}>{pub.title}</p>
              <p style={{ fontSize: "11px", color: "#4b5563", margin: "2px 0 0" }}>{pub.authors}</p>
              <p style={{ fontSize: "11px", color: accent, fontWeight: 500, margin: "2px 0 0" }}>
                <i>{pub.venue}</i>, {pub.year}
                {pub.doi && <span style={{ marginLeft: "8px", color: "#9ca3af", fontSize: "10px" }}>DOI: {pub.doi}</span>}
              </p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    personalInfo: null, education: null, skills: null,
  };

  return (
    <div className="bg-white w-full min-h-full" style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif", fontSize: "13px", color: "#1a1a1a" }}>
      {/* Header band */}
      <div style={{ backgroundColor: accent, padding: "32px 40px 28px", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {p.fullName && <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>{p.fullName}</h1>}
            {p.jobTitle && <p style={{ fontSize: "13px", opacity: 0.85, margin: "6px 0 0", fontWeight: 400, letterSpacing: "0.04em" }}>{p.jobTitle}</p>}
          </div>
          {p.photo && (
            <div style={{ width: "70px", height: "70px", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
              <img src={p.photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>
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
