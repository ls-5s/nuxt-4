import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "用户名和密码不能为空",
      });
    }

    // 验证用户
    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.username, username), eq(users.password, password)))
      .get();

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "账号或密码错误",
      });
    }

    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "mock-token-" + user.id,
        userInfo: {
          id: user.id,
          username: user.username,
        },
      },
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.statusMessage || "登录失败",
    };
  }
});
