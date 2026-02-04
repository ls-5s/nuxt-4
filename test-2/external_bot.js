import "dotenv/config";
import WebSocket from "ws";

// 通义千问 AI 调用函数
async function callQwenNative(userInput) {
  // 🔴 优先从环境变量读取 API Key
  const API_KEY = process.env.DASHSCOPE_API_KEY;
  if (!API_KEY || API_KEY.startsWith("sk-xxxx")) {
    console.error("❌ 未配置有效的 DASHSCOPE_API_KEY，请检查 .env 文件");
    return null;
  }
  const BASE_URL =
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        messages: [
          { role: "system", content: "你是一个智能助手，回复请简短幽默。" },
          { role: "user", content: userInput },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    // 兼容OpenAI格式的返回值
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
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

      // 调用 AI 回复
      const aiReply = await callQwenNative(content);

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
