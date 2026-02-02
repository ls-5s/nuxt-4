# React + TypeScript 项目

项目路径：`nuxt-4/react`，使用 **Vite + React 19 + TypeScript** 脚手架。

## 常用命令

```bash
cd nuxt-4/react

pnpm dev      # 开发环境（默认 http://localhost:5173）
pnpm build    # 生产构建
pnpm preview  # 预览构建结果
pnpm lint     # ESLint 检查
```

## 目录结构

```
react/
├── src/
│   ├── main.tsx    # 入口
│   ├── App.tsx     # 根组件
│   ├── App.css
│   ├── index.css   # 全局样式
│   └── assets/
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 技术栈

- **React 19** + **TypeScript**
- **Vite 7** 构建
- **ESLint** + **TypeScript ESLint**

# 描述UI
## 第一个组件
```ts
export default function Sum() {
    return (
        <h1>hello World</h1>
    )
}
```
## 组件的导入和导出
Gallery.ts
```ts
export default function P() {
    return (
        <> 
        <h1>hello World</h1>
        </>
    )
}
```
app.ts
```ts
import Gallery from './Gallery.ts'
export default function App() {
  return (
    <Gallery />
  );
}
```
## 使用 JSX 书写标签语言
规则
- 根元素规则：组件返回多个 JSX 元素时，必须用一个父元素（如<div>）或 React Fragment（<>...</>）包裹，仅能返回一个根元素。
- 标签闭合规则：所有 JSX 标签需严格闭合，自闭合标签（img/input 等）需写为<标签名 />，成对标签需包含开始和结束标签（如<li>内容</li>）。
- 属性命名规则：JSX 属性使用驼峰式命名，替换 JavaScript 保留字（class→className、for→htmlFor），连字符属性改为驼峰（stroke-width→strokeWidth）。
## 在 JSX 中通过大括号使用 JavaScript
```ts
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```
## 将 Props 传递给组件
步骤 1: 将 props 传递给子组件 
首先，将一些 props 传递给 Avatar。例如，让我们传递两个 props：person（一个对象）和 size（一个数字）：
```ts
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
子
```ts
// Avatar.jsx
export default function Avatar({ person, size }) {
  // 从 person 对象中解构出 name 和 imageId
  const { name, imageId } = person;

  // 根据 imageId 拼接完整的图片 URL (以 imgur 为例)
  const imageUrl = `https://i.imgur.com/${imageId}.jpg`;

  return (
    // 使用接收到的 size prop 来设置图片的宽度和高度
    <img
      src={imageUrl}
      alt={name} // 使用 name 作为图片的替代文本
      width={size}
      height={size}
      style={{
        borderRadius: '50%', // 让图片变成圆形头像
        objectFit: 'cover',   // 确保图片在圆形内完整显示，不拉伸变形
        border: '2px solid #fff', // 可选：添加白色边框
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)' // 可选：添加轻微阴影
      }}
    />
  );
}
```
## 条件渲染
```ts
// Item.tsx
import React from 'react';

// 1. 为 Item 组件的 Props 定义一个接口
interface ItemProps {
  name: string;       // name 属性必须是字符串类型
  isPacked: boolean;  // isPacked 属性必须是布尔类型
}

// 2. 让组件的 Props 参数符合这个接口定义
function Item({ name, isPacked }: ItemProps) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default Item;
```
```ts
// PackingList.tsx
import React from 'react';
import Item from './Item'; // 导入 TS 版本的 Item 组件

// 父组件 PackingList 没有接收 Props，所以可以简化定义
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        {/* TypeScript 会自动检查传递的 Props 是否符合 ItemProps 接口定义 */}
        <Item isPacked={true} name="宇航服" />
        <Item isPacked={true} name="带金箔的头盔" />
        <Item isPacked={false} name="Tam 的照片" />
        {/* 如果传递错误的类型，比如 isPacked="yes"，TypeScript 会在编译时报错 */}
      </ul>
    </section>
  );
}
```
- 选择性地返回 null 
在一些情况下，你不想有任何东西进行渲染。比如，你不想显示已经打包好的物品。但一个组件必须返回一些东西。这种情况下，你可以直接返回 null。
## 渲染列表
```ts
// 1. 定义 Person 接口，明确数组项的类型结构
interface Person {
  id: number;
  name: string;
  profession: string;
  // 补充 accomplishment 字段（原代码用到但未定义）
  accomplishment?: string;
}

// 2. 定义 people 数组并指定类型（TS 会自动推导，但显式注解更清晰）
const people: Person[] = [{
  id: 0,
  name: '凯瑟琳·约翰逊',
  profession: '数学家',
  accomplishment: '计算航天轨道'
}, {
  id: 1,
  name: '马里奥·莫利纳',
  profession: '化学家',
  accomplishment: '发现臭氧层空洞成因'
}, {
  id: 2,
  name: '穆罕默德·阿卜杜勒·萨拉姆',
  profession: '物理学家',
  accomplishment: '弱电统一理论'
}, {
  id: 3,
  name: '珀西·莱温·朱利亚',
  profession: '化学家',
  accomplishment: '有机合成化学贡献'
}, {
  id: 4,
  name: '苏布拉马尼扬·钱德拉塞卡',
  profession: '天体物理学家',
  accomplishment: '钱德拉塞卡极限'
}];

// 3. 定义 getImageUrl 函数的类型（原代码用到但未实现）
const getImageUrl = (person: Person): string => {
  // 模拟图片 URL 生成逻辑（可根据实际需求修改）
  return `./images/${person.id}.jpg`;
};

// 4. 过滤出所有化学家（TS 会自动推导 chemists 类型为 Person[]）
const chemists: Person[] = people.filter((person: Person) => 
  person.profession === '化学家'
);

// 5. 生成列表项（假设是 React 组件场景，补充 React 类型）
// 若不是 React 场景，可将 JSX 改为普通字符串拼接
import React from 'react'; // React 项目需引入
const listItems = chemists.map((person: Person) => (
  <li key={person.id}> {/* React 列表需加 key 属性 */}
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}:</b>
      {' ' + person.profession + ' '}
      因{person.accomplishment || '突出贡献'}而闻名世界
    </p>
  </li>
));

// 6. 返回列表（React 组件中使用）
const ChemistList = () => {
  return <ul>{listItems}</ul>;
};

export default ChemistList;
```