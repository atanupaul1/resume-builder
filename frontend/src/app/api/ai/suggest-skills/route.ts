import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, existingSkills, experience } = await req.json();

    if (!jobTitle?.trim() && (!experience || experience.length === 0)) {
       return NextResponse.json({ error: "Provide a Job Title or Experience first." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const expText = experience?.map((e: any) => e.role).join(", ") || "None provided";
    
    let prompt = `You are a technical recruiter. Suggest exactly 3 skill categories and 5 highly-relevant skills for each category for a resume.

Context:
- Target Job Title/Role: ${jobTitle || "Not specified"}
- Past Roles: ${expText}
- Skills they already have (DO NOT suggest these): ${existingSkills?.join(", ") || "None"}

Rules:
1. Suggest exactly 3 groupings/categories (e.g., "Languages", "Frameworks", "Tools", or relevant categories for the job).
2. Suggest exactly 5 specific, modern, and highly relevant skills per category.
3. Only output valid JSON in the exact format below, nothing else, no markdown formatting (do not wrap in \`\`\`json):
{
  "groups": [
    { "category": "Category Name", "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"] },
    ...
  ]
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        }
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "AI request failed" }, { status: 500 });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "{}";
    
    // Safety generic parse
    if (text.startsWith("```json")) {
        text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    }
    
    const parsed = JSON.parse(text);

    return NextResponse.json({ groups: parsed.groups || [] });
  } catch (err) {
    console.error("suggest-skills error:", err);
    return NextResponse.json({ error: "Internal error or could not parse AI output" }, { status: 500 });
  }
}
