<template>
  <div class="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
    <!-- 背景层 (模拟游戏主视觉) -->
    <div class="fixed inset-0 z-0">
      <!-- 这里使用一个深色渐变模拟背景，实际项目中应替换为 <video> 或 <img> -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900 to-black opacity-80 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" 
        alt="Background" 
        class="w-full h-full object-cover opacity-50"
      />
    </div>

    <!-- 内容层 -->
    <div class="relative z-10 flex flex-col min-h-screen">
      
      <!-- 顶部导航 -->
      <header class="flex justify-between items-center px-8 py-6">
        <div class="flex items-center gap-4">
          <!-- 模拟 Logo -->
          <div class="text-2xl font-bold tracking-widest uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            WUTHERING WAVES
          </div>
          <div class="hidden md:flex gap-6 text-sm text-gray-300 ml-8 font-medium">
            <a href="#" class="hover:text-white transition">首页</a>
            <a href="#" class="hover:text-white transition">角色</a>
            <a href="#" class="hover:text-white transition">资讯</a>
            <a href="#" class="hover:text-white transition">世界观</a>
          </div>
        </div>
        <div class="flex gap-4">
          <button class="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-1 rounded text-sm transition">
            官方社区
          </button>
          <button class="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-1 rounded text-sm font-bold transition shadow-[0_0_15px_rgba(8,145,178,0.5)]">
            登录
          </button>
        </div>
      </header>

      <!-- 主体区域 -->
      <main class="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-0">
        
        <!-- 游戏标题 -->
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
          鸣 潮
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-12 tracking-[0.5em] font-light">
          WUTHERING WAVES
        </p>

        <!-- 下载按钮组 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <DownloadButton icon="i-heroicons-computer-desktop" label="PC 下载" sub="Windows 客户端" />
          <DownloadButton icon="i-heroicons-device-phone-mobile" label="App Store" sub="iOS 下载" />
          <DownloadButton icon="i-heroicons-device-tablet" label="Android" sub="安卓下载" />
          <DownloadButton icon="i-heroicons-globe-alt" label="云游戏" sub="网页直接玩" />
        </div>

        <!-- 预约/下载提示 -->
        <div class="mt-12 text-gray-400 text-sm flex items-center gap-2">
          <span class="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
          <span>全平台公测火热进行中</span>
        </div>
      </main>

      <!-- 底部 Footer (复刻提供的内容) -->
      <footer class="bg-black/80 backdrop-blur-md text-xs text-gray-500 py-8 px-4 border-t border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start">
          
          <!-- 左侧 Logo 区域 -->
          <div class="flex flex-col gap-4">
            <div class="text-xl font-bold text-gray-300">KURO GAMES</div>
            <div class="flex gap-3">
              <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span class="text-white">微博</span>
              </div>
              <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span class="text-white">微</span>
              </div>
              <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <span class="text-white">B</span>
              </div>
            </div>
          </div>

          <!-- 右侧文本信息 -->
          <div class="flex-1 space-y-2 leading-relaxed text-left md:text-right">
            <p>
              本公司游戏产品适合16岁（含）以上玩家娱乐 抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活
            </p>
            <p>
              粤ICP备18069368号丨粤B2-20190166丨国新出审〔2023〕1802号 粤公网安备 44010602012438号
            </p>
            <p>
              ISBN 978-7-498-12761-7丨著作权人：广州库洛科技有限公司丨出版单位: 成都盈众九州网络科技有限公司
            </p>
            <p>
              开发者：广州库洛科技有限公司 | 运营商：广州库洛数界科技有限公司
            </p>
            <p>
              Copyright©2023 KURO GAMES. All rights reserved.
            </p>
            <p>
              客服邮箱：mc_support@kurogames.com丨客服电话：0571-56855725丨 商务合作：mc-bd@kurogames.com
            </p>
            <div class="flex flex-wrap gap-4 justify-end mt-2 text-gray-400">
              <a href="#" class="hover:text-white">用户协议</a>
              <span class="text-gray-700">|</span>
              <a href="#" class="hover:text-white">儿童隐私政策</a>
              <span class="text-gray-700">|</span>
              <a href="#" class="hover:text-white">隐私政策</a>
              <span class="text-gray-700">|</span>
              <a href="#" class="hover:text-white">关于我们</a>
              <span class="text-gray-700">|</span>
              <a href="#" class="hover:text-white">联系我们</a>
              <span class="text-gray-700">|</span>
              <a href="#" class="hover:text-white">加入我们</a>
              <span class="text-gray-700">|</span>
              <a href="#" class="hover:text-white">未成年人关爱体系</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面标题
useHead({
  title: '《鸣潮》官方下载 - Wuthering Waves'
})

// 简单的按钮组件
const DownloadButton = defineComponent({
  props: ['icon', 'label', 'sub'],
  template: `
    <button class="group relative overflow-hidden bg-gray-900/80 hover:bg-gray-800 backdrop-blur border border-gray-700 hover:border-cyan-500/50 p-4 rounded-xl transition-all duration-300 flex items-center gap-4 text-left hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/0 via-cyan-900/10 to-cyan-900/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-cyan-900/50 group-hover:text-cyan-400 transition-colors">
        <!-- 这里的 Icon 只是示意，实际可以使用 Nuxt Icon 或 SVG -->
        <span class="text-2xl">⬇</span>
      </div>
      <div>
        <div class="font-bold text-gray-100 group-hover:text-white">{{ label }}</div>
        <div class="text-xs text-gray-500 group-hover:text-gray-400">{{ sub }}</div>
      </div>
    </button>
  `
})
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #000;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
