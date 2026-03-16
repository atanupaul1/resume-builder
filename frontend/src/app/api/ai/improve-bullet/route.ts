import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { bullet, role, company } = await req.json();

    if (!bullet?.trim()) {
      return NextResponse.json({ error: "No bullet provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const prompt = `You are a professional resume writer. Rewrite the following resume bullet point to be stronger, more impactful, and ATS-friendly.

Context:
- Job Title: ${role || "not specified"}
- Company: ${company || "not specified"}
- Original bullet: "${bullet}"

Rules:
1. Start with a strong action verb (e.g. Built, Led, Increased, Reduced, Designed, Delivered)
2. Quantify the impact where possible — invent a plausible metric if none is given (e.g. "serving 10k+ users", "reducing load time by 35%")
3. Keep it to ONE sentence, max 20 words
4. Make it specific and results-oriented
5. Do NOT add bullet symbols, hyphens, or any prefix
6. Return ONLY the rewritten bullet, nothing else — no explanation, no quotes
7. Respond in plain text.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        }
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "AI request failed" }, { status: 500 });
    }

    const data = await response.json();
    const improved = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()?.replace(/^["']|["']$/g, "") ?? "";

    return NextResponse.json({ improved });
  } catch (err) {
    console.error("improve-bullet error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
