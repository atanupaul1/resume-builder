import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, experience, education, skills } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const expText = experience.map((e: any) => `${e.role} at ${e.company}`).join(", ");
    const eduText = education.map((e: any) => `${e.degree} from ${e.institution}`).join(", ");
    const skillsText = skills.flatMap((g: any) => g.skills).join(", ");

    const prompt = `You are a professional resume writer. Write a compelling, ATS-friendly professional summary (3-4 sentences) for a resume.

Context:
- Target Job Title: ${jobTitle || "Professional"}
- Experience Highlights: ${expText || "None provided"}
- Education: ${eduText || "None provided"}
- Key Skills: ${skillsText || "None provided"}

Rules:
1. Write 3-4 impactful sentences.
2. Focus on the value the candidate brings, highlighting key achievements and skills.
3. Keep the tone professional, confident, and action-oriented.
4. Do not use first-person pronouns ("I", "my") - start sentences with action verbs or nouns.
5. Return ONLY the summary paragraph. No quotes, no intro, no explanation.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "AI request failed" }, { status: 500 });
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()?.replace(/^["']|["']$/g, "") ?? "";

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("generate-summary error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
