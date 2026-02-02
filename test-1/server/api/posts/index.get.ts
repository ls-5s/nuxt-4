import { db } from "../../db";
import { postsTable, usersTable } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

export default defineEventHandler(async () => {
  try {
    // 多表查询：获取帖子同时获取作者信息
    const posts = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        createdAt: postsTable.createdAt,
        author: {
          id: usersTable.id,
          username: usersTable.username,
        },
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .orderBy(desc(postsTable.createdAt))
      .all();

    return {
      code: 200,
      data: posts,
    };
  } catch (error) {
    console.error("Fetch posts error:", error);
    return {
      code: 500,
      message: "获取帖子列表失败",
    };
  }
});
