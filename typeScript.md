# 基础数据类型
```ts
// 原始类型
let age:number = 18
let myname:string = '张三'
let ismale:boolean = true
let sex:symbol = Symbol('男')
let info:null = null
let info2:undefined = undefined

可以省略但是，如果只声明不赋值，
要加类型，否则会报错
```
# 数组
```ts
// 数组类型
let nums: number[] = [1, 2, 3, 4];
// 写法2：Array<类型>（泛型写法，后续会讲）
let fruits: Array<string> = ["苹果", "香蕉", "橙子"];

``` 
## 元组（tuple)
解释：固定长度 + 固定类型的数组，超出长度的元素会遵循 “联合类型” 规则（新手暂时记住 “固定长度” 即可）。
核心作用：适用于明确知道元素数量和类型的场景（如坐标、键值对）。
```ts
let user: [string, number] = ["李四", 25];
```
#  联合类型
```ts
// 联合类型
let id: number | string = 123;
id = "abc";
let a Array<number | string> = [1, 2, "3"];
let b: Array<number | string> = [1, "2", 3];
```
# 类型别名
```ts
// 类型别名
type ID = number | string;
let id: ID = 123;
id = "abc";
type cc = Array<number | string>;
let c: cc = [1, 2, "3"];
```
# 函数类型
```ts
函数类型 （1 单独指定参数和返回值的类型）
const arr8 = (x:number,y:number):number => {
    return x + y
}
console.log(arr8(1,2))
// 函数类型 （2  同时指定参数和返回值的类型）
const arr9:(x:number,y:number) => number = (x,y) => {
    return x + y
}
console.log(arr9(1,2))


// 函数的void类型
const greet = (name: string): void => {
    console.log('Hello', name)
}
type add = (x: number, y: number) => number
const add: add = (x, y) => { return x + y}
``` 
1. 可选参数（?）
参数后加?表示可选，必须放在必选参数之后，类型定义中只需标注?，无需写默认值（默认值在函数实现时定义）。
```ts
// 定义：name必选，age可选，返回string
type GreetFn = (name: string, age?: number) => string;

// 实现（age可选，可加默认值）
const greet: GreetFn = (name, age = 18) => {
  return age ? `你好${name}，今年${age}岁` : `你好${name}`;
};

// 调用测试
console.log(greet("张三")); // 输出：你好张三，今年18岁
console.log(greet("李四", 25)); // 输出：你好李四，今年25岁
```
# 对象类型
```ts
// 对象类型
let person:{name:string,age:number,greet(name:string):void} = {
    name:'张三',
    age:18,
    greet(name:string){
        console.log('你好',name)
    }
}
```
#  接口
```ts
// 接口
interface op {
    name:string,
    age?:number
}
interface 子接口 extends 父接口1, 父接口2 {}
interface op2 extends op {
    sex:string
}
let person5:op2 = {
    name:'张三',
    age:18,
    sex:'男'
}
```
：约束加法函数
```ts
// 定义函数接口：两个number参数，返回number
interface AddFn {
  (a: number, b: number): number;
}

// 实现函数（必须匹配接口）
const add: AddFn = (a, b) => a + b;
console.log(add(2, 3)); // 输出：5

// 错误示例：返回值类型不匹配
// const addError: AddFn = (a, b) => `${a}+${b}=${a+b}`; // TS报错：string不能赋值给number
```
- 接口进阶：核心特性（高频实战）
声明合并（接口独有的核心优势）
```ts
// 第一个User接口（基础属性）
interface User {
  id: number;
  name: string;
}

// 第二个User接口（补充属性，自动合并）
interface User {
  age?: number;
  gender: string;
}

// 使用：合并后的接口包含所有属性
const user: User = {
  id: 1,
  name: "张三",
  gender: "男" // 新增的属性
};
```
# 字面量类型

思考以下代码，两个变量的类型分别是什么？
```typescript
let str1 = 'Hello TS'
const str2 = 'Hello TS'
```
通过 TS 类型推论机制，可得到答案：
1. 变量 `str1` 的类型为：`string`。
2. 变量 `str2` 的类型为：`'Hello TS'`。

# 枚举类型
```ts
enum Gender { Male, Female }

function changeDirection(direction: Direction) {
  console.log(direction)
}
// ✅ 合法：传入 Gender 枚举成员
changeDirection(Gender.Male);   // 控制台输出 0（Gender.Male 的值）
changeDirection(Gender.Female); // 控制台输出 1（Gender.Female 的值）
```
```ts
enum DirectionWithManualNum {
    Up = 2,
    Down = 4,
    Left = 8,
    Right = 16
}

// 函数：参数类型注解为数字枚举 DirectionWithManualNum，仅允许传入该枚举的成员
function changeDirection(direction: DirectionWithManualNum) {
    console.log(direction); // 打印枚举成员对应的数值（如传入 DirectionWithManualNum.Up 则输出 2）
}
// 调用函数：传入枚举成员，确保类型安全
changeDirection(DirectionWithManualNum.Up);

// 4. 字符串枚举：所有成员必须手动设置字符串值（无自动赋值逻辑）
enum DirectionWithString {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

// 箭头函数：参数类型注解为字符串枚举 DirectionWithString
const logDirection = (xx: DirectionWithString) => {
    console.log(xx); // 打印枚举成员对应的字符串（如传入 DirectionWithString.Up 则输出 'UP'）
}
// 调用箭头函数：传入字符串枚举成员
logDirection(DirectionWithString.Up);
```
# & 
# 泛型
1. 核心概念
泛型通过 <T>（T 是类型变量，可自定义名称如 U/V）声明，相当于「类型的占位符」，调用时可以指定具体类型（或由 TS 自动推导）。
2. 入门案例 1：通用返回函数（适配单个基本类型）
需求：写一个箭头函数，接收任意基本类型的值，返回该值本身，且类型完全匹配（避免用 any）。
```typescript
运行
// 泛型箭头函数：<T> 声明泛型参数，(value: T) 接收T类型参数，返回值也是T
const identity = <T>(value: T): T => {
  return value;
};

// 调用1：指定泛型类型为 string（基本类型）
const strResult = identity<string>('hello 泛型');
console.log(strResult); // 输出：hello 泛型
// 类型提示：strResult 是 string 类型

// 调用2：TS 自动推导泛型类型为 number（基本类型）
const numResult = identity(123);
console.log(numResult); // 输出：123
// 类型提示：numResult 是 number 类型

// 调用3：自动推导 boolean 类型
const boolResult = identity(true);
console.log(boolResult); // 输出：true
```