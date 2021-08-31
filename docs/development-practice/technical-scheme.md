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

## 更多NPM包

>[让我告诉你一些强无敌的 NPM 软件包](https://juejin.cn/post/6950584088462163982)

## 网页离开时的请求发送

[Navigator.sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向 web 服务器发送数据。

同步的 `XMLHttpRequest` 迫使用户代理延迟卸载文档，并使得下一个导航出现的更晚。有一些技术被用来保证数据的发送。其中一种是通过在卸载事件处理器中创建一个图片元素并设置它的 `src` 属性的方法来延迟卸载以保证数据的发送，但会延迟卸载以保证图片的载入

使用 `sendBeacon()` 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载。此外，代码实际上还要比其他技术简单许多！

