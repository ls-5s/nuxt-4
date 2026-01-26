export default defineEventHandler(async (event) => {
  // 1. 获取请求体内容
  const body = await readBody(event);
  const { account, password } = body;

  // 2. 模拟数据库校验逻辑
  // 实际项目中这里应该调用数据库查询
  if (account === "admin" && password === "123456") {
    // 登录成功
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "nuxt4_token_" + Math.random().toString(36).substring(7),
        userInfo: {
          userId: "1001",
          userName: "管理员用户",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
          role: "admin",
        },
      },
    };
  } else if (account === "user" && password === "123456") {
    // 普通用户登录
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "nuxt4_token_" + Math.random().toString(36).substring(7),
        userInfo: {
          userId: "1002",
          userName: "普通用户",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
          role: "normal",
        },
      },
    };
  }

  // 3. 登录失败处理
  // 设置状态码为 401 (未授权)
  setResponseStatus(event, 401);
  return {
    code: 401,
    message: "账号或密码错误",
    data: null,
  };
});
