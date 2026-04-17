"use client";
import { useState } from "react";
import { Publication } from "@/types/resume";

interface Props {
  data: Publication[];
  onChange: (data: Publication[]) => void;
}

export default function PublicationsForm({ data, onChange }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addPublication = () => {
    onChange([
      ...data,
      {
        id: Math.random().toString(36).substring(2, 9),
        doi: "",
        title: "",
        authors: "",
        year: "",
        venue: "",
        url: "",
      },
    ]);
  };

  const removePublication = (id: string) => {
    onChange(data.filter((p) => p.id !== id));
  };

  const updatePublication = (id: string, field: keyof Publication, value: string) => {
    onChange(data.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const fetchDOI = async (id: string, doi: string) => {
    if (!doi) return;
    setLoadingId(id);
    setError(null);

    try {
      const cleanDOI = doi.trim()
        .replace(/^https?:\/\/doi\.org\//, "")
        .replace(/^doi:/i, "")
        .trim();

      // Strategy 1: CrossRef API (Best for structured data)
      let response = await fetch(`https://api.crossref.org/works/${cleanDOI}`);
      let m: any;

      if (response.ok) {
        const json = await response.json();
        m = json.message;
      } else {
        // Strategy 2: Official DOI Resolver with Content Negotiation (Fallback)
        response = await fetch(`https://doi.org/${cleanDOI}`, {
          headers: { 'Accept': 'application/vnd.citationstyles.csl+json' }
        });
        if (!response.ok) throw new Error("Could not find metadata for this DOI");
        m = await response.json();
      }
      
      // Normalize data from either source
      const authors = m.author 
        ? m.author.map((a: any) => {
            const family = a.family || "";
            const given = a.given ? `, ${a.given[0]}.` : "";
            return `${family}${given}`;
          }).filter(Boolean).join(", ")
        : "";
      
      const year = (m.issued?.["date-parts"]?.[0]?.[0] || m.issued?.["raw"] || m.published?.["date-parts"]?.[0]?.[0] || "").toString();
      const venue = m["container-title"]?.[0] || m["container-title"] || m.publisher || "";
      const title = Array.isArray(m.title) ? m.title[0] : m.title || "";
      const url = m.URL || `https://doi.org/${cleanDOI}`;

      onChange(data.map((p) => 
        p.id === id ? { ...p, title, authors, year, venue, url, doi: cleanDOI } : p
      ));
    } catch (err) {
      setError("Failed to fetch DOI metadata. Please enter details manually.");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Publications</h3>
        {error && <span className="text-[10px] text-rose-500 font-medium">{error}</span>}
      </div>

      <div className="space-y-6">
        {data.map((pub) => (
          <div key={pub.id} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm relative group transition-all hover:border-indigo-100">
            <button
              onClick={() => removePublication(pub.id)}
              className="absolute -right-2 -top-2 w-6 h-6 bg-white border border-rose-100 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-50 z-10"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">DOI Number</label>
                  <div className="relative">
                    <input
                      className="form-input pr-24"
                      placeholder="e.g. 10.1109/..."
                      value={pub.doi}
                      onChange={(e) => updatePublication(pub.id, "doi", e.target.value)}
                    />
                    <button
                      onClick={() => fetchDOI(pub.id, pub.doi)}
                      disabled={loadingId === pub.id}
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-700 disabled:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      {loadingId === pub.id ? (
                        <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : (
                        "Fetch"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">Paper Title</label>
                  <input
                    className="form-input font-medium"
                    placeholder="Enter title"
                    value={pub.title}
                    onChange={(e) => updatePublication(pub.id, "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">Authors</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Das, P., Misra, S."
                    value={pub.authors}
                    onChange={(e) => updatePublication(pub.id, "authors", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">Venue (Journal/Conf)</label>
                  <input
                    className="form-input"
                    placeholder="e.g. IEEE GLOBECOM"
                    value={pub.venue}
                    onChange={(e) => updatePublication(pub.id, "venue", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">Year</label>
                  <input
                    className="form-input"
                    placeholder="2025"
                    value={pub.year}
                    onChange={(e) => updatePublication(pub.id, "year", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addPublication}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 group"
      >
        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        <span className="text-xs font-bold uppercase tracking-widest">Add Publication</span>
      </button>
    </div>
  );
}
