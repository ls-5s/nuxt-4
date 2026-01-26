// composables/stores/user.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 核心：命名规范 useXxxStore，Nuxt 会自动导入该函数
// 第一个参数：仓库唯一ID（全局唯一，Nuxt+Pinia 用于状态管理）
// 第二个参数：组合式API风格仓库配置（TS 类型自动推导）
export const useUserStore = defineStore("user", () => {
  // 1. State：用 ref 定义（TS 自动推导类型，无需手动指定）
  const userId = ref(""); // 用户ID
  const userName = ref("游客"); // 用户名
  const token = ref(""); // 登录令牌
  const userInfo = ref({
    avatar: "",
    role: "normal", // normal: 普通用户, admin: 管理员
  });

  // 2. Getters：用 computed 定义（缓存+类型自动推导）
  // 是否登录（推导 token 是否存在）
  const isLogin = computed(() => !!token.value);
  // 是否是管理员
  const isAdmin = computed(() => userInfo.value.role === "admin");
  // 兜底用户名（避免空值）
  const userShowName = computed(() => userName.value || "未知用户");

  // 3. Actions：普通函数，支持 同步/异步，直接修改 State
  // 同步Action：修改用户基础信息
  const setUserInfo = (info: {
    userId: string;
    userName: string;
    avatar: string;
    role: string;
  }) => {
    userId.value = info.userId;
    userName.value = info.userName;
    userInfo.value = { ...userInfo.value, ...info };
  };

  // 异步Action：模拟登录（实际开发替换为 axios/ofetch 请求接口）
  // TS 自动推导返回值类型为 Promise<boolean>
  const login = async (account: string, password: string) => {
    try {
      // 使用 Nuxt 4 内置的 $fetch 调用真实的 API 接口
      const res = await $fetch<{
        code: number;
        message: string;
        data: {
          token: string;
          userInfo: {
            userId: string;
            userName: string;
            avatar: string;
            role: string;
          };
        };
      }>("/api/user/login", {
        method: "POST",
        body: { account, password },
      });

      if (res.code === 200 && res.data) {
        // 直接修改 State，响应式自动生效
        token.value = res.data.token;
        setUserInfo(res.data.userInfo);
        return true;
      }
      return false;
    } catch (error) {
      console.error("登录失败：", error);
      return false;
    }
  };

  // 同步Action：退出登录（重置所有状态）
  const logout = () => {
    userId.value = "";
    userName.value = "游客";
    token.value = "";
    userInfo.value = { avatar: "", role: "normal" };
  };

  // 必须返回需要在组件/页面中使用的 State/Getters/Actions
  return {
    // State
    userId,
    userName,
    token,
    userInfo,
    // Getters
    isLogin,
    isAdmin,
    userShowName,
    // Actions
    setUserInfo,
    login,
    logout,
  };
});
