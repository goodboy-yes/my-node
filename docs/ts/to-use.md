# 如何使用

## Hello TypeScript

```bash
npm install -g typescript
```

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx`为后缀。

```ts
//hello.ts
function sayHello(person: string) {
  return "Hello, " + person;
}

let user = "Tom";
console.log(sayHello(user));
```

然后执行

```bash
tsc hello.ts
```

这时候会生成一个编译好的文件 `hello.js`：

```js
//hello.js
function sayHello(person) {
  return "Hello, " + person;
}
var user = "Tom";
console.log(sayHello(user));
```

可以使用 `tsc -w`来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译。

在 TypeScript 中，我们使用 ':' 指定变量的类型，':' 的前后有没有空格都可以。

上述例子中，我们用 ':' 指定 person 参数类型为 string。但是编译为 js 之后，并没有什么检查的代码被插入进来。这是因为 **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

**TypeScript 编译的时候即使报错了，还是会生成编译结果**，我们仍然可以使用这个编译之后的文件。如果要在报错的时候终止 js 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可

## tsconfig.json

```json
{}
```

在项目的根目录下创建一个空 JSON 文件。通过这种方式，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，它还会包含一部分默认的编译选项

可以通过 `compilerOptions` 来定制你的编译选项

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "esnext", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "esnext", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": ["esnext", "dom"], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}
```

可以使用 include 和 exclude 选项来指定需要包含的文件和排除的文件

```json
{
  "include": ["./src"],
  "exclude": ["./src/**/*.spec.ts", "./src/someSubFolder"]
}
```

> 使用 globs：`**/*` （一个示例用法：`src/**/*`）意味着匹配所有的文件夹和所有文件（扩展名为 .ts/.tsx，当开启了 allowJs: true 选项时，扩展名可以是 .js/.jsx）。

## 模块

### 模块路径动态查找

当导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略

- 当你使用 `import \* as foo from 'foo'`，将会按如下顺序查找模块：

  `./node_modules/foo`

  `../node_modules/foo`

  直到系统的根目录

- 当你使用 `import \* as foo from 'something/foo'`，将会按照如下顺序查找内容

  `./node_modules/something/foo`

  `../node_modules/something/foo`

  直到系统的根目录

TypeScript 将会检查以下内容

- 路径表示一个文件，如：`foo.ts`
- 路径是一个文件夹，并且存在一个文件 `foo/index.ts`
- 路径是一个文件夹，并且存在一个 `package.json` 文件，在该文件中指定 `types` 的文件存在
- 路径是一个文件夹，并且存在一个 `package.json` 文件，在该文件中指定 `main` 的文件存在

文件类型是指 .ts，.d.ts 或者 .js

### 重写类型的动态查找

可以通过 declare module 'somePath' 声明一个全局模块的方式，来解决查找模块路径的问题。

```javascript
// global.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
```

```javascript
// anyOtherTsFileInYourProject.ts
import * as foo from "foo";
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
```

> 在 d.ts 中，使用 declare 与 declare global 两个作用是相等的。那么什么时候使用 declare, 又什么时候使用 declare global？
>
> 在模块文件中定义 declare，如果想要用作全局就可以使用 declare global 完成该需求。

## 工具类型

### Readonly

Readonly 可以将类型转换为只读对象，使用方式是 `Readonly<T>`。

```javascript
interface Person {
  name: string;
}
type Person2 = Readonly<Person>;

const a: Person2 = {
  name: "wangly19",
};

const b: Person = {
  name: "wangly19",
};

a.name = "wangly19 new"; // 报错
b.name = "wangly19 new";
```

### Record

Record 能够快速创建对象类型。它的使用方式是`Record<K, V>`，能够快速的为 object 创建统一的 key 和 value 类型。

```javascript
const test: Record<string, string> = {
  name: 1, //报错：Type 'number' is not assignable to type 'string'.
};
```

### Pick & Omit

**Pick**：主要作用是从一组属性中拿出某个属性，并将其返回，使用方法是`Pick<P, K>`

```javascript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

```javascript
interface Person {
  name: string
  age: number
}
type test = Pick<Person, 'age'> // type test = {age: number;}
```

**Omit**：主要作用是从一组属性中排除某个属性，并将排除属性后的结果返回。使用方法是`Omit<P, K>`，与 Pick 的结果是相反的，如果说 Pick 是取出，那么 Omit 则是过滤的效果

```javascript
interface Person {
  name: string
  age: number
}
type test = Omit<Person, 'age'> // type test = {name: string;}
type test = Omit<Person, 'age'|'name'> // 去除多个
```

重写原有字段的类型

```javascript
type test = Omit<Person, "age"> & {
  age: string,
};
```

### Exclude & Extract

**Exclude**：从一个联合类型中排除掉属于另一个联合类型的子集，使用形式是`Exclude<T, S>`，如果 T 中的属性在 S 不存在那么就会返回。

```javascript
interface A {
    show: boolean,
    hidden: boolean,
    status: string
}

interface B {
    show: boolean,
    name: string
}
type outPut = Exclude<keyof A, keyof B> // type outPut = "hidden" | "status"
```

**Extract**：跟 Exclude 相反，从一个联合类型中取出属于另一个联合类型的子集

```javascript
interface A {
    show: boolean,
    hidden: boolean,
    status: string
}

interface B {
    show: boolean,
    name: string
}
type outPut = Extract<keyof A, keyof B>// type outPut = "show"
```

### Partial

Partial 是一个将类型转为可选类型的工具，对于不明确的类型来说，需要将所有的属性转化为可选的?.形式，转换成为可选的属性类型。

```javascript
interface Person {
  name: string
  age: number
}
type test = Partial<Person> // {name?: string,age?: number}
```

### Required

将类型中所有选项变为必选，去除所有？

```javascript
interface Person {
  name?: string
  age?: number
}
type test = Person<Person> // {name: string,age: number}
```

### NonNullable

`NonNullable<Type>`会将 `null`和 `undefined`从 `Type` 中排除掉，由剩余类型组成一个新的类型
