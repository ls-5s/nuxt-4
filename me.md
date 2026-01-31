html css javascript typescript nodejs 
框架 vue2/3  nuxt4 tailwindcss express nitro + h3
组件库 element-ui nuxt-ui useVue ECnarts
工具 git
状态管理 vuex  pinia
api axios
数据库 typeorm DizzleORM


pnpm run db:studio
pnpm run db:migrate
pnpm run db:generate
pnpm run db:db:import 
=====================================

📌 分开安装（按需选择，适合分步操作）
1. 安装运行时依赖（生产环境必须，项目上线保留）
```bash
运行
pnpm add drizzle-orm @libsql/client
```
drizzle-orm：Drizzle 核心 ORM 库，提供所有查询 / 操作符 / 表定义能力
@libsql/client：SQLite 官方驱动，实现数据库连接通信
2. 安装开发工具依赖（仅开发环境用，上线不打包）
```bash
运行
pnpm add -D drizzle-kit
```
drizzle-kit：Drizzle 配套工具，支持db:push/generate/migrate/studio等核心命令



```ts
// 3. 定义一对一的两张表（核心：外键 + unique约束）
/**
 * 主表：用户表（users）
 * 存储用户基础信息，id是主键
 */
const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 用户唯一标识
  username: text('username').notNull(), // 用户名
  phone: text('phone').notNull().unique(), // 手机号（唯一）
});

/**
 * 一对一关联表：用户详情表（user_profiles）
 * 存储用户的扩展信息（年龄、地址、头像），和用户表一对一绑定
 */
const userProfiles = sqliteTable('user_profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    // 核心1：外键约束 → 保证userId必须是users表中存在的id（避免脏数据）
    .references(() => users.id)
    // 核心2：unique约束 → 保证一个userId只能对应1个详情（双向唯一的关键）
    .unique(),
  age: integer('age'), // 年龄
  address: text('address'), // 收货地址
  avatar: text('avatar'), // 头像地址
});
```

many-to-many
```ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, text, integer, primaryKey, eq } from 'drizzle-orm/sqlite-core';
import Database from 'better-sqlite3';

// 1. 连接数据库
const sqlite = new Database('student-course.db');
const db = drizzle(sqlite);

// 2. 主表1：学生表（存储学生基础信息）
const students = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 学生唯一ID
  name: text('name').notNull(), // 学生姓名
  grade: text('grade').notNull(), // 年级（比如“高一2班”）
});

// 3. 主表2：课程表（存储课程基础信息）
const courses = sqliteTable('courses', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 课程唯一ID
  name: text('name').notNull().unique(), // 课程名（比如“数学”“英语”）
  teacher: text('teacher').notNull(), // 授课老师
});

// 4. 中间关联表：学生-课程关联表（多对多核心）
const studentCourses = sqliteTable('student_courses', {
  // 外键1：关联学生表（保证studentId是有效学生ID）
  studentId: integer('student_id')
    .notNull()
    .references(() => students.id),
  // 外键2：关联课程表（保证courseId是有效课程ID）
  courseId: integer('course_id')
    .notNull()
    .references(() => courses.id),
  // 可选：关联附加信息（选课时间）
  selectTime: text('select_time').notNull().default('2026-01-30'),
}, (table) => ({
  // 核心：组合主键（等价于复合唯一键）→ 防止重复选课（比如学生1重复选数学）
  pk: primaryKey({ columns: [table.studentId, table.courseId] }),
}));
```
```ts
// 5. 验证多对多设计的核心函数
async function verifyManyToMany() {
  try {
    // --------------------------
    // 步骤1：插入主表数据（学生+课程）
    // --------------------------
    // 插入3个学生
    const [stu1, stu2, stu3] = await db.insert(students).values([
      { name: '张三', grade: '高一1班' },
      { name: '李四', grade: '高一1班' },
      { name: '王五', grade: '高一2班' },
    ]).returning();
    console.log('✅ 插入学生成功：', [stu1, stu2, stu3]);

    // 插入3门课程
    const [course1, course2, course3] = await db.insert(courses).values([
      { name: '数学', teacher: '张老师' },
      { name: '英语', teacher: '李老师' },
      { name: '物理', teacher: '王老师' },
    ]).returning();
    console.log('✅ 插入课程成功：', [course1, course2, course3]);

    // --------------------------
    // 步骤2：插入中间表数据（建立多对多关联）
    // --------------------------
    await db.insert(studentCourses).values([
      { studentId: stu1.id, courseId: course1.id }, // 张三选数学
      { studentId: stu1.id, courseId: course2.id }, // 张三选英语（一个学生选多门课）
      { studentId: stu2.id, courseId: course1.id }, // 李四选数学（一门课被多个学生选）
      { studentId: stu2.id, courseId: course3.id }, // 李四选物理
      { studentId: stu3.id, courseId: course2.id }, // 王五选英语
    ]);
    console.log('✅ 插入选课关联成功');

    // --------------------------
    // 步骤3：验证1：一个学生选多门课（学生→多课程）
    // --------------------------
    console.log('\n📌 验证1：张三选的所有课程（一个学生→多门课）');
    const stu1Courses = await db
      .select({
        studentName: students.name,
        courseName: courses.name,
        teacher: courses.teacher,
      })
      .from(students)
      .innerJoin(studentCourses, eq(students.id, studentCourses.studentId))
      .innerJoin(courses, eq(studentCourses.courseId, courses.id))
      .where(eq(students.id, stu1.id));
    console.log(stu1Courses); // 输出：张三选了数学、英语

    // --------------------------
    // 步骤4：验证2：一门课被多个学生选（课程→多学生）
    // --------------------------
    console.log('\n📌 验证2：数学课程的所有选课学生（一门课→多个学生）');
    const course1Students = await db
      .select({
        courseName: courses.name,
        studentName: students.name,
        grade: students.grade,
      })
      .from(courses)
      .innerJoin(studentCourses, eq(courses.id, studentCourses.courseId))
      .innerJoin(students, eq(studentCourses.studentId, students.id))
      .where(eq(courses.id, course1.id));
    console.log(course1Students); // 输出：数学被张三、李四选

    // --------------------------
    // 步骤5：验证3：防止重复选课（复合主键生效）
    // --------------------------
    console.log('\n📌 验证3：张三重复选数学（复合主键防重复）');
    await db.insert(studentCourses).values({
      studentId: stu1.id, courseId: course1.id, // 张三重复选数学
    });
  } catch (err) {
    console.log('❌ 重复选课失败（复合主键生效）：', err.message);
    // 报错信息：UNIQUE constraint failed: student_courses.student_id, student_courses.course_id
  }

  // 关闭数据库
  sqlite.close();
}

// 执行验证
verifyManyToMany().catch(err => {
  console.error('❌ 验证失败：', err);
  sqlite.close();
});
```