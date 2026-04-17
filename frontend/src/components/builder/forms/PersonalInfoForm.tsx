"use client";
import { PersonalInfo } from "@/types/resume";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  errors?: Partial<Record<keyof PersonalInfo, string>>;
}

export default function PersonalInfoForm({ data, onChange, errors }: Props) {
  const update = (field: keyof PersonalInfo, value: string) =>
    onChange({ ...data, [field]: value });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Image size should be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        update("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 border-dashed">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-white shadow-md flex items-center justify-center">
            {data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-300">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity text-[10px] font-bold">
            CHANGE
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div className="text-center">
          <p className="text-[11px] font-bold text-gray-700">Profile Photo</p>
          <p className="text-[9px] text-gray-400">Optional • Max 1MB</p>
          {data.photo && (
            <button 
              onClick={() => update("photo", "")}
              className="mt-1 text-[9px] text-red-500 font-bold hover:underline"
            >
              Remove Photo
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            placeholder="e.g. Atanu Paul"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
          {errors?.fullName && <p className="mt-1 text-xs font-medium text-rose-600">{errors.fullName}</p>}
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
          {errors?.email && <p className="mt-1 text-xs font-medium text-rose-600">{errors.email}</p>}
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            placeholder="e.g. +91-XXXXXXXXXX"
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
        <div>
          <label className="form-label">Website / Portfolio</label>
          <input
            className="form-input"
            placeholder="yourportfolio.com"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">GitHub</label>
          <input
            className="form-input"
            placeholder="github.com/yourname"
            value={data.github}
            onChange={(e) => update("github", e.target.value)}
          />
        </div>
      </div>

      {/* Custom Fields */}
      <div className="space-y-4 pt-2">
        {(data.customFields || []).map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 items-end p-4 bg-gray-50/50 rounded-2xl border border-gray-100 relative group transition-all hover:bg-white hover:shadow-sm">
            <button
              onClick={() => {
                const next = [...(data.customFields || [])];
                next.splice(index, 1);
                onChange({ ...data, customFields: next });
              }}
              className="absolute -right-2 -top-2 w-6 h-6 bg-white border border-rose-100 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-50 z-10"
              title="Remove Field"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5 block">Label</label>
              <input
                className="form-input"
                placeholder="e.g. Birthday"
                value={field.label}
                onChange={(e) => {
                  const next = [...(data.customFields || [])];
                  next[index] = { ...field, label: e.target.value };
                  onChange({ ...data, customFields: next });
                }}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5 block">Value</label>
              <input
                className="form-input"
                placeholder="e.g. Jan 1, 1990"
                value={field.value}
                onChange={(e) => {
                  const next = [...(data.customFields || [])];
                  next[index] = { ...field, value: e.target.value };
                  onChange({ ...data, customFields: next });
                }}
              />
            </div>
          </div>
        ))}
        
        <button
          onClick={() => {
            const next = [...(data.customFields || []), { id: Math.random().toString(36).substring(2, 9), label: "", value: "" }];
            onChange({ ...data, customFields: next });
          }}
          className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 group"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          <span className="text-xs font-bold uppercase tracking-widest">Add More Info</span>
        </button>
      </div>
    </div>
  );
}
