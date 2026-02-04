// NapCatQQ 自动回复脚本（AI版）

/**
 * 原生HTTP调用通义千问（无SDK依赖）
 */
async function callQwenNative(userInput) {
  // 请在此处填入你的 DashScope API Key
  const API_KEY = "你的DashScope API Key";
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
        model: "qwen-plus",
        messages: [
          { role: "system", content: "你是一个智能助手" },
          { role: "user", content: userInput },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    // 兼容OpenAI格式的返回值
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    console.error("API Error:", JSON.stringify(data));
    return null;
  } catch (error) {
    console.error("请求失败：", error);
    return null;
  }
}

// 监听消息事件（私聊+群聊）
napcat.on("message", async (msg) => {
  // 忽略自身发送的消息，避免循环回复
  if (msg.sender.uin === napcat.uin) return;

  const msgContent = msg.content;
  // 忽略空消息
  if (!msgContent) return;

  // 可以在这里添加日志
  console.log(`收到消息: ${msgContent}，正在请求AI...`);

  // 调用AI并回复
  const reply = await callQwenNative(msgContent);
  if (reply) {
    await msg.reply(reply);
  }
});

// 脚本加载成功提示
console.log("✅ NapCatQQ AI自动回复脚本加载成功！");
