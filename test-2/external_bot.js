import dotenv from "dotenv";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { textToQQSilk } from "./tts_service.js"; // Import TTS Service

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the same directory as this script
dotenv.config({ path: path.join(__dirname, ".env") });

// 全局配置状态
const botConfig = {
  enabled: true, // 机器人开关
  enableTTS: true, // 开启语音回复
  systemPrompt: "你是一个智能助手，回复请简短幽默。不要长篇大论。",
};

// 简单的内存存储上下文
// key: user_id (私聊) 或 group_id (群聊)
// value: Array<{ role: 'user'|'assistant'|'system', content: string }>
const chatHistory = new Map();
const MAX_HISTORY_LENGTH = 10; // 限制每个会话只保留最近 10 条消息

// 通义千问 AI 调用函数
async function callQwenNative(userInput, sessionId) {
  // 如果机器人被关闭，直接返回 null
  if (!botConfig.enabled) return null;

  // 🔴 优先从环境变量读取 API Key
  const API_KEY = process.env.DASHSCOPE_API_KEY;
  if (!API_KEY || API_KEY.startsWith("sk-xxxx")) {
    console.error("❌ 未配置有效的 DASHSCOPE_API_KEY，请检查 .env 文件");
    return null;
  }
  const BASE_URL =
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

  // 获取上下文，动态使用当前的 systemPrompt
  let messages = chatHistory.get(sessionId) || [
    { role: "system", content: botConfig.systemPrompt },
  ];

  // 确保第一条始终是当前的 System Prompt (如果配置被修改了)
  if (messages.length > 0 && messages[0].role === "system") {
    messages[0].content = botConfig.systemPrompt;
  } else {
    messages.unshift({ role: "system", content: botConfig.systemPrompt });
  }

  // 将用户新消息加入历史
  messages.push({ role: "user", content: userInput });

  // 如果历史太长，保留 system prompt 和最近的消息
  if (messages.length > MAX_HISTORY_LENGTH) {
    // 保留第一条 system prompt，切掉中间的老消息
    messages = [messages[0], ...messages.slice(-(MAX_HISTORY_LENGTH - 1))];
  }

  // [DEBUG] 打印即将发送给 AI 的上下文
  console.log(
    `[DEBUG] 发送给 AI 的上下文 (sessionId: ${sessionId}):`,
    JSON.stringify(messages, null, 2),
  );

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        messages: messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    // 兼容OpenAI格式的返回值
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiContent = data.choices[0].message.content;

      // 将 AI 回复也加入历史
      messages.push({ role: "assistant", content: aiContent });
      // 更新内存中的历史记录
      chatHistory.set(sessionId, messages);

      return aiContent;
    } else {
      console.error("API 返回错误:", JSON.stringify(data));
      return null; // 返回 null 表示调用失败
    }
  } catch (error) {
    console.error("请求失败：", error);
    return null;
  }
}

// --- Web Dashboard Server ---
const HTTP_PORT = 3002;
const server = http.createServer((req, res) => {
  // 处理 API 请求
  if (req.url === "/api/config" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(botConfig));
    return;
  }

  if (req.url === "/api/config" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const newConfig = JSON.parse(body);
        if (typeof newConfig.enabled === "boolean")
          botConfig.enabled = newConfig.enabled;
        if (typeof newConfig.enableTTS === "boolean")
          botConfig.enableTTS = newConfig.enableTTS;
        if (newConfig.systemPrompt)
          botConfig.systemPrompt = newConfig.systemPrompt;

        console.log("配置已更新:", botConfig);

        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ success: true, config: botConfig }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // 服务静态页面 (dashboard.html)
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(path.join(__dirname, "dashboard.html"), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading dashboard.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(content);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

// --- Dashboard WebSocket Server ---
const wss = new WebSocketServer({ server });

function broadcastToDashboard(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

server.listen(HTTP_PORT, () => {
  console.log(`🌐 Web Dashboard 运行在: http://localhost:${HTTP_PORT}`);
});

// --- WebSocket Bot Client ---
let ws;

function connectToNapCat() {
  if (ws) {
    ws.removeAllListeners();
    try {
      ws.close();
    } catch (e) {}
  }

  ws = new WebSocket("ws://127.0.0.1:3001");

  ws.on("open", function open() {
    console.log("✅ [EXTERNAL] 已连接到 NapCat OneBot 端口 (3001)");
    broadcastToDashboard({
      type: "log",
      role: "system_info",
      text: "Connected to NapCat (QQ Client)",
      time: new Date().toLocaleTimeString(),
    });
  });

  ws.on("message", async function incoming(data) {
    try {
      const msg = JSON.parse(data);
      if (msg.meta_event_type === "heartbeat") return; // 忽略心跳

      if (msg.post_type === "message") {
        const content = msg.raw_message || "";

        // 简单过滤：忽略空消息或过短消息
        if (!content || content.length < 1) return;

        console.log(`[EXTERNAL] 收到消息: ${content}`);

        // 指令处理
        if (content.trim() === "开启语音") {
          botConfig.enableTTS = true;
          ws.send(
            JSON.stringify({
              action: "send_msg",
              params: {
                user_id: msg.user_id,
                group_id: msg.group_id,
                message: "语音回复已开启 🔊",
              },
            }),
          );
          return;
        }
        if (content.trim() === "关闭语音") {
          botConfig.enableTTS = false;
          ws.send(
            JSON.stringify({
              action: "send_msg",
              params: {
                user_id: msg.user_id,
                group_id: msg.group_id,
                message: "语音回复已关闭 🔇",
              },
            }),
          );
          return;
        }

        broadcastToDashboard({
          type: "log",
          role: "user",
          text: content,
          user_id: msg.user_id,
          group_id: msg.group_id,
          time: new Date().toLocaleTimeString(),
        });
        // DEBUG: 打印消息元数据，检查 message_type 和 ID
        console.log(
          `[DEBUG] type: ${msg.message_type}, user: ${msg.user_id}, group: ${msg.group_id}`,
        );

        // 确定会话 ID：优先判断是否有 group_id
        // 注意：私聊消息通常也有 user_id，群聊消息也有 user_id (发送者)
        let sessionId;
        if (msg.message_type === "group" || msg.group_id) {
          sessionId = `group_${msg.group_id}`;
        } else {
          sessionId = `user_${msg.user_id}`;
        }

        console.log(`[DEBUG] Current SessionID: ${sessionId}`);

        // 调用 AI 回复 (带上下文)
        const aiReply = await callQwenNative(content, sessionId);

        if (aiReply) {
          console.log(`[EXTERNAL] AI 回复: ${aiReply}`);
          broadcastToDashboard({
            type: "log",
            role: "assistant",
            text: aiReply,
            time: new Date().toLocaleTimeString(),
          });

          let messagePayload = aiReply;

          // 尝试转换为语音
          if (botConfig.enableTTS) {
            try {
              const silkPath = await textToQQSilk(aiReply);
              if (silkPath) {
                // 使用 file:// 协议发送本地 silk 文件
                messagePayload = [
                  { type: "record", data: { file: `file://${silkPath}` } },
                ];
                console.log(`[EXTERNAL] 发送语音: ${silkPath}`);
              }
            } catch (ttsErr) {
              console.error("[EXTERNAL] TTS 转换失败，回退到文本:", ttsErr);
            }
          }

          ws.send(
            JSON.stringify({
              action: "send_msg",
              params: {
                user_id: msg.user_id,
                group_id: msg.group_id,
                message: messagePayload,
              },
            }),
          );
        }
      }
    } catch (e) {
      console.error("处理消息错误:", e);
    }
  });

  ws.on("error", (e) => {
    console.log("❌ 连接 NapCat 失败, 3秒后重试: " + e.message);
  });

  ws.on("close", () => {
    console.log("⚠️ 与 NapCat 断开连接, 3秒后重试...");
    broadcastToDashboard({
      type: "log",
      role: "system_error",
      text: "Disconnected from NapCat. Retrying in 3s...",
      time: new Date().toLocaleTimeString(),
    });
    setTimeout(connectToNapCat, 3000);
  });
}

// 启动连接
connectToNapCat();
