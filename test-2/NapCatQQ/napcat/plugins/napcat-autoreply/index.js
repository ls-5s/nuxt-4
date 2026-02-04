import { getGroupMemberInfo, sendGroupMsg, sendPrivateMsg } from "napcat-types";

export const plugin_init = async (ctx) => {
    const logger = ctx.logger;
    logger.info("✅ [AutoReply] 自动回复插件已启动 (V2)...");

    // 注意：NapCat 新版架构可能不直接暴露 global.napcat 的 message 事件
    // 我们需要通过 OneBot 11 的 HTTP/WebSocket 接口，或者内部 hook 机制
    // 但作为内部插件，通常应该利用 ctx 提供的能力，或者 NTQQWrapper
    
    // 调试：打印一下 global 上的关键对象，看看核心实例在哪里
    // logger.info("Global Keys: " + Object.keys(global).filter(k => k.includes('nap') || k.includes('QQ') || k.includes('Bot')));

    // 尝试直接 hook NTQQ 的事件
    try {
        const { NTQQApi } = await import('./napcat/core/ntqq.mjs').catch(() => ({}));
        // 如果这里能拿到 NTQQApi，我们就可以做很多事情
    } catch (e) {}

    // 方案修正：
    // NapCat Shell 版实际上主要是一个 OneBot 实现。
    // 如果我们要实现“内部自动回复”，最稳妥的方式其实是：
    // 让用户通过外部程序（如 Python/Node 脚本）连接 ws://localhost:3001
    // 但用户希望是“内置”的。
    
    // 观察日志，我们发现 NapCat 已经成功收到了消息：
    // [info] 残月 | 接收 <- 私聊 (2408224899) 你好
    // 这说明 NapCat 核心工作正常。
    
    // 现在的关键是：我们的插件代码并没有被触发。
    // 原因是：插件加载了，但 `global.napcat` 可能在插件初始化时还未准备好，或者根本不存在。
    
    // 我们尝试监听 ctx 上的事件，或者直接轮询检测 bot 实例
    
    const checkBot = setInterval(() => {
        // 尝试寻找核心对象
        const bot = global.napcat || global.NapCat;
        if (bot && bot.on) {
            clearInterval(checkBot);
            logger.info("✅ [AutoReply] 成功挂载到 NapCat 核心事件流！");
            
            bot.on('message', async (msg) => {
                // 确保 msg 对象存在
                if (!msg) return;
                
                // 忽略自己
                if (msg.sender && msg.sender.uin === bot.uin) return;

                const content = msg.content || "";
                logger.info(`[AutoReply] 捕获消息: ${content}`);
                
                // 简单的关键词回复
                if (content.includes("你好")) {
                    // 尝试调用 reply 方法
                    if (typeof msg.reply === 'function') {
                        await msg.reply("你好呀！我是自动回复机器人~");
                    } else {
                        // 如果没有 reply 方法，尝试直接调用发送接口
                        logger.warn("msg.reply 不是函数，尝试手动发送...");
                    }
                }
            });
        }
    }, 1000);
    
    // 5秒后如果还没找到，就放弃
    setTimeout(() => {
        if (checkBot) clearInterval(checkBot);
    }, 10000);
};
