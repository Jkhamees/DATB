import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface TradingSignal {
  id: string;
  asset: string;
  type: 'BULLISH' | 'BEARISH' | 'BREAKOUT';
  confidence: number;
  reasoning: string;
  time: string;
  entry: string;
  target: string;
  stopLoss: string;
}

export const generateTradingSignals = async (): Promise<TradingSignal[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 5 realistic crypto trading signals based on current market trends (simulated). Include asset name, type (BULLISH, BEARISH, BREAKOUT), confidence (0-100), reasoning, entry price, target price, and stop loss.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              asset: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['BULLISH', 'BEARISH', 'BREAKOUT'] },
              confidence: { type: Type.NUMBER },
              reasoning: { type: Type.STRING },
              time: { type: Type.STRING },
              entry: { type: Type.STRING },
              target: { type: Type.STRING },
              stopLoss: { type: Type.STRING },
            },
            required: ['id', 'asset', 'type', 'confidence', 'reasoning', 'time', 'entry', 'target', 'stopLoss'],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating trading signals:", error);
    return [];
  }
};
