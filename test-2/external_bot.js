import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:3001');

ws.on('open', function open() {
  console.log('✅ [EXTERNAL] 已连接到 NapCat OneBot 端口 (3001)');
});

ws.on('message', function incoming(data) {
  try {
    const msg = JSON.parse(data);
    if (msg.meta_event_type === 'heartbeat') return; // 忽略心跳

    if (msg.post_type === 'message') {
        const content = msg.raw_message || '';
        console.log(`[EXTERNAL] 收到: ${content}`);
        
        if (content.includes('你好')) {
            console.log('[EXTERNAL] 触发关键词，发送回复...');
            ws.send(JSON.stringify({
                action: 'send_msg',
                params: {
                    user_id: msg.user_id,
                    group_id: msg.group_id,
                    message: '你好！我是外挂式自动回复机器人 (Node版) 🚀'
                }
            }));
        }
    }
  } catch (e) {}
});

ws.on('error', (e) => console.log('❌ 连接失败，请检查 NapCat 是否运行: ' + e.message));
