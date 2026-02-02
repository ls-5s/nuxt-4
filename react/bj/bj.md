# 创建react的两种方式
- 方式 1：官方脚手架 create-react-app（最经典）

这是 React 官方提供的脚手架，无需手动配置构建工具，适合新手快速上手：
创建项目
打开终端，执行命令（my-react-app 是项目名，可自定义）：
```bash

npx create-react-app my-react-app
```
进入项目目录
项目创建完成后，进入项目文件夹：
```bash
cd my-react-app
```
启动开发服务器
启动本地调试服务，自动打开浏览器预览：
```bash
npm start
```
启动后，浏览器会自动访问 http://localhost:3000，即可看到 React 默认页面。
- 方式 2：使用 Vite 创建（更高效，推荐）

Vite 是现代前端构建工具，比 create-react-app 启动 / 热更新更快，适合追求效率的场景：
创建项目
执行命令（my-vite-react 是项目名，--template react 指定 React 模板）：
```bash
npm create vite@latest my-vite-react -- --template react
```
进入项目目录
```bash
cd my-vite-react
```
安装依赖
Vite 创建项目后需手动安装依赖：
```bash
npm install
```
启动开发服务器
```bash
npm run dev
```
启动后，终端会显示访问地址（通常是 http://localhost:5173），打开浏览器即可预览。
# 描述 UI
## 你的第一个组件
```js
function App () {
    return (
        <div>hello world</div>
    )
}
export default function Sum() {
    return (
        <App/>
    )
}
```
**注意：**
- React 组件是常规的 JavaScript 函数，但 组件的名称必须以大写字母开头，否则它们将无法运行！

但是，如果你的标签和 return 关键字不在同一行，则必须把它包裹在一对括号中，如下所示：
```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```
- 没有括号包裹的话，任何在 return 下一行的代码都 将被忽略！
- 组件可以渲染其他组件，但是 请不要嵌套他们的定义：
```js
export default function Gallery() {
  // 🔴 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}
```
- 上面这段代码 非常慢，并且会导致 bug 产生。因此，你应该在顶层定义每个组件：
```js
export default function Gallery() {
  // ...
}

// ✅ 在顶层声明组件
function Profile() {
  // ...
}
```
- 当子组件需要使用父组件的数据时，你需要 通过 props 的形式进行传递，而不是嵌套定义。

## 组件的导入与导出
组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。

1. 具名导出（推荐：多组件 / 精准复用场景）
这是你之前代码里的写法，适合一个文件导出多个成员（比如同时导出 Gallery 和 Profile）：
```jsx
// Gallery.js - 顶层定义 + 具名导出 Profile
export default function Gallery() { // Gallery 用默认导出（核心组件）
  return <div><Profile /></div>;
}

// Profile 用具名导出（次要/复用组件）
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

// 外部导入：精准导入 Profile
import { Profile } from './Gallery.js';
// 同时导入 Gallery（默认）+ Profile（具名）
import Gallery, { Profile } from './Gallery.js';
```
2. 默认导出（推荐：单组件独立文件场景）
如果把 Profile 拆成独立文件（比如 Profile.js），用默认导出更简洁（一个文件只导出一个核心组件）：
```jsx
// Profile.js - 独立文件 + 默认导出
export default function Profile() { // 无需要花括号，直接默认导出
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

// 外部导入：可自定义名称（无需和原名称匹配）
import Profile from './Profile.js';
// 甚至可以重命名（比如避免冲突）
import UserProfile from './Profile.js';
```

## 使用 JSX 书写标签语言
JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。虽然还有其它方式可以编写组件，但大部分 React 开发者更喜欢 JSX 的简洁性，并且在大部分代码库中使用它。

**JSX 规则**

1. 只能返回一个根元素 
如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。

例如，你可以使用一个 <div> 标签：
```jsx
<div>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```
如果你不想在标签中增加一个额外的 <div>，可以用 <> 和 </> 元素来代替：
2. 标签必须闭合 
JSX 要求标签必须正确闭合。像 <img> 这样的自闭合标签必须书写成 <img />，而像 <li>oranges 这样只有开始标签的元素必须带有闭合标签，需要改为 <li>oranges</li>

3. 属性使用驼峰式命名 & 特殊属性替换

JSX 的属性名遵循小驼峰命名法，且 JavaScript 保留字 / HTML 带连字符的属性需要替换：
HTML 的class → JSX 的className（class是 JS 保留字）
HTML 的for → JSX 的htmlFor（for是 JS 保留字）
HTML 的onclick → JSX 的onClick（驼峰式）
HTML 的stroke-width → JSX 的strokeWidth（连字符转驼峰）
HTML 的font-size → JSX 的fontSize（连字符转驼峰）
```jsx
// 正确：使用className、htmlFor、onClick、fontSize
<div className="box" style={{ fontSize: '16px' }}>
  <label htmlFor="username">用户名：</label>
  <input id="username" type="text" onClick={() => {}} />
</div>

// 错误：使用class、for、onclick、font-size
<div class="box" style={{ font-size: '16px' }}>
  <label for="username">用户名：</label>
  <input id="username" type="text" onclick={() => {}} />
</div>
```
**注意**

- JSX and React 是相互独立的 东西。但它们经常一起使用，但你 可以 单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。
- 为什么多个 JSX 标签需要被一个父元素包裹？
JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。
- 为什么要使用驼峰式？两个关键限制
1. 限制 1：JavaScript 中，对象键名不能包含连字符（-）
在 JavaScript 里，连字符-是减法运算符，如果对象键名写stroke-width，会被解析成stroke - width（即变量stroke减去变量width），导致语法错误。
2. 限制 2：JavaScript 的保留字不能作为标识符
JavaScript 有一系列保留字（如class、for、if、else等），这些单词被语言本身占用，不能直接作为变量名或对象键名。

## 在 JSX 中通过大括号使用 JavaScript
JSX 允许你在 JavaScript 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起。有时候，你可能想要在标签中添加一些 JavaScript 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 JavaScript。

**使用引号传递字符串**
```jsx
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

**可以在哪使用大括号**

在 JSX 中，只能在以下两种场景中使用大括号：

- 用作 JSX 标签内的文本：<h1>{name}'s To Do List</h1> 是有效的，但是 <{tag}>Gregorio Y. Zara's To Do List</{tag}> 无效。
- 用作紧跟在 = 符号后的 属性：src={avatar} 会读取 avatar 变量，但是 src="{avatar}" 只会传一个字符串 {avatar}。
  
**使用 “双大括号”：JSX 中的 CSS 和 对象** 

除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 { name: "Hedy Lamarr", inventions: 5 }。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：person={{ name: "Hedy Lamarr", inventions: 5 }}。

**注意**
内联 style 属性 使用驼峰命名法编写。例如，
```HTML 
<ul style="background-color: black"> 在你的组件里应该写成 <ul style={{ backgroundColor: 'black' }}>。
```
## 将 Props 传递给组件
React 组件使用 props 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。

- 步骤 1：创建子组件文件 Avatar.jsx
在该文件中定义并导出子组件Avatar（命名导出 / 默认导出均可，这里用默认导出）：
```jsx
// src/components/Avatar.jsx
// 子组件 Avatar：定义并默认导出
export default function Avatar({ person, size }) {
  const { name, imageId } = person;
  const imageUrl = `https://i.imgur.com/${imageId}.jpg`;

  return (
    <img
      src={imageUrl}
      alt={name}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  );
}
```
- 步骤 2：在父组件文件 Profile.jsx 中导入子组件
在父组件文件中通过import语句引入Avatar组件，然后使用：
```jsx
// src/components/Profile.jsx
// 导入子组件 Avatar（路径根据文件实际位置调整）
import Avatar from './Avatar';

// 父组件 Profile：默认导出
export default function Profile() {
  return (
    <div style={{ padding: '20px' }}>
      <Avatar
        person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
        size={100}
      />
    </div>
  );
}
```

- 先理解 React 组件的 props 本质
React 函数组件的参数本质上是一个props 对象，这个对象包含了父组件传递过来的所有属性。比如：当父组件这样使用你的 Avatar 组件时：
```jsx
<Avatar person={{ name: '张三', img: 'xxx.jpg' }} size={40} />
你的 Avatar 组件接收到的参数其实是一个完整的对象，长这样：
javascript
运行
{
  person: { name: '张三', img: 'xxx.jpg' },
  size: 40
}
```
- 使用 JSX 展开语法传递 props
有时候，传递 props 会变得非常重复：
```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
改成
```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
**特殊传值**
- 一、场景 1：组件标签包裹的内容（children不能直接换名）
children是 React 的内置特殊 props，专门用来接收组件标签对之间包裹的内容。比如你原来的写法：
```jsx
===================
// 子组件：把 children 重命名为 btnText
function AlertButton({ message, children: btnText }) 
====================
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="正在播放！">
        播放电影
      </AlertButton>
      <AlertButton message="正在上传！">
        上传图片
      </AlertButton>
    </div>
  );
}
```

## 条件渲染
通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 if 语句、&& 和 ? : 运算符来选择性地渲染 JSX。

**if/else 语句的使用**
如果 isPacked 属性是 true，这段代码会返回一个不一样的 JSX。通过这样的改动，一些物品的名字后面会出现一个勾选符号：
```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}

```
Sally Ride 的行李清单
宇航服 ✅
带金箔的头盔 ✅
Tam 的照片

**子和父组件在同一个页面是否有先后顺序**
- 语法层面：顺序不强制（函数声明的 “提升” 特性）

在你的代码中，Item和PackingList都是函数式组件（采用函数声明的方式：function 组件名() {}）。而 JavaScript 有一个函数声明提升（Hoisting） 的特性：
- 特殊情况：顺序会强制要求（函数表达式 / 箭头函数）

如果你的组件采用函数表达式（或箭头函数）的方式定义（比如const Item = () => {}），那么必须先定义子组件，再定义父组件，因为函数表达式没有 “提升” 特性，未定义就使用会直接报错。

**选择性地包含 JSX**
- 解决重复代码问题
- 解决思路

核心思路是：把重复的 JSX 部分（<li className="item">...</li>）提取为公共部分，只对变化的部分（✅标记）进行条件控制。具体有两种常用的实现方式，都能达到消除重复的目的。

=======================================

先定义变量存储动态内容（适合新手理解）
我们可以先创建一个变量来存储 “物品名称 + 可选的✅”，然后将这个变量嵌入到公共的<li>标签中，这样就只需要写一次<li className="item">。
```jsx
import React from 'react';

function Item({ name, isPacked }) {
  // 定义变量存储动态内容：根据isPacked决定是否添加✅
  let itemContent = name;
  if (isPacked) {
    itemContent = `${name} ✅`; // 也可以写为 itemContent = name + " ✅";
  }

  // 只返回一次公共的<li>标签，嵌入动态内容
  return <li className="item">{itemContent}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item isPacked={true} name="宇航服" />
        <Item isPacked={true} name="带金箔的头盔" />
        <Item isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}
```
**三目运算符（? :）**
除了这样：
```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```
你还可以这样实现：
```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```
**与运算符（&&）**
```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

```
在 JavaScript 中，A && B的执行逻辑是：
如果A为真（true），则表达式返回B；
如果A为假（false），则表达式返回false（React 会自动忽略false、null、undefined这些值，不会渲染到页面上）。

**注意**
切勿将数字放在 && 左侧.
- JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 0，整个表达式将变成左侧的值（0），React 此时则会渲染 0 而不是不进行渲染。

- 例如，一个常见的错误是 messageCount && <p>New messages</p>。其原本是想当 messageCount 为 0 的时候不进行渲染，但实际上却渲染了 0。

- 为了更正，可以将左侧的值改成布尔类型：messageCount > 0 && <p>New messages</p>。

## 渲染列表
你可能经常需要通过 JavaScript 的数组方法 来操作数组中的数据，从而将一个数据集渲染成多个相似的组件。在这篇文章中，你将学会如何在 React 中使用 filter() 筛选需要渲染的组件和使用 map() 把数组转换成组件数组。
- 简化写法：filter() + map() 链式调用
```jsx
import React from 'react';

function AdultUserList() {
  const users = [
    { id: 1, name: '张三', age: 20 },
    { id: 2, name: '李四', age: 17 },
    { id: 3, name: '王五', age: 25 },
  ];

  return (
    <div>
      <h3>成年用户列表</h3>
      <ul>
        {users
          // 先筛选：只保留成年用户
          .filter((user) => user.age > 18)
          // 再转换：生成组件
          .map((user) => (
            <li key={user.id}>
              姓名：{user.name}，年龄：{user.age}岁
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AdultUserList;
```
**注意**
因为箭头函数会隐式地返回位于 => 之后的表达式，所以你可以省略 return 语句。
```jsx
const listItems = chemists.map(person =>
  <li>...</li> // 隐式地返回！
);
```
不过，如果你的 => 后面跟了一对花括号 { ，那你必须使用 return 来指定返回值！
```jsx
const listItems = chemists.map(person => { // 花括号
  return <li>...</li>;
});
```
箭头函数 => { 后面的部分被称为 “块函数体”，块函数体支持多行代码的写法，但要用 return 语句才能指定返回值。假如你忘了写 return，那这个函数什么都不会返回！

- 为每个列表项显示多个 DOM 节点
如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？

Fragment 语法的简写形式 <> </> 无法接受 key 值，所以你只能要么把生成的节点用一个 <div> 标签包裹起来，要么使用长一点但更明确的 <Fragment> 写法：
```jsx
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```
- 直接放在 map() 方法里的 JSX 元素一般都需要指定 key 值！

## 保持组件纯粹(看的有点云里雾里的)

# 添加交互
## 响应事件
使用 React 可以在 JSX 中添加 事件处理函数。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。
**添加事件处理函数**
按照如下三个步骤，即可让它在用户点击时显示消息：

1. 在 Button 组件 内部 声明一个名为 handleClick 的函数。
2. 实现函数内部的逻辑（使用 alert 来显示消息）。
3. 添加 onClick={handleClick} 到 <button> JSX 中。
```jsx
export default function app () {

  function s () {
    alert("jjjjjjjjjj")
  }
  return (
    <button onClick={s}>点击<button>
  )
}
```

**在事件处理函数中读取 props**
```jsx
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="正在播放！">
        播放电影
      </AlertButton>
      <AlertButton message="正在上传！">
        上传图片
      </AlertButton>
    </div>
  );
}
```
**阻止传播**
这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 e.stopPropagation() ：
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}

```
**阻止默认行为**
某些浏览器事件具有与事件相关联的默认行为。例如，点击 <form> 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：
你可以调用事件对象中的 e.preventDefault() 来阻止这种情况发生：
```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```
## State：组件的记忆
组件通常需要根据交互更改屏幕上显示的内容。输入表单应该更新输入字段，单击轮播图上的“下一个”应该更改显示的图片，单击“购买”应该将商品放入购物车。组件需要“记住”某些东西：当前输入值、当前图片、购物车。在 React 中，这种组件特有的记忆被称为 state。
**怎么去使用它**
```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}

```
**注意**
Hooks ——以 use 开头的函数——只能在组件或自定义 Hook 的最顶层调用。 你不能在条件语句、循环语句或其他嵌套函数内调用 Hook。Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。
**State 是隔离且私有的**
State 是屏幕上组件实例内部的状态。换句话说，如果你渲染同一个组件两次，每个副本都会有完全隔离的 state！改变其中一个不会影响另一个。

## 渲染和提交
组件显示到屏幕之前，其必须被 React 渲染。理解这些处理步骤将帮助你思考代码的执行过程并能解释其行为。
想象一下，你的组件是厨房里的厨师，把食材烹制成美味的菜肴。在这种场景下，React 就是一名服务员，他会帮客户们下单并为他们送来所点的菜品。这种请求和提供 UI 的过程总共包括三个步骤：

1.触发 一次渲染（把客人的点单分发到厨房）
2.渲染 组件（在厨房准备订单）
3.提交 到 DOM（将菜品放在桌子上）

**步骤 1: 触发一次渲染**
有两种原因会导致组件的渲染:
1.组件的 初次渲染。
2.组件（或者其祖先之一）的 状态发生了改变。
**步骤 2: React 渲染你的组件**
在你触发渲染后，React 会调用你的组件来确定要在屏幕上显示的内容。“渲染中” 即 React 在调用你的组件。

- 在进行初次渲染时, React 会调用根组件。
- 对于后续的渲染, React 会调用内部状态更新触发了渲染的函数组件。
**注意：**
渲染必须始终是一次 纯计算:
输入相同，输出相同。 给定相同的输入，组件应始终返回相同的 JSX。（当有人点了西红柿沙拉时，他们不应该收到洋葱沙拉！）
只做它自己的事情。 它不应更改任何存在于渲染之前的对象或变量。（一个订单不应更改其他任何人的订单。）
否则，随着代码库复杂性的增加，你可能会遇到令人困惑的错误和不可预测的行为。在 “严格模式” 下开发时，React 会调用每个组件的函数两次，这可以帮助发现由不纯函数引起的错误。

**步骤 3: React 把更改提交到 DOM 上**
在渲染（调用）你的组件之后，React 将会修改 DOM。

- 对于初次渲染，React 会使用 appendChild() DOM API 将其创建的所有 DOM 节点放在屏幕上。
- 对于重渲染，React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。

## state 如同一张快照
也许 state 变量看起来和一般的可读写的 JavaScript 变量类似。但 state 在其表现出的特性上更像是一张快照。设置它不会更改你已有的 state 变量，但会触发重新渲染。
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```
简单来说：setTimeout 的回调函数捕获的是事件处理函数执行时的 number 快照，而不是状态更新后的最新值。
一个 state 变量的值永远不会在一次渲染的内部发生变化， 即使其事件处理函数的代码是异步的。在 那次渲染的 onClick 内部，number 的值即使在调用 setNumber(number + 5) 之后也还是 0。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。
**函数式更新突破快照的限制（合理利用快照特性）**
```jsx
import { useState } from 'react';

export default function SnapshotDemo3() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 函数式更新：参数 prevCount 是上一次更新后的 state 快照
    setCount(prevCount => prevCount + 1); // 基于快照0 → 1
    setCount(prevCount => prevCount + 1); // 基于快照1 → 2
    setCount(prevCount => prevCount + 1); // 基于快照2 → 3
    // 最终 count 会变成3，因为每次更新都基于前一次的最新快照
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>点击+3</button>
    </div>

  );
}
```
- 函数式更新的参数 prevCount 是 React 帮我们保存的上一次更新后的 state 快照，而不是当前渲染的快照。
- 三次调用中，每次的 prevCount 都是前一次更新后的结果，所以最终能实现累加 3 的效果。
- 这是 React 在快照特性下，为我们提供的既保持快照的稳定性，又能实现连续更新的优雅方案。

## 把一系列 state 更新加入队列
设置组件 state 会把一次重新渲染加入队列。但有时你可能会希望在下次渲染加入队列之前对 state 的值执行多次操作。为此，了解 React 如何批量更新 state 会很有帮助。
**React 会对 state 更新进行批处理**
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    // 三次直接传值更新，都基于初始的number=0
    setNumber(number + 1); // 0+1=1
    setNumber(number + 1); // 0+1=1（覆盖上一个）
    setNumber(number + 1); // 0+1=1（再覆盖）
  };

  return (
    <>
      <h1>{number}</h1>
      <button onClick={handleClick}>增加数字</button>
    </>
  );
}
```
**在下次渲染前多次更新同一个 state**
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    // 三次直接传值更新，都基于初始的number=0
    setNumber(number + 1); // 0+1=1
    setNumber(number + 1); // 0+1=1（覆盖上一个）
    setNumber(number + 1); // 0+1=1（再覆盖）
  };

  return (
    <>
      <h1>{number}</h1>
      <button onClick={handleClick}>增加数字</button>
    </>
  );
}
```

## 更新 state 中的对象
state 中可以保存任意类型的 JavaScript 值，包括对象。但是，你不应该直接修改存放在 React state 中的对象。相反，当你想要更新一个对象时，你需要创建一个新的对象（或者将其拷贝一份），然后将 state 更新为此对象。

**将 state 视为只读的**
换句话说，你应该 把所有存放在 state 中的 JavaScript 对象都视为只读的。
```jsx
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

```
**使用展开语法复制对象**
对于普通的对象更新，我们主要使用 ** 对象展开运算符（...）** 来创建新对象，这是 React 中最常用、最推荐的方式。
```jsx
import { useState } from 'react';

function UserProfile() {
  // 初始化 state 中的对象
  const [user, setUser] = useState({
    name: '张三',
    age: 20,
    info: {
      city: '北京',
      job: '前端开发'
    }
  });

  // 场景1：更新单个属性（比如修改年龄）
  const updateAge = () => {
    // 🌟 关键：用展开运算符拷贝原对象，再覆盖需要更新的属性
    setUser({
      ...user, // 拷贝原对象的所有属性
      age: 21 // 覆盖age属性，其他属性保持不变
    });
  };

  // 场景2：更新多个属性（比如同时改名字和年龄）
  const updateNameAndAge = () => {
    setUser({
      ...user,
      name: '李四',
      age: 22
    });
  };
// 如果对象是嵌套结构（比如 user.info.city），需要逐层拷贝，不能只拷贝顶层，
// 否则嵌套的对象还是原引用（会导致 React 无法检测变化）。
// 接上面的函数式组件示例，添加更新嵌套属性的方法
const updateCity = () => {
  setUser({
    ...user, // 拷贝顶层对象
    info: {
      ...user.info, // 拷贝嵌套的info对象
      city: '上海' // 覆盖city属性
    }
  });
};
  return (
    <div>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>城市：{user.info.city}</p>
      <button onClick={updateAge}>增加年龄</button>
      <button onClick={updateNameAndAge}>修改姓名和年龄</button>
    </div>
  );
}

export default UserProfile;
```
**使用 Immer 编写简洁的更新逻辑**
如果你的 state 有多层的嵌套，你或许应该考虑 将其扁平化。但是，如果你不想改变 state 的数据结构，你可能更喜欢用一种更便捷的方式来实现嵌套展开的效果。Immer 是一个非常流行的库，它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程。通过使用 Immer，你写出的代码看起来就像是你“打破了规则”而直接修改了对象：

==================================================

尝试使用 Immer:
运行 npm install use-immer 添加 Immer 依赖
用 import { useImmer } from 'use-immer' 替换掉 import { useState } from 'react'

===================================================

**代码导入**
```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
     
    </>
  );
}

```
## 更新 state 中的数组
数组是另外一种可以存储在 state 中的 JavaScript 对象，它虽然是可变的，但是却应该被视为不可变。同对象一样，当你想要更新存储于 state 中的数组时，你需要创建一个新的数组（或者创建一份已有数组的拷贝值），并使用新数组设置 state。
**向数组中添加元素**
```jsx
import { useState } from 'react';
let nextId = 0；
export default function List() { 

  const [name, setName] = useState('');
  const [roster, setRoster] = useState([]);
  const rosterList = () => {
    setRoster([...roster, { id: nextId++, name: name }])
    setName('');
  }
  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={rosterList}>Add</button>
      <ul>
              {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
        </ul>
      </>
  )
}

数组展开运算符还允许你把新添加的元素放在原始的 ...artists 之前：

setArtists([
  { id: nextId++, name: name },
  ...artists // 将原数组中的元素放在末尾
]);
```
**从数组中删除元素**
从数组中删除一个元素最简单的方法就是将它过滤出去。换句话说，你需要生成一个不包含该元素的新数组。这可以通过 filter 方法实现，例如：
```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  const addArtist = () => {
    if (!name.trim()) return;
    setArtists(prev => [...prev, { id: nextId++, name }]);
    setName('');
  };

  // 按id删除元素：使用filter创建新数组
  const removeArtist = (idToRemove) => {
    // filter返回所有id不等于要删除id的元素，形成新数组
    setArtists(prev => prev.filter(artist => artist.id !== idToRemove));
  };

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addArtist}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}
            {/* 点击按钮删除当前元素，传入对应id */}
            <button onClick={() => removeArtist(artist.id)} style={{ marginLeft: '8px' }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```
**替换数组中的元素**
想要替换数组中一个或多个元素是非常常见的。类似 arr[0] = 'bird' 这样的赋值语句会直接修改原始数组，所以在这种情况下，你也应该使用 map。

要替换一个元素，请使用 map 创建一个新数组。在你的 map 回调里，第二个参数是元素的索引。使用索引来判断最终是返回原始的元素（即回调的第一个参数）还是替换成其他值：

```jsx
import { useState } from "react";
let arr = [
  0,0,0
]
function App() {
  const [count, setCount] = useState(arr);
  function handleClick(index) {
    setCount(count.map((item, i) => i === index ? item + 1 : item));
  }
  return (
    <div> 
      <button onClick={() => handleClick(0)}>{count[0]}</button>
    </div>
  )
}

export default App;
```
**向数组中插入元素**
有时，你也许想向数组特定位置插入一个元素，这个位置既不在数组开头，也不在末尾。为此，你可以将数组展开运算符 ... 和 slice() 方法一起使用。slice() 方法让你从数组中切出“一片”。为了将元素插入数组，你需要先展开原数组在插入点之前的切片，然后插入新元素，最后展开原数组中剩下的部分。
下面的例子中，插入按钮总是会将元素插入到数组中索引为 1 的位置。
```jsx
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // 可能是任何索引
    const nextArtists = [
      // 插入点之前的元素：
      ...artists.slice(0, insertAt),
      // 新的元素：
      { id: nextId++, name: name },
      // 插入点之后的元素：
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        插入
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
**其他改变数组的情况**
总会有一些事，是你仅仅依靠展开运算符和 map() 或者 filter() 等不会直接修改原值的方法所无法做到的。例如，你可能想翻转数组，或是对数组排序。而 JavaScript 中的 reverse() 和 sort() 方法会改变原数组，所以你无法直接使用它们。

然而，你可以先拷贝这个数组，再改变这个拷贝后的值。
翻转数组的例子：
```jsx
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        翻转
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}

```
**更新数组内部的对象**
对象并不是 真的 位于数组“内部”。可能他们在代码中看起来像是在数组“内部”，但其实数组中的每个对象都是这个数组“指向”的一个存储于其它位置的值。这就是当你在处理类似 list[0] 这样的嵌套字段时需要格外小心的原因。其他人的艺术品清单可能指向了数组的同一个元素！

当你更新一个嵌套的 state 时，你需要从想要更新的地方创建拷贝值，一直这样，直到顶层。 让我们看一下这该怎么做。

在下面的例子中，两个不同的艺术品清单有着相同的初始 state。他们本应该互不影响，但是因为一次 mutation，他们的 state 被意外地共享了，勾选一个清单中的事项会影响另外一个清单：
```jsx
import { useState } from 'react';

export default function TodoList() {
  // 初始化状态：数组中包含多个对象（待办项）
  const [items, setItems] = useState([
    { id: 0, text: '学习React状态不可变原则', done: false },
    { id: 1, text: '理解数组和对象的引用类型', done: false },
    { id: 2, text: '编写代码样例测试', done: false },
  ]);

  // 你提问的handleToggle函数：切换待办项的完成状态
  function handleToggle(id) {
    // 1. 用map生成新数组（拷贝原数组，不修改原数组）
    const newItems = items.map(item => {
      // 2. 找到要修改的项，生成新对象（拷贝原对象属性，仅修改done）
      if (item.id === id) {
        return { ...item, done: !item.done }; // 核心：拷贝+修改
      }
      // 不需要修改的项，直接复用原对象（节省性能）
      return item;
    });
    // 3. 用新数组更新状态
    setItems(newItems);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>待办清单（状态不可变示例）</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li 
            key={item.id} 
            style={{ 
              margin: '10px 0', 
              textDecoration: item.done ? 'line-through' : 'none',
              color: item.done ? '#999' : '#333'
            }}
          >
            {/* 点击复选框触发handleToggle，传递当前项的id */}
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggle(item.id)}
              style={{ marginRight: '10px' }}
            />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
**摘要**
- 你可以把数组放入 state 中，但你不应该直接修改它。
- 不要直接修改数组，而是创建它的一份 新的 拷贝，然后使用新的数组来更新它的状态。
- 你可以使用 [...arr, newItem] 这样的数组展开语法来向数组中添加元素。
- 你可以使用 filter() 和 map() 来创建一个经过过滤或者变换的数组。
- 你可以使用 Immer 来保持代码简洁。

**使用 Immer 编写简洁的更新逻辑**
在没有 mutation 的前提下更新嵌套数组可能会变得有点重复。就像对对象一样:

通常情况下，你应该不需要更新处于非常深层级的 state 。如果你有此类需求，你或许需要调整一下数据的结构，让数据变得扁平一些。
如果你不想改变 state 的数据结构，你也许会更喜欢使用 Immer ，它让你可以继续使用方便的，但会直接修改原值的语法，并负责为你生成拷贝值。
下面是我们用 Immer 来重写的艺术愿望清单的例子：
```jsx
import {useState} from 'react';
import {useImmer} from 'use-immer';
export default function TodoList() { 
  const [items, updateItems] = useImmer([])
  const [text, setText] = useState('')
  function handleAddItem() { 
    updateItems(draft => { 
      draft.push({text: text, id: draft.length})
    })
    setText('')
  }
  return (
   button onClick={handleAddItem}> add </button>
  )
}
```
# 状态管理
## 用 State 响应输入
**React 声明式 UI 编程的核心步骤**
React 的声明式 UI 编程遵循 **“数据驱动视图”** 的逻辑，核心步骤可以总结为以下 5 步：
- 步骤 1：定义 UI 的状态（State）
状态是驱动 UI 变化的核心数据，是 UI 的 “数据源”。你需要先确定 UI 中哪些部分是动态的，这些动态部分对应的数据就是状态。
- 步骤 2：根据状态描述 UI 结构（声明 UI）
不再手动操作 DOM，而是使用 JSX（React 的语法糖）根据当前的状态描述 UI 应该呈现的样子。这一步是 “声明式” 的核心 —— 只关注结果，不关注过程。
- 步骤 3：绑定事件处理逻辑
为 UI 元素添加交互事件（如点击、输入），在事件处理函数中修改状态（注意：不能直接修改状态，要使用 React 提供的状态更新方法）。
- 步骤 4：React 自动更新 UI（核心：虚拟 DOM Diff）
当状态发生变化时，React 会重新渲染组件（根据新状态生成新的虚拟 DOM），然后通过虚拟 DOM 的 Diff 算法对比新旧虚拟 DOM 的差异，最后只把差异部分更新到真实 DOM 中。这一步是 React 自动完成的，你无需关心。
- 步骤 5：处理副作用（可选）
如果有需要和外部系统交互的逻辑（如请求数据、操作本地存储、手动操作 DOM），需要在副作用钩子（如useEffect）中处理，避免影响组件的渲染逻辑。

**React 声明式 UI 编程案例**

案例 1：基础计数器（入门级）
这个案例包含状态定义、UI 声明、事件绑定和自动更新，是最基础的声明式 UI 示例。
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// 定义计数器组件（声明式UI的核心载体）
function Counter() {
  // 步骤1：定义状态（count是当前状态，setCount是更新状态的方法，初始值为0）
  const [count, setCount] = useState(0);

  // 步骤3：定义事件处理函数（点击按钮时更新状态）
  const handleIncrement = () => {
    setCount(count + 1); // 修改状态，React会自动更新UI
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  // 步骤2：根据状态声明UI结构（JSX描述UI“长什么样”，依赖count状态）
  return (
    <div style={{ padding: '20px', fontSize: '20px' }}>
      <h2>计数器（声明式UI）</h2>
      <p>当前计数：{count}</p>
      <button onClick={handleIncrement} style={{ marginRight: '10px' }}>
        +1
      </button>
      <button onClick={handleDecrement}>-1</button>
    </div>
  );
}

// 渲染组件到真实DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
```
代码解释

useState(0)：React 的状态钩子，用于在函数组件中定义状态，初始计数为 0。
JSX 部分：直接用{count}将状态嵌入 UI，描述了 “计数是 count 时，UI 应该显示这个数值”，这就是声明式的体现。
点击按钮时，调用setCount修改状态，React 会自动重新渲染组件，更新页面上的计数，你不需要手动获取 DOM 元素并修改其内容（这是命令式的操作）。

## 选择 State 结构
构建良好的 state 可以让组件变得易于修改和调试，而不会经常出错。以下是你在构建 state 时应该考虑的一些建议。
**构建 state 的原则**
- 合并关联的 state
```jsx 
const [x, setX] = useState(0);
const [y, setY] = useState(0);

换成
const [position,, setPosition] = useState({x:0,y:0})
```
如果某两个 state 变量总是一起变化，则将它们统一成一个 state 变量可能更好

**注意**
如果你的 state 变量是一个对象时，请记住，你不能只更新其中的一个字段 而不显式复制其他字段。例如，在上面的例子中，你不能写成 setPosition({ x: 100 })，因为它根本就没有 y 属性! 相反，如果你想要仅设置 x，则可执行 setPosition({ ...position, x: 100 })，或将它们分成两个 state 变量，并执行 setX(100)。
- 避免矛盾的 state
```jsx
场景 1：简单场景（年龄与是否成年）
① 有矛盾的原始代码（问题版）
jsx
import { useState } from 'react';

function UserAge() {
  // 核心state：age
  const [age, setAge] = useState(17);
  // 冗余state：isAdult（可由age推导），这是矛盾根源
  const [isAdult, setIsAdult] = useState(false);

  const increaseAge = () => {
    const newAge = age + 1;
    setAge(newAge);
    // 手动同步，容易忘记或出错
    // setIsAdult(newAge >= 18);
  };

  return (
    <div>
      <p>年龄：{age}</p>
      <p>是否成年：{isAdult ? '是' : '否'}</p>
      <button onClick={increaseAge}>增加年龄</button>
    </div>
  );
}
```
② 改造步骤（按三步法来）
**识别**：核心 state 是age，冗余 state 是isAdult（isAdult = age >= 18）。
**移除冗余 state**：删除const [isAdult, setIsAdult] = useState(false);，替换为const isAdult = age >= 18;。
**简化更新逻辑**：删除setIsAdult(newAge >= 18);，只保留更新age的逻辑。
③ 改造后的无矛盾代码
```jsx
import { useState } from 'react';

function UserAge() {
  // 只保留核心state
  const [age, setAge] = useState(17);
  // 派生数据：实时计算，无冗余
  const isAdult = age >= 18;

  const increaseAge = () => {
    // 只更新核心state，逻辑极简
    setAge(age + 1);
  };

  return (
    <div>
      <p>年龄：{age}</p>
      <p>是否成年：{isAdult ? '是' : '否'}</p>
      <button onClick={increaseAge}>增加年龄</button>
    </div>
  );
}
```
- 避免冗余的 state 
如果你能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应该把这些信息放到该组件的 state 中。
这个表单有三个 state 变量：firstName、lastName 和 fullName。然而，fullName 是多余的。在渲染期间，你始终可以从 firstName 和 lastName 中计算出 fullName，因此需要把它从 state 中删除。
```jsx
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```
- 避免重复的 state
```jsx
import { useState } from 'react';

// 初始零食数据
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  // 核心state：仅保留items（列表数据）和selectedId（选中项的id），无重复state
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  // 派生数据：通过selectedId推导选中项，不存储为state（避免重复）
  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              value={item.title}
              {/* 内联更新逻辑，简化handleItemChange函数 */}
              onChange={(e) => {
                setItems(
                  items.map(i => 
                    i.id === item.id ? { ...i, title: e.target.value } : i
                  )
                );
              }}
            />
            {' '}
            <button onClick={() => setSelectedId(item.id)}>Choose</button>
          </li>
        ))}
      </ul>
      {/* 增加可选链保护，避免极端情况（如items为空）报错 */}
      <p>You picked {selectedItem?.title}.</p>
    </>
  );
}
```
**避免深度嵌套的 state**

怎么去解决 
```jsx
import { useState } from 'react';
import { produce } from 'immer'; // 导入Immer的produce函数

function UserInfo() {
  // 保留嵌套state，但用Immer简化更新
  const [user, setUser] = useState({
    name: '张三',
    address: {
      province: '北京',
      city: '北京市',
      details: {
        street: '朝阳路',
        number: '100号'
      }
    }
  });

  // 修改街道：用produce实现“可变”写法，Immer自动处理不可变性
  const changeStreet = () => {
    setUser(
      produce(draft => {
        // draft是草稿对象，可直接修改嵌套属性
        draft.address.details.street = '建国路';
      })
    );
  };

  return (
    <div>
      <p>姓名：{user.name}</p>
      <p>地址：{user.address.province} {user.address.city} {user.address.details.street} {user.address.details.number}</p>
      <button onClick={changeStreet}>修改街道</button>
    </div>
  );
}
```
useImmer是 Immer 团队为 React 开发的专属钩子，它的底层其实就是封装了useState + produce，是一种语法糖。简单来说：
```jsx
// useImmer的底层逻辑（简化版）
import { useState } from 'react';
import { produce } from 'immer';

function useImmer(initialState) {
  const [state, setState] = useState(initialState);
  const setImmerState = (updater) => {
    setState(produce(updater));
  };
  return [state, setImmerState];
}
```
## 在组件间共享状态

有时候，你希望两个组件的状态始终同步更改。要实现这一点，可以将相关 state 从这两个组件上移除，并把 state 放到它们的公共父级，再通过 props 将 state 传递给这两个组件。这被称为“状态提升”，这是编写 React 代码时常做的事。

- 举例说明一下状态提升 
```jsx
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          显示
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel title="关于">
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel title="词源">
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，<i lang="la">Malus sieversii</i> 被认为是现今苹果的祖先。
      </Panel>
    </>
  );
}
这个里面的两个主键没有联系，所以无法共享state
```

你总结的核心思路是完全正确的！可以简化理解为：父组件管状态和状态更新的逻辑（事件），子组件接收这些内容，再通过点击等交互触发对应的事件。不过我们可以把这个过程拆得更精准一点，让你更清晰地对应到代码逻辑中。
更精准的表述：父组件与子组件的分工

1. 父组件的核心工作（“管状态 + 提供更新方法”）
管状态：声明共享状态（比如activeIndex），这是所有子组件需要同步的数据源。
提供更新方法：通过setXxx（比如setActiveIndex）或自定义函数，定义修改状态的逻辑（你说的 “事件” 本质是这个更新逻辑），并通过 props 把 “触发这个逻辑的方法” 传递给子组件。
注意：父组件不直接处理子组件的点击事件，而是提供 “点击后要执行的逻辑”。
2. 子组件的核心工作（“接收 props + 触发事件”）
接收 props：从父组件拿到两个关键内容：
基于共享状态推导的渲染数据（比如isActive，用于决定子组件显示什么）；
父组件提供的状态更新方法（比如onShow，用于触发状态修改）。
触发事件：在用户交互时（比如点击按钮），调用父组件传递的更新方法，间接让父组件修改共享状态。
用代码对应这个分工（一目了然）
```jsx
// 父组件：管状态 + 提供更新方法
function Accordion() {
  // 1. 管状态：声明共享状态
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      {/* 2. 提供更新方法：把isActive（渲染数据）和onShow（更新方法）传给子组件 */}
      <Panel 
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)} // 这是父组件提供的更新逻辑
        title="关于"
      >
        阿拉木图人口约200万...
      </Panel>
      <Panel 
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
        title="词源"
      >
        这个名字来自于 алма...
      </Panel>
    </>
  );
}

// 子组件：接收props + 触发事件
function Panel({ isActive, onShow, title, children }) {
  return (
    <section>
      <h3>{title}</h3>
      {/* 1. 接收props：用isActive决定渲染内容 */}
      {isActive ? (
        <p>{children}</p>
      ) : (
        // 2. 触发事件：点击按钮时调用父组件的onShow方法
        <button onClick={onShow}>显示</button>
      )}
    </section>
  );
}
```