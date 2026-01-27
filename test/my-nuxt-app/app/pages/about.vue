<!-- app/pages/about.vue -->
<script setup lang="ts">
// 页面元数据
useHead({
  title: '关于我们 - Nuxt 4',
  meta: [
    { name: 'description', content: '了解我们的团队、技术栈和使命，我们致力于构建现代化的 Web 应用。' }
  ]
});

// 团队成员数据
const teamMembers = [
  {
    name: "张三",
    role: "前端架构师",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan",
    bio: "10+ 年前端开发经验，专注于 Vue.js 和 Nuxt.js 生态系统",
    skills: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "李四",
    role: "UI/UX 设计师",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisi",
    bio: "专注于用户体验设计，致力于创造美观且易用的界面",
    skills: ["Figma", "Design System", "User Research"],
  },
  {
    name: "王五",
    role: "全栈工程师",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu",
    bio: "精通前后端开发，擅长构建高性能的 Web 应用",
    skills: ["Node.js", "Python", "Database", "DevOps"],
  },
];

// 技术栈数据
const techStack = [
  {
    category: "前端框架",
    technologies: [
      { name: "Nuxt 4", icon: "i-simple-icons-nuxtdotjs", description: "全栈 Vue.js 框架" },
      { name: "Vue 3", icon: "i-simple-icons-vuedotjs", description: "渐进式 JavaScript 框架" },
      { name: "TypeScript", icon: "i-simple-icons-typescript", description: "类型安全的 JavaScript" },
    ],
  },
  {
    category: "样式与设计",
    technologies: [
      { name: "Tailwind CSS", icon: "i-simple-icons-tailwindcss", description: "实用优先的 CSS 框架" },
      { name: "Nuxt UI", icon: "i-simple-icons-nuxtdotjs", description: "Vue 组件库" },
      { name: "Heroicons", icon: "i-simple-icons-heroicons", description: "精美的图标库" },
    ],
  },
  {
    category: "工具与平台",
    technologies: [
      { name: "Vite", icon: "i-simple-icons-vite", description: "下一代前端构建工具" },
      { name: "Pinia", icon: "i-simple-icons-pinia", description: "Vue 状态管理" },
      { name: "ESLint", icon: "i-simple-icons-eslint", description: "代码质量检查" },
    ],
  },
];

// 里程碑数据
const milestones = [
  {
    year: "2024",
    title: "项目启动",
    description: "开始构建基于 Nuxt 4 的现代化 Web 应用框架",
    icon: "i-heroicons-rocket-launch",
  },
  {
    year: "2025 Q1",
    title: "核心功能完成",
    description: "完成主题系统、组件库封装和工程化配置",
    icon: "i-heroicons-check-circle",
  },
  {
    year: "2025 Q2",
    title: "持续优化",
    description: "性能优化、用户体验提升和功能扩展",
    icon: "i-heroicons-sparkles",
  },
];

// 价值观数据
const values = [
  {
    title: "创新驱动",
    description: "持续探索新技术，追求最佳实践",
    icon: "i-heroicons-light-bulb",
    color: "text-yellow-500",
  },
  {
    title: "用户至上",
    description: "以用户体验为核心，打造易用的产品",
    icon: "i-heroicons-heart",
    color: "text-red-500",
  },
  {
    title: "代码质量",
    description: "注重代码规范，确保可维护性和可扩展性",
    icon: "i-heroicons-shield-check",
    color: "text-green-500",
  },
  {
    title: "团队协作",
    description: "开放沟通，共同成长，创造价值",
    icon: "i-heroicons-users",
    color: "text-blue-500",
  },
];
</script>

<template>
  <div class="about-page min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <!-- Hero 区域 -->
      <section class="text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-sm font-medium">
          <span class="i-heroicons-information-circle text-base"></span>
          <span>关于我们</span>
        </div>
        <h1 class="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white">
          构建现代化的
          <span class="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
            Web 应用
          </span>
        </h1>
        <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          我们是一支专注于前端开发的团队，致力于使用最新的技术栈构建高性能、可维护的 Web 应用程序。
        </p>
      </section>

      <!-- 使命与愿景 -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UCard class="p-8 border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/20 dark:to-gray-900">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center">
              <span class="i-heroicons-flag text-white text-2xl"></span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">我们的使命</h2>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            通过创新的技术和最佳实践，帮助开发者快速构建高质量的 Web 应用，提升开发效率和用户体验。
          </p>
        </UCard>

        <UCard class="p-8 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <span class="i-heroicons-eye text-white text-2xl"></span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">我们的愿景</h2>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            成为前端开发领域的引领者，推动 Web 技术的发展，为开发者社区贡献更多有价值的工具和解决方案。
          </p>
        </UCard>
      </section>

      <!-- 价值观 -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          我们的价值观
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard
            v-for="value in values"
            :key="value.title"
            class="p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700"
          >
            <div :class="[value.color, 'text-4xl mb-4']">
              <span :class="value.icon"></span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {{ value.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ value.description }}
            </p>
          </UCard>
        </div>
      </section>

      <!-- 技术栈 -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          技术栈
        </h2>
        <div class="space-y-8">
          <div
            v-for="category in techStack"
            :key="category.category"
            class="space-y-4"
          >
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {{ category.category }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UCard
                v-for="tech in category.technologies"
                :key="tech.name"
                class="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700"
              >
                <div class="flex items-center gap-3 mb-3">
                  <span :class="[tech.icon, 'text-2xl text-brand-600 dark:text-brand-400']"></span>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ tech.name }}
                  </h4>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ tech.description }}
                </p>
              </UCard>
            </div>
          </div>
        </div>
      </section>

      <!-- 团队成员 -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          团队成员
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard
            v-for="member in teamMembers"
            :key="member.name"
            class="p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700"
          >
            <img
              :src="member.avatar"
              :alt="member.name"
              class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-brand-200 dark:border-brand-800"
            />
            <h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">
              {{ member.name }}
            </h3>
            <p class="text-brand-600 dark:text-brand-400 font-medium mb-3">
              {{ member.role }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ member.bio }}
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span
                v-for="skill in member.skills"
                :key="skill"
                class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {{ skill }}
              </span>
            </div>
          </UCard>
        </div>
      </section>

      <!-- 发展历程 -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          发展历程
        </h2>
        <div class="relative">
          <!-- 时间线 -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-500 to-brand-700 hidden md:block"></div>

          <div class="space-y-12">
            <div
              v-for="(milestone, index) in milestones"
              :key="milestone.year"
              class="relative flex items-center"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <!-- 时间线节点 -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-600 border-4 border-white dark:border-gray-900 z-10 hidden md:block"></div>

              <!-- 内容卡片 -->
              <div class="w-full md:w-5/12" :class="index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'">
                <UCard class="p-6 border-2 border-brand-200 dark:border-brand-800">
                  <div class="flex items-center gap-4 mb-3">
                    <div class="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center">
                      <span :class="[milestone.icon, 'text-white text-lg']"></span>
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-brand-600 dark:text-brand-400">
                        {{ milestone.year }}
                      </div>
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                        {{ milestone.title }}
                      </h3>
                    </div>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ milestone.description }}
                  </p>
                </UCard>
              </div>

              <!-- 占位符（用于对齐） -->
              <div class="hidden md:block w-5/12"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系我们 -->
      <section class="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-12 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">想和我们一起工作？</h2>
        <p class="text-xl mb-8 text-white/90">
          我们正在寻找有才华的开发者加入我们的团队
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/"
            label="返回首页"
            variant="solid"
            intent="neutral"
            size="lg"
            icon="i-heroicons-home"
            class="bg-white text-brand-600 hover:bg-gray-100"
          />
          <UButton
            href="mailto:contact@example.com"
            label="联系我们"
            variant="outline"
            size="lg"
            icon="i-heroicons-envelope"
            class="border-2 border-white text-white hover:bg-white/10"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
