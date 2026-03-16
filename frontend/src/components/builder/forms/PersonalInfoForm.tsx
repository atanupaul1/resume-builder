"use client";
import { PersonalInfo } from "@/types/resume";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
  const update = (field: keyof PersonalInfo, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            placeholder="e.g. Arjun Sharma"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="form-label">Job Title / Headline</label>
          <input
            className="form-input"
            placeholder="e.g. Senior Software Engineer"
            value={data.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@email.com"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            placeholder="+91 98765 43210"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Location</label>
          <input
            className="form-input"
            placeholder="Guwahati, Assam"
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">LinkedIn URL</label>
          <input
            className="form-input"
            placeholder="linkedin.com/in/yourname"
            value={data.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="form-label">Website / Portfolio</label>
          <input
            className="form-input"
            placeholder="yourportfolio.com"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
