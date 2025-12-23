
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSustainabilityItem = async (base64Image: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Analyze this item and provide sustainability tips. Be concise. Include: 1. What it is. 2. Carbon footprint estimation. 3. Proper disposal/reuse tip. Use a friendly, campus-focused tone.",
        },
      ],
    },
  });
  return response.text || "Sorry, I couldn't analyze that. Please try again.";
};

export const getSustainabilityCoachResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history as any,
    config: {
      systemInstruction: `You are 'Eco Campus Coach', an expert sustainability guide for college students. 
      You suggest actions like carpooling, using refillable bottles, choosing vegan cafeteria options, and proper recycling.
      Always be encouraging and provide quantifiable impact stats where possible.
      Keep responses brief and conversational.`,
    },
  });

  const response = await chat.sendMessage({ message: userMessage });
  return response.text;
};

export const getPredictiveInsights = async (userData: any): Promise<any> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Based on this user's current campus activity: ${JSON.stringify(userData)}, predict:
    1. Optimal library usage time for energy saving.
    2. Best day for carpooling.
    3. Next sustainability milestone goal.
    Return only a JSON object with keys: libraryTime, carpoolDay, nextMilestone.`,
    config: {
      callTimeout: 30000,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          libraryTime: { type: Type.STRING },
          carpoolDay: { type: Type.STRING },
          nextMilestone: { type: Type.STRING }
        },
        required: ["libraryTime", "carpoolDay", "nextMilestone"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const generateEcoListing = async (itemName: string, category: string): Promise<{ description: string, ecoScore: number }> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a catchy, eco-conscious description for a second-hand item: "${itemName}" in category "${category}". 
    The tone should be student-friendly and highlight why buying this second-hand is better for the planet than buying new.
    Also provide a sustainability score from 1-10.
    Return JSON with keys: description, ecoScore.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING },
          ecoScore: { type: Type.NUMBER }
        },
        required: ["description", "ecoScore"]
      }
    }
  });
  return JSON.parse(response.text || '{"description": "", "ecoScore": 5}');
};

export const getSellingAdvice = async (itemName: string): Promise<{ advice: string, spots: { name: string, location: string, benefit: string }[] }> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The student wants to sell or recycle: "${itemName}".
    Provide a friendly piece of advice on how to get the most value/impact from this.
    Also list 3 specific types of places (generic campus spots like "Bookstore buyback", "Dorm thrift box", "Local consignment store") where they should go.
    Return JSON with keys: advice, spots (array of {name, location, benefit}).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advice: { type: Type.STRING },
          spots: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                location: { type: Type.STRING },
                benefit: { type: Type.STRING }
              },
              required: ["name", "location", "benefit"]
            }
          }
        },
        required: ["advice", "spots"]
      }
    }
  });
  return JSON.parse(response.text || '{"advice": "Try the campus union.", "spots": []}');
};
