import { db } from "../index";
import { usersTable, postsTable } from "../schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 类型定义
interface SeedUser {
  username: string;
  password: string;
  role?: string;
}

interface SeedPost {
  title: string;
  content: string;
  author: string;
}

interface SeedData {
  users: SeedUser[];
  posts: SeedPost[];
}

// 获取当前文件的目录路径 (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const dataPath = path.join(__dirname, "../data/real-data.json");
  console.log(`\n🌱 开始执行数据填充 (Database Seeding)...`);
  console.log(`📂 数据源: ${dataPath}`);

  try {
    // 1. 读取并验证数据
    if (!fs.existsSync(dataPath)) {
      throw new Error(`找不到数据文件: ${dataPath}`);
    }
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const { users, posts }: SeedData = JSON.parse(rawData);

    // 2. 使用事务确保数据完整性 (Atomic Transaction)
    // 所有的删除和插入操作要么全部成功，要么全部回滚
    await db.transaction(async (tx) => {
      console.log("� 开启事务处理...");

      // A. 清理旧数据 (注意顺序：先删从表，再删主表)
      console.log("🧹 清理旧数据...");
      await tx.delete(postsTable).run();
      await tx.delete(usersTable).run();

      // B. 插入用户
      console.log(`👤 正在插入 ${users.length} 个用户...`);
      await tx
        .insert(usersTable)
        .values(
          users.map((u) => ({
            username: u.username,
            password: u.password,
            role: u.role || "user", // 支持 role 字段
          }))
        )
        .run();

      // C. 【关键步骤】从数据库回查生成的 ID
      // 模拟真实场景：数据入库后，我们需要拿到 DB 生成的自增 ID 才能建立关联
      console.log("� 回查数据库获取用户 ID...");
      const dbUsers = await tx.select().from(usersTable).all();

      // 建立映射表: username -> id
      const userMap = new Map<string, number>();
      dbUsers.forEach((u) => userMap.set(u.username, u.id));

      // D. 插入文章 (关联用户 ID)
      console.log(`📝 正在插入 ${posts.length} 篇文章...`);
      const postsToInsert = posts
        .map((post) => {
          const userId = userMap.get(post.author);

          if (!userId) {
            console.warn(`⚠️ 警告: 找不到作者 "${post.author}"，该文章将被跳过`);
            return null;
          }

          return {
            title: post.title,
            content: post.content,
            userId: userId,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null);

      if (postsToInsert.length > 0) {
        await tx.insert(postsTable).values(postsToInsert).run();
      }

      console.log("✅ 事务提交成功");
    });

    // 3. 最终验证展示
    verifySeeding();
  } catch (error) {
    console.error("\n❌ 数据填充失败 (Seeding Failed):");
    console.error(error);
    process.exit(1);
  }
}

async function verifySeeding() {
  console.log("\n� 验证最终数据状态:");

  const finalUsers = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      role: usersTable.role,
    })
    .from(usersTable)
    .all();

  const finalPosts = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      author: usersTable.username,
      authorRole: usersTable.role,
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .all();

  console.log(`\n👥 用户列表 (${finalUsers.length}):`);
  console.table(finalUsers);

  console.log(`\n📰 文章列表 (${finalPosts.length}):`);
  console.table(finalPosts);

  console.log(`\n✨ 完成！`);
}

seed();
