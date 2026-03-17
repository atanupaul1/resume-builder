"use client";
import React from "react";
import { ResumeData, SectionKey } from "@/types/resume";

interface Props {
  data: ResumeData;
}

function formatDate(d: string) {
  if (!d) return "";
  const [year, month] = d.split("-");
  if (!year || !month) return d;
  return `${
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
      parseInt(month) - 1
    ]
  } ${year}`;
}

function dateRange(s: string, e: string, current: boolean) {
  const sf = formatDate(s);
  const ef = current ? "Present" : formatDate(e);
  if (!sf && !ef) return "";
  if (!sf) return ef;
  if (!ef) return sf;
  return `${sf} – ${ef}`;
}

export default function ExecutiveTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#1e3a8a";

  const sections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <section key="summary" style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Professional Summary</h2>
        <p style={{ fontSize: "11.5px", color: "#334155", lineHeight: "1.6", margin: 0 }}>{summary}</p>
      </section>
    ) : null,

    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Professional Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {workExperience.map((job) => (
            <div key={job.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{job.role}</h3>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{dateRange(job.startDate, job.endDate, job.current)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: accent }}>{job.company}</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>{job.location}</span>
              </div>
              {job.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "18px", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {job.bullets.filter(Boolean).map((bullet, i) => (
                    <li key={i} style={{ fontSize: "11px", color: "#334155", lineHeight: "1.5" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Education</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {education.map((edu) => (
            <div key={edu.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ""}</h3>
                <span style={{ fontSize: "11px", color: "#64748b" }}>{dateRange(edu.startDate, edu.endDate, edu.current)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: "11.5px", color: "#334155" }}>{edu.institution}</span>
                {edu.grade && <span style={{ fontSize: "11px", color: "#64748b" }}>GPA: {edu.grade}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: skillGroups.length > 0 ? (
      <section key="skills" style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Core Competencies</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>{group.category}</h3>
              <p style={{ fontSize: "11px", color: "#334155", margin: 0 }}>{group.skills.join(" • ")}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,
    
    personalInfo: null,
    contact: null
  };

  return (
    <div style={{ padding: "40px", fontFamily: '"Times New Roman", Times, serif', minHeight: "1123px", backgroundColor: "#fff" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "32px", borderBottom: `4px solid ${accent}`, paddingBottom: "24px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px 0", letterSpacing: "1px" }}>{p.fullName || "Your Name"}</h1>
        <p style={{ fontSize: "14px", fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 16px 0" }}>{p.jobTitle}</p>
        
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", fontSize: "11px", color: "#475569" }}>
          {p.location && <span>{p.location}</span>}
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.linkedin && <span>LinkedIn.com/in/{p.linkedin}</span>}
          {p.website && <span>{p.website}</span>}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {sectionOrder.map((key) => sections[key])}
      </main>
    </div>
  );
}
