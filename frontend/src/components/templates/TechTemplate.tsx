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

export default function TechTemplate({ data }: Props) {
  const { personalInfo: p, summary, workExperience, education, skillGroups, sectionOrder } = data;
  const accent = data.accentColor || "#0ea5e9";
  const bg = "#0f172a"; // Slate 900 for the sidebar

  const sections: Record<SectionKey, React.ReactNode> = {
    summary: summary ? (
      <section key="summary" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#cbd5e1", borderLeft: `3px solid ${accent}`, paddingLeft: "12px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Profile</h2>
        <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.7", margin: 0 }}>{summary}</p>
      </section>
    ) : null,

    workExperience: workExperience.length > 0 ? (
      <section key="workExperience" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#cbd5e1", borderLeft: `3px solid ${accent}`, paddingLeft: "12px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {workExperience.map((job) => (
            <div key={job.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{job.role}</h3>
                <span style={{ fontSize: "11px", color: accent, fontWeight: 600, fontFamily: "monospace" }}>{dateRange(job.startDate, job.endDate, job.current)}</span>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 500, marginBottom: "10px" }}>
                {job.company} <span style={{ color: "#334155" }}>•</span> {job.location}
              </div>
              {job.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {job.bullets.filter(Boolean).map((bullet, i) => (
                    <li key={i} style={{ fontSize: "11.5px", color: "#94a3b8", lineHeight: "1.6", display: "flex", gap: "8px" }}>
                      <span style={{ color: accent, fontWeight: 900 }}>{">"}</span>
                      {bullet}
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
      <section key="education" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#cbd5e1", borderLeft: `3px solid ${accent}`, paddingLeft: "12px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Education</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {education.map((edu) => (
            <div key={edu.id}>
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: "0 0 2px 0" }}>{edu.degree}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
                <span>{edu.institution}</span>
                <span style={{ fontFamily: "monospace" }}>{dateRange(edu.startDate, edu.endDate, edu.current)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    skills: null, // Rendered in sidebar
    personalInfo: null,
    contact: null
  };

  return (
    <div style={{ display: "flex", height: "1123px", backgroundColor: "#fff", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar - Dark Mode */}
      <div style={{ width: "260px", backgroundColor: bg, color: "#fff", padding: "40px 30px", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 4px 0", color: "#f8fafc" }}>{p.fullName || "NAME"}</h1>
          <p style={{ fontSize: "12px", fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: "1.5px" }}>{p.jobTitle || "DEVELOPER"}</p>
        </div>

        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h2 style={{ fontSize: "10px", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "2px" }}>Connect</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "10.5px", color: "#94a3b8", fontFamily: "monospace" }}>
            {p.email && <div style={{ wordBreak: "break-all" }}>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.location && <div>{p.location}</div>}
            {p.linkedin && <div>in/{p.linkedin}</div>}
            {p.website && <div style={{ wordBreak: "break-all" }}>{p.website}</div>}
          </div>
        </div>

        {/* Tech Skills */}
        {skillGroups.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "10px", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "2px" }}>Stacks</h2>
            {skillGroups.map((group) => (
              <div key={group.id}>
                <h3 style={{ fontSize: "11px", fontWeight: 700, color: "#f8fafc", marginBottom: "8px" }}>{group.category}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.skills.map((skill) => (
                    <span key={skill} style={{ fontSize: "10px", padding: "3px 8px", backgroundColor: "#1e293b", color: "#cbd5e1", borderRadius: "4px", border: "1px solid #334155" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Column - Light Mode */}
      <div style={{ flex: 1, backgroundColor: "#020617", padding: "50px 48px", overflow: "hidden" }}>
        {sectionOrder.map((key) => sections[key])}
      </div>
    </div>
  );
}
