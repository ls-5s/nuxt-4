// app/middleware/auth.ts
import type { RouteLocationNormalized } from 'vue-router';

// 定义路由中间件：指定 to/from 的类型为 RouteLocationNormalized
export default defineNuxtRouteMiddleware(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 1. 用泛型指定 useState 的类型为 boolean（登录状态是布尔值）
    const isLogin = useState<boolean>('isLogin', () => false);

    // 模拟异步校验 token（TS 版：指定返回值类型为 Promise<boolean>）
    const checkTokenValid = async (): Promise<boolean> => {
      // 模拟接口请求延迟
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      // 模拟 token 无效（未登录）
      return false;
    };

    // 执行异步校验（TS 自动推导 isTokenValid 为 boolean 类型）
    const isTokenValid = await checkTokenValid();

    // 未登录：跳登录页并携带回跳参数
    if (!isTokenValid) {
      // 编码目标路径（TS 自动推导 redirect 为 string 类型）
      const redirect = encodeURIComponent(to.fullPath);
      // navigateTo 返回路由跳转指令（Nuxt 内置类型）
      return navigateTo(`/login?redirect=${redirect}`);
    }

    // 已登录：放行（无需返回值）
  }
);
