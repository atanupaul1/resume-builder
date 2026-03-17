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

export default function AcademicTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#581c87";

  const sections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <section key="summary" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px", textAlign: "center" }}>Research Statement</h2>
        <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.8", margin: "0 auto", maxWidth: "600px", textAlign: "justify" }}>{summary}</p>
      </section>
    ) : null,

    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", borderBottom: `1px solid #e2e8f0`, paddingBottom: "8px", marginBottom: "16px" }}>Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {workExperience.map((job) => (
            <div key={job.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                {dateRange(job.startDate, job.endDate, job.current)}
              </div>
              <div>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>{job.role}</h3>
                <p style={{ fontSize: "12px", fontStyle: "italic", color: accent, margin: "0 0 8px 0" }}>{job.company} — {job.location}</p>
                {job.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: "14px", listStyleType: "circle", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {job.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i} style={{ fontSize: "11px", color: "#475569", lineHeight: "1.5" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", borderBottom: `1px solid #e2e8f0`, paddingBottom: "8px", marginBottom: "16px" }}>Education</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                {dateRange(edu.startDate, edu.endDate, edu.current)}
              </div>
              <div>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>{edu.degree}{edu.field ? `, ${edu.field}` : ""}</h3>
                <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 4px 0" }}>{edu.institution}</p>
                {edu.grade && <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}>Grade: {edu.grade}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: skillGroups.length > 0 ? (
      <section key="skills" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "12px", fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "2px", borderBottom: `1px solid #e2e8f0`, paddingBottom: "8px", marginBottom: "16px" }}>Expertise</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {skillGroups.map((group) => (
            <div key={group.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                {group.category}
              </div>
              <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{group.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    personalInfo: null,
    contact: null
  };

  return (
    <div style={{ padding: "60px 50px", fontFamily: '"Georgia", serif', minHeight: "1123px", backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ marginBottom: "48px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", margin: "0 0 12px 0", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.fullName || "NAME"}</h1>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
          {p.location && <span>{p.location}</span>}
          {p.location && (p.email || p.phone) && <span>|</span>}
          {p.email && <span>{p.email}</span>}
          {p.email && p.phone && <span>|</span>}
          {p.phone && <span>{p.phone}</span>}
        </div>
        {(p.linkedin || p.website) && (
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", fontSize: "10px", color: accent, marginTop: "8px", fontWeight: 600 }}>
            {p.linkedin && <span>LI / {p.linkedin}</span>}
            {p.website && <span>WS / {p.website}</span>}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {sectionOrder.map((key) => sections[key])}
      </main>

      {/* Footer Decoration */}
      <div style={{ marginTop: "40px", borderTop: `1px solid #f1f5f9`, paddingTop: "20px", textAlign: "center" }}>
        <span style={{ fontSize: "9px", color: "#cbd5e1", letterSpacing: "4px" }}>•••</span>
      </div>
    </div>
  );
}
