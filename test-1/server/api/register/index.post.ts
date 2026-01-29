import { db } from "../../db/connection";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "用户名和密码不能为空",
      });
    }

    // 检查用户是否已存在
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "用户已存在",
      });
    }

    // 创建新用户 (注意：实际生产环境密码必须加密！)
    const newUser = await db.insert(usersTable).values({
      username,
      password,
    }).returning().get();

    return {
      code: 200,
      message: "注册成功",
      data: {
        id: newUser.id,
        username: newUser.username,
      },
    };
  } catch (error) {
    return {
      code: error.statusCode || 500,
      message: error.statusMessage || "注册失败",
    };
  }
});
