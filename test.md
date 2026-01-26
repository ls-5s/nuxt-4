# ts 准备
##  安装编译TS的工具包
- **问题**：为什么要安装编译TS的工具包？
- **回答**：Node.js/浏览器，只认识JS代码，不认识TS代码。需要先将TS代码转化为JS代码，然后才能运行。
- **安装命令**：`npm i -g typescript`。
- **typescript包**：用来编译TS代码的包，提供了`tsc`命令，实现了TS -> JS的转化。
- **验证是否安装成功**：`tsc -v`（查看typescript的版本）。
## 编译并运行TS代码
1. 创建 `hello.ts` 文件（注意：TS 文件的后缀名为 `.ts`）。
2. 将 TS 编译为 JS：在终端中输入命令 `tsc hello.ts`（此时，在同级目录中会出现一个同名的 JS 文件）。
3. 执行 JS 代码：在终端中输入命令 `node hello.js`。

**说明**：所有合法的 JS 代码都是 TS 代码，有 JS 基础只需要学习 TS 的类型即可。
**注意**：由 TS 编译生成的 JS 文件，代码中就没有类型信息了。

## 简化运行TS的步骤
- **问题描述**：每次修改代码后，都要重复执行两个命令，才能运行TS代码，太繁琐。
- **简化方式**：使用 `ts-node` 包，直接在 Node.js 中执行 TS 代码。
- **安装命令**：`npm i -g ts-node`（`ts-node` 包提供了 `ts-node` 命令）。
- **使用方式**：`ts-node hello.ts`。
- **解释**：`ts-node` 命令在内部偷偷的将 TS -> JS，然后，再运行 JS 代码

首先，全局安装 nodemon：
```bash
npm i -g nodemon
```
也可以使用 `nodemon hello.ts`
# 基础数据类型
```ts
// 原始类型
let age:number = 18
let myname:string = '张三'
let ismale:boolean = true
let sex:symbol = Symbol('男')
let info:null = null
let info2:undefined = undefined
```
# 数组类型
```ts
let arr:number[] = [1,2,3]
let arr2:string[] = ['a','b','c']
let arr3:boolean[] = [true,false,true]
```
# 联合类型
```ts

// 添加小括号，表示: 首先是数组，然后，这个数组中能够出现 number 或 string 类型的元素
let arr5: (number | string)[] = [1, 3, 5, 'a', 'b']
// 不添加小括号，表示: arr1 既可以是 number 类型，又可以是 string[]
 // 类型别名
type MyType = (number | string)[]
let arr5:MyType = [1,2,3,'a','b']
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

函数的可选参数
可选参数定义方式：在可传可不传的参数名称后面添加 ?（问号）
规则约束：可选参数只能出现在参数列表的最后，即可选参数后面不能再出
现必选参数 ，用于辅助理解 TypeScript 里函数参数类型定义中 “
单独指定参数和返回值的类型” 
场景里，对参数类型（尤其是可选参数）的规范用法 。
const getInfo = (name: string, age?: number): void => {
    console.log(name, age)
}

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
// 对象的可选属性，规则和上面一样
let person2:{name:string,age?:number} = {
    name:'张三'
}
```
# 接口
```ts
interface op {
    name:string,
    age?:number
}
let person3:op = {
    name:'张三',
    age:18
}
// 接口的可选属性
type op2 ={
    name:string,
    age?:number
}
let person4:op2 = {
    name:'张三',
    age:18
}

接口的继承

interface op {
    name:string,
    age?:number
}
interface op2 extends op {
    sex:string
}
let person5:op2 = {
    name:'张三',
    age:18,
    sex:'男'
}
```
# 元组类型
```ts
元组类型
const arr10: [number, string] = [1, 'a']
类型推论
声明变量并初始化时；
决定函数返回值时。

let xx = 18
const sum  = (x:number,y:number) => {
    return x + y
}
console.log(sum(1,2))


// 类型断言
const box = document.querySelector('.box') as HTMLDivElement; 
console.log(box)

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

**解释**：
1. `str1` 是一个变量（`let`），它的值可以是任意字符串，所以类型为：`string`。
2. `str2` 是一个常量（`const`），它的值不能变化，只能是 `'Hello TS'`，所以，它的类型为：`'Hello TS'`。

**注意**：此处的 `'Hello TS'`，就是一个字面量类型。也就是说某个特定的字符串也可以作为 TS 中的类型。除字符串外，任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用。
```ts
let a = 10 
console.log(typeof a)
const c:'hello' = 'hello'
const b = 'hello'
// console.log( typeof b)
const a = (xx:'up'|'down'|'left'|'right') => {
  console.log(xx)
}
a('up')
```
# 枚举类型
枚举的功能类似于字面量类型 + 联合类型组合的功能，也可以表示一组明确的可选值。

枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个。
```ts
enum Direction { Up, Down, Left, Right }

function changeDirection(direction: Direction) {
  console.log(direction)
}
```
解释：
使用 enum 关键字定义枚举。
约定枚举名称、枚举中的值以大写字母开头。
枚举中的多个值之间通过 ,（逗号）分隔。
定义好枚举后，直接使用枚举名称作为类型注解。
```ts
// 1. 数字枚举：未设置初始值，成员从 0 开始自动递增（Red=0, Green=1, Blue=2）
enum Color {
    Red,
    Green,
    Blue
}

// 2. 数字枚举：指定首个成员初始值，后续成员自动递增（Up=10, Down=11, Left=12, Right=13）
enum DirectionWithAutoIncrement {
    Up = 10,
    Down,
    Left,
    Right
}

// 3. 数字枚举：所有成员手动设置独立数值（无自动递增）
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

// 5. any 类型：关闭 TypeScript 类型检查，变量可自由赋值为任意类型
let anyTypeVar: any = 18; // 初始赋值为 number 类型 18
// 后续可随意修改类型（如 anyTypeVar = 'Hello' 或 anyTypeVar = true，TS 均不报错）

// 打印变量的运行时类型（typeof 是 JavaScript 操作符，返回值的原始类型字符串）
console.log(typeof anyTypeVar); // 此时变量值为 18，运行时输出 'number'
```
# typeof 
众所周知，JS 中提供了 `typeof` 操作符，用来在 JS 中获取数据的类型。
```javascript
console.log(typeof "Hello world") // 打印 string
```
实际上，TS 也提供了 `typeof` 操作符：可以在**类型上下文**中引用变量或属性的类型（类型查询）。

**使用场景**：根据已有变量的值，获取该值的类型，来简化类型书写。

```typescript
let p = { x: 1, y: 2 }
function formatPoint(point: { x: number; y: number }) {}
formatPoint(p)

function formatPoint(point: typeof p) {}
```

**解释**：
1. 使用 `typeof` 操作符来获取变量 `p` 的类型，结果与第一种（对象字面量形式的类型）相同。
2. `typeof` 出现在**类型注解的位置**（参数名称的冒号后面）所处的环境就在类型上下文（区别于 JS 代码）。
3. 注意：`typeof` 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）。
# class 
## 基本使用

**实例属性初始化**：
```typescript
class Person {
  age: number
  gender = '男'
  // gender: string = '男'
}
const p = new Person()
p.age 
p.gender 
console.log(p)
```

**解释**：
1. 声明成员 `age`，类型为 `number`（没有初始值）。
2. 声明成员 `gender`，并设置初始值，此时，可省略类型注解（TS 类型推论为 `string` 类型）。
   
## class 的构造函数
```ts

// 1. 定义 Person 类（面向对象编程中的“对象蓝图”，描述实例的属性结构）
class Person {
    // 2. 声明类的实例属性，并指定类型（TypeScript 静态类型约束）
    // age：存储年龄，类型为 number（数字）
    age: number;
    // gender：存储性别，类型为 string（字符串）
    gender: string;

    // 3. 构造函数（constructor）：创建类的实例时自动执行，用于初始化实例属性
    // 参数 age：接收外部传入的年龄值，类型约束为 number
    // 参数 gender：接收外部传入的性别值，类型约束为 string
    constructor(age: number, gender: string) {
        // 4. 用 this（代表当前创建的实例）将构造函数参数赋值给实例属性
        // 确保实例创建后，age 属性有合法的 number 类型值
        this.age = age;
        // 确保实例创建后，gender 属性有合法的 string 类型值
        this.gender = gender;
    }
}

// 5. 创建 Person 类的实例 p（用 new 关键字调用构造函数）
// 传入参数 18（age，符合 number 类型）和 '男'（gender，符合 string 类型）
// 此时构造函数执行，p 的 age 被初始化为 18，gender 被初始化为 '男'
const p = new Person(18, '男');

// 6. 打印实例 p（控制台会显示实例的类名及所有属性值）
// 输出结果类似：Person { age: 18, gender: '男' }
console.log(p);
```
## class 实例方法
```ts
class op {
    x = 1
    y =2
    add(n:number) {
        this.x *= n
        this.y *= n
    }
}
const o = new op()
o.add(2)
console.log(o)
```
### extends
类继承有两种方式：
1. `extends`（继承父类）。
2. `implements`（实现接口）。

```typescript
class Animal {
  move() { console.log('Moving along!') }
}
class Dog extends Animal {
  bark() { console.log('汪！') }
}
const dog = new Dog()
```

1. 通过 `extends` 关键字实现继承。
2. 子类 `Dog` 继承父类 `Animal`，则 `Dog` 的实例对象 `dog` 就同时具有了父类 `Animal` 和子类 `Dog` 的所有属性和方法。

### implements

```typescript
interface Singable {
  sing(): void
}
class Person implements Singable {
  sing() {
    console.log('你是我的小呀小苹果儿')
  }
}
```

1. 通过 `implements` 关键字让类实现接口。
2. `Person` 类实现接口 `Singable` 意味着，`Person` 类中必须提供 `Singable` 接口中指定的所有方法和属性。
## class 类的可见性修饰符
类成员可见性：可以使用 TS 来控制 class 的方法或属性对于 class 外的代码是否可见。
可见性修饰符包括：1 public（公有的）2 protected（受保护的）3 private（私有的）。
### public
默认的写不写都可以
### protected
`protected` 表示受保护的，仅对其声明所在类和子类中（非实例对象）可见。


```typescript
class Animal {
  protected move() { console.log('Moving along!') }
}
class Dog extends Animal {
  bark() {
    console.log('汪！')
    this.move()
  }
}
const dog = new Dog()
dog.bark()
// 打印 汪！
// 打印 Moving along!
```
1. 在类属性或方法前面添加 `protected` 关键字，来修饰该属性或方法是受保护的。
2. 在子类的方法内部可以通过 `this` 来访问父类中受保护的成员，但是，对实例不可见！

### private
`private` 表示私有的，仅对其声明所在类可见。
```ts
class op {
    private move(){console.log('xxxx')}
    work() {
        this.move()
    }
}
```
在类属性或方法前面添加 private 关键字，来修饰该属性或方法是私有的。
私有的属性或方法只在当前类中可见，对子类和实例对象也都是不可见的！
# 类型兼容性
## 对象之间

在结构化类型系统中，“两个对象形状相同就属于同一类型”的说法不准确。**更准确的规则**：对于对象类型，若 `y` 的成员至少与 `x` 相同，则 `x` 兼容 `y`（成员多的可以赋值给成员少的）。

```typescript
class Point { x: number; y: number }
class Point3D { x: number; y: number; z: number }
const p: Point = new Point3D()
```
1. `Point3D` 的成员至少与 `Point` 相同，因此 `Point` 兼容 `Point3D`。
2. 所以，成员多的 `Point3D` 可以赋值给成员少的 `Point`。

## 函数类型兼容性
函数之间的兼容性较复杂，需考虑：1 参数个数 2 参数类型 3 返回值类型。

参数少的可以赋值给参数多的。

```typescript
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void
let f1: F1
let f2: F2 = f1
```
 数组 `forEach` 回调的兼容性示例
```typescript
const arr = ['a', 'b', 'c']
arr.forEach(() => {})
arr.forEach((item) => {})
```
可以赋值给参数多的，所以 `f1` 可以赋值给 `f2`。
2. 数组 `forEach` 方法的第一个参数是回调函数，该示例中类型为：`(value: string, index: number, array: string[]) => void`。
3. 在 JS 中省略用不到的函数参数很常见，这种使用方式促成了 TS 中函数类型之间的兼容性。
4. 且因为回调函数是有类型的，所以 TS 会自动推导出参数 `item`、`index`、`array` 的类型。

# 交叉类型
交叉类型（&）和接口继承（extends）的对比
相同点：都可以实现对象类型的组合。
不同点：两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同。
代码示例与说明
接口继承（extends）：
```typescript
interface A {
  fn: (value: number) => string
}
interface B extends A {
  fn: (value: string) => string
}
```

接口继承会报错（类型不兼容）。
交叉类型（&）：
```typescript
interface A {
  fn: (value: number) => string
}
interface B {
  fn: (value: string) => string
}
type C = A & B
```

交叉类型没有错误，可简单理解为 fn 的类型是 (value: string | number) => string。

# 泛型
## 泛型基本使用

```typescript
function id<Type>(value: Type): Type { return value }
const num = id<number>(10)
const str = id<string>('a')
```
解释：
1. 语法：在函数名称的后面添加 `<>`（尖括号），尖括号中指定具体的类型，比如，此处的 `number`。
2. 当传入类型 `number` 后，这个类型就会被函数声明时指定的类型变量 `Type` 捕获到。
3. 此时，`Type` 的类型就是 `number`，所以，函数 `id` 参数和返回值的类型也都是 `number`。

同样，如果传入类型 `string`，函数 `id` 参数和返回值的类型就都是 `string`。

这样，通过泛型就做到了让 `id` 函数与多种不同的类型一起工作，实现了复用的同时保证了类型安全。

## 简化泛型的使用
```ts
const a = <Type>(value: Type): Type => {
    return value
}
let B = a(10)
```

## 泛型约束

添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型 2 添加约束。

1. **指定更加具体的类型**
```typescript
function id<Type>(value: Type[]): Type[] {
  console.log(value.length)
  return value
}
```
比如，将类型修改为 `Type[]`（`Type` 类型的数组），因为只要是数组就一定存在 `length` 属性，因此就可以访问了。

## 泛型约束 (extends)
添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型 2 添加约束。

2. **添加约束**
```typescript
interface ILength { length: number }
function id<Type extends ILength>(value: Type): Type {
  console.log(value.length)
  return value
}
```
解释：
1. 创建描述约束的接口 `ILength`，该接口要求提供 `length` 属性。
2. 通过 `extends` 关键字使用该接口，为泛型（类型变量）添加约束。
3. 该约束表示：传入的类型必须具有 `length` 属性。

注意：传入的实参（比如，数组）只要有 `length` 属性即可，这也符合前面讲到的接口的类型兼容性。

## 多个泛型约束
比如，创建一个函数来获取对象中属性的值：
```typescript
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
let person = { name: 'jack', age: 18 }
getProp(person, 'name')
```
解释：
1. 添加了第二个类型变量 `Key`，两个类型变量之间使用 `,` 逗号分隔。
2. `keyof` 关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型。
3. 本示例中 `keyof Type` 实际上获取的是 `person` 对象所有键的联合类型，也就是：`'name'|'age'`。
4. 类型变量 `Key` 受 `Type` 约束，可以理解为：`Key` 只能是 `Type` 所有键中的任意一个，或者说只能访问对象中存在的属性。

## 泛型接口
接口也可以配合泛型来使用，以增加其灵活性，增强其复用性。

代码示例：
```typescript
interface IdFunc<Type> {
  id: (value: Type) => Type
  ids: () => Type[]
}
let obj: IdFunc<number> = {
  id(value) { return value },
  ids() { return [1, 3, 5] }
}
```

解释：
1. 在接口名称的后面添加 `<类型变量>`，那么，这个接口就变成了泛型接口。
2. 接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量。
3. 使用泛型接口时，需要显式指定具体的类型（比如，此处的 `IdFunc<number>`）。
4. 此时，`id` 方法的参数和返回值类型都是 `number`；`ids` 方法的返回值类型是 `number[]`。
## 创建泛型类

**代码示例（泛型类定义）：**
```typescript
class GenericNumber<NumType> {
  defaultValue: NumType
  add: (x: NumType, y: NumType) => NumType
}
```

**解释：**
1. 类似于泛型接口，在 `class` 名称后面添加 `<类型变量>`，这个类就变成了泛型类。
2. 此处的 `add` 方法，采用的是**箭头函数形式**的类型书写方式。


**代码示例（泛型类实例化）：**
```typescript
const myNum = new GenericNumber<number>()
myNum.defaultValue = 10
```

**说明：**
类似于泛型接口，在创建 `class` 实例时，可在类名后面通过 `<具体类型>` 来指定明确的类型。


### 泛型工具类型 - `Partial<Type>`
`Partial<Type>` 用来构造（创建）一个类型，将 `Type` 的所有属性设置为可选。

**代码示例：**
```typescript
interface Props {
  id: string
  children: number[]
}
type PartialProps = Partial<Props>
```

**解释：**
构造出来的新类型 `PartialProps` 结构和 `Props` 相同，但所有属性都变为可选的。


### 泛型工具类型 - `Readonly<Type>`
`Readonly<Type>` 用来构造一个类型，将 `Type` 的所有属性都设置为 `readonly`（只读）。



```typescript
// 定义原始接口
interface Props {
  id: string
  children: number[]
}

// 构造只读类型
type ReadonlyProps = Readonly<Props>
```


构造出的新类型 `ReadonlyProps`，结构与 `Props` 完全相同，但**所有属性都变为只读**。



```typescript
let props: ReadonlyProps = { id: '1', children: [] }
props.id = '2' // 报错：无法分配到 "id"，因为它是只读属性。
```
当尝试给只读属性重新赋值时，TypeScript 会报错，保证属性的只读性。

### 泛型工具类型 - `Pick<Type, Keys>`
`Pick<Type, Keys>` 的作用是：从指定的 `Type` 类型中，选择**一组属性**来构造一个新类型。

```typescript
// 原始接口（包含多个属性）
interface Props {
  id: string;
  title: string;
  children: number[];
}

// 从 Props 中选择 id 和 title 属性，构造新类型 PickProps
type PickProps = Pick<Props, 'id' | 'title'>;
```

1. **两个类型变量的职责**：
   `Pick` 接收两个类型变量：
   - 第一个 `Type`：表示“从哪个类型中选择属性”（示例中是 `Props`）。
   - 第二个 `Keys`：表示“要选择哪些属性”（示例中是 `'id' | 'title'`，即“id 或 title”的联合类型）。

2. **单个属性的简化写法**：
   如果只需要选择**一个属性**，直接传入该属性名即可，例如：`Pick<Props, 'id'>`。

3. **属性的合法性约束**：
   第二个类型变量 `Keys` 中传入的属性名，**必须是第一个类型变量 `Type` 中已经存在的属性**（否则 TypeScript 会报错，保证选择的属性是合法的）。

4. **构造的新类型结构**：
   最终构造出的新类型（示例中是 `PickProps`），只会包含被选中的属性及其类型。因此 `PickProps` 的结构等价于：
   ```typescript
   interface PickProps {
     id: string;
     title: string;
   }
   ```
### 泛型工具类型 - `Record<Keys, Type>`

`Record<Keys, Type>` 用于构造一个对象类型，其中**属性键为 `Keys`**，**属性值的类型为 `Type`**。


```typescript
// 定义泛型类型：属性键为 'a' | 'b' | 'c'，属性值类型为 string[]
type RecordObj = Record<'a' | 'b' | 'c', string[]>;

// 创建符合该类型的对象
let obj: RecordObj = {
  a: ['1'],
  b: ['2'],
  c: ['3']
};
```


1. `Record` 工具类型包含**两个类型变量**：
   - 第一个变量：指定对象“有哪些属性”（示例中为 `'a' | 'b' | 'c'`）。
   - 第二个变量：指定对象“属性值的统一类型”（示例中为 `string[]`）。
2. 示例中构造的 `RecordObj` 类型表示：该对象必须包含 `a`、`b`、`c` 三个属性，且每个属性的值都必须是 `string[]` 类型。

# 类型声明文件
## TS 中有两种文件类型：`.ts` 文件、`.d.ts` 文件。

1. `.ts` 文件
- 既包含类型信息又可执行代码。
- 可以被编译为 `.js` 文件，然后执行代码。
- 用途：编写程序代码的地方。


2. `.d.ts` 文件
- 只包含类型信息的**类型声明文件**。
- 不会生成 `.js` 文件，仅用于提供类型信息。
- 用途：为 JS 提供类型信息。


总结
- `.ts` 是 **implementation（代码实现文件）**；
- `.d.ts` 是 **declaration（类型声明文件）**。
- 若要为 JS 库提供类型信息，需使用 `.d.ts` 文件。

结合你之前学习的 Tailwind 知识点（宽高、边距、文本、边框等），我把核心的**语义化类按功能分类总结**，每个类都说明「语义含义」「默认数值（方便理解）」和「核心用途」，同时标注你产品卡片案例中用到的类，方便对照记忆：

### 核心原则回顾
语义化类 = 「功能/层级/视觉效果」命名（而非固定数字），比如 `text-base` 是「正文基础层级」，而非「16px」；`mx-auto` 是「水平居中」，而非「margin-left: auto」。

---

## 一、尺寸类（宽/高/最小/最大尺寸）
核心：用「比例/层级/场景」命名，而非固定 px
| 语义化类          | 默认数值/对应 CSS        | 语义含义              | 用途（案例中使用）                                            |
| ----------------- | ------------------------ | --------------------- | ------------------------------------------------------------- |
| `w-full`          | width: 100%              | 宽度占满父容器        | 产品卡片小屏宽度（`w-full`）                                  |
| `w-1/2`/`w-1/3`   | width: 50%/33.333%       | 宽度为父容器的1/2/1/3 | 产品卡片大屏宽度（`md:w-1/3`）                                |
| `w-screen`        | width: 100vw             | 宽度占满屏幕          | 适配全屏容器                                                  |
| `size-48`         | w-48 + h-48 = 12rem      | 宽高相等（正方形）    | 产品图片区（`size-48`）                                       |
| `min-w-xs`        | min-width: 20rem (320px) | 最小宽度xs级          | 按钮最小宽度（案例中用了`min-w-[100px]`，预设类是`min-w-xs`） |
| `max-w-screen-lg` | max-width: 1024px        | 最大宽度大屏级        | 页面主容器（`max-w-screen-lg`）                               |
| `max-w-prose`     | max-width: 65ch          | 正文最佳阅读宽度      | 标题说明文本（`max-w-prose`）                                 |

## 二、间距类（外边距/内边距/空间间隔）
核心：用「方向+层级」命名，步长 0.25rem（4px）
| 语义化类                | 默认数值/对应 CSS       | 语义含义              | 用途（案例中使用）                                                    |
| ----------------------- | ----------------------- | --------------------- | --------------------------------------------------------------------- |
| `mx-auto`               | margin-left/right: auto | 水平居中              | 页面主容器/文本块居中（`mx-auto`）                                    |
| `mt-8`/`mb-8`           | margin-top/bottom: 2rem | 上下外边距8级（32px） | 底部备注上间距（`mt-8`）、标题区下间距（`mb-8`）                      |
| `px-4`/`py-8`           | padding-x/y: 1rem/2rem  | 水平/垂直内边距       | 页面主容器左右内边距（`px-4`）、body上下内边距（`py-8`）              |
| `p-4`                   | padding: 1rem           | 四方向内边距          | 产品信息区（`p-4`）                                                   |
| `space-y-3`/`space-x-6` | 子元素垂直/水平间距     | 容器内子元素间距      | 产品信息区垂直间距（`space-y-3`）、卡片列表水平间距（`md:space-x-6`） |

## 三、文本类（字号/字重/行高/对齐）
核心：用「层级/视觉效果」命名，贴合文本功能
| 语义化类             | 默认数值/对应 CSS   | 语义含义           | 用途（案例中使用）                          |
| -------------------- | ------------------- | ------------------ | ------------------------------------------- |
| `text-sm`            | font-size: 0.875rem | 小字号（辅助文本） | 底部备注（`text-sm`）                       |
| `text-base`          | font-size: 1rem     | 基础字号（正文）   | 产品描述/标题说明（`text-base`）            |
| `text-xl`/`text-2xl` | 1.25rem/1.5rem      | 大字号（标题）     | 产品名称（`text-xl`）、主标题（`text-2xl`） |
| `font-light`         | font-weight: 300    | 轻字重（弱化层级） | 标题说明/底部备注（`font-light`）           |
| `font-normal`        | font-weight: 400    | 常规字重（正文）   | 产品描述（`font-normal`）                   |
| `font-bold`          | font-weight: 700    | 粗字重（强调）     | 产品名称/价格（`font-bold`）                |
| `font-black`         | font-weight: 900    | 极粗字重（主标题） | 页面主标题（`font-black`）                  |
| `leading-relaxed`    | line-height: 1.625  | 宽松行高（正文）   | 产品描述/标题说明（`leading-relaxed`）      |
| `text-center`        | text-align: center  | 文本居中           | 标题区/底部备注（`text-center`）            |
| `text-justify`       | text-align: justify | 文本两端对齐       | 产品描述/标题说明（`text-justify`）         |

## 四、颜色类（背景/文本/边框）
核心：用「色系+明度」命名，而非十六进制/ rgb
| 语义化类          | 语义含义              | 用途（案例中使用）                |
| ----------------- | --------------------- | --------------------------------- |
| `bg-gray-50`      | 浅灰色背景（灰度50）  | 页面背景（`bg-gray-50`）          |
| `bg-white`        | 白色背景              | 产品卡片背景（`bg-white`）        |
| `text-gray-900`   | 深灰色文本（灰度900） | 主标题（`text-gray-900`）         |
| `text-gray-600`   | 中灰色文本（灰度600） | 产品描述（`text-gray-600`）       |
| `text-red-500`    | 红色文本（红色500）   | 产品价格（`text-red-500`）        |
| `bg-blue-500/90`  | 蓝色背景+90%透明度    | 按钮背景（`bg-blue-500/90`）      |
| `border-gray-200` | 浅灰色边框（灰度200） | 产品卡片边框（`border-gray-200`） |

## 五、边框类（宽度/圆角/样式）
核心：用「视觉效果/层级」命名
| 语义化类       | 默认数值/对应 CSS       | 语义含义           | 用途（案例中使用）            |
| -------------- | ----------------------- | ------------------ | ----------------------------- |
| `border`       | border-width: 1px       | 1px边框            | 产品卡片边框（`border`）      |
| `border-2`     | border-width: 2px       | 2px粗边框          | 第二个产品卡片（`border-2`）  |
| `rounded-lg`   | border-radius: 0.5rem   | 大圆角（8px）      | 产品卡片/按钮（`rounded-lg`） |
| `rounded-md`   | border-radius: 0.375rem | 中等圆角（6px）    | 底部备注（`rounded-md`）      |
| `rounded-full` | 圆形圆角（9999px）      | 圆形元素（如头像） | -                             |

## 六、布局/交互类
核心：用「布局逻辑/交互效果」命名
| 语义化类          | 语义含义               | 用途（案例中使用）                         |
| ----------------- | ---------------------- | ------------------------------------------ |
| `flex`            | 开启弹性布局           | 产品卡片列表/图片区/价格按钮容器（`flex`） |
| `flex-wrap`       | 弹性元素自动换行       | 产品卡片列表（`flex-wrap`）                |
| `justify-center`  | 水平居中（flex子元素） | 产品卡片列表/图片区（`justify-center`）    |
| `justify-between` | 两端对齐（flex子元素） | 价格+按钮容器（`justify-between`）         |
| `items-center`    | 垂直居中（flex子元素） | 图片区/价格按钮容器（`items-center`）      |
| `shadow-sm`       | 轻微阴影               | 产品卡片（`shadow-sm`）                    |
| `hover:shadow-md` | 悬浮时中等阴影         | 产品卡片悬浮效果（`hover:shadow-md`）      |
| `transition`      | 过渡动画               | 卡片悬浮效果（`transition`）               |

## 七、响应式前缀（语义化断点）
核心：用「设备场景」命名，而非固定宽度
| 前缀  | 对应宽度        | 语义含义       | 用途（案例中使用）                      |
| ----- | --------------- | -------------- | --------------------------------------- |
| `md:` | ≥768px（平板）  | 大屏设备生效   | `md:w-1/3`/`md:text-3xl`/`md:space-x-6` |
| `lg:` | ≥1024px（电脑） | 超大屏设备生效 | 可扩展（如`lg:text-4xl`）               |

---

### 语义化类使用核心原则
1. **优先使用**：常规场景（正文、间距、边框、颜色）都用语义化类，比如正文用`text-base`，间距用`mx-4`；
2. **数字兜底**：仅当数值不在预设内时用数字写法（如`max-w-[350px]`/`min-w-[100px]`）；
3. **贴合场景**：根据元素功能选类，比如标题用`font-bold`/`text-xl`，正文用`font-normal`/`leading-relaxed`；
4. **响应式优先**：用`md:`/`lg:`等断点前缀，而非固定宽度，适配不同设备。

这份总结覆盖了你产品卡片案例中所有核心语义化类，也是真实项目中最常用的 Tailwind 语义化类集合，记熟这些就能应对 90% 以上的开发场景。