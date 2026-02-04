import "dotenv/config";
import WebSocket from "ws";

// 简单的内存存储上下文
// key: user_id (私聊) 或 group_id (群聊)
// value: Array<{ role: 'user'|'assistant'|'system', content: string }>
const chatHistory = new Map();
const MAX_HISTORY_LENGTH = 10; // 限制每个会话只保留最近 10 条消息

// 默认的 System Prompt
const DEFAULT_SYSTEM_PROMPT = {
  role: "system",
  content: "你是一个智能助手，回复请简短幽默。不要长篇大论。",
};

// 通义千问 AI 调用函数
async function callQwenNative(userInput, sessionId) {
  // 🔴 优先从环境变量读取 API Key
  const API_KEY = process.env.DASHSCOPE_API_KEY;
  if (!API_KEY || API_KEY.startsWith("sk-xxxx")) {
    console.error("❌ 未配置有效的 DASHSCOPE_API_KEY，请检查 .env 文件");
    return null;
  }
  const BASE_URL =
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

  // 获取上下文
  let messages = chatHistory.get(sessionId) || [DEFAULT_SYSTEM_PROMPT];

  // 将用户新消息加入历史
  messages.push({ role: "user", content: userInput });

  // 如果历史太长，保留 system prompt 和最近的消息
  if (messages.length > MAX_HISTORY_LENGTH) {
    // 保留第一条 system prompt，切掉中间的老消息
    messages = [messages[0], ...messages.slice(-(MAX_HISTORY_LENGTH - 1))];
  }

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

const ws = new WebSocket("ws://127.0.0.1:3001");

ws.on("open", function open() {
  console.log("✅ [EXTERNAL] 已连接到 NapCat OneBot 端口 (3001)");
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
        ws.send(
          JSON.stringify({
            action: "send_msg",
            params: {
              user_id: msg.user_id,
              group_id: msg.group_id,
              message: aiReply,
            },
          }),
        );
      }
    }
  } catch (e) {
    console.error("处理消息错误:", e);
  }
});

ws.on("error", (e) =>
  console.log("❌ 连接失败，请检查 NapCat 是否运行: " + e.message),
);
