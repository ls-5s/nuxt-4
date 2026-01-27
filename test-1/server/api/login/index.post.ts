export default defineEventHandler(async (event) => {
  try {
    const { name, password } = await readBody(event);

    if (name === "admin" && password === "123456") {
      return {
        code: 200,
        message: "登录成功",
        data: {
          token: "1234567890",
        },
      };
    }
    setResponseStatus(event, 401);
    return {
      code: 401,
      message: "账号或密码错误",
      data: null,
    };
  } catch (error) {
    console.error("Login error:", error);
    setResponseStatus(event, 500);
    return {
      code: 500,
      message: "服务器内部错误",
      data: null,
    };
  }
});
