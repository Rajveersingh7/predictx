// Route: /api/predict (POST)
import {GoogleGenAI} from "@google/genai";
import {NextRequest, NextResponse} from "next/server";
import type {
  PredictionRequest,
  PredictionResponse,
  ErrorResponse
} from "@/types";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY || ""});

export async function POST(
  request: NextRequest
): Promise<NextResponse<PredictionResponse | ErrorResponse>> {
  try {
    const body: PredictionRequest = await request.json();
    const {homeTeam, awayTeam} = body;

    if (!homeTeam || !awayTeam) {
      return NextResponse.json(
        {error: "Both teams are required"},
        {status: 400}
      );
    }

    if (homeTeam === awayTeam) {
      return NextResponse.json(
        {error: "Please select different teams"},
        {status: 400}
      );
    }

    const prompt = `
      You are an expert football analyst with knowledge up to Jan 2025.
      Your task is to estimate win/draw probabilities using only stable, historical factors.

      Match:
      Home Team: ${homeTeam}
      Away Team: ${awayTeam}

      Use only long-term, non-live factors such as:
      - Historical head-to-head
      - Long-term squad strength and depth
      - Tactical identity and overall style
      - Home advantage as a stable factor
      - Historical consistency and performance patterns

      Rules:
      - Always give a prediction even if uncertain.
      - Output must be EXACTLY in this format with NO extra text:
      HOME:X,DRAW:Y,AWAY:Z
      - X, Y, Z are integers.
      - X + Y + Z = 100.
      - No explanation, no commentary, no symbols.

      Example output:
      HOME:41,DRAW:34,AWAY:25
      `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const text = response.text?.trim() || "";

    const match = text.match(/HOME:(\d+),DRAW:(\d+),AWAY:(\d+)/);

    if (!match) {
      throw new Error("Invalid AI response format");
    }

    const homeWin = parseInt(match[1], 10);
    const draw = parseInt(match[2], 10);
    const awayWin = parseInt(match[3], 10);

    if (homeWin + draw + awayWin !== 100) {
      throw new Error("Percentages must sum to 100");
    }

    const predictionResponse: PredictionResponse = {
      homeWin,
      draw,
      awayWin,
      homeTeam,
      awayTeam
    };

    return NextResponse.json(predictionResponse);
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      {error: "Failed to generate prediction. Please try again."},
      {status: 500}
    );
  }
}
