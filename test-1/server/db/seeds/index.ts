import { db } from "../index";
import { usersTable, postsTable } from "../schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径 (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 JSON 数据
const dataPath = path.join(__dirname, "data", "real-data.json");
const rawData = fs.readFileSync(dataPath, "utf-8");
const { users: MOCK_USERS, posts: MOCK_POSTS } = JSON.parse(rawData);

async function seed() {
  console.log("🌱 开始填充真实数据 (Seeding real data)...");
  console.log(`📂 读取数据文件: ${dataPath}`);

  try {
    // 1. 清理旧数据
    console.log("🧹 清理旧数据...");
    await db.delete(postsTable).run();
    await db.delete(usersTable).run();

    // 2. 插入用户
    console.log("👤 插入用户数据...");
    await db
      .insert(usersTable)
      .values(
        MOCK_USERS.map((u: any) => ({
          username: u.username,
          password: u.password,
        }))
      )
      .run();

    // ---------------------------------------------------------
    // 关键点：这里模拟“数据的获取调用数据库里面的数据”
    // 我们不直接使用插入时的返回值，而是重新从数据库查询出来
    // 这样确保后续操作是基于数据库中真实存在的数据进行的
    // ---------------------------------------------------------
    console.log("🔄 从数据库重新查询用户列表 (Acquiring data from DB)...");
    const dbUsers = await db.select().from(usersTable).all();

    if (dbUsers.length === 0) {
      throw new Error("数据库中未找到用户，插入可能失败");
    }

    // 创建用户名到ID的映射
    const userMap = new Map(dbUsers.map((u) => [u.username, u.id]));

    // 3. 插入文章
    console.log("📝 插入文章数据...");
    const postsToInsert = MOCK_POSTS.map((post: any) => {
      // 获取数据库中的真实用户ID
      const userId = userMap.get(post.author);
      if (!userId) {
        throw new Error(`找不到作者: ${post.author}`);
      }
      return {
        title: post.title,
        content: post.content,
        userId: userId,
      };
    });

    await db.insert(postsTable).values(postsToInsert).run();

    // 4. 最终验证
    console.log("🔍 验证：查询数据库中的最新文章...");
    const finalPosts = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        author: usersTable.username,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .all();

    console.table(finalPosts);

    console.log(`✅ 成功！数据库当前包含 ${dbUsers.length} 个用户和 ${finalPosts.length} 篇文章。`);
  } catch (error) {
    console.error("❌ 数据填充失败:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
