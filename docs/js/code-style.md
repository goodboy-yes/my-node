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

- 安装`EditorConfig for VS Code`插件

- 添加配置文件，在项目根目录下增加 `.editorconfig` 文件，以下是配置示例，更多配置详情查看 [http://editorconfig.org](http://editorconfig.org)

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

### Prettier

#### 定义

一款强大的代码格式化工具，支持 `JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown` 等语言。Prettier 关注**代码格式**问题，如使用单引号还是双引号、单行长度等

#### 使用

- 安装 Prettier

  ```bash
  npm i prettier -D
  ```

- 安装**Prettier - Code formatter**插件（VSCode）

- 创建 Prettier 配置文件，以下是配置示例，更多配置详情查看 [Prettier-Options](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Foptions.html) 。

  ```json
  {
    "useTabs": false, //用制表符而不是空格缩进行
    "tabWidth": 2, //指定每个缩进级别的空格数
    "printWidth": 100, // 行长度
    "singleQuote": true, // 使用单引号代替双引号
    "trailingComma": "none", // 尾随逗号
    "bracketSpacing": true, // 在对象文字中的括号之间打印空格
    "semi": false // 是否在每条语句的末尾添加一个分号。
  }
  ```

- ```
  # 格式化所有文件（. 表示所有文件）
  npx prettier --write .
  ```

  配置完后使用编辑器的格式化功能时，编辑器会按照配置文件进行格式化

### ESLint

#### 定义

**ESLint**是一款用于查找并报告代码中问题的工具，关注点是**代码质量**和**代码格式**，可以进行错误提示和自动修复，其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

**代码质量问题：使用方式有可能有问题(problematic patterns)**，如禁止未使用的变量、禁止不必要的函数绑定、全局变量声明等问题

**代码风格问题：风格不符合一定规则 (doesn’t adhere to certain style guidelines)**，如单双引号，末尾分号等

#### 使用

- 安装 ESLint

  ```bash
  npm i eslint -D
  ```

- 下载**ESLint**插件（VSCode）

- 配置 ESLint

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
      parser: "@typescript-eslint/parser",
      sourceType: "module",
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {},
  };
  ```

- 设置保存自动格式化

  VSCode 在 `settings.json` 设置文件中，增加以下代码：

  ```js
   "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
   }
  ```

### 解决 Prettier 和 ESLint 的冲突

但在项目中同时使用`Prettier` 和 `ESLint`时，规则可能关于发生冲突。例如`Airbnb JavaScript` 风格中代码结束后面要加分号，`Prettier` 配置文件中如果加了代码结束后面不加分号的配置项，这样就有冲突了，会出现用 `Prettier` 格式化后的代码，`ESLint` 检测到格式有问题的，从而抛出错误提示。

解决两者冲突问题，需要用到 **eslint-plugin-prettier** 和 **eslint-config-prettier**。

- `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中。
- `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则。

最后形成优先级：`Prettier 配置规则` > `ESLint 配置规则`。

**使用**

- 安装插件

  ```bash
  npm i eslint-plugin-prettier eslint-config-prettier -D
  ```

- 在 `.eslintrc.js` 添加 prettier 插件

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
