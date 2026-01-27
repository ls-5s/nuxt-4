# Nitro 渲染器

```ts
export default defineHandler((event) => {
  return { hello: "API" };
});
```
## 渲染器优先级
渲染器始终作为一个兜底路由（/**）存在，拥有最低优先级。这意味着：

具体的 API 路由优先匹配（如 /api/users）
具体的服务器路由其次匹配（如 /about）
渲染器捕获所有其他请求
```ts
api/
  users.ts        → /api/users （优先匹配）
routes/
  about.ts        → /about （次优先匹配）
renderer.ts         → /** （捕获所有其他路由）
```

# 服务器路由
Nitro 支持文件系统路由，自动将文件映射到 h3 路由。
Nitro 支持基于文件的 API 路由（文件会自动映射到 h3 路由）。定义路由就像在 server/api/ 或 server/routes/ 目录内创建一个文件一样简单。

每个文件只能定义一个处理程序，您可以 将 HTTP 方法附加 到文件名，以定义特定的请求方法。

```ts
routes/
  api/
    test.ts      <-- /api/test
  hello.get.ts   <-- /hello (仅限 GET)
  hello.post.ts  <-- /hello (仅限 POST)
vite.config.ts
您可以通过创建子目录来嵌套路由。


routes/
  api/
    [org]/
      [repo]/
        index.ts   <-- /api/:org/:repo
        issues.ts  <-- /api/:org/:repo/issues
      index.ts     <-- /api/:org
package.json
```

## 路由分组
在某些情况下，您可能希望将一组路由归为一类，但又不影响基于文件的路由。为此，您可以将文件放入以括号 ( 和 ) 包裹的文件夹中。

例如：

```
routes/
  api/
    (admin)/
      users.ts   <-- /api/users
      reports.ts <-- /api/reports
    (public)/
      index.ts   <-- /api
package.json
```
!注意 路由分组不是路由定义的一部分，只用于组织目的。

## 简单路由
首先，在 server/routes/ 或 server/api/ 目录中创建一个文件。文件名将作为路由路径。

然后，导出一个用 defineEventHandler 包裹的函数，该函数将在路由匹配时执行。

routes/api/test.ts
``` ts
import { defineHandler } from "nitro/h3";

export default defineHandler(() => {
  return { hello: "API" };
});
```
## 带参数的路由
单个参数
要定义带参数的路由，请使用 [<param>] 语法，其中 <param> 是参数的名称。该参数将在 event.context.params 对象中可用，或使用 getRouterParam 工具。

routes/hello/[name].ts
``` ts
import { defineHandler } from "nitro/h3";

export default defineHandler((event) => {
  const { name } = event.context.params;

  return `Hello ${name}!`;
});
调用带参数的路由 /hello/nitro，您将得到：

Response

Hello nitro!
```
## 多个参数
您可以通过使用 [<param1>]/[<param2>] 语法在路由中定义多个参数，其中每个参数都是一个文件夹。您 不能 在单个文件名的文件夹中定义多个参数。

routes/hello/[name]/[age].ts
```ts
import { defineHandler } from "nitro/h3";

export default defineHandler((event) => {
  const { name, age } = event.context.params;

  return `Hello ${name}! You are ${age} years old.`;
});
```
## 捕获所有参数
您可以使用 [...<param>] 语法捕获 URL 中剩余的所有部分。这将包括斜杠 / 在参数中。

routes/hello/[...name].ts
``` ts
import { defineHandler } from "nitro/h3";

export default defineHandler((event) => {
  const { name } = event.context.params;

  return `Hello ${name}!`;
});
调用带参数的路由 /hello/nitro/is/hot，您将得到：

Response

Hello nitro/is/hot!
```
## 特定请求方法
您可以将 HTTP 方法附加到文件名，以强制路由仅匹配特定的 HTTP 请求方法，例如 hello.get.ts 将仅匹配 GET 请求。您可以使用任何您想要的 HTTP 方法。

```ts
const  body = await readBody(event);
const get = await event.getQuery();
```
## 捕获所有路由
您可以创建一个特殊的路由，匹配未被任何其他路由匹配的所有路由。这对于创建默认路由非常有用。

要创建捕获所有路由，请在 server/routes/ 或 server/api/ 目录或任何子目录中创建一个名为 [...].ts 的文件。

routes/[...].ts
``` ts
import { defineHandler } from "nitro/h3";

export default defineHandler((event) => {
  return `Hello ${event.url}!`;
});
```
event.url	/api/user/1001?page=1&size=10&keyword=nuxt	包含完整路径 + 查询参数
event.path	/api/user/1001	仅保留纯路径，无查询参数

## 中间件
Nitro 路由中间件可以挂钩到请求生命周期中。

中间件可以在请求处理前修改请求，而不是之后。
中间件在 server/middleware/ 目录中自动注册。


middleware/
  auth.ts
  logger.ts
  ...
routes/
  hello.ts

### 简单中间件
中间件与路由处理程序的定义方式完全相同，唯一例外是它们不应返回任何内容。 从中间件返回的行为类似于从请求返回 - 该值将作为响应返回，且不会执行后续代码。

server/middleware/auth.ts
``` ts
export default defineEventHandler((event) => {
  // 扩展或修改事件
  event.context.user = { name: 'Nitro' }
})
在 server/middleware/ 目录中的中间件会自动注册到所有路由。如果您想为特定路由注册中间件，请参见 对象语法事件处理程序。
```

#### 一、核心实现方式：对象语法事件处理程序（替代默认函数导出）
默认的服务端路由/接口是**函数直接导出**（`export default defineEventHandler(...)`），为绑定专属中间件，需改为**对象导出**，对象中包含 2 个核心属性：
| 属性        | 作用                                                                  |
| ----------- | --------------------------------------------------------------------- |
| `onRequest` | 绑定当前路由/接口的**专属前置中间件**（支持单个函数/多个函数数组）    |
| `handler`   | 原路由/接口的核心处理逻辑（即原来 `defineEventHandler` 中的函数内容） |

##### 核心规则
1. 中间件写法与全局中间件**完全一致**（无返回值、操作 `event` 上下文、可抛错）；
2. 仅当前路由/接口触发时，`onRequest` 中的中间件才会执行，其他路由完全不受影响；
3. 支持**多个专属中间件**（数组形式），按数组顺序**依次执行**（前一个无返回值/不抛错，才会执行下一个）；
4. 全局中间件（`server/middleware/`）仍会优先执行，再执行当前路由的专属中间件（全局→专属→核心逻辑）。

##### 二、实战示例1：单个专属中间件（最常用，如接口鉴权）
以 `server/api/user/info.ts` 为例，为该接口绑定**专属鉴权中间件**，仅访问此接口时校验登录状态：
```ts
// server/api/user/info.ts 【特定接口+单个专属中间件】
export default {
  // 1. 绑定当前接口的专属前置中间件（onRequest）
  onRequest: (event) => {
    // 中间件逻辑：校验Cookie中的登录token（仅此接口生效）
    const token = getCookie(event, 'token');
    if (!token) {
      throw createError({ statusCode: 401, msg: '请先登录，该接口需鉴权' });
    }
    // 扩展上下文（后续handler可读取）
    event.context.isLogin = true;
  },

  // 2. 原接口的核心处理逻辑（handler）
  handler: (event) => {
    // 可读取专属中间件扩展的上下文数据
    const { isLogin } = event.context;
    // 业务逻辑
    return {
      code: 200,
      msg: '获取用户信息成功（已通过专属鉴权）',
      data: { userId: 1001, nickname: '张三', isLogin },
    };
  },
};
```
**效果**：仅请求 `/api/user/info` 时会执行鉴权中间件，请求 `/api/login`/`/api/article/list` 等其他接口时，该中间件完全不执行。

##### 三、实战示例2：多个专属中间件（数组形式，按顺序执行）
若单个路由需要多个前置处理（如「鉴权→日志记录→参数校验」），将 `onRequest` 设为**中间件函数数组**，框架会按**数组顺序依次执行**：
```ts
// server/api/order/[orderNo].ts 【特定接口+多个专属中间件】
export default {
  // 多个专属中间件：按数组顺序执行（鉴权→日志→参数校验）
  onRequest: [
    // 中间件1：鉴权
    (event) => {
      const token = getCookie(event, 'token');
      if (!token) throw createError({ statusCode: 401, msg: '未登录' });
    },
    // 中间件2：记录请求日志
    (event) => {
      event.context.log = {
        reqTime: new Date().toLocaleString(),
        reqIp: getClientIP(event),
        orderNo: getRouterParams(event).orderNo,
      };
      console.log('订单接口请求日志：', event.context.log);
    },
    // 中间件3：校验动态路由参数
    (event) => {
      const { orderNo } = getRouterParams(event);
      if (!/^ORD\d+$/.test(orderNo)) {
        throw createError({ statusCode: 400, msg: '订单号格式错误（需以ORD开头）' });
      }
    },
  ],

  // 核心处理逻辑
  handler: (event) => {
    const { orderNo } = getRouterParams(event);
    return {
      code: 200,
      msg: '获取订单详情成功',
      data: { orderNo, status: '已支付', amount: 99.9 },
    };
  },
};
```
**执行顺序**：中间件1 → 中间件2 → 中间件3 → handler（任意中间件抛错/有返回值，后续环节立即终止）。

##### 四、实战示例3：抽离公共专属中间件（复用性更高）
若多个特定路由需要**复用同一中间件**（如多个管理员接口共用鉴权中间件），可将中间件逻辑**抽离为独立函数**，在需要的路由中导入绑定，提升代码复用性：
##### 步骤1：抽离公共中间件（建议放在 `server/middleware/` 或新建 `server/middleware/utils/`）
```ts
// server/middleware/adminAuth.ts 【抽离的公共专属中间件（非全局，需手动导入）】
export default (event) => {
  // 管理员专属鉴权逻辑：校验token+校验角色
  const token = getCookie(event, 'token');
  const user = token ? { role: 'admin' } : null; // 模拟解析token获取用户角色
  if (!token || user.role !== 'admin') {
    throw createError({ statusCode: 403, msg: '无管理员权限，禁止访问' });
  }
  event.context.adminUser = user;
};
```
##### 步骤2：在多个特定路由中导入并绑定
```ts
// 示例1：server/api/admin/user/list.ts 管理员用户列表接口
import adminAuth from '@/server/middleware/adminAuth'; // 导入公共中间件

export default {
  onRequest: adminAuth, // 绑定管理员鉴权中间件
  handler: (event) => {
    return {
      code: 200,
      msg: '获取管理员用户列表成功',
      data: [{ userId: 1, name: '管理员1' }],
    };
  },
};

// 示例2：server/api/admin/report.ts 管理员报表接口（复用同一中间件）
import adminAuth from '@/server/middleware/adminAuth';

export default {
  onRequest: adminAuth, // 复用管理员鉴权中间件
  handler: (event) => {
    return {
      code: 200,
      msg: '获取管理员报表成功',
      data: { total: 100, amount: 9999 },
    };
  },
};
```
**效果**：仅 `/api/admin/` 开头的两个接口会执行管理员鉴权，其他接口不受影响，实现中间件复用。

##### 五、进阶：路由分组下的批量专属中间件（半全局）
结合之前讲的**路由分组（`(xxx)` 文件夹）**，可为同一分组下的**所有路由/接口批量绑定专属中间件**（实现“半全局”效果，比全局更精准，比单个绑定更高效）：
##### 目录结构（管理员分组）
```
server/
  └── api/
      └── (admin)/        # 管理员路由分组（路径不包含admin）
          ├── index.ts    # 分组入口，绑定批量专属中间件
          ├── user/
          │   └── list.ts # 管理员用户列表（继承分组中间件）
          └── report.ts   # 管理员报表（继承分组中间件）
```
##### 分组入口绑定批量中间件（`(admin)/index.ts`）
```ts
// server/api/(admin)/index.ts 【分组批量专属中间件】
import adminAuth from '@/server/middleware/adminAuth';
import adminLog from '@/server/middleware/adminLog'; // 管理员日志中间件

export default {
  onRequest: [adminAuth, adminLog], // 多个中间件数组
  handler: (event) => {
    return { code: 200, msg: '管理员首页' };
  },
};
```
**效果**：`(admin)` 分组下的**所有接口**（`/api/user/list`/`/api/report`/`/api`）都会自动执行 `adminAuth` 和 `adminLog` 中间件，无需为每个接口单独绑定，实现分组内的批量管控。

##### 六、关键注意事项（避坑必备）
1. **全局与专属中间件的执行顺序**：`server/middleware/` 全局中间件 → 路由分组专属中间件 → 单个路由专属中间件 → 核心 handler（前序中间件抛错，后续全部终止）；
2. **中间件无返回值规范**：专属中间件与全局中间件要求一致——**切勿返回任何值**，否则会直接将返回值作为响应返回前端，终止后续逻辑（拦截请求用 `throw createError(...)`）；
3. **异步中间件处理**：若专属中间件包含异步逻辑（如查数据库校验权限），需将中间件声明为 `async`，框架会自动等待执行完成：
   ```ts
   onRequest: async (event) => {
     const token = getCookie(event, 'token');
     // 异步解析token（模拟数据库查询）
     const user = await $fetch('/api/parseToken', { params: { token } });
     if (!user) throw createError({ statusCode: 401 });
   },
   ```
4. **动态路由兼容**：专属中间件完全支持动态路由（`[id].ts`/`[orderNo]`），可在中间件中通过 `getRouterParams(event)` 获取动态参数，实现精准校验；
5. **避免全局与专属重复逻辑**：若某逻辑已在专属中间件中实现，无需在全局中间件中重复编写，减少冗余。

##### 七、核心总结
为 Nuxt 4 特定路由/接口注册专属中间件的**核心方案是「对象语法事件处理程序」**，关键要点如下：
1. 替代默认函数导出，使用**对象导出**，通过 `onRequest` 绑定专属中间件，`handler` 写核心业务逻辑；
2. 支持**单个中间件**（直接赋值函数）、**多个中间件**（数组形式，按序执行）；
3. 抽离公共中间件可实现**跨路由复用**，提升代码可维护性；
4. 结合**路由分组**可实现**分组内批量绑定**，打造“半全局”专属中间件，兼顾精准度和效率；
5. 执行顺序：全局中间件 → 分组专属中间件 → 单个路由专属中间件 → handler，中间件抛错立即终止链路。

该方案完全遵循 Nuxt 4/Nitro 官方规范，适配所有 `server/api/`/`server/routes/` 场景，是控制中间件生效范围的标准用法。
####  执行顺序
中间件按目录列表顺序执行。


server/
  middleware/
    auth.ts <-- 第一个
    logger.ts <-- 第二个
    ... <-- 第三个
用数字前缀中间件以控制其执行顺序。


server/
  middleware/
    1.logger.ts <-- 第一个
    2.auth.ts <-- 第二个
    3.... <-- 第三个

#### 请求过滤(后面在看吧)
中间件在每个请求上执行。

应用自定义逻辑，将其作用域限制为特定条件。

例如，您可以使用 URL 将中间件应用于特定路由：

server/middleware/auth.ts

export default defineEventHandler((event) => {
  // 仅在 /auth 路由执行
  if (getRequestURL(event).pathname.startsWith('/auth')) {
    event.context.user = { name: 'Nitro' }
  }
});

#### auth.ts
```ts
// server/middleware/auth.global.ts 全局鉴权中间件（自动对所有路由生效）
export default defineEventHandler(async (event) => {
  // 1. 定义【无需鉴权的白名单路径】- 仅登录、注册接口
  const whiteList = [
    "/api/login", // 登录接口路径
    "/api/register", // 注册接口路径
    // 后续需新增免鉴权路径，直接往数组加即可（如验证码接口 /api/captcha）
  ];

  // 2. 获取当前请求的纯路径（无查询参数，用于精准匹配）
  const currentPath = event.path;

  // 3. 白名单过滤：路径在白名单中 → 直接放行，不执行后续鉴权
  if (whiteList.includes(currentPath)) {
    return; // 放行，请求直接进入对应接口的handler
  }

  // 4. 非白名单路径 → 执行鉴权逻辑（核心：校验登录态）
  // 示例：从Cookie中获取登录Token（也可从请求头/参数中获取，根据你的鉴权方式调整）
  const token = getCookie(event, "token");

  // 5. 未登录 → 抛401错误，拦截请求（前端收到401可跳转登录页）
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "未登录，请先登录",
      data: { redirect: "/login" }, // 可选：给前端返回跳转地址
    });
  }

  // 6. 已登录 → 解析Token获取用户信息（模拟异步解析，可替换为你的真实逻辑）
  // 示例：调用内部接口/解析JWT/查数据库获取用户信息
  try {
    const userInfo = await $fetch("/api/parse-token", { params: { token } });
    // 扩展上下文：将用户信息存入event.context，后续所有接口可直接使用
    event.context.user = userInfo;
  } catch (err) {
    // Token无效/过期 → 抛401错误，拦截请求
    throw createError({
      statusCode: 401,
      statusMessage: "登录态失效，请重新登录",
    });
  }

  // 7. 鉴权通过 → 无返回值，自动放行（请求进入后续接口的handler）
});

```
# 资源


## 公共资源
Nitro 通过 public/ 目录管理资源。

Nitro v3 Alpha 文档仍在开发中 —— 可能存在更新、不完善之处以及偶尔的错误。
public/ 目录下的所有资源都会被自动提供服务。这意味着你可以直接通过浏览器访问它们，无需任何特殊配置。


public/
  image.png     <-- /image.png
  video.mp4     <-- /video.mp4
  robots.txt    <-- /robots.txt
前端调用链接可以直接使用静态资源链接。
http://localhost:3000/image.png
http://localhost:3000/video.mp4
http://localhost:3000/robots.txt
生产环境公共资源
构建 Nitro 应用时，public/ 目录会被复制到 .output/public/，同时会创建包含元数据的清单并嵌入到服务器包中。


{
  "/image.png": {
    "type": "image/png",
    "etag": "\"4a0c-6utWq0Kbk5OqDmksYCa9XV8irnM\"",
    "mtime": "2023-03-04T21:39:45.086Z",
    "size": 18956
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"8-hMqyDrA8fJ0R904zgEPs3L55Jls\"",
    "mtime": "2023-03-04T21:39:45.086Z",
    "size": 8
  },
  "/video.mp4": {
    "type": "video/mp4",
    "etag": "\"9b943-4UwfQXKUjPCesGPr6J5j7GzNYGU\"",
    "mtime": "2023-03-04T21:39:45.085Z",
    "size": 637251
  }
}
这使得 Nitro 无需扫描目录也能识别公共资源，从而通过缓存头实现高性能。