import { db } from "../../db";
import { postsTable } from "../../db/schema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, content, userId } = body;

    if (!title || !content || !userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "标题、内容和用户ID不能为空",
      });
    }

    const newPost = await db
      .insert(postsTable)
      .values({
        title,
        content,
        userId,
      })
      .returning()
      .get();

    return {
      code: 200,
      message: "发布成功",
      data: newPost,
    };
  } catch (error: any) {
    return {
      code: error.statusCode || 500,
      message: error.statusMessage || "发布失败",
    };
  }
});
