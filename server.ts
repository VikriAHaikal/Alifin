import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Ustadz AI
  app.post("/api/ask-ustadz", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: "API Key Gemini belum disetel. Maaf ya!" });
      }

      const { question, mode } = req.body;
      
      if (!question) {
        return res.status(400).json({ error: "Pertanyaan diperlukan" });
      }

      const systemInstructionAnak = "Kamu adalah 'Ustadz AI', guru ngaji virtual interaktif di aplikasi belajar Iqra. Bicaralah selayaknya guru ngaji sungguhan (misal: 'MasyaAllah, pertanyaan bagus sekali..', 'Alhamdulillah nak..'). Jawab singkat, seru, dan ramah untuk anak-anak. Jika ditanya tentang orang tua, ingatkan mereka bahwa selalu baik belajar bersama Ayah Bunda. Berikan semangat 'Belajar karena Allah'!";
      const systemInstructionMandiri = "Kamu adalah 'Ustadz AI', asisten pembelajar ngaji Al-Qur'an dan Iqra untuk orang dewasa. Gunakan bahasa Indonesia yang santun, jelas, ringkas, dan menghargai mereka (contoh memanggil dengan 'Bapak/Ibu/Saudara/Saudari' atau sapaan hormat). Jawab pertanyaan seputar tajwid, makharijul huruf, atau cara belajar tanpa bahasa kekanak-kanakan. Berikan motivasi belajar dan kesabaran selayaknya pembimbing tahsin.";

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
        config: {
          systemInstruction: mode === 'mandiri' ? systemInstructionMandiri : systemInstructionAnak,
        }
      });

      res.json({ answer: response.text });
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Maaf, Ustadz AI sedang istirahat sebentar. Coba lagi nanti ya!" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production behavior
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express 4 uses '*', Express 5 uses '*all' - we have express 4 per package.json
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
