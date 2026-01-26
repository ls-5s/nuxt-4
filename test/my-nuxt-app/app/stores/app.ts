// import { defineStore } from "pinia";

// // 仓库ID 'app' —— 文件名 app.ts —— 导出函数 useAppStore（三者语义统一）
// export const useAppStore = defineStore("app", () => {
//   // 仓库逻辑...
// });
// 步骤1：从统一入口显式导入useAppStore（手动导入规范）
// import { useAppStore } from "@/composables/stores";

// // 步骤2：调用函数，获取仓库全局唯一实例
// const appStore = useAppStore();

// // 步骤3：业务逻辑 - 操作仓库（修改Cookie、调用方法）
// // 切换暗黑模式：直接修改themeCookie（useCookie创建的对象天生响应式）
// const toggleDarkMode = () => {
//   appStore.themeCookie.isDark = !appStore.themeCookie.isDark;
// };
