<template>
  <div class="min-h-screen bg-[#f4f4f4] text-[#3c3c3c] font-sans text-xs">
    <!-- 顶部工具条 -->
    <div class="bg-[#f5f5f5] border-b border-[#eee]">
      <div class="max-w-[1190px] mx-auto px-4 h-[35px] flex justify-between items-center">
        <!-- 左侧 -->
        <div class="flex items-center gap-4">
          <div class="relative group cursor-pointer">
            <span class="text-[#f22e00]">中国大陆</span>
            <span class="ml-1 text-[10px]">▼</span>
            <!-- 下拉菜单模拟 -->
            <div class="absolute top-full left-0 bg-white border border-[#eee] shadow-md hidden group-hover:block p-2 z-50 w-60">
              <div class="grid grid-cols-2 gap-2">
                <div class="hover:bg-[#f5f5f5] p-1">全球</div>
                <div class="hover:bg-[#f5f5f5] p-1">中国香港</div>
                <div class="hover:bg-[#f5f5f5] p-1">中国台湾</div>
              </div>
            </div>
          </div>
          <a href="#" class="text-[#f22e00] hover:underline">亲，请登录</a>
          <a href="#" class="hover:text-[#f22e00] hover:underline">免费注册</a>
          <a href="#" class="hover:text-[#f22e00] hover:underline">手机逛淘宝</a>
        </div>
        
        <!-- 右侧 -->
        <div class="flex items-center gap-4">
          <div class="hover:text-[#f22e00] cursor-pointer">我的淘宝 <span class="text-[10px]">▼</span></div>
          <div class="hover:text-[#f22e00] cursor-pointer flex items-center">
            <span class="mr-1">🛒</span> 购物车
          </div>
          <div class="hover:text-[#f22e00] cursor-pointer">收藏夹 <span class="text-[10px]">▼</span></div>
          <div class="hover:text-[#f22e00] cursor-pointer">商品分类</div>
          <div class="hover:text-[#f22e00] cursor-pointer">千牛卖家中心 <span class="text-[10px]">▼</span></div>
          <div class="hover:text-[#f22e00] cursor-pointer">联系客服 <span class="text-[10px]">▼</span></div>
        </div>
      </div>
    </div>

    <!-- 搜索栏区域 -->
    <div class="bg-white pt-6 pb-2">
      <div class="max-w-[1190px] mx-auto px-4 flex items-center relative">
        <!-- Logo -->
        <div class="w-[190px] h-[80px] flex-shrink-0 mr-8 relative">
          <div class="text-[#ff5000] text-5xl font-bold tracking-tighter italic">Taobao</div>
          <div class="text-[#ff5000] text-2xl font-bold tracking-widest absolute top-10 left-20">淘宝网</div>
        </div>

        <!-- 搜索框 -->
        <div class="flex-1 max-w-[700px]">
          <div class="flex border-2 border-[#ff5000] rounded-3xl overflow-hidden h-[40px] relative">
            <input 
              type="text" 
              placeholder="宝贝的搜索关键词" 
              class="flex-1 px-4 outline-none text-sm placeholder-gray-400"
            />
            <div class="absolute right-[80px] top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600">
              📷
            </div>
            <button class="bg-gradient-to-r from-[#ff9000] to-[#ff5000] text-white w-[80px] font-bold text-lg hover:brightness-105">
              搜索
            </button>
          </div>
          <!-- 热门搜索词 -->
          <div class="flex gap-3 mt-1.5 text-xs text-[#666]">
            <a href="#" class="text-[#ff5000] hover:underline">新款连衣裙</a>
            <a href="#" class="hover:text-[#ff5000] hover:underline">四件套</a>
            <a href="#" class="hover:text-[#ff5000] hover:underline">潮流T恤</a>
            <a href="#" class="hover:text-[#ff5000] hover:underline">时尚女鞋</a>
            <a href="#" class="hover:text-[#ff5000] hover:underline">短裤</a>
            <a href="#" class="hover:text-[#ff5000] hover:underline">半身裙</a>
            <a href="#" class="hover:text-[#ff5000] hover:underline">男士外套</a>
          </div>
        </div>

        <!-- 这是一个二维码区域的占位 -->
        <div class="ml-auto w-[90px] text-center border p-2 bg-white text-[#ff5000]">
          <div class="text-xs mb-1">手机淘宝</div>
          <div class="w-[60px] h-[60px] bg-gray-200 mx-auto mb-1 flex items-center justify-center text-gray-400 text-[10px]">QR Code</div>
        </div>
      </div>
    </div>

    <!-- 导航栏 -->
    <div class="bg-gradient-to-r from-[#ff9000] to-[#ff5000] text-white h-[30px]">
      <div class="max-w-[1190px] mx-auto px-4 flex items-center">
        <div class="w-[190px] font-bold text-center bg-[#ff5000] h-[30px] leading-[30px]">主题市场</div>
        <div class="flex gap-6 px-6 font-bold text-sm">
          <a href="#" class="hover:underline">天猫</a>
          <a href="#" class="hover:underline">聚划算</a>
          <a href="#" class="hover:underline">天猫超市</a>
          <a href="#" class="hover:underline">司法拍卖</a>
          <a href="#" class="hover:underline">飞猪旅行</a>
          <a href="#" class="hover:underline">天天特卖</a>
          <a href="#" class="hover:underline">极有家</a>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="max-w-[1190px] mx-auto px-4 mt-2">
      <div class="flex gap-2">
        <!-- 左侧分类菜单 -->
        <div class="w-[190px] bg-white border border-[#ff5000] border-t-0 flex-shrink-0 py-2">
          <div v-for="(category, index) in categories" :key="index" class="group px-4 py-1.5 hover:bg-[#ffe4dd] cursor-pointer transition-colors relative">
            <div class="flex items-center justify-between text-sm text-[#666] group-hover:text-[#ff5000] group-hover:font-bold">
              <span>{{ category.name }}</span>
              <span class="text-xs">></span>
            </div>
            <!-- 分类详情悬浮层 -->
            <div class="hidden group-hover:block absolute left-[188px] top-[-10px] w-[600px] h-[400px] bg-white border border-[#eee] shadow-lg z-50 p-4">
              <h3 class="font-bold text-lg mb-2 text-[#333]">{{ category.name }} 频道</h3>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="sub in category.subs" :key="sub" class="text-xs text-[#666] hover:text-[#ff5000] cursor-pointer">
                  {{ sub }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间轮播图与主要展示 -->
        <div class="flex-1 flex flex-col gap-2">
          <!-- 上部：轮播 + 两个小图 -->
          <div class="h-[280px] flex gap-2">
            <!-- 轮播图 -->
            <div class="flex-1 bg-gray-200 relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 text-2xl font-bold">
                Main Banner Ads
              </div>
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <div class="w-3 h-3 rounded-full bg-white/50 cursor-pointer hover:bg-white"></div>
                <div class="w-3 h-3 rounded-full bg-[#ff5000] cursor-pointer"></div>
                <div class="w-3 h-3 rounded-full bg-white/50 cursor-pointer hover:bg-white"></div>
                <div class="w-3 h-3 rounded-full bg-white/50 cursor-pointer hover:bg-white"></div>
              </div>
              <div class="absolute top-1/2 left-0 w-8 h-12 bg-black/20 text-white flex items-center justify-center cursor-pointer hover:bg-black/40 text-xl font-bold hidden group-hover:flex"><</div>
              <div class="absolute top-1/2 right-0 w-8 h-12 bg-black/20 text-white flex items-center justify-center cursor-pointer hover:bg-black/40 text-xl font-bold hidden group-hover:flex">></div>
            </div>
            <!-- 右侧广告位 -->
            <div class="w-[280px] flex flex-col gap-2">
              <div class="h-[135px] bg-blue-50 relative overflow-hidden cursor-pointer hover:opacity-90">
                 <div class="absolute top-2 left-2 text-lg font-bold text-blue-600">聚划算</div>
                 <div class="absolute top-8 left-2 text-xs text-gray-500">品牌折扣</div>
                 <div class="absolute bottom-2 right-2 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
              </div>
              <div class="h-[135px] bg-green-50 relative overflow-hidden cursor-pointer hover:opacity-90">
                 <div class="absolute top-2 left-2 text-lg font-bold text-green-600">有好货</div>
                 <div class="absolute top-8 left-2 text-xs text-gray-500">品质生活</div>
                 <div class="absolute bottom-2 right-2 w-16 h-16 bg-green-200 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
          
          <!-- 下部：天猫必逛 -->
          <div class="h-[230px] bg-white p-3">
             <div class="flex items-center gap-2 mb-2">
               <span class="font-bold text-lg text-[#333]">理想生活上天猫</span>
               <span class="text-xs text-gray-400">/ TMALL /</span>
             </div>
             <div class="grid grid-cols-5 gap-2 h-[180px]">
                <div v-for="i in 5" :key="i" class="bg-gray-50 hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center p-2 transition">
                   <div class="w-24 h-24 bg-gray-200 rounded-full mb-2"></div>
                   <div class="text-sm font-bold text-[#333]">品牌名称</div>
                   <div class="text-xs text-gray-400">优惠活动中</div>
                </div>
             </div>
          </div>
        </div>

        <!-- 右侧用户栏 -->
        <div class="w-[290px] flex flex-col gap-2">
          <!-- 用户卡片 -->
          <div class="bg-white h-[140px] p-4 flex flex-col items-center justify-center relative bg-[url('https://img.alicdn.com/tps/i4/TB1..d2JXXXXXb3XpXXqI7FIVXX-290-140.png')] bg-cover">
            <div class="w-14 h-14 rounded-full border-2 border-white bg-gray-300 overflow-hidden mb-2">
               <!-- Avatar Placeholder -->
               <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">头像</div>
            </div>
            <div class="text-sm mb-2">Hi! 你好</div>
            <div class="flex gap-2">
               <button class="bg-[#ff5000] text-white px-4 py-1 rounded-full text-xs hover:bg-[#ff6a00]">登录</button>
               <button class="bg-white border border-[#ff5000] text-[#ff5000] px-4 py-1 rounded-full text-xs hover:bg-[#fff0e8]">注册</button>
               <button class="bg-white border border-[#ff5000] text-[#ff5000] px-4 py-1 rounded-full text-xs hover:bg-[#fff0e8]">开店</button>
            </div>
          </div>

          <!-- 公告栏 -->
          <div class="bg-white p-3 h-[100px]">
            <div class="flex justify-between text-xs mb-2 border-b pb-1">
              <span class="font-bold cursor-pointer hover:text-[#ff5000]">公告</span>
              <span class="cursor-pointer hover:text-[#ff5000]">规则</span>
              <span class="cursor-pointer hover:text-[#ff5000]">论坛</span>
              <span class="cursor-pointer hover:text-[#ff5000]">安全</span>
              <span class="cursor-pointer hover:text-[#ff5000]">公益</span>
            </div>
            <div class="text-xs text-[#666] space-y-1">
              <div class="truncate cursor-pointer hover:text-[#ff5000]">95公益周阿里人3小时公益</div>
              <div class="truncate cursor-pointer hover:text-[#ff5000]">淘宝造物节之城市名单</div>
            </div>
          </div>

          <!-- 功能图标 -->
          <div class="bg-white p-2 grid grid-cols-4 gap-1">
            <div v-for="(icon, idx) in icons" :key="idx" class="flex flex-col items-center justify-center p-2 cursor-pointer hover:text-[#ff5000]">
              <div class="text-xl mb-1">{{ icon.emoji }}</div>
              <div class="text-xs">{{ icon.name }}</div>
            </div>
          </div>
          
          <!-- APP 下载 -->
          <div class="bg-white flex-1 p-3">
            <div class="font-bold text-sm mb-2">阿里APP</div>
            <div class="grid grid-cols-5 gap-2 text-[10px] text-center">
              <div class="cursor-pointer hover:text-[#ff5000]"><div class="w-8 h-8 bg-gray-200 mx-auto rounded mb-1"></div>淘宝</div>
              <div class="cursor-pointer hover:text-[#ff5000]"><div class="w-8 h-8 bg-gray-200 mx-auto rounded mb-1"></div>天猫</div>
              <div class="cursor-pointer hover:text-[#ff5000]"><div class="w-8 h-8 bg-gray-200 mx-auto rounded mb-1"></div>支付宝</div>
              <div class="cursor-pointer hover:text-[#ff5000]"><div class="w-8 h-8 bg-gray-200 mx-auto rounded mb-1"></div>飞猪</div>
              <div class="cursor-pointer hover:text-[#ff5000]"><div class="w-8 h-8 bg-gray-200 mx-auto rounded mb-1"></div>钉钉</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 猜你喜欢 -->
      <div class="mt-8">
        <div class="flex items-center gap-4 mb-4">
           <h2 class="text-xl font-bold text-[#333]">猜你喜欢</h2>
           <div class="h-[1px] bg-gray-200 flex-1"></div>
           <span class="text-xs text-gray-400">个性化推荐</span>
        </div>
        
        <div class="grid grid-cols-5 gap-4 pb-8">
          <div v-for="item in 10" :key="item" class="bg-white border border-transparent hover:border-[#ff5000] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group">
             <div class="aspect-square bg-gray-100 relative">
                <!-- 模拟图片 -->
                <div class="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl font-light">IMG</div>
             </div>
             <div class="p-3">
               <div class="text-xs text-[#333] h-9 overflow-hidden leading-4.5 mb-2 group-hover:text-[#ff5000] group-hover:underline">
                 [热销] 2024新款夏季宽松透气休闲运动套装男女同款潮流百搭
               </div>
               <div class="flex items-baseline gap-1">
                 <span class="text-xs text-[#ff5000]">¥</span>
                 <span class="text-lg font-bold text-[#ff5000]">128.00</span>
                 <span class="text-[10px] text-gray-400 line-through ml-2">¥299</span>
               </div>
               <div class="text-[10px] text-gray-400 mt-2">1000+ 人付款</div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 Footer -->
    <footer class="bg-white border-t border-[#eee] mt-8 pt-8 pb-12">
      <div class="max-w-[1190px] mx-auto px-4">
        <!-- 承诺图标 -->
        <div class="flex justify-between border-b border-[#eee] pb-8 mb-6">
          <div class="flex items-center gap-3">
             <div class="w-12 h-12 rounded-full border-2 border-gray-300 text-2xl flex items-center justify-center text-gray-400">优</div>
             <div>
               <div class="font-bold text-lg text-[#333]">品质保障</div>
               <div class="text-xs text-gray-500">品质护航 购物无忧</div>
             </div>
          </div>
          <div class="flex items-center gap-3">
             <div class="w-12 h-12 rounded-full border-2 border-gray-300 text-2xl flex items-center justify-center text-gray-400">七</div>
             <div>
               <div class="font-bold text-lg text-[#333]">七天无理由退换货</div>
               <div class="text-xs text-gray-500">为您提供售后无忧保障</div>
             </div>
          </div>
          <div class="flex items-center gap-3">
             <div class="w-12 h-12 rounded-full border-2 border-gray-300 text-2xl flex items-center justify-center text-gray-400">特</div>
             <div>
               <div class="font-bold text-lg text-[#333]">特色服务体验</div>
               <div class="text-xs text-gray-500">为您提供不一样的服务</div>
             </div>
          </div>
          <div class="flex items-center gap-3">
             <div class="w-12 h-12 rounded-full border-2 border-gray-300 text-2xl flex items-center justify-center text-gray-400">帮</div>
             <div>
               <div class="font-bold text-lg text-[#333]">帮助中心</div>
               <div class="text-xs text-gray-500">您的购物指南</div>
             </div>
          </div>
        </div>

        <!-- 链接列表 -->
        <div class="flex justify-between text-xs text-[#666] mb-8">
          <div>
            <h4 class="font-bold text-[#333] mb-4 text-sm">购物指南</h4>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-[#ff5000]">免费注册</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">开通支付宝</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">支付宝充值</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-[#333] mb-4 text-sm">天猫保障</h4>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-[#ff5000]">发票保障</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">售后规则</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">缺货赔付</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-[#333] mb-4 text-sm">支付方式</h4>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-[#ff5000]">快捷支付</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">信用卡</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">余额宝</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">蚂蚁花呗</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-[#333] mb-4 text-sm">商家服务</h4>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-[#ff5000]">天猫规则</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">商家入驻</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">商家中心</a></li>
              <li><a href="#" class="hover:text-[#ff5000]">物流服务</a></li>
            </ul>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="border-t border-[#eee] pt-4 text-[10px] text-[#999] space-y-2">
           <p>
             <a href="#" class="mr-2 hover:text-[#666]">关于淘宝</a>
             <a href="#" class="mr-2 hover:text-[#666]">合作伙伴</a>
             <a href="#" class="mr-2 hover:text-[#666]">营销中心</a>
             <a href="#" class="mr-2 hover:text-[#666]">廉正举报</a>
             <a href="#" class="mr-2 hover:text-[#666]">联系客服</a>
             <a href="#" class="mr-2 hover:text-[#666]">开放平台</a>
             <a href="#" class="mr-2 hover:text-[#666]">诚征英才</a>
             <a href="#" class="mr-2 hover:text-[#666]">联系我们</a>
             <a href="#" class="mr-2 hover:text-[#666]">网站地图</a>
             <a href="#" class="mr-2 hover:text-[#666]">法律声明</a>
             <a href="#" class="mr-2 hover:text-[#666]">隐私权政策</a>
           </p>
           <p>© 2024 Taobao.com 版权所有</p>
           <p>网络文化经营许可证：浙网文[202X]xxxx-xxx号 | 增值电信业务经营许可证：浙B2-202Xxxxx | 互联网违法和不良信息举报电话：0571-81683755</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '淘宝网 - 淘！我喜欢',
  meta: [
    { name: 'description', content: '淘宝网 - 亚洲较大的网上交易平台，提供各类服饰、美容、家居、数码、话费/点卡充值… 数亿优质商品，同时提供担保交易(先收货后付款)等安全交易保障服务。' }
  ]
})

const categories = [
  { name: '女装 / 内衣 / 家居', subs: ['连衣裙', '短外套', '男士内裤', '睡衣'] },
  { name: '女鞋 / 男鞋 / 箱包', subs: ['帆布鞋', '运动鞋', '单肩包', '双肩包'] },
  { name: '母婴 / 童装 / 玩具', subs: ['奶粉', '纸尿裤', '童鞋', '益智玩具'] },
  { name: '男装 / 运动户外', subs: ['夹克', 'T恤', '篮球鞋', '跑步鞋'] },
  { name: '美妆 / 彩妆 / 个护', subs: ['面霜', '洗发水', '口红', '香水'] },
  { name: '手机 / 数码 / 企业', subs: ['iPhone', '华为', '小米', '单反相机'] },
  { name: '大家电 / 生活电器', subs: ['冰箱', '洗衣机', '扫地机器人', '空气炸锅'] },
  { name: '零食 / 生鲜 / 茶酒', subs: ['三只松鼠', '牛奶', '普洱茶', '白酒'] },
  { name: '厨具 / 收纳 / 清洁', subs: ['保温杯', '收纳箱', '洗衣液', '垃圾袋'] },
  { name: '家纺 / 家饰 / 鲜花', subs: ['四件套', '窗帘', '摆件', '鲜花速递'] },
  { name: '图书音像 / 文具', subs: ['小说', '教辅', '中性笔', '笔记本'] },
  { name: '医药保健 / 进口', subs: ['口罩', '维生素', '隐形眼镜', '血压计'] },
  { name: '汽车 / 二手车', subs: ['行车记录仪', '脚垫', '机油', '二手车'] },
  { name: '房产 / 装修 / 建材', subs: ['全屋定制', '瓷砖', '灯具', '电子锁'] },
]

const icons = [
  { name: '充话费', emoji: '📱' },
  { name: '旅行', emoji: '✈️' },
  { name: '车险', emoji: '🚗' },
  { name: '游戏', emoji: '🎮' },
  { name: '彩票', emoji: '🎫' },
  { name: '电影', emoji: '🎬' },
  { name: '酒店', emoji: '🏨' },
  { name: '理财', emoji: '💰' },
  { name: '找服务', emoji: '🛠️' },
  { name: '演出', emoji: '🎤' },
  { name: '水电煤', emoji: '💡' },
  { name: '火车票', emoji: '🚆' },
]
</script>

<style scoped>
/* 可以在这里添加更多自定义样式，但大部分已通过 Tailwind 实现 */
</style>
