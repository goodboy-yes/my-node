# 技术方案

## 时间库

### [Moment.js](http://momentjs.cn/)

最知名、最古老的 JavaScript 日期处理类库

### [Day.js](https://dayjs.fenxianglu.cn/)

Day.js 是一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间，是 Moment.js 替代方案(自 2020 年 9 月起进入纯维护模式,不再开发新版本）

### [date-fns](https://date-fns.org/)

date-fns 提供了最全面、最简单且一致的工具集，用于在浏览器和 Node.js 中操作 JavaScript 日期。

## 文件下载

### [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

FileSaver.js 在没有原生支持 saveAs() 的浏览器上实现了 saveAs() 接口。是文件下载的标杆项目。

## 表格解析和生成

### [sheetjs ](https://github.com/SheetJS/sheetjs)

SheetJS 是用于多种电子表格格式的解析器和编写器。通过官方规范、相关文档以及测试文件实现简洁的 JS 方法。SheetJS 强调解析和编写的稳健，其跨格式的特点和统一的 JS 规范兼容，并且 ES3/ES5 浏览器向后兼容 IE6。

## 更多 NPM 包

> [让我告诉你一些强无敌的 NPM 软件包](https://juejin.cn/post/6950584088462163982)

## 网页离开时的请求发送

[Navigator.sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向 web 服务器发送数据。

同步的 `XMLHttpRequest` 迫使用户代理延迟卸载文档，并使得下一个导航出现的更晚。有一些技术被用来保证数据的发送。其中一种是通过在卸载事件处理器中创建一个图片元素并设置它的 `src` 属性的方法来延迟卸载以保证数据的发送，但会延迟卸载以保证图片的载入

使用 `sendBeacon()` 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载。此外，代码实际上还要比其他技术简单许多！

## 解决 node_modules 中第三方库 bug

一般来说，解决 node_modules 中第三方库的 bug 大概有两种思路：

- 第一种思路是将第三方库中有问题的文件 copy 一份进行修复，放在项目目录里面(非 node_modules)，然后通过构建工具 `resolve.alias` 能力重定向到修复后的位置。

- 另一种是通过 `patch-package` 记录 node_modules 更改记录，生成 patches 目录，然后通过项目的 post-install 脚本在团队中同步这个更改，实现第三方库的临时 patch，当然这也适合其他第三方库问题的临时修复。

  ```javascript
  // 1. 安装
  npm i patch-package
  //of
  yarn add patch-package postinstall-postinstall

  // 2. 修改 node_modules 代码后执行：
  yarn patch-package package-name(修改的包名)
  //of
  npx patch-package package-name（npm版本 > 5.2）

  // 3. package.json 中 scripts 增加：
  "scripts": {
      ***,
  +   "postinstall": "patch-package"
  }
  ```

  手动删除 node_modules 文件夹，重新执行 npm install 安装依赖包。可以看到在依赖包安装结束后执行了 patch-package 命令，之前生成的补丁被应用了。
  最后将 patches 文件夹推送到远端仓库，日后无论是谁拉取代码，安装依赖，我们之前修改的部分都会生效的

  **注意事项：**
  patch 是锁定版本号的，如果升级了版本，patch 内容将会失效，最好在 package.json 能够锁定版本号。
  魔改的同时，也局限了升级的能力，尽量还是去提 issue 和 PR。

  [patch-package-官方](https://github.com/ds300/patch-package)
