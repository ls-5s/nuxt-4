// NapCatQQ 自动回复脚本（基础版）
// 监听消息事件（私聊+群聊）
napcat.on('message', async (msg) => {
  // 忽略自身发送的消息，避免循环回复
  if (msg.sender.uin === napcat.uin) return;
  
  // 消息内容（转为小写，方便不区分大小写匹配）
  const msgContent = msg.content.toLowerCase();
  
  // 1. 私聊回复逻辑
  if (msg.type === 'private') {
    if (msgContent.includes('你好') || msgContent.includes('hi')) {
      await msg.reply('你好呀！我是NapCatQQ自动回复机器人🤖\n很高兴认识你～');
    } else if (msgContent.includes('再见') || msgContent.includes('拜拜')) {
      await msg.reply('拜拜～祝你今天开心，下次见哦👋');
    } else if (msgContent.includes('帮助') || msgContent.includes('怎么用')) {
      await msg.reply('📖 机器人帮助：\n- 发送“你好”“hi”触发欢迎回复\n- 发送“再见”“拜拜”触发告别回复\n- 其他消息将触发默认回复');
    } else {
      // 默认回复
      await msg.reply('抱歉呀😣，我还没学会回复这个内容，请换个话题试试，或者发送“帮助”查看可用指令～');
    }
  }
  
  // 2. 群聊回复逻辑（可根据群号区分不同群的回复）
  if (msg.type === 'group') {
    const groupId = msg.group.uin; // 群号
    // 示例：仅在指定群（替换为你的群号）触发回复
    if (groupId === '123456789') { // 替换成你的群号
      if (msgContent.includes('群规')) {
        await msg.reply('📢 本群群规：\n1. 禁止发布广告、链接\n2. 禁止争吵、辱骂他人\n3. 文明发言，专注交流\n违反群规将被禁言/移出群聊哦～');
      } else if (msgContent.includes('新人')) {
        await msg.reply('🎉 欢迎新人加入本群！\n请先阅读群规，遵守群规，祝在群里玩得开心，收获满满～');
      }
    }
    // 可新增其他群的回复逻辑，复制上面的if (groupId === 'xxx') 块即可
  }
  
  // 3. 关键词模糊匹配示例（比如包含“天气”就回复天气提示）
  if (msgContent.includes('天气')) {
    await msg.reply('🌤️  天气查询提示：\n请发送“城市+天气”（如“北京天气”），即可获取实时天气（需后续对接天气接口，当前为示例）～');
  }
});

// 脚本加载成功提示
console.log('✅ NapCatQQ 自动回复脚本加载成功！');