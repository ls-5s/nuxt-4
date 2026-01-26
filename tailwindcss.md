# 设置 宽和高
## 宽高
- 预定义数值类（w-数值、h-数值）

通过 w-数值 和 h-数值 就能分别设定宽度和高度，例如：(最大是96)
```html
<div class="w-20 h-20 bg-blue-500">width and height</div>
```
w-1 的 1 表示 0.25 rem，即 4 px，以此类推，w-20 表示 5 rem，即 width: 80px;。同理，h-20 表示 height: 80px; 。

- 手动书写任意值（w-[]、h-[]）
```html
<div class="w-[80px] h-20 bg-blue-500">width and height</div>
<div class="w-[5rem] h-20 bg-blue-500">width and height</div>
<div class="w-[5em] h-20 bg-blue-500">width and height</div>
```

想要更加直观可控，以 width 为例，w-20 实际上等价于：w-[80px] 、w-[5rem]、w-[5em]。

- 百分比（w-分子/分母、h-分子/分母）
```html
<div class="w-1/2 h-20 bg-blue-300">w-1/2</div>
<div class="w-1/3 h-20 bg-blue-300">w-1/3</div>
<div class="w-1/4 h-20 bg-blue-300">w-1/4</div>
<div class="w-2/3 h-20 bg-blue-300">w-2/3</div>
```
- w-full、w-screen

一般来说，占满宽度有两种情况。一个是占据容器的 100% 宽度，一个是占据设备屏幕的 100% 宽度。（另外还有 w-svw、w-lvw、w-dvw）
```html
<div class="w-[500px] border">
	<div class="w-full h-20 bg-blue-100">w-full</div>
	<div class="w-screen h-20 bg-blue-100">w-screen</div>
</div>
```
##  最小/大宽度高度
- 最小宽度高度
min-w-[]、max-w-[]
min-h-[]、max-h-[]
```html
<div class="inline-block min-w-20 h-10 leading-10 bg-green-200 text-center">
  btn
</div>
<br />
<div class="inline-block min-w-20 h-10 leading-10 bg-green-400 text-center">
  button
</div>
<br />
<div class="inline-block min-w-20 h-10 leading-10 bg-green-600 text-center">
  my long text button
</div>
```

max-w-xs	20rem (320px)	小弹窗、小型卡片
max-w-sm	24rem (384px)	中型表单、按钮组
max-w-md	28rem (448px)	普通卡片、表单容器
max-w-lg	32rem (512px)	弹窗、中等内容区块
max-w-xl	36rem (576px)	大弹窗、表单页
max-w-2xl	42rem (672px)	页面内容容器
max-w-prose	65ch（约 65 个字符）	文本阅读容器（最佳行宽）
max-w-full	100%	最大宽度占满父容器
max-w-screen-lg	1024px	最大宽度不超过大屏断点
max-w-[数值]	自定义（如max-w-[600px]）	特殊尺寸需求

## 2.3 size
```html
<div class="w-20 h-20 bg-blue-500">width and height</div>
```
等价于：
```html
<div class="size-20 bg-blue-500">width and height</div>
```
# 边距
外边距、内边距、空间间隔。
## margin
```html
<div class="mr-2 inline bg-red-200">inline1</div>
<div class="mr-2 inline bg-red-300">inline2</div>
<div class="mr-2 inline bg-red-400">inline3</div>
```

以 mr-* 为例，表示右侧的外边距。

其他方位：
m-* 👉 margin: _;
mt-* 👉 margin-top: _;
mb-* 👉 margin-bottom: _;
ml-* 👉 margin-left: _;
mx-* 👉  margin-left: _; margin-right: _;
my-* 👉  margin-top: _; margin-bottom: _;
mx-auto 👉 margin: 0 auto;
##  padding
```html
<div class="px-2 py-2 bg-red-200">padding</div>
```
等价于：
```html
<div class="p-2 bg-red-200">padding</div>
```
以 px-* 为例，表示左右的内边距。
py-* 表示上下的内边距。
其他方位：
p-* 👉 padding: _;
pt-* 👉 padding-top: _;
pb-* 👉 padding-bottom: _;
pl-* 👉 padding-left: _;
pr-* 👉 padding-right: _;
px-* 👉  padding-left: _; padding-right: _;

## space
将 space-x-* 或 space-y-* 写在容器上，用来控制子元素之间的间距。

水平方向排列

```html
<div class="space-x-4">
  <div class="inline-block bg-slate-400">01</div>
  <div class="inline-block bg-slate-500">02</div>
  <div class="inline-block bg-slate-600">03</div>
</div>

```
垂直方向排列

```html
<div class="space-y-4">
  <div class="bg-emerald-300">01</div>
  <div class="bg-emerald-400">02</div>
  <div class="bg-emerald-500">03</div>
</div>
```
# 边框
****线宽、线类型、弧度。
## 线宽 + 颜色
```html
<div class="border border-sky-500 size-10"></div>
<div class="border-2 border-sky-500 size-10"></div>
<div class="border-4 border-sky-500 size-10"></div>
```

通过 border-* 设定线宽，颜色的设置也很简单：border-颜色-数值。

如果想要设定某一方向的边框：border-*-数值

border-t-数值 👉 border-top-width: _;
border-r-数值 👉 border-right-width: _;
border-b-数值 👉 border-bottom-width: _;
border-l-数值 👉 border-left-width: _;
border-x-数值 👉 border-left-width: _; border-right-width: _;
border-y-数值 👉 border-top-width: _; border-right-width: _;
注意 ⚠️：如果不加数值（例如：border-t），表示特定方向上的线宽为 1px。border-0 就是 border-width: 0px;。
## 线类型

border-solid 👉 border-style: solid;
border-dashed 👉 border-style: dashed;
border-dotted 👉 border-style: dotted;
border-double 👉 border-style: double;

## 弧度
rounded 👉 border-radius: 0.25rem; /* 4px */
rounded-md 👉 border-radius: 0.375rem; /* 6px */
rounded-lg 👉 border-radius: 0.5rem; /* 8px */
rounded-full 👉 border-start-start-radius: 9999px; border-end-start-radius: 9999px;

# 文本
## 字体大小
和前述章节类似，有关字体大小的相关使用也可以通过 text-数值、text-[] 的方式进行：
```html
<p class="text-sm">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde officia.
</p>
<p class="text-base">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde officia.
</p>
<p class="text-md">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde officia.
</p>
<p class="text-[16px]">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde officia.
</p>
<p class="text-lg">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde officia.
</p>
<p class="text-xl">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde officia.
</p>
```
## 文本对齐方式
text-left 👉 text-align: left;
text-center 👉 text-align: center;
text-right 👉 text-align: right;
text-justify 👉 text-align: justify;
## 字体斜体与加粗
```html
<p class="italic">Lorem ipsum! -- italic</p>
<p class="font-thin">Lorem ipsum! -- font-weight: 100;</p>
<p class="font-light">Lorem ipsum! -- font-weight: 300;</p>
<p class="font-normal">Lorem ipsum! -- font-weight: 400;</p>
<p class="font-bold">Lorem ipsum! -- font-weight: 700;</p>
<p class="font-black">Lorem ipsum! -- font-weight: 900;</p>
```
# 颜色
颜色在之前的案例中都有接触，主要为：字体颜色、边框颜色、背景颜色、背景渐变色图像。
```html
<p class="text-red-500">Lorem ipsum! -- 文本颜色</p>
<p class="border-2 border-sky-500">Lorem ipsum! -- 边框颜色</p>
<p class="bg-orange-500">Lorem ipsum! -- 背景颜色</p>
<p class="bg-orange-500/75">Lorem ipsum! -- 背景颜色（75% 透明度）</p>
<p class="bg-orange-500/50">Lorem ipsum! -- 背景颜色（50% 透明度）</p>
<div class="bg-gradient-to-r from-purple-500 to-pink-500">
  向右渐变（purple-500 👉 pink-500）
</div>
<div class="bg-gradient-to-l from-transparent to-sky-500">
  向左渐变（sky-500 👈 transparent）
</div>
<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  向右渐变（indigo-500 👉 purple-500 👉 pink-500）
</div>
```
字体、边框、背景、不同透明度的背景颜色都很容易理解。需要提一点的是渐变色，这里需要用 from-颜色A、via-颜色B、to-颜色C 来表示从颜色 A 经过 B，最后过渡到 C 的颜色变化。
.leading-relaxed {
  line-height: 1.625; /* 无单位相对值，基于当前字体大小的 1.625 倍 */
}