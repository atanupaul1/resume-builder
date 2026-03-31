"use client";
import { PersonalInfo } from "@/types/resume";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
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
