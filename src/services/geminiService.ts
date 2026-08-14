import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash"
});

export async function askMedicalAssistant(message: string) {
  const result = await model.generateContent(
    `You are HealthSphere AI, a helpful healthcare assistant. User question: ${message}`
  );

  return result.response.text();
}

export async function analyzeMedicalReport(reportText: string) {
  try {
    const result = await model.generateContent(
      `You are HealthSphere AI.

Analyze the following medical report description and provide:
- A simple summary
- What the document may contain
- Questions the patient should ask their doctor
- A safety disclaimer that this is not a diagnosis

Report description:
${reportText}`
    );

    return result.response.text();
  } catch (error) {
    console.error("Medical report analysis error:", error);
    return "AI analysis is temporarily unavailable.";
  }
}
