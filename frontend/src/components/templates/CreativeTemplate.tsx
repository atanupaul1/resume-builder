"use client";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#ec4899";
  const totalSkills = skillGroups.reduce((count, group) => count + group.skills.length, 0);
  const denseMode = workExperience.length >= 3 || totalSkills >= 12;
  const sectionGap = denseMode ? "22px" : "30px";
  const bulletFontSize = denseMode ? "11px" : "11.5px";
  const chipPadding = denseMode ? "5px 10px" : "6px 14px";
  const chipFontSize = denseMode ? "10px" : "11px";

  const renderSection = (key: SectionKey) => {
    switch (key) {
      case "summary":
        return summary ? (
          <section key={key} style={{ marginBottom: sectionGap, breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>
              The Gist
            </h2>
            <p style={{ fontSize: denseMode ? "13px" : "14px", color: "#1e293b", lineHeight: "1.55", margin: 0, borderLeft: `4px solid ${accent}`, paddingLeft: "15px" }}>
              {summary}
            </p>
          </section>
        ) : null;

      case "workExperience":
        return workExperience.length > 0 ? (
          <section key={key} style={{ marginBottom: sectionGap }}>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "15px" }}>
              Adventures
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: denseMode ? "18px" : "25px" }}>
              {workExperience.map((job) => (
                <div key={job.id} style={{ position: "relative", breakInside: "avoid-page" }}>
                  <div style={{ position: "absolute", left: "-25px", top: "5px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: accent }} />
                  <div style={{ borderLeft: "2px solid #f1f5f9", paddingLeft: "25px", marginLeft: "-19px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap", fontSize: "12px", fontWeight: 700, color: accent, marginTop: "2px" }}>
                      <span>{job.company}</span>
                      <span>{job.startDate} - {job.endDate}</span>
                    </div>
                    <ul style={{ margin: "8px 0 0", paddingLeft: "18px" }}>
                      {job.bullets.map((bullet, index) => (
                        <li key={index} style={{ fontSize: bulletFontSize, color: "#475569", lineHeight: "1.45", marginBottom: "4px", overflowWrap: "anywhere" }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <section key={key} style={{ marginBottom: sectionGap, breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "15px" }}>
              Growth
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: education.length > 1 && !denseMode ? "1fr 1fr" : "1fr", gap: denseMode ? "12px" : "18px" }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ padding: denseMode ? "12px" : "15px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", breakInside: "avoid-page" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 800, color: "#1e293b", margin: 0 }}>{edu.degree}</h3>
                  <p style={{ fontSize: "11px", color: accent, fontWeight: 700, margin: "2px 0" }}>{edu.field}</p>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0, overflowWrap: "anywhere" }}>
                    {edu.institution} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "skills":
        return skillGroups.length > 0 ? (
          <section key={key} style={{ marginBottom: sectionGap, breakInside: "avoid-page" }}>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "15px" }}>
              Superpowers
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: denseMode ? "6px" : "8px" }}>
              {skillGroups.map((group) =>
                group.skills.map((skill, index) => (
                  <span
                    key={`${group.id}-${index}`}
                    style={{
                      padding: chipPadding,
                      backgroundColor: accent,
                      color: "white",
                      borderRadius: "100px",
                      fontSize: chipFontSize,
                      fontWeight: 700,
                      boxShadow: `0 4px 6px -1px ${accent}44`,
                      lineHeight: 1.2,
                      maxWidth: "100%",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {skill}
                  </span>
                ))
              )}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "1123px", background: "#fff", fontFamily: "'Inter', sans-serif", padding: denseMode ? "40px 44px" : "52px", color: "#1e293b" }}>
      <header style={{ display: "flex", alignItems: "center", gap: denseMode ? "28px" : "40px", marginBottom: denseMode ? "36px" : "52px", breakInside: "avoid-page" }}>
        <div style={{ width: denseMode ? "112px" : "140px", height: denseMode ? "112px" : "140px", borderRadius: "30px", backgroundColor: accent, overflow: "hidden", transform: "rotate(-3deg)", flexShrink: 0, boxShadow: "20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff" }}>
          {p.photo ? (
            <img src={p.photo} alt={p.fullName || "Profile photo"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: denseMode ? "46px" : "60px", fontWeight: 900 }}>
              {p.fullName?.[0]}
            </div>
          )}
        </div>

        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: denseMode ? "38px" : "48px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-1.5px", lineHeight: 1, overflowWrap: "anywhere" }}>
            {p.fullName || "NAME"}
          </h1>
          <p style={{ fontSize: denseMode ? "17px" : "20px", fontWeight: 700, color: accent, marginTop: "5px", marginBottom: 0, overflowWrap: "anywhere" }}>
            {p.jobTitle || "CREATIVE"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 15px", marginTop: "15px", fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
            {p.email && <span>{p.email}</span>}
            {p.location && <span>{p.location}</span>}
            {p.linkedin && <span>in/{p.linkedin}</span>}
            {p.website && <span>{p.website}</span>}
          </div>
        </div>
      </header>

      <main>{sectionOrder.map((key) => renderSection(key))}</main>
    </div>
  );
}
