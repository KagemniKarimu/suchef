import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { AI_PROMPTS, AIMode } from "@/lib/prompts";
import { getRandomResponse, ResponseCategory } from "@/app/mock/AIResponseData";
import { rateLimit } from "@/lib/rate-limit";

// Initialize OpenAI client - will use mock if no API key
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.headers.get("x-forwarded-for") || "anonymous";
    const { success, remaining } = rateLimit.check(identifier);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { prompt, message, mode } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // Basic input sanitization and limits
    const sanitizedMessage = String(message).trim().slice(0, 1000);
    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 },
      );
    }

    // If no OpenAI key, use mock responses
    if (!openai) {
      const mockResponse = getRandomResponse(
        (mode || "learn") as ResponseCategory,
      );
      await new Promise((resolve) => setTimeout(resolve, 500));

      return NextResponse.json({
        message: mockResponse,
        ...(mode === "review" && {
          rating: Math.floor(Math.random() * 2) + 3.5,
        }),
        ...(mode === "nyanya" && {
          suggestions: ["Quick Stir-Fry", "One-Pot Pasta", "Simple Curry"],
        }),
      });
    }

    // Real OpenAI call
    const systemPrompt =
      prompt || AI_PROMPTS[mode as AIMode] || AI_PROMPTS.learn;

    const completion = await openai.chat.completions.create({
      model: "gpt-5", // Using GPT-5 for demo
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: sanitizedMessage },
      ],
    });

    const aiMessage =
      completion.choices[0].message.content || "Sorry, one more time?";

    return NextResponse.json({
      message: aiMessage,
      ...(mode === "review" && { rating: 4.0 }), // Would need to parse from response
      ...(mode === "nyanya" && {
        suggestions: ["Quick Stir-Fry", "One-Pot Pasta", "Simple Curry"], // Would parse from response
      }),
    });
  } catch (error) {
    console.error("AI API error:", error);

    // Fallback to mock on error
    const mockResponse = getRandomResponse("learn" as ResponseCategory);
    return NextResponse.json({
      message: mockResponse,
      error: "Using fallback response",
    });
  }
}
