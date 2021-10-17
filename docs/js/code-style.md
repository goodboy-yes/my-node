# 代码风格

## 社区代码风格指南

为了约定大家的代码风格，在社区中诞生了一些比较规范的代码风格指南：

- [Airbnb](https://github.com/airbnb/javascript)
- [Standard](https://github.com/standard/standard)
- [Google](https://google.github.io/styleguide/jsguide.html)

**这三份 JavaScript 代码风格指南值得我们反复学习，掌握后，编程能力能上一大台阶。**

## 无分号的代码风格

当采用了无分号的代码风格时，以(、[、`开头需要在前面补上一个分号用以避免一些语法解析错误。所以你会发现在一些第三方的代码中能看到一上来就以一个 ; 开头。

```javascript
(function () {
  console.log("hello");
})();
`hello`.toString();
```

## 搞懂 editorconfig、 ESLint 和 Prettier

### editorconfig

#### 定义

帮助项目中使用不同 IDE 工具的开发者，维持固定统一的代码风格。例如按 Tab 键光标缩进多少空格数等

#### 使用（VSCode）

安装`EditorConfig for VS Code`插件

添加配置文件，在项目根目录下增加 `.editorconfig` 文件，以下是配置示例，更多配置详情查看 [http://editorconfig.org](http://editorconfig.org)

```editorconfig
# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

虽然格式化的配置参数很少，但是它还是非常有必要存在的

- 能够在不同的编辑器和 IDE 中保持一致的代码风格；
- 配合插件打开文件即自动格式化，非常方便
- 支持格式化的文件类型很多；

### Prettier

#### 定义

一款强大的代码格式化工具，支持 `JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown` 等语言。Prettier 关注**代码格式**问题，如使用单引号还是双引号、单行长度等

#### 使用

安装 Prettier

```bash
npm i prettier -D
```

安装**Prettier - Code formatter**插件（VSCode）

创建 Prettier 配置文件，以下是配置示例，更多配置详情查看 [Prettier-Options](https://prettier.io/docs/en/options.html) 。

```js
{
  printWidth: 80,                    //（默认值）单行代码超出 80 个字符自动换行
  tabWidth: 2,                       //（默认值）一个 tab 键缩进相当于 2 个空格
  useTabs: true,                     // 行缩进使用 tab 键代替空格
  semi: false,                       //（默认值）语句的末尾加上分号
  singleQuote: true,                 // 使用单引号
  quoteProps: 'as-needed',           //（默认值）仅仅当必须的时候才会加上双引号
  jsxSingleQuote: true,              // 在 JSX 中使用单引号
  trailingComma: 'all',              // 不用在多行的逗号分隔的句法结构的最后一行的末尾加上逗号, "none":尾随逗号
  bracketSpacing: true,              //（默认值）在括号和对象的文字之间加上一个空格
  jsxBracketSameLine: true,          // 把 > 符号放在多行的 JSX 元素的最后一行
  arrowParens: 'avoid',              // 当箭头函数中只有一个参数的时候可以忽略括弧
  htmlWhitespaceSensitivity: 'ignore', // vue template 中的结束标签结尾尖括号掉到了下一行
  vueIndentScriptAndStyle: false,    //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
  embeddedLanguageFormatting: 'auto', //（默认值）允许自动格式化内嵌的代码块
}
```

```
  # 将格式化当前目录及子目录下所有文件
  npx prettier --write .

  //检查某个文件是否已经格式化
  npx prettier --check src/main.js
```

如果有些文件不想被 Prettier 格式化，可以将其写入到 .prettierignore 里：

```javascript
build/
package.json
test/*.*
```

### ESLint

#### 定义

**ESLint**是一款用于查找并报告代码中问题的工具，关注点是**代码质量**和**代码格式**，可以进行错误提示和自动修复，其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

**代码质量问题：使用方式有可能有问题(problematic patterns)**，如禁止未使用的变量、禁止不必要的函数绑定、全局变量声明等问题

**代码风格问题：风格不符合一定规则 (doesn’t adhere to certain style guidelines)**，如单双引号，末尾分号等

**解析器**

ESLint 的解析器，早期的时候用的是 `Esprima`，后面基于 `Esprima v1.2.2` 版本开发了一个新的解析器 `Espree`，并且把它当做默认解析器。

除了使用 ESLint 自带的解析器外，还可以指定其他解析器：

- `@babel/eslint-parser`：使 Babel 和 ESLint 兼容，对一些 Babel 语法提供支持；
- `@typescript-eslint/parser`：TSLint 被弃用后，TypeScript 提供了此解析器用于将其与 ESTree 兼容，使 ESLint 对 TypeScript 进行支持；

为项目指定某个选择器的原则是什么？

- 如果你的项目用到了比较新的 ES 语法，比如 ES2021 的 Promise.any()，那就可以指定 @babel/eslint-parser 为解析器；
- 如果项目是基于 TS 开发的，那就使用 @typescript-eslint/parser；

**环境 env**

指定不同的环境可以给对应环境下提供预设的全局变量。比如说在 browser 环境下，可以使用 window 全局变量；在 node 环境下，可以使用 process 全局变量等；

[完整的环境列表](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments)

- browser：浏览器全局变量；
- node：Node.js 全局变量和作用域；
- es6：es6 中除了模块之外的其他特性，同时将自动设置 parserOptions.ecmaVersion 参数为 6；以此类推 - ES2017 是 7，而 ES2021 是 12；
- es2017：parserOptions.ecmaVersion 为 8；

```javascript
{
    env: {
        browser: true,
        node: true,
        es6: true,
        commonjs: true,
        mocha: true,
        jquery: true,
    }
}
```

**全局变量 globals**

ESLint 的一些核心规则依赖于对代码在运行时可用的全局变量的了解。由于这些在不同环境之间可能会有很大差异，并且在运行时会进行修改，因此 ESLint 不会假设你的执行环境中存在哪些全局变量。

如果你想使用这些全局变量，那就可以通过 globals 来指定。比如在 `react .eslintrc.js`里就把 `spyOnDev`、 `spyOnProd` 等变量挂在了 global 下作为全局变量：

```javascript
{
    globals: {
        spyOnDev: true,
        spyOnProd: true,
    }
}
```

false、readable、readonly 这 3 个是等价的，表示变量只可读不可写；

true、writeable、writable 这 3 个是等价的，表示变量可读可写；

**扩展 extends**

实际项目中配置规则时通常的做法是使用业内大家普通使用的、遵循的编码规范；然后通过 extends 去引入这些规范。

extends 配置的时候接受字符串或者数组：

```javascript
{
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'eslint-config-standard', // 可以缩写成 'standard'
        '@vue/prettier',
        './node_modules/coding-standard/.eslintrc-es6'
    ]
}
```

extends 支持的配置类型可以是以下几种

- eslint 开头的：是 ESLint 官方的扩展；
- plugin 开头的：是插件类型扩展，比如 plugin:vue/essential；
- eslint-config 开头的：来自 npm 包，使用时可以省略前缀 eslint-config-，比如上面的可以直接写成 standard；
- @开头的：扩展和 eslint-config 一样，只是在 npm 包上面加了一层作用域 scope；
- 一个执行配置文件的相对路径或绝对路径；

常用的、比较著名的扩展:

- `eslint:recommended：ESLint` 内置的推荐规则，即 ESLint Rules 列表中打了钩的那些规则；
- `eslint:all：ESLint` 内置的所有规则；
- `eslint-config-standard`：standard 的 JS 规范；
- `eslint-config-prettier`：关闭和 ESLint 中以及其他扩展中有冲突的规则；
- `eslint-config-airbnb-base`：airbab 的 JS 规范；
- `eslint-config-alloy`：腾讯 AlloyTeam 前端团队出品，可以很好的针对你项目的技术栈进行配置选择，比如可以选 React、Vue（现已支持 Vue 3.0）、TypeScript 等；

**插件 plugins**

ESLint 虽然可以定义很多的 rules，以及通过 extends 来引入更多的规则，但是只是检查 JS 语法，无法检查 Vue 中的 template 或者 React 中的 jsx，所以引入插件的目的就是为了增强 ESLint 的检查能力和范围。

ESLint 相关的插件的命名形式有 2 种：不带命名空间的和带命名空间的，比如：

- eslint-plugin- 开头的可以省略这部分前缀；
- @/ 开头的；

当需要基于插件进行 extends 和 rules 的配置的时候，需要加上插件的引用

```javascript
{
    plugins: [
        'jquery',   // 是指eslint-plugin-jquery
        '@foo/foo', // 是指@foo/eslint-plugin-foo
        '@bar',      // 是指@bar/eslint-plugin
    ],
    extends: [
        'plugin:jquery/recommended',
        'plugin:@foo/foo/recommended',
        'plugin:@bar/recommended'
    ],
    rules: {
        'jquery/a-rule': 'error',
        '@foo/foo/some-rule': 'error',
        '@bar/another-rule': 'error'
    },
}

```

**规则 rules**

ESLint 提供了大量内置的规则([ESLint Rules](https://eslint.org/docs/rules/))，除此之外你还可以通过插件来添加更多的规则。

规则的校验说明，有 3 个报错等级

- off 或 0：关闭对该规则的校验；
- warn 或 1：启用规则，不满足时抛出警告，且不会退出编译进程；
- error 或 2：启用规则，不满足时抛出错误，且会退出编译进程；

通常规则只需要配置开启还是关闭即可；但是也有些规则可以传入属性，比如：

```javascript
{
    rules: {
        'quotes': ['error', 'single'],  // 如果不是单引号，则报错
        'one-var': ['error', {
            'var': 'always',  // 每个函数作用域中，只允许 1 个 var 声明
            'let': 'never',   // 每个块作用域中，允许多个 let 声明
            'const': 'never', // 每个块作用域中，允许多个 const 声明
        }]
    }
}
```

规则的优先级

- 如果 extends 配置的是一个数组，那么最终会将所有规则项进行合并，出现冲突的时候，后面的会覆盖前面的；
- 通过 rules 单独配置的规则优先级比 extends 高；

**ESLint 检测配置文件**

- 在要检测的文件同一目录里寻找 .eslintrc.\* 和 package.json；
- 紧接着在父级目录里寻找，一直到文件系统的根目录；
- 如果在前两步发现有 root：true 的配置，停止在父级目录中寻找 .eslintrc；
- 如果以上步骤都没有找到，则回退到用户主目录 ~/.eslintrc 中自定义的默认配置；

通常我们都习惯把 ESLint 配置文件放到项目根目录，因此可以为了避免 ESLint 校验的时候往父级目录查找配置文件，所以需要在配置文件中加上 `root: true`。

```javascript
{
  root: true,
}

```

**settings 共享数据**

ESLint 支持在配置文件添加共享设置，你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用

```javascript
{
    settings: {
        sharedData: 'Hello'
    },
}

```

**overrides 差异化配置**

比如 webpack 的中包含了某些运行时的 JS 文件，而这些文件是只跑在浏览器端的，所以需要针对这部分文件进行差异化配置：

```javascript
overrides: [
  {
    files: ["lib/**/*.runtime.js", "hot/*.js"],
    env: {
      es6: false,
      browser: true,
    },
    globals: {
      Promise: false,
    },
    parserOptions: {
      ecmaVersion: 5,
    },
  },
];
```

#### 使用

**安装 ESLint**

```bash
npm i eslint -D
```

**下载 ESLint 插件（VSCode）**

**配置 ESLint**

ESLint 安装成功后，执行 `npx eslint --init`，然后按照终端操作提示完成一系列设置来创建配置文件。

ESLint 为我们列出了三种社区流行的 JavaScript 风格指南，分别是 [Airbnb](https://github.com/airbnb/javascript)、[Standard](https://github.com/standard/standard)、Google。 GitHub 上 star 最多的是 Airbnb，可以直接选用 Airbnb，免去繁琐的配置 ESLint 规则时间，然后让团队成员去学习 Airbnb JavaScript 风格指南即可。

配置完成后会在根目录生成`.eslintrc.js`，根据项目实际情况，如果我们有额外的 ESLint 规则，也在此文件中追加。

例如：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    // 指定解析器
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
```

**设置保存自动格式化**

VSCode 在 `settings.json` 设置文件中，增加以下代码：

```js
 "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
 }
```

**命令行校验文件**

```javascript
// 校验 a.js 和 b.js
npx eslint a.js b.js

// 校验 src 和 scripts 目录
npx eslint src scripts

// 通过 --ext 来指定具体需要校验的文件，ESLint 只能校验 JS 文件，
//如当校验 .vue 文件，光配置 vue 插件和 vue-eslint-parser 解析器是不够的
npx eslint --ext .js,.jsx,.vue src
```

**自动修复部分校验错误的代码**

rules 列表项中标识了一个扳手 🔧 图案的规则就标识该规则是可以通过 ESLint 工具自动修复代码的。

```javascript
npx eslint --fix a.js
```

一般较长命令写在 pakeage.json

```javascript
  {
    "scripts": {
        "lint": "npx eslint --ext .js,.jsx,.vue src",
        "lint:fix": "npx eslint --fix --ext .js,.jsx,.vue src",
    }
  }
```

**忽略校验文件**

ESLint 总是忽略 `/node_modules/` 和 `/bower_components/` 中的文件，对于一些公共的 JS、测试脚本或者是特定目录下的文件习惯上是不需要校验的，因此可以在项目根目录通过创建一个 `.eslintignore` 文件来配置

```javascript
public/;
src/main.js
```

### 解决 Prettier 和 ESLint 的冲突

但在项目中同时使用`Prettier` 和 `ESLint`时，规则可能关于发生冲突。例如`Airbnb JavaScript` 风格中代码结束后面要加分号，`Prettier` 配置文件中如果加了代码结束后面不加分号的配置项，这样就有冲突了，会出现用 `Prettier` 格式化后的代码，`ESLint` 检测到格式有问题的，从而抛出错误提示。

解决两者冲突问题，需要用到 **eslint-plugin-prettier** 和 **eslint-config-prettier**。

- `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中。
- `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则。

最后形成优先级：`Prettier 配置规则` > `ESLint 配置规则`。

**使用**

安装插件

```bash
npm i eslint-plugin-prettier eslint-config-prettier -D
```

在 `.eslintrc.js` 添加 prettier 插件

```js
module.exports = {
  ...
  extends: [
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  ...
}
```

这样，我们在执行 `eslint --fix` 命令时，ESLint 就会按照 Prettier 的配置规则来格式化代码

### 集成 husky 和 lint-staged

我们可以做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。
我们需要用到 Git Hook，在本地执行 git commit 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 eslint --fix）

- husky —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。
- lint-staged —— 在 git 暂存的文件上运行 linters。

**配置 husky**

```javascript
npx husky-init && npm install
```

修改 `.husky/pre-commit` hook 文件的触发命令：

```javascript
eslint --fix ./src --ext .vue,.js,.ts
```

**配置 lint-staged**

lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add 那些文件（即 git 暂存区的文件），而不会影响到其他文件。

安装 lint-staged

```javascript
npm i lint-staged -D
```

在 package.json 里增加 lint-staged 配置项

```javascript
"lint-staged": {
  "*.{vue,js,ts}": "eslint --fix"
},
```

修改 `.husky/pre-commit` hook 的触发命令为：`npx lint-staged`

详细操作见参考链接

---

> 参考链接
>
> [ESLint 开始，说透我如何在团队项目中基于 Vue 做代码校验](https://juejin.cn/post/6974223481181306888#heading-26)
