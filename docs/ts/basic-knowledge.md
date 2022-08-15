# 基础知识

## 什么是 TypeScript

### TypeScript 是静态类型

类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。**JavaScript** 是一门解释型语言，没有编译阶段，所以它**是动态类型**。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 **TypeScript 是静态类型**，如果类型不正确在编译阶段就会报错

### TypeScript 是弱类型

类型系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型。

以下这段代码不管是在 JavaScript 中还是在 TypeScript 中都是可以正常运行的，运行时数字 `1` 会被隐式类型转换为字符串 `'1'`，加号 `+` 被识别为字符串拼接，所以打印出结果是字符串 `'11'`。

```js
console.log(1 + "1");
// 打印出字符串 '11'
```

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以**它们都是弱类型**。

### TypeScript 的特性

- TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
- TypeScript 是一门静态类型、弱类型的语言。
- TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
- TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
- TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
- TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。

**TypeScript 的特性主要有如下：**

- 「类型批注和编译时类型检查」 ：在编译时批注变量类型
- 「类型推断」：ts 中没有批注变量类型会自动推断变量的类型
- 「类型擦除」：在编译过程中批注的内容和接口会在运行时利用工具擦除
- 「接口」：ts 中用接口来定义对象类型
- 「枚举」：用于取值被限定在一定范围内的场景
- 「Mixin」：可以接受任意类型的值
- 「泛型编程」：写代码时使用一些以后才指定的类型
- 「名字空间」：名字只在该区域内有效，其他区域可重复使用该名字而不冲突
- 「元组」：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组

### TypeScript = ES 提案 + 类型编程

- 预实现的 **ES 提案**，如 装饰器、 可选链`?.`、空值合并运算符`??`，除了部分极端不稳定的语法（如装饰器）以外，大部分的 TS 实现实际上就是未来的 ES 语法。

- **类型编程**，如 `interface`、`T extends SomeType` 这些都属于类型编程的范畴。这一部分对代码实际的功能层面没有任何影响，即使你一行代码十个 `any`，遇到类型错误就 `@ts-ignore`，也不会影响你代码本身的逻辑。

## 数据类型

### void

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数：

```ts
function alertName(): void {
  alert("My name is Tom");
}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`：

```ts
let unusable: void = undefined;
```

### Null 和 Undefined

在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型：

```ts
let u: undefined = undefined;
let n: null = null;
```

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

```ts
//  "strict": false时这样不会报错
let num: number = undefined;
```

### 任意值 any 和 unknown

#### **any**

如果是一个普通类型，在赋值过程中改变**类型**是不被允许的：

```ts
let myFavoriteNumber: string = "seven";
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但如果是 `any` 类型，则允许被赋值为任意类型。

```ts
let myFavoriteNumber: any = "seven";
myFavoriteNumber = 7;
```

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**：

```ts
let something;
something = "seven";
something = 7;

something.setName("Tom");
```

等价于

```ts
let something: any;
something = "seven";
something = 7;

something.setName("Tom");
```

#### unknown

`any` 基本上就是放弃了任何类型检查，通过使用 any，我们破坏了 TypeScript 的能力引起了一些麻烦。没有强制的类型检查，可能会给您带来一些麻烦。

```js
const uncertain: any = "Hello world!";
uncertain.hello();

const dog: any = {
  name: "Fluffy",
  sayHello: () => "woof woof",
};

dog.hello();
```

> any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) ,这导致 any 基本上就是放弃了任何类型检查.

TypeScript 3.0 中引入的 unknown 类型也被认为是 **top type** ，但它更安全。与 any 一样，所有类型都可以分配给 unknown。我们只能将 unknown 类型的变量赋值给 any 和 unknown。

```js
let uncertain: unknown = 'Hello'!;
let notSure: any = uncertain;
```

**如果不缩小类型，就无法对 unknown 类型执行任何操作。**

```js
function getDog() {
  return "22";
}

const dog: unknown = getDog();
dog.hello(); //Object is of type 'unknown'
```

对未知类型执行某些操作，可以使用类型断言来缩小范围。

```js
const getDogName = () => {
 let x: unknown;
 return x;
};

const dogName = getDogName();
console.log((dogName as string).toLowerCase());
```

我们强制 TypeScript 编译器相信我们知道自己在做什么。

以上的一个重要缺点是它只是一个假设。它没有运行时效果，也不能防止我们在不小心的情况下造成错误

另一种更类型安全的缩小未知类型的方法是使用 类型收缩 （使用`typeof` 或`instanceof`）。TypeScript 编译器会分析我们的代码，并找出一个更窄的类型。TypeScript 编译器理解并假设类型。

```js
const dogName = getDogName();
if (typeof dogName === "string") {
  console.log(dogName.toLowerCase());
}

type getAnimal = () => unknown;
const dog = getAnimal();
if (dog instanceof Dog) {
  console.log(dog.name.toLowerCase());
}
```

**总结**

从以上比较中得出的结论是，**unknown 类型要安全得多，因为它迫使我们执行额外的类型检查来对变量执行操作。**

### never

`never` 是 Bottom Type，即一个不表示任何类型的类型。它是所有类型的子类型，是类型系统的最底层，也就意味着**没有任何类型可以赋给它，除了 `never` 本身。**

在 TypeScript 中，一个必定抛出错误的函数，它的返回值就是 `never`。

**使用场景**

我们可以其他类型不可能被复制给 never 类型来确保在 if...else 或者 swicth case 语句中，所有可能的(类型)分支都被穷举到。

```javascript
const strOrNumOrBool: string | number | boolean = false;

if (typeof strOrNumOrBool === "string") {
  console.log("str!");
} else if (typeof strOrNumOrBool === "number") {
  console.log("num!");
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```

这样会报错：`不能将类型“boolean”分配给类型“never”。ts(2322)`，因为在穷举完所有类型分支后，strOrNumOrBool 的类型当然就也是 never 啦。这样做只是从 TypeScript 类型层面避免了遗漏，一旦你在枚举值中新增了一个成员，就会出现不能赋值给 never 的报错提示。

### 对象的类型—接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象](https://ts.xcatliu.com/advanced/class-and-interfaces.html#类实现接口)以外，也常用于对「对象的形状（Shape）」进行描述。

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的，**赋值的时候，变量的形状必须和接口的形状保持一致。接口一般首字母大写**

#### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: "Tom",
};
```

#### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

**注意：**`number` 类型的任意属性签名不会影响其他 `string` 类型的属性签名：

```ts
type Arg = {
  [index: number]: string;
  length: number;
};
```

如上，虽然指定了 `number` 类型的任意属性的类型是 `string`，但 `length` 属性是 `string` 类型的签名，所以不受前者的影响。但是反过来就不一样了，如果接口定义了 `string` 类型的任意属性签名，它不仅会影响其他 `string` 类型的签名，也会影响其他 `number` 类型的签名。**两种任意类型签名并存时，`number` 类型的签名指定的值类型必须是 `string` 类型的签名指定的值类型的子集。**

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

#### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: "Tom",
  gender: "male",
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**

#### 接口继承

```tsx
interface Father {
  color: String;
}

interface Mother {
  height: Number;
}

interface Son extends Father, Mother {
  name: string;
  age: Number;
}
```

### 数组的类型

在 TypeScript 中，数组类型有多种定义方式，比较灵活。

#### 「类型 + 方括号」表示法

最简单的方法是使用「类型 + 方括号」来表示数组：

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

数组的项中**不允许**出现其他的类型。数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push("8");
```

#### 数组泛型

我们也可以使用数组泛型（Array Generic） `Array` 来表示数组：

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

#### 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`：

```ts
function sum() {
  let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上例中，`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

```ts
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```

在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。

事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```ts
function sum() {
  let args: IArguments = arguments;
}
```

#### any 在数组中的应用

一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型：

```ts
let list: any[] = ["xcatliu", 25, { website: "http://xcatliu.com" }];
```

### 函数的类型

#### 函数声明

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

注意，**输入多余的（或者少于要求的）参数，是不被允许的**

#### 函数表达式

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```ts
let mySum = function (x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
let mySum: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

#### 定义函数的形状

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

```tsx
// 方式一
type LongHand = {
  (a: number): number;
};

// 方式二
type ShortHand = (a: number) => number;
```

采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

#### 可选参数

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**：

#### 参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**：

```ts
function buildName(firstName: string, lastName: string = "Cat") {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

此时就不受「可选参数必须接在必需参数后面」的限制了

#### 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

注意，rest 参数只能是最后一个参数

#### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

函数重载的使用方法很简单，就是在需要使用函数重载的地方，多声明几个函数的类型。然后在最后一个函数中进行实现，特别要注意的是，最后实现函数中的类型一定要与上面的类型兼容。在编辑器的代码提示中，可以正确的看到前两个提示。

还有下面的例子

```javascript
const data = { name: 'licy' };
function getData(stringify: true): string
function getData(stringify?: false): object
function getData(stringify: boolean = false): unknown {
  if (stringify === true) {
    return JSON.stringify(data);
  } else {
    return data;
  }
}

const res1 = getData(); // object
const res2 = getData(true); // string
```

值得注意的是由于 TS 是在编译后会将类型抹去生成 JS 代码，而 JS 是没有函数重载这样的能力，所以说这里的函数重载只是类型的重载，方便做类型的提示，实际上还是要在实现函数中进行传入参数的判别，然后返回不同的结果。

**注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。**

### 类（Class）

类（Class）是面向对象程序设计`（OOP，Object-Oriented Programming）`实现信息封装的基础。在 `ES6` 之后，`JavaScript` 拥有了 `class` 关键字，虽然本质依然是构造函数，但是使用起来已经方便了许多

但是`JavaScript` 的`class`依然有一些特性还没有加入，比如修饰符和抽象类，`TypeScript` 的 `class` 支持面向对象的所有特性，比如 类、接口等

#### 使用

- 「字段」 ：字段是类里面声明的变量。字段表示对象的有关数据。
- 「构造函数」：类实例化时调用，可以为类的对象分配内存。
- 「方法」：方法为对象要执行的操作

如下例子：

```ts
class Car {
  // 字段
  engine: string;

  // 构造函数
  constructor(engine: string) {
    this.engine = engine;
  }

  // 方法
  disp(): void {
    console.log("发动机为 :   " + this.engine);
  }
}
```

##### 继承

类的继承使用过`extends`的关键字

```tsx
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
  getName(): void {
    console.log("父类的 getName() 方法。");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
  getName(): void {
    super.getName(); // 调用父类的函数
    console.log("子类的 getName()方法。");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

`Dog`是一个 派生类，它派生自 `Animal` 基类，派生类通常被称作**子类**，基类通常被称作**超类**

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写，通过`super`关键字是对父类的直接引用，该关键字可以引用父类的属性和方法

##### 修饰符

上述的形式跟`ES6`十分的相似，`typescript`在此基础上添加了三种修饰符：

- 公共 public：可以自由的访问类程序里定义的成员
- 私有 private：只能够在该类的内部进行访问，实例对象并不能够访问 ，并且继承该类的子类并不能访问
- 受保护 protect：实例对象同样不能访问受保护的属性，除了在该类的内部可以访问，还可以在子类中仍然可以访问
- 只读修饰符 readonly

##### 静态属性

这些属性存在于类本身上面而不是类的实例上，通过`static`进行定义，访问这些属性需要通过 类型.静态属性 的这种形式访问

```tsx
class Square {
  static width = "100px";
}

console.log(Square.width); // 100px
```

##### 抽象类

抽象类做为其它派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节

`abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法

```tsx
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("roaming the earch...");
  }
}
```

这种类并不能被实例化，通常需要我们创建子类去继承

```tsx
class Cat extends Animal {
  makeSound() {
    console.log("miao miao");
  }
}

const cat = new Cat();

cat.makeSound(); // miao miao
cat.move(); // roaming the earch...
```

##### this 类型

类的成员方法可以直接返回一个 this，这样就可以很方便地实现链式调用

```js
class StudyStep {
  step1() {
    console.log("listen");
    return this;
  }
  step2() {
    console.log("write");
    return this;
  }
}

const s = new StudyStep();

s.step1().step2(); // 链式调用
```

#### 用 class 做接口和设置初始值

先声明一个类，这个类包含组件 `props` 所需的类型和初始值：

```tsx
// props的类型
export default class Props {
  public children:
    | Array<React.ReactElement<any>>
    | React.ReactElement<any>
    | never[] = [];
  public speed: number = 500;
  public height: number = 160;
  public animation: string = "easeInOutQuad";
  public isAuto: boolean = true;
  public autoPlayInterval: number = 4500;
  public afterChange: () => {};
  public beforeChange: () => {};
  public selesctedColor: string;
  public showDots: boolean = true;
}
```

当我们需要传入 `props` 类型的时候直接将 `Props` 作为接口传入，此时 `Props` 的作用就是接口，而当需要我们设置`defaultProps`初始值的时候，我们只需要:

```tsx
public static defaultProps = new Props()
```

`Props` 的实例就是 `defaultProps` 的初始值，这就是 `class`作为接口的实际应用，我们用一个 `class` 起到了接口和设置初始值两个作用，方便统一管理，减少了代码量

### **字面量类型**

关于字面量类型`literal types`，它是对类型的进一步限制，比如你的状态码只可能是 0/1/2，那么你就可以写成 `status: 0 | 1 | 2` 的形式，而不是用一个 `number` 来表达。

```js
interface ICommonUserProps {
  type: "common";
  accountLevel: string;
}

interface IVIPUserProps {
  type: "vip";
  vipLevel: string;
}

type UserProps = ICommonUserProps | IVIPUserProps;

function getUserInfo(user: ICommonUserProps | IVIPUserProps): string {
  return user.type === "common" ? user.accountLevel : user.vipLevel;
}
```

### 枚举 enum

在实际应用中，有的变量只有几种可能取值。如人的性别只有两种可能取值，星期只有七种可能取值。这样取值比较特殊的变量可以定义为枚举类型。所谓枚举是指将变量的值一一列举出来，变量只限于列举出来的值的范围内取值。

后端返回的字段使用 0 - 6 标记对应的日期，这时候就可以使用枚举可提高代码可读性。包括后端日常返回 0、1 等等状态的时候，我们都可以通过枚举去定义，这样可以提高代码的可读性，便于后续的维护

#### 默认值

从 0 开始递增+1，如果前一个是字符串,ts 将无法处理初始化.

```js
enum Color {Red, Green, Blue}
let c: Color = Color.Red;
let d: Color = Color.Green;
let e: Color = Color.Blue;
console.log('enum',c,d,e) //0,1,2
```

#### 手动设置初始值

第一位未设置的默认 0,后面递增.遇到有初始值的,后面的按照初始值+1.

```js
enum Color {Red, Green=2, Blue}
let c: Color = Color.Red;
let d: Color = Color.Green;
let e: Color = Color.Blue;
console.log('enum',c,d,e) //0,2,3
```

```js
enum Color {Red, Green=2, Blue,Yellow=7 ,Dark}
let c: Color = Color.Red;
let d: Color = Color.Green;
let e: Color = Color.Blue;
let f: Color = Color.Yellow;
let g: Color = Color.Dark;
console.log('enum',c,d,e,f,g) //0 2 3 7 8
```

#### 属性获取

在赋予初始值的时候是以键值对的形式给的，字符串赋值之后不进行反向映射.故拿不到对应键位值.

```js
enum Color {Red, Green=2, Blue,Yellow=7 ,Dark}
let c1: string = Color[0];
let c: Color = Color.Red;//Red 0

let d1: string = Color[1];
let d: Color = Color.Green;// undefined 2

let e1: string = Color[2];
let e: Color = Color.Blue;// Green 3

let f1: string = Color[3];
let f: Color = Color.Yellow;// Blue 7

let g1: string = Color[4];
let g: Color = Color.Dark;// undefined 2
```

#### 首个成员未初始化

```jsx
function getUp(){
    return 0
}
enum Direction{
    up=getUp(),
    down  //error 第一个未初始化,第二个必须指定参数
}
```

#### 计算枚举

```jsx
function getLeft(){
    return 2
}
enum Direction{
    //可以通过计算获得
    up = 0,
    down = up +1,
    left = getLeft()
}
```

#### 枚举在运行时是一个对象

```swift
enum Direction{
    up,
    down,
    left,
    right
}
//枚举在运行的时候是实实在在的一个对象
console.log(Direction); //{0: "up", 1: "down", 2: "left", 3: "right", up: 0, down: 1, left: 2, right: 3}
```

#### 枚举值有字符串

只要有一个字符串即使它在最后一个,也不能用表达值

枚举成员可以是纯数值,纯字符串,混合三种情况.涉及字符串混合的限制条件比较多,所以尽量避免字符串的混合.

```js
enum Color {Red, Green=Color.Red, Blue=''} // Green不可用表达式
```

#### 枚举本质

现在一个枚举的案例如下：

```tsx
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

通过编译后，`javascript`如下：

```js
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
  Direction[(Direction["Left"] = 2)] = "Left";
  Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));
```

上述代码可以看到， `Direction[Direction["Up"] = 0] = "Up"`可以分成

- Direction["Up"] = 0
- Direction[0] = "Up"

所以定义枚举类型后，可以通过正反映射拿到对应的值，如下：

```tsx
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up === 0); // true
console.log(Direction[0]); // Up
```

并且多处定义的枚举是可以进行合并操作，如下：

```tsx
enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

enum Direction {
  Center = 1,
}
```

编译后，`js`代码如下：

```javascript
var Direction;
(function (Direction) {
  Direction["Up"] = "Up";
  Direction["Down"] = "Down";
  Direction["Left"] = "Left";
  Direction["Right"] = "Right";
})(Direction || (Direction = {}));
(function (Direction) {
  Direction[(Direction["Center"] = 1)] = "Center";
})(Direction || (Direction = {}));
```

可以看到，`Direction`对象属性会叠加

### 泛型

泛型程序设计（`generic programming`）是程序设计语言的一种风格或范式。泛型允许我们在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型，在`typescript`中，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性

#### 接口声明

```js
interface Resource<T> {
  uid: number;
  resouceName: string;
  data: T;
  speak(): void;
}

const docTwo: Resource<string> = {
  uid: 1,
  resouceName: "person",
  data: "hello",
  speak(): void {
    console.log(
      `uid: ${this.uid} resouceName: ${this.resouceName}  data: ${this.data}`
    );
  },
};
```

#### 函数声明

```js
function foo<T>(arg: T): T {
  return arg;
}
// 或
const foo = <T>(arg: T) => arg;

foo < string > "linbudu";
//上面的例子也可以不指定，因为 TS 会自动推导出泛型的实际类型，在部分 Lint 规则中，实际上也不推荐添加能够被自动推导出的类型值。

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, "seven"]); // ['seven', 7]
```

通常我们将上面例子中 `T` 这样的未赋值形式称为 **类型参数变量** 或者说 **泛型类型**，而将 `Array<number>` 这样已经实例化完毕的称为**实际类型参数**或者是 **参数化类型**。

> 通常泛型只会使用单个字母。如 T U K V S 等。推荐做法是在项目达到一定复杂度后，使用带有具体意义的泛型变量声明，如 BasicBusinessType 这种形式。

#### 类声明

```tsx
class Stack<T> {
  private arr: T[] = [];

  public push(item: T) {
    this.arr.push(item);
  }

  public pop() {
    this.arr.pop();
  }
}
const stack = new Stacn<number>();
```

如果上述只能传递 `string` 和 `number` 类型，这时候就可以使用 `T extends xx` 的方式实现「**约束泛型**」

```tsx
type Params = string | number;
class Stack<T extends Params> {
  private arr: T[] = [];

  public push(item: T) {
    this.arr.push(item);
  }

  public pop() {
    this.arr.pop();
  }
}
const stack = new Stack<boolean>(); // 不满足约束，报错
```

**多类型约束**

例如如下需要实现两个接口的类型约束：

```tsx
interface FirstInterface {
  doSomething(): number;
}

interface SecondInterface {
  doSomethingElse(): string;
}
```

可以创建一个接口继承上述两个接口，如下：

```tsx
interface ChildInterface extends FirstInterface, SecondInterface {}
```

正确使用如下：

```tsx
class Demo<T extends ChildInterface> {
  private genericProperty: T;

  constructor(genericProperty: T) {
    this.genericProperty = genericProperty;
  }
  useT() {
    this.genericProperty.doSomething();
    this.genericProperty.doSomethingElse();
  }
}
```

通过泛型约束就可以达到多类型约束的目的

泛型更高级的使用是索引类型、约束类型

### 索引类型 - keyof

`keyof` 是**索引类型查询**的语法， 它会返回后面跟着的类型参数的键值组成的**字面量联合类型**，举个例子：

```js
interface foo {
  a: number;
  b: string;
}

type A = keyof foo; // "a" | "b"
```

```js
function pickSingleValue<T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] {
  return obj[key];
}
```

假设现在不只要取出一个值了，我们要取出一系列值，即参数 2 将是一个数组，成员均为参数 1 的键名组成：

```js
function pick<T extends object, U extends keyof T>(obj: T, keys: U[]): T[U][] {
  return keys.map((key) => obj[key]);
}

// pick(obj, ['a', 'b'])
```

> keyof 只能对类型使用，如果想要对值使用，需要先使用 typeof 获取类型。

### 获取值的类型 - typeof

```javascript
// 获取对象的类型
const obj = { a: "123", b: 123 };
type Obj = typeof obj;
/**
type Obj = {
    a: string;
    b: number;
}
*/

// 获取函数的类型
function fn(a: Obj, b: number) {
  return true;
}
type Fn = typeof fn;
/**
type Fn = (a: Obj, b: number) => boolean
*/
```

注意对于 enum 需要先进行 typeof 操作获取类型，才能通过 keyof 等类型操作完成正确的类型计算（因为 enum 可以是类型也可以是值，如果不使用 typeof 会当值计算）

```javascript
enum E1 {
  A,
  B,
  C
}

type TE1 = keyof E1;
/**
拿到的是错误的类型
type TE1 = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
*/

type TE2 = keyof typeof E1;
/**
拿到的是正确的类型
type TE2 = "A" | "B" | "C"
*/

```

### 映射类型

在类型编程中，我们会从一个类型定义（包括但不限于接口、类型别名）映射得到一个新的类型定义。通常会在旧有类型的基础上进行改造，如：

- 修改原接口的键值类型
- 为原接口键值类型新增修饰符，如 `readonly` 与 可选`?`

```js
type ClonedA<T> = {
  [K in keyof T]: T[K];
};
```

### 交叉类型 - &

交叉类型 交叉类型需要实现所有的接口方法

```ts
interface DogInterface {
    run() {}
}
interface CatInterface {
    jump() {}
}

class Dog implements DogInterface & CatInterface {
    run() {}
    jump() {}
}
```

只有对于对象类型，& 才表现为合并的情况，而对于原始类型以及联合类型，& 就真的表现为交集。

A & B 的运算关系可以看成：

- A 和 B 可以相互赋值 => 目前只有 any 可以满足这种情况
- A 可以赋值给 B，B 不能赋值给 A => A

- B 可以赋值给 A，A 不能赋值给 A => B

- A 和 B 不存在可以赋值的关系 => never

```js
// 'a'
type _T1 = ("a" | "b") & ("a" | "d" | "e" | "f"); // a

// never，因为 string 和 number 哪有交集啊
type _T1 = string & number;

type T1 = number & string; // never
type T2 = number & unknown; // number
type T3 = number & any; // any
type T4 = number & never; // never
```

& 适用于对象合并场景，如下将声明一个函数，将两个对象合并成一个对象并返回：

```tsx
function extend<T , U>(first: T, second: U) : T & U {
    let result: <T & U> = {}
    for (let key in first) {
        result[key] = first[key]
    }
    for (let key in second) {
        if(!result.hasOwnProperty(key)) {
            result[key] = second[key]
        }
    }
    return result
}
```

### 类型别名 - type

类型别名会给一个类型起个新名字，类型别名有时和接口很像，但是可以作用于原始值、联合类型、元组以及其它任何你需要手写的类型

```tsx
type some = boolean | string;

const b: some = true; // ok
const c: some = "hello"; // ok
const d: some = 123; // 不能将类型“123”分配给类型“some”
```

此外类型别名可以是泛型:

```tsx
type Container<T> = { value: T };
```

也可以使用类型别名来在属性里引用自己：

```tsx
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
```

可以看到，类型别名和接口使用十分相似，都可以描述一个对象或者函数

两者最大的区别在于，**interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛**

### 类型约束 - extend

通过关键字 extend 进行约束，不同于在 class 后使用 extends 的继承作用，泛型内使用的主要作用是对泛型加以约束

```tsx
type BaseType = string | number | boolean;

// 这里表示 copy 的参数
// 只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg;
}
```

类型约束通常和类型索引一起使用，例如我们有一个方法专门用来获取对象的值，但是这个对象并不确定，我们就可以使用 extends 和 keyof 进行约束。

```tsx
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const obj = { a: 1 };
const a = getValue(obj, "a");
```

### 条件类型

条件类型的语法规则和三元表达式一致，经常用于一些类型不确定的情况。

```ts
T extends U ? X : Y
```

上面的意思就是，如果 T 是 U 的子集（U 中的属性在 T 中都有），就是类型 X，否则为类型 Y

## 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```ts
let myFavoriteNumber = "seven";
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let myFavoriteNumber: string = "seven";
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 语法

```ts
值 as 类型;
```

或

```ts
<类型>值;
```

### 类型断言的用途

#### 将一个联合类型断言为其中一个类型

之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  return animal.name;
}
```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === "function") {
    return true;
  }
  return false;
}

// index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
```

上面的例子中，获取 `animal.swim` 的时候会报错。

此时可以使用类型断言，将 `animal` 断言成 `Fish`：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}
```

这样就可以解决访问 `animal.swim` 时报错的问题了。

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

#### 将一个父类断言为更加具体的子类

```ts
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}
```

上面例子声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了。

但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code。

#### 将任何一个类型断言为 `any`

理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。

但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

```ts
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

上面的例子中，我们需要将 `window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

```ts
(window as any).foo = 1;
```

在 `any` 类型的变量上，访问任何属性都是允许的。

#### 将 `any` 断言为一个具体的类型

在日常的开发中，我们不可避免的需要处理 `any` 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。

遇到 `any` 类型的变量时，我们可以选择无视它，任由它滋生更多的 `any`。

我们也可以选择改进它，通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

举例来说，历史遗留的代码中有个 `getCacheData`，它的返回值是 `any`：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
```

那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData("tom") as Cat;
tom.run();
```

上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。**这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。**

### 类型断言的限制

类型断言有没有什么限制呢？是不是任何一个类型都可以被断言为任何另一个类型呢？

答案是否定的——并不是任何一个类型都可以被断言为任何另一个类型。

具体来说，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

```ts
//Animal兼容Cat
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

function testAnimal(animal: Animal) {
  return animal as Cat;
}
function testCat(cat: Cat) {
  return cat as Animal;
}
```

any 与任何类型相互兼容

### 类型断言 vs 类型声明

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};
let tom = animal as Cat;
```

在上面的例子中，由于 `Animal` 兼容 `Cat`，故可以将 `animal` 断言为 `Cat` 赋值给 `tom`。

但是若直接声明 `tom` 为 `Cat` 类型：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
```

则会报错，不允许将 `animal` 赋值为 `Cat` 类型的 `tom`。

这很容易理解，`Animal` 可以看作是 `Cat` 的父类，当然不能将父类的实例赋值给类型为子类的变量。

深入的讲，它们的核心区别就在于：

- `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
- `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行

但是 `Cat` 并不兼容 `Animal`。

类型声明是比类型断言更加严格的。所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加优雅

### 类型断言 vs 泛型

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData("tom") as Cat;
tom.run();
```

可以通过泛型转换为：

```ts
function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData<Cat>("tom");
tom.run();
```

通过给 `getCacheData` 函数添加了一个泛型 ，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。

## 类型操作符

### & - 合并类型对象

```javascript
type A = { a: number };
type B = { b: string };
type C = A & B;
// C 包含 A 和 B 定义的所有键
/**
* C = {
    a: number;
    b: string;
  }
*/
const c: C = {
  a: 1,
  b: "1",
};
```

注意使用 & 时，两个类型的键如果相同，但类型不同，会报错：

### | - 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```ts
function getLength(something: string | number): number {
  return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

访问 `string` 和 `number` 的共有属性是没问题的：

```ts
function getString(something: string | number): string {
  return something.toString();
}
```

### ！ - 非空断言操作符

```ts
let name: string = "huxngxiaoguo";
let nus: string;
console.log(name.trim());

//非空断言操作符 !  可以消除编辑器 当nus为undefined时候报错
//使用时注意 保证nus不为undefined，否则运行时会报错
console.log(nus!.trim());
export {};
```

## 类型保护

### [**is**](https://segmentfault.com/a/1190000022883470)

```js
function isString(test: any): test is string{
    return typeof test === "string";
}

function example(foo: any){
    if(isString(foo)){
        // 如下代码编译时会出错，运行时也会出错，因为 foo 是 string 不存在toExponential方法
        console.log(foo.toExponential(2));
    }
    // 编译不会出错，但是运行时出错
    console.log(foo.toExponential(2));
}
```

在使用类型保护时，TS 会进一步缩小变量的类型。例子中，将类型从 any 缩小至了 string。类型保护的作用域仅仅在 if 后的块级作用域中生效

除了多声明一个类型守卫以外，你也可以直接在 example 函数中判断

```js
function example(foo: any) {
  if (typeof foo === "string") {
    // 如下代码编译时会出错，运行时也会出错，因为 foo 是 string 不存在toExponential方法
    console.log(foo.toExponential(2));
  }
  // 编译不会出错，但是运行时出错
  console.log(foo.toExponential(2));
}
```

以上的两种方式其实都是“类型守卫”的体现，区别只不过在当我们将判断逻辑提取到这个函数的外部时，需要使用 is 关键字来显式的提供类型信息。

### **in**

`in` 关键字能够判断一个属性是否为对象所拥有：

```js
interface ILogInUserProps {
  isLogin: boolean;
  name: string;
}

interface IUnLoginUserProps {
  isLogin: boolean;
  from: string;
}

type UserProps = ILogInUserProps | IUnLoginUserProps;

function getUserInfo(user: ILogInUserProps | IUnLoginUserProps): string {
  return "name" in user ? user.name : user.from;
}
```

在对象类型中，可以通过 `[临时类型变量 in 联合类型]` 语法来遍历对象的键，示例如下：

```javascript
// 下述示例遍历 '1' | '2' | 3' 三个值，然后依次赋值给 K，K 作为一个临时的类型变量可以在后面直接使用
/**
下述示例最终的计算结果是：
type MyType = {
    1: "1";
    2: "2";
    3: "3";
}
因为 K 类型变量的值在每次遍历中依次是 '1', '2', '3' 所以每次遍历时对象的键和值分别是 { '1': '1' } { '2': '2' } 和 { '3': '3' }，
最终结果是这个三个结果取 &
*/
type MyType = {
  // 注意能遍历的类型只有 string、number、symbol，也就是对象键允许的类型
  [K in '1' | '2' | '3']: K
}
```

[in] 常常和 keyof 搭配使用，遍历某一个对象的键，做相应的计算后得到新的类型

```javascript
type Obj = {
  a: string;
  b: number;
}
/**
遍历 Obj 的所有键，然后将所有键对应的值的类型改成 boolean | K，返回结果如下：
type MyObj = {
    a: boolean | "a";
    b: boolean | "b";
}
这样我们就实现了给 Obj 的所有值的类型加上 | boolean 的效果
*/
type MyObj = {
  [K in keyof Obj]: boolean | K
}
```

## 命名空间

在 JavaScript 使用命名空间时， 这有一个常用的、方便的语法：

```javascript
(function (something) {
  something.foo = 123;
})(something || (something = {}));

console.log(something);
// { foo: 123 }

(function (something) {
  something.bar = 456;
})(something || (something = {}));

console.log(something); // { foo: 123, bar: 456 }
```

在确保创建的变量不会泄漏至全局命名空间时，这种方式在 JavaScript 中很常见。当基于文件模块使用时，你无须担心这点，但是该模式仍然适用于一组函数的逻辑分组。因此 TypeScript 提供了 namespace 关键字来描述这种分组，如下所示。

```javascript
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```

namespace 关键字编译后的 JavaScript 代码，与我们早些时候看到的 JavaScript 代码一样。

```javascript
(function (Utility) {
// 添加属性至 Utility
})(Utility || Utility = {});
```

命名空间支持嵌套

## 声明空间

在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间

### 类型声明空间

类型声明空间包含用来当做类型注解的内容，例如下面的类型声明：

```javascript
class Foo {}
interface Bar {}
type Bas = {};

let foo: Foo;
let bar: Bar;
let bas: Bas;
```

注意，尽管你定义了 interface Bar，却并不能够把它作为一个变量来使用，因为它没有定义在变量声明空间中。

```javascript
interface Bar {}
const bar = Bar; // Error: "cannot find name 'Bar'"
```

### 变量声明空间

变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间

```javascript
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```

> 我们并不能把一些如 interface 定义的内容当作变量使用。

一些用 const 声明的变量，也只能在变量声明空间使用，不能用作类型注解。

```javascript
const foo = 123;
let bar: foo; // ERROR: "cannot find name 'foo'"
```

提示 ERROR: "cannot find name 'foo'" 原因是，名称 foo 没有定义在类型声明空间里。

## 分布式条件类型

分布式条件类型实际上不是一种特殊的条件类型，而是其特性之一（所以说条件类型的分布式特性更为准确）。我们直接先上概念： **对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上。**

```javascript
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

// "string" | "function"
type T1 = TypeName<string | (() => void)>;

// "string" | "object"
type T2 = TypeName<string | string[]>;

// "object"
type T3 = TypeName<string[] | number[]>;
```

在上面的例子里，条件类型的推导结果都是联合类型（T3 实际上也是，只不过因为结果相同所以被合并了），并且其实就是**类型参数被依次进行条件判断后，再使用|组合得来的结果**。

上面的例子中泛型都是裸露着的，属于裸类型参数，让我们来看一下被包裹着的结果

```javascript
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Distributed = Naked<number | boolean>;

// "N"
type NotDistributed = Wrapped<number | boolean>;

```

其中，Distributed 类型别名，其类型参数`（number | boolean）`会正确的分发，即先分发到 `Naked<number> | Naked<boolean>`，再进行判断，所以结果是"N" | "Y"。

而 NotDistributed 类型别名，第一眼看上去感觉 TS 应该会自动按数组进行分发，结果应该也是 "N" | "Y" ？但实际上，它的类型参数`（number | boolean）`不会有分发流程，直接进行`[number | boolean] extends [boolean]`的判断，所以结果是"N"。

- 裸类型参数，没有额外被[]包裹过的，就像被数组包裹后就不能再被称为裸类型参数。

- 实例化，其实就是条件类型的判断过程，条件类型需要在收集到足够的推断信息之后才能进行这个过程。在这里两个例子的实例化过程实际上是不同的

- 分发到联合类型：

  ```javascript
  ( A | B | C ) extends T ? X : Y
  // 相当于
  (A extends T ? X : Y) | (B extends T ? X : Y) | (B extends T ? X : Y)

  // 使用[]包裹后，不会进行额外的分发逻辑。
  [A | B | C] extends [T] ? X : Y
  ```

  没有被 [] 额外包装的联合类型参数，在条件类型进行判定时会将联合类型分发，分别进行判断。

## 概念对比

### const 和 readonly 的区别

- const 用于变量，readonly 用于属性
- const 在运行时检查，readonly 在编译时检查
- 使用 const 变量保存的数组，可以使用 push，pop 等方法。但是如果使用 `ReadonlyArray<number>`声明的数组- 不能使用 push，pop 等方法。

### 同名的 interface 或 class

- interface 会合并
- class 不可以合并

### type 和 interface 的区别

- 类型别名可以为任何类型引入名称，interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛
- 类型别名不支持继承
- 类型别名不会创建一个真正的名字
- 类型别名无法被实现(implements)，而接口可以被派生类实现
- 类型别名重名时编译器会抛出错误，接口重名时会产生合并

### implements 与 extends 的区别

- extends, 子类会继承父类的所有属性和方法。
- implements，使用 implements 关键字的类将需要实现需要实现的类的所有属性和方法。

### never, void 的区别

- never，never 表示永远不存在的类型。比如一个函数总是抛出错误，而没有返回值。或者一个函数内部有死循环，永远不会有返回值。函数的返回值就是 never 类型。
- void, 没有显示的返回值的函数返回值为 void 类型。如果一个变量为 void 类型，只能赋予 undefined 或者 null。

### never、any、unknown 的区别

我们有时当类型报错了，可以先 as 成 `any`，再 as 成想要的类型，就有类型提示了，例如

```javascript
const foo = {} as any as Function;
```

为什么要 as 两次？不能直接 as Function？as 实际上只能转换存在父子类型的关系，所以需要先 as 成 `any`，像中介一样强行把原类型和新类型关联起来。

如果要稍微规范一点，应该先 as 成原类型和新类型的父类型，再 as 成新类型，例如

```javascript
// Deer、Horse的公共父类型
interface Animal {}

interface Deer extends Animal {
  deerId: number
}

interface Horse extends Animal {
  horseId: number
}

let deer: Deer = { deerId: 0 }

// 并不能一步到位
let horse = deer as Horse

// 先提升成共同的父类型，再定位到子类型
let horse = deer as Animal as Horse

```

后面有了 `unknown`，编译器对于关联不相关的两个类型的提示也变成了先 as 成 `unknown`

**在 TypeScript 的类型系统中，`any` 与 `unknown` 都属于 Top Type**，`any` 类型的变量可以被赋值以任意类型的值，而 `unknown` 则只能接受 `unknown` 与 `any`。二者的出发点其实是一致的，那就是快速表示一个未知/动态的值

使用 `any` 意味着完全放弃了类型检查，而且一个变量被声明为 `any`，那么接下来所有基于其操作派生来的值就都被打上了隐式 `any`（如果没有类型断言或者基于控制流分析的类型收窄）。但 `unknown` 不一样，它就像是类型安全版本的 `any`：因为类型检查仍然存在。

```javascript
let foo: any;
foo.bar().baz(); // 不报错

let bar: unknown;
// 这里是会报错的
// @ts-expect-error
bar.baz().foo();
```

声明为 `unknown` 的变量没法直接读写它，而是必须先指定类型，显式指定、类型守卫、编译器的自动分析都行，比如类型守卫：

```javascript
function isString(input: unknown): input is string {
  return typeof input === "string";
}
```

既然有 Top Type，那么就应该要有 Bottom Type，**在 TypeScript 中 `never` 就是那个 Bottom Type**。Bottom Type 意味着一个不表示任何类型的类型。你可能觉得，string 已经挺具体了，'linbudu' 这种字面量类型就更具体了，但 `never` 还要更具体。它是所有类型的子类型，是类型系统的最底层，也就意味着**没有任何类型可以赋给它，除了 `never` 本身。**

在 TypeScript 中，一个必定抛出错误的函数，它的返回值就是 `never`。 `void` 和 `never` 的区别就在于，返回 `void` 的函数其内部还是会调用 return 语句，只不过它啥也没返回，而返回 `never` 的函数其内部压根就没有调用 return 语句

> 参考链接：
>
> [TypeScript github](https://github.com/Microsoft/TypeScript)
>
> [TypeScript 入门教程（非官方）](https://ts.xcatliu.com/)
>
> [面试题 TypeScript](https://juejin.cn/post/6988763249982308382#heading-22)
