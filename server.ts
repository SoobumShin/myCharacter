import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Start Server with Vite Middleware
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google GenAI
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "kids-character-creator", timestamp: new Date().toISOString() });
  });

  // Optional AI Character Nickname / Story Generator
  app.post("/api/character/story", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const { name, hatType, topType, bottomType, hatColor, topColor, bottomColor } = req.body;

      const prompt = `초등학생이 만든 귀여운 캐릭터의 특징에 맞춰 재치있는 별명 3개와 1문장의 귀여운 자기소개를 만들어주세요.
캐릭터 이름: ${name || '친구'}
모자: ${hatType} (${hatColor})
상의: ${topType} (${topColor})
하의: ${bottomType} (${bottomColor})

JSON 응답:
{
  "nicknames": ["별명1", "별명2", "별명3"],
  "intro": "안녕! 나는 ~한 ~이야!"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              nicknames: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              intro: { type: Type.STRING },
            },
            required: ["nicknames", "intro"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json({ success: true, ...data });
    } catch (error: any) {
      console.error("Story generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate story" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
