# Vite

## 为什么选择 vite

在浏览器支持 ES 模块之前，开发者没有以模块化的方式开发 JavaScript 的原生机制。这也是 “打包” 这个概念出现的原因：使用工具抓取、处理和链接我们的源码模块到文件中，使其可以运行在浏览器中。

Vite 旨在利用生态系统中的新进展解决问题：浏览器开始原生支持 ES 模块，越来越多 JavaScript 工具使用编译型语言编写。

### 极速的服务启动

当冷启动开发服务器时，**基于打包器的方式**是在提供服务前去急切地抓取和构建你的整个应用。

Vite 通过在一开始将应用中的模块区分为 **依赖** 和 **源码** 两类

- **依赖** 大多为纯 JavaScript 并在开发时不会变动。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会以某些方式（例如 ESM 或者 CommonJS）被拆分到大量小模块中。

  Vite 将会使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://vitejs.cn/guide/dep-pre-bundling.html)。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

- **源码** 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载。（例如基于路由拆分的代码模块）。

  Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式服务源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入的代码，即只在当前屏幕上实际使用时才会被处理。

### 轻量快速的热重载

**一些打包器的开发服务器**支持了动态模块热重载（HMR）：允许一个模块 “热替换” 它自己，而对页面其余部分没有影响。这大大改进了开发体验 - 然而，在实践中我们发现，即使是 HMR 更新速度也会随着应用规模的增长而显著下降。

**在 Vite 中**，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失效（大多数时候只需要模块本身），使 HMR 更新始终快速，无论应用的大小。

Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 `304 Not Modified` 进行协商缓存，而依赖模块请求则会通过 `Cache-Control: max-age=31536000,immutable` 进行强缓存，因此一旦被缓存它们将不需要再次请求。

### 为什么生产环境仍需打包

- 为什么生产环境仍需打包

  尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

  要确保开发服务器和产品构建之间的最佳输出和行为一致并不容易。所以 Vite 附带了一套 [预配置、预优化](https://vitejs.cn/guide/features.html#build-optimizations) 的 [构建命令](https://vitejs.cn/guide/build.html)，开箱即用。

- 为何不用 ESBuild 打包？

  虽然 `esbuild` 快得惊人，并且已经是一个在构建库方面比较出色的工具，但一些针对构建应用的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。就目前来说，**Rollup** 在应用打包方面更加成熟和灵活。尽管如此，当未来这些功能稳定后，我们也不排除使用 `esbuild` 作为生产构建器的可能。

## 使用

Vite (法语意为 "快速的"，发音 `/vit/`) 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 [原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 提供了 [丰富的内建功能](https://vitejs.cn/guide/features.html)，如速度快到惊人的 [模块热更新（HMR）](https://vitejs.cn/guide/features.html#hot-module-replacement)。
- 一套构建指令，它使用 [Rollup](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可以输出用于生产环境的优化过的静态资源。

> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。

### 搭建项目

使用 NPM:

```js
npm init @vitejs/app
```

使用 Yarn:

```js
yarn create @vitejs/app
```

然后按照提示操作即可！

你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:

```js
# npm 6.x
npm init @vitejs/app my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init @vitejs/app my-vue-app -- --template vue

# yarn
yarn create @vitejs/app my-vue-app --template vue
```

> 拓展：npm init @vitejs/app 到底干了什么
>
> ```js
> npm init @vitejs/app -> npx @vitejs/create-app
> ```
>
> create-app 的执行入口文件执行了以下操作
>
> - 第一步：确定 Project name ，用户输入或默认；
> - 第二步：检查本地是否存在同名目录，并判断是否为空目录；
> - 第三步：选择要创建的模板，vue、vue-ts、react 等；
> - **第四部（核心）：根据选择的模板匹配到项目下以 `template-` 开头的目录，将目录中的所有文件拷贝到本地项目目录中；**
> - 第五步：拷贝修改完 name 的新 package.json 到新项目中，并提示安装依赖和运行；
>
> 我们使用 `vue create` 来创建项目时，背后是 Vue-CLI 给予我们的能力。所以我们得首先安装 Vue-Cli，然后才可以使用它来创建项目。而 `npm init` 则跳过了 CLI 这部分，它基于指定脚本来实现。
>
> ```javascript
> yarn create <starter-kit-package> [<args>]
> 此命令是一种速记，可帮助您同时做两件事：
>
> 1、create-<starter-kit-package>全局安装，如果已经存在，则将包更新到最新版本
> 2、运行位于binstarter kit 字段中的可执行文件package.json，将 any 转发<args>给它
> 例如，yarn create react-app my-app相当于：
>
> $ yarn global add create-react-app
> $ create-react-app my-app
> ```

> 参考链接：
>
> [npm init @vitejs/app 到底干了什么](http://www.babyitellyou.com/details?id=60726b140a6c640f8b4611b4)
>
> [Vite 官方文档](https://vitejs.cn/)
