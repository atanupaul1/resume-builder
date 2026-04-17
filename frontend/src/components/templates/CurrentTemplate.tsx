"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function CurrentTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1e293b";
  const totalSkills = skillGroups.reduce((count, group) => count + group.skills.length, 0);
  const denseMode = workExperience.length >= 3 || totalSkills >= 12;

  const renderSection = (key: SectionKey) => {
    switch (key) {
      case "summary":
        return summary ? (
          <section key={key} style={{ marginBottom: denseMode ? "18px" : "24px", breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "8px" }}>
              Profile
            </h2>
            <p style={{ fontSize: denseMode ? "11.5px" : "12px", color: "#334155", lineHeight: "1.55", margin: 0 }}>
              {summary}
            </p>
          </section>
        ) : null;

      case "workExperience":
        return workExperience.length > 0 ? (
          <section key={key} style={{ marginBottom: denseMode ? "18px" : "24px" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>
              Professional History
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: denseMode ? "12px" : "16px" }}>
              {workExperience.map((job) => (
                <div key={job.id} style={{ breakInside: "avoid-page" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "2px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{job.startDate} - {job.endDate}</span>
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: accent, marginBottom: "6px", overflowWrap: "anywhere" }}>
                    {job.company}
                    {job.location ? ` - ${job.location}` : ""}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {job.bullets.map((bullet, index) => (
                      <li key={index} style={{ fontSize: denseMode ? "11px" : "11.5px", color: "#475569", lineHeight: "1.45", marginBottom: "4px", overflowWrap: "anywhere" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <section key={key} style={{ marginBottom: denseMode ? "18px" : "24px", breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "12px", breakInside: "avoid-page" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                    {edu.degree} in {edu.field}
                  </h3>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{edu.endDate}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0", overflowWrap: "anywhere" }}>
                  {edu.institution}
                  {edu.grade ? ` - GPA: ${edu.grade}` : ""}
                </p>
              </div>
            ))}
          </section>
        ) : null;

      case "skills":
        return skillGroups.length > 0 ? (
          <section key={key} style={{ marginBottom: "15px", breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>
              Expertise
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: denseMode ? "6px" : "8px" }}>
              {skillGroups.map((group) =>
                group.skills.map((skill, index) => (
                  <span key={`${group.id}-${index}`} style={{ padding: denseMode ? "4px 8px" : "4px 10px", backgroundColor: "#f1f5f9", borderRadius: "100px", fontSize: denseMode ? "10px" : "11px", fontWeight: 600, color: "#475569", border: "1px solid #e2e8f0", maxWidth: "100%", overflowWrap: "anywhere" }}>
                    {skill}
                  </span>
                ))
              )}
            </div>
          </section>
        ) : null;

      case "custom":
        return (data.customSections || []).length > 0 ? (
          <div key={key}>
            {(data.customSections || []).map((section) => (
              <section key={section.id} style={{ marginBottom: denseMode ? "18px" : "24px", breakInside: "avoid-page" }}>
                <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "8px" }}>
                  {section.title}
                </h2>
                <p style={{ fontSize: denseMode ? "11.5px" : "12px", color: "#334155", lineHeight: "1.55", margin: 0, whiteSpace: "pre-wrap" }}>
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        ) : null;

      case "publications":
        return (data.publications || []).length > 0 ? (
          <section key={key} style={{ marginBottom: denseMode ? "18px" : "24px", breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px" }}>
              Publications
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {(data.publications || []).map((pub) => (
                <div key={pub.id}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{pub.title}</p>
                  <p style={{ fontSize: "11px", color: "#475569", margin: "2px 0" }}>{pub.authors}</p>
                  <p style={{ fontSize: "11px", color: accent, fontWeight: 600, margin: 0 }}>
                    {pub.venue} — {pub.year}
                    {pub.doi && <span style={{ marginLeft: "8px", color: "#94a3b8", fontWeight: 400 }}>DOI: {pub.doi}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#f8fafc", fontFamily: "'Inter', sans-serif", color: "#1e293b" }}>
      <header style={{ backgroundColor: accent, padding: denseMode ? "42px 40px" : "50px 45px", color: "#fff", clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)", breakInside: "avoid-page" }}>
        <h1 style={{ fontSize: denseMode ? "34px" : "40px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-1.5px", lineHeight: 1, overflowWrap: "anywhere" }}>
          {p.fullName || "YOUR NAME"}
        </h1>
        <p style={{ fontSize: denseMode ? "14px" : "16px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginTop: "10px", marginBottom: 0, letterSpacing: "1.5px", textTransform: "uppercase", overflowWrap: "anywhere" }}>
          {p.jobTitle || "PROFESSIONAL TITLE"}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: "24px", fontSize: "11px", color: "rgba(255,255,255,0.78)", fontWeight: 500 }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>in/{p.linkedin}</span>}
          {p.website && <span>{p.website}</span>}
          {p.github && <span>gh/{p.github}</span>}
          {(p.customFields || []).map((field) => (
            field.label && field.value && <span key={field.id}>{field.label}: {field.value}</span>
          ))}
        </div>
      </header>

      <main style={{ padding: denseMode ? "32px 36px" : "40px 45px", backgroundColor: "white", margin: "0 20px 20px", borderRadius: "0 0 8px 8px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
        {sectionOrder.map((key) => renderSection(key))}
      </main>
    </div>
  );
}
