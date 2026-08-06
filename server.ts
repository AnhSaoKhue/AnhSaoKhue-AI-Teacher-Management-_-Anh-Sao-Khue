import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));

  // Initialize Gemini AI client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // System instruction for Miss Yến còi
  const SYSTEM_INSTRUCTION = `Bạn là "Miss Yến còi" - Trợ lý ảo AI giáo dục thông minh, trách nhiệm và tâm huyết của hệ thống "AI Education Platform - Anh Sao Khue" (Hotline/ĐIỆN THOẠI: 0346513056).

Nhiệm vụ chính của bạn:
1. Hỗ trợ giáo viên trong việc giảng dạy, tư vấn phương pháp sư phạm, soạn giáo án, tạo đề thi, câu hỏi kiểm tra miệng, quản lý lớp học và theo dõi chuyên cần học sinh.
2. Trả lời câu hỏi thắc mắc về sử dụng phần mềm AI Education Platform (điểm danh, thống kê vắng, rút câu hỏi kiểm tra ngẫu nhiên, quản lý bài tập, kho học liệu Google Drive/YouTube).
3. Trò chuyện tự nhiên, văn phong tinh tế, thân thiện, chân thành như một người đồng nghiệp giảng dạy chuyên nghiệp, dí dỏm nhẹ nhàng.

Yêu cầu nghiêm ngặt:
- Không ảo giác, không phịa thông tin vô căn cứ.
- Luôn tuân thủ đạo đức nhà giáo, chuẩn mực xã hội, an toàn pháp luật.
- Ngôn ngữ: Tiếng Việt chuẩn mực, ấm áp, có trách nhiệm.
- Xưng xưng: xưng "Miss Yến còi" hoặc "em/mình", gọi người dùng là "Thầy/Cô" hoặc "bạn".`;

  // API Route for AI Chatbot Miss Yến còi
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message content is required." });
      }

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not configured yet
        return res.json({
          reply:
            "Xin chào Thầy/Cô! Em là Miss Yến còi. Hiện tại khóa GEMINI_API_KEY chưa được cấu hình, nhưng em vẫn sẵn sàng hỗ trợ Thầy/Cô sử dụng các tính năng điểm danh, kiểm tra miệng và quản lý bài tập!",
        });
      }

      // Format contents for chat history
      const formattedContents = [];

      if (Array.isArray(history)) {
        history.forEach((item: { sender: string; text: string }) => {
          formattedContents.push({
            role: item.sender === "user" ? "user" : "model",
            parts: [{ text: item.text }],
          });
        });
      }

      // Append latest message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Em là Miss Yến còi, em luôn sẵn sàng lắng nghe Thầy/Cô ạ!";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Error in Miss Yến còi chatbot API:", error);
      return res.status(500).json({
        reply:
          "Chào Thầy/Cô, hiện tại hệ thống vừa bận một chút ạ. Thầy/Cô thử gửi lại câu hỏi cho Miss Yến còi nhé!",
      });
    }
  });

  // API Route for downloading project ZIP source code
  app.get("/api/download-source", (req, res) => {
    const zipPath = path.join(process.cwd(), "public", "anh-sao-khue-source-code.zip");
    if (fs.existsSync(zipPath)) {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="anh-sao-khue-source-code.zip"');
      res.sendFile(zipPath);
    } else {
      res.status(404).json({ error: "Tệp mã nguồn ZIP chưa được tạo." });
    }
  });

  // API Route for downloading Master Prompt Word document (.doc)
  app.get("/api/download-prompt", (req, res) => {
    const docPath = path.join(process.cwd(), "public", "Prompt_He_Thong_Anh_Sao_Khue.doc");
    if (fs.existsSync(docPath)) {
      res.setHeader("Content-Type", "application/msword");
      res.setHeader("Content-Disposition", 'attachment; filename="Prompt_He_Thong_Anh_Sao_Khue.doc"');
      res.sendFile(docPath);
    } else {
      res.status(404).json({ error: "Tệp Prompt Word (.doc) chưa được tạo." });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", botName: "Miss Yến còi" });
  });

  // Vite middleware for development
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
    console.log(`AI Education Platform server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
