# 原理分析

## Tree Shaking

Tree-Shaking 是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化。

Tree Shaking 较早前由 Rich Harris 在 Rollup 中率先实现，Webpack 自 2.0 版本开始接入，至今已经成为一种应用广泛的性能优化手段。

### 在 Webpack 中启动 Tree Shaking

在 Webpack 中，启动 Tree Shaking 功能必须同时满足三个条件：

- 使用 ESM 规范编写模块代码

- 配置 optimization.usedExports 为 true，启动标记功能

- 启动代码优化功能，可以通过如下方式实现：

  - 配置 mode = production
  - 配置 optimization.minimize = true
  - 提供 optimization.minimizer 数组

例如：

```js
// webpack.config.js
module.exports = {
  entry: "./src/index",
  mode: "production",
  devtool: false,
  optimization: {
    usedExports: true,
  },
};
```

ESM 下模块之间的依赖关系是高度确定的，与运行状态无关，编译工具只需要对 ESM 模块做静态分析，就可以从代码字面量中推断出哪些模块值未曾被其它模块使用，这是实现 Tree Shaking 技术的必要条件。

```js
// index.js
import { bar } from "./bar";
console.log(bar);

// bar.js
export const bar = "bar";
export const foo = "foo";
```

示例中，bar.js 模块导出了 bar 、foo ，但只有 bar 导出值被其它模块使用，经过 Tree Shaking 处理后，foo 变量会被视作无用代码删除。

### 实现原理

Webpack 中，Tree-shaking 的实现一是先标记出模块导出值中哪些没有被用过，二是使用 Terser 删掉这些没被用到的导出语句。标记过程大致可划分为三个步骤：（具体步骤见参考链接）

- Make 阶段，收集模块导出变量并记录到模块依赖关系图 ModuleGraph 变量中
- Seal 阶段，遍历 ModuleGraph 标记模块导出变量有没有被使用
- 生成产物时，若变量没有被其它模块使用则删除对应的导出语句

### 最佳实践

虽然 Webpack 自 2.x 开始就原生支持 Tree Shaking 功能，但受限于 JS 的动态特性与模块的复杂性，直至最新的 5.0 版本依然没有解决许多代码副作用带来的问题，使得优化效果并不如 Tree Shaking 原本设想的那么完美，所以需要使用者有意识地优化代码结构，或使用一些补丁技术帮助 Webpack 更精确地检测无效代码，完成 Tree Shaking 操作。

**避免无意义的赋值**

```js
import { bar, foo } from "./bar";
console.log(bar);
const f = foo;
```

示例中，index.js 模块引用了 bar.js 模块的 foo 并赋值给 f 变量，但后续并没有继续用到 foo 或 f 变量，这种场景下 bar.js 模块导出的 foo 值实际上并没有被使用，理应被删除，但 Webpack 的 Tree Shaking 操作并没有生效，产物中依然保留

**使用 #pure 标注纯函数调用**

与赋值语句类似，JavaScript 中的函数调用语句也可能产生副作用，因此默认情况下 Webpack 并不会对函数调用做 Tree Shaking 操作。不过，开发者可以在调用语句前添加`/*#__PURE__*/`备注，明确告诉 Webpack 该次函数调用并不会对上下文环境产生副作用

**禁止 Babel 转译模块导入导出语句**

Babel 是一个非常流行的 JavaScript 代码转换器，它能够将高版本的 JS 代码等价转译为兼容性更佳的低版本代码，使得前端开发者能够使用最新的语言特性开发出兼容旧版本浏览器的代码。

但 Babel 提供的部分功能特性会致使 Tree Shaking 功能失效，例如 Babel 可以将 import/export 风格的 ESM 语句等价转译为 CommonJS 风格的模块化语句，但该功能却导致 Webpack 无法对转译后的模块导入导出内容做静态分析

![](./images/principle-analysis/tree-shaking-babel.webp)

示例使用 babel-loader 处理 \*.js 文件，并设置 Babel 配置项 `modules = 'commonjs'`，将模块化方案从 ESM 转译到 CommonJS，导致转译代码(右图上一)没有正确标记出未被使用的导出值 foo。作为对比，右图 2 为 modules = false 时打包的结果，此时 foo 变量被正确标记为 Dead Code。

所以，在 Webpack 中使用 babel-loader 时，建议将 babel-preset-env 的 moduels 配置项设置为 false，关闭模块导入导出语句的转译。

**优化导出值的粒度**

Tree Shaking 逻辑作用在 ESM 的 export 语句上，因此对于下面这种导出场景：

```js
export default {
  bar: "bar",
  foo: "foo",
};
```

即使实际上只用到 default 导出值的其中一个属性，整个 default 对象依然会被完整保留。所以实际开发中，应该尽量保持导出值颗粒度和原子性，上例代码的优化版本：

```js
const bar = "bar";
const foo = "foo";

export { bar, foo };
```

**使用支持 Tree Shaking 的包**

如果可以的话，应尽量使用支持 Tree Shaking 的 npm 包，例如：

使用 lodash-es 替代 lodash ，或者使用 babel-plugin-lodash 实现类似效果

不过，并不是所有 npm 包都存在 Tree Shaking 的空间，诸如 React、Vue2 一类的框架原本已经对生产版本做了足够极致的优化，此时业务代码需要整个代码包提供的完整功能，基本上不太需要进行 Tree Shaking。

> 参考链接
> [Webpack 原理系列九：Tree-Shaking 实现原理](https://mp.weixin.qq.com/s/K5rPkiCfj1I__J6GMfUBLA)
