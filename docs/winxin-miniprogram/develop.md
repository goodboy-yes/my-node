# 开发

## WXML 模板

WXML 全称是 WeiXin Markup Language，是小程序框架设计的一套标签语言，结合小程序的基础组件、事件系统，可以构建出页面的结构。

### 标签

```html
<!--一个简单的文本标签 -->
<text>hello world</text>

<!-- view 中包含了 text 标签 -->
<view>
  <text>hello world</text>
</view>

<!-- 使用一个 <block/> 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。 -->
<!-- <block/> 仅仅是一个包装元素，不会在页面中做任何渲染 -->
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

- WXML 要求标签必须是严格闭合的，没有闭合将会导致编译错误。
- WXML中的属性是大小写敏感的，也就是说 class 和 Class 在WXML中是不同的属性

### 数据绑定

WXML 通过 {{变量名}} 来绑定 WXML 文件和对应的 JavaScript 文件中的 data 对象属性。
```html
<!--
{
  time: (new Date()).toString()
}
-->
<text>当前时间：{{time}}</text>
<!-- 属性值必须被包裹在双引号中 -->
<text data-test="{{test}}"> hello world</text>
```

### 条件逻辑

WXML 中，使用 wx:if="{{condition}}" 来判断是否需要渲染该代码块：

```html
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>

<!-- 使用一个 <block/> 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。 -->
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

### 列表渲染

使用 wx:for 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`

```html
<!-- array 是一个数组 -->
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>

<!-- 对应的脚本文件
Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
-->
```

使用 wx:for-item 指定数组当前元素的变量名，使用 wx:for-index 指定数组当前下标的变量名：

```html 
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```
类似 block wx:if ，也可以将 wx:for 用在 `<block/>` 标签上，以渲染一个包含多节点的结构块。例如：

```html 
<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```
使用 wx:key 来指定列表中项目的唯一的标识符

wx:key 的值以两种形式提供：

- 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。

- 保留关键字 this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字

```html 
<switch wx:for="{{objectArray}}" wx:key="unique" > {{item.id}} </switch>
<switch wx:for="{{numberArray}}" wx:key="*this" > {{item}} </switch>
```

### 模板

WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用。使用 name 属性，作为模板的名字。

```html 
<!--
item: {
  index: 0,
  msg: 'this is a template',
  time: '2016-06-18'
}
-->

<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>

<template is="msgItem" data="{{...item}}"/>

<!-- 输出
0: this is a template Time: 2016-06-18
-->
```

### 引用

WXML 提供两种文件引用方式import和include。

import 可以在该文件中使用目标文件定义的 template，需要注意的是 import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件中 import 的 template，简言之就是 import 不具有递归的特性。

```html
<import src="b.wxml"/>

<template is="A"/>  

```

include 可以将目标文件中除了 `<template/>` `<wxs/>` 外的整个代码引入，相当于是拷贝到 include 位置

```html
<!-- index.wxml -->
<include src="header.wxml"/>

<view> body </view>

<include src="footer.wxml"/>
```

### 共同属性

| 属性名       | 类型         | 描述           | 注解                                     |
| ------------ | ------------ | -------------- | ---------------------------------------- |
| id           | String       | 组件的唯一标识 | 整个页面唯一                             |
| class        | String       | 组件的样式类   | 在对应的 WXSS 中定义的样式类             |
| style        | String       | 组件的内联样式 | 可以动态设置的内联样式                   |
| hidden       | Boolean      | 组件是否显示   | 所有组件默认显示                         |
| data-*       | Any          | 自定义属性     | 组件上触发的事件时，会发送给事件处理函数 |
| bind*/catch* | EventHandler | 组件的事件     |


## WXSS 样式

### 尺寸单位

在WXSS中，引入了rpx（responsive pixel）尺寸单位。引用新尺寸单位的目的是，适配不同宽度的屏幕，开发起来更简单。

小程序编译后，rpx会做一次px换算。换算是以375个物理像素为基准，也就是在一个宽度为375物理像素的屏幕下，1rpx = 1px。

例如iPhone6屏幕宽度为375px，共750个物理像素，那么1rpx = 375 / 750 px = 0.5px。

### WXSS引用

```css
@import './test_0.wxss'
```

由于WXSS最终会被编译打包到目标文件中，用户只需要下载一次，在使用过程中不会因为样式的引用而产生多余的文件请求。

### 内联样式

小程序支持动态更新内联样式：

```html 
<!--可动态变化的内联样式-->
<!--
{
  eleColor: 'red',
  eleFontsize: '48rpx'
}
-->
<view style="color: {{eleColor}}; font-size: {{eleFontsize}}"></view>

```

## JavaScript 脚本

### 执行环境

小程序中的 JavaScript 是由ECMAScript 以及小程序框架和小程序 API 来实现的。同浏览器中的JavaScript 相比没有 BOM 以及 DOM 对象，所以类似 JQuery、Zepto这种浏览器类库是无法在小程序中运行起来的，同样的缺少 Native 模块和NPM包管理的机制，小程序中无法加载原生库，也无法直接使用大部分的 NPM 包。 

### 执行顺序

小程序中的脚本执行顺序有所不同。小程序的执行的入口文件是 app.js 。并且会根据其中 require 的模块顺序决定文件的运行顺序，当 app.js 执行结束后，小程序会按照开发者在 app.json 中定义的 pages 的顺序，逐一执行。

### 作用域

小程序在文件中声明的变量和函数只在该文件中有效，不同的文件中可以声明相同名字的变量和函数，不会互相影响，当需要使用全局变量的时，通过使用全局函数 `getApp()` 获取全局的实例，并设置相关属性值，来达到设置全局变量的目的

```javascript
// a.js
// 获取全局变量
var global = getApp()
global.globalValue = 'globalValue'

// b.js
// 访问全局变量
var global = getApp()
console.log(global.globalValue) // 输出 globalValue
```

当需要保证全局的数据可以在任何文件中安全的被使用到，那么可以在 App() 中进行设置

```javascript
// app.js
App({
  globalData: 1
})
```

## 程序

### 程序构造器App()

宿主环境提供了 App() 构造器用来注册一个程序App，需要留意的是App() 构造器必须写在项目根目录的app.js里，App实例是单例对象，在其他JS脚本中可以使用宿主环境提供的 getApp() 来获取程序实例。

```javascript
// app.js
// 
App({
  onLaunch: function(options) {},
  onShow: function(options) {},
  onHide: function() {},
  onError: function(msg) {},
  globalData: 'I am global data'
})

// other.js
var appInstance = getApp()
console.log(appInstance.globalData) // 输出: I am global data
```

### 生命周期

初次进入小程序的时候，微信客户端初始化好宿主环境，同时从网络下载或者从本地缓存中拿到小程序的代码包，把它注入到宿主环境，初始化完毕后，微信客户端就会给App实例派发onLaunch事件，App构造器参数所定义的onLaunch方法会被调用。

进入小程序之后，用户可以点击右上角的关闭，或者按手机设备的Home键离开小程序，此时小程序并没有被直接销毁，我们把这种情况称为“小程序进入后台状态”，App构造器参数所定义的onHide方法会被调用。

当再次回到微信或者再次打开小程序时，微信客户端会把“后台”的小程序唤醒，我们把这种情况称为“小程序进入前台状态”，App构造器参数所定义的onShow方法会被调用。

我们可以看到，App的生命周期是由微信客户端根据用户操作主动触发的。为了避免程序上的混乱，我们不应该从其他代码里主动调用App实例的生命周期函数。

在微信客户端中打开小程序有很多途径，微信客户端会把不同途径的打开方式带给onLaunch和onShow的调用参数options，具体查看[文档](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004eec99acc808b00861a5bd5280a)

### 小程序全局数据

小程序的每个页面各自有一个WebView线程进行渲染，小程序切换页面时，小程序逻辑层的JS脚本运行上下文依旧在同一个JsCore线程中。

不同页面直接可以通过App实例下的属性来共享数据。App构造器可以传递其他参数作为全局属性以达到全局共享数据的目的。

## 页面

### 文件构成和路径

一个页面的文件需要放置在同一个目录下，其中WXML文件和JS文件是必须存在的，JSON和WXSS文件是可选的。

页面路径需要在小程序代码根目录app.json中的pages字段声明，否则这个页面不会被注册到宿主环境中，默认pages字段的第一个页面路径为小程序的首页。

### 页面构造器Page()

宿主环境提供了 Page() 构造器用来注册一个小程序页面，Page()在页面脚本page.js中调用

```javascript
Page({
  data: { text: "This is page data." },
  onLoad: function(options) { },
  onReady: function() { },
  onShow: function() { },
  onHide: function() { },
  onUnload: function() { },
  onPullDownRefresh: function() { },
  onReachBottom: function() { },
  onShareAppMessage: function () { },
  onPageScroll: function() { }
})
```

### 页面的生命周期和打开参数

页面初次加载的时候，微信客户端就会给Page实例派发onLoad事件，Page构造器参数所定义的onLoad方法会被调用，onLoad在页面没被销毁之前只会触发1次，在onLoad的回调中，可以获取当前页面所调用的打开参数option

页面显示之后，Page构造器参数所定义的onShow方法会被调用，一般从别的页面返回到当前页面时，当前页的onShow方法都会被调用。

在页面初次渲染完成时，Page构造器参数所定义的onReady方法会被调用，onReady在页面没被销毁前只会触发1次，onReady触发时，表示页面已经准备妥当，在逻辑层就可以和视图层进行交互了。

以上三个事件触发的时机是onLoad早于 onShow，onShow早于onReady。

页面不可见时，Page构造器参数所定义的onHide方法会被调用，这种情况会在使用wx.navigateTo切换到其他页面、底部tab切换时触发。

当前页面使用wx.redirectTo或wx.navigateBack返回到其他页时，当前页面会被微信客户端销毁回收，此时Page构造器参数所定义的onUnload方法会被调用。

我们可以通过onLoad回调的参数option拿到url传递的参数

```javascript
// pages/list/list.js
// 列表页使用navigateTo跳转到详情页
wx.navigateTo({ url: 'pages/detail/detail?id=1&other=abc' })

// pages/detail/detail.js
Page({
  onLoad: function(option) {
        console.log(option.id)
        console.log(option.other)
  }
})
```

和网页URL一样，页面URL上的value如果涉及特殊字符（例如：&字符、?字符、中文字符等，详情参考URI的RFC3986说明 ），需要采用UrlEncode后再拼接到页面URL上。

### 页面的数据

Page构造器的data字段是页面第一次渲染时从逻辑层传递到渲染层的数据。

```javascript
<!-- page.wxml -->
<view>{{text}}</view>
<view>{{array[0].msg}}</view>

// page.js
Page({
  data: {
    text: 'init data',
    array: [{msg: '1'}, {msg: '2'}]
  }
})
```

宿主环境所提供的Page实例的原型中有setData函数，setData传递数据实际是一个异步的过程，所以setData的第二个参数是一个callback回调，在这次setData对界面渲染完毕后触发。

setData其一般调用格式是 setData(data, callback)，其中data是由多个key: value构成的Object对象。

页面的data数据会涉及相当多的字段，并不需要每次都将整个data字段重新设置一遍，只需要把改变的值进行设置即可，宿主环境会自动把新改动的字段合并到渲染层对应的字段中

data中的key还可以非常灵活，以数据路径的形式给出，例如 `this.setData({"d[0]": 100}); this.setData({"d[1].text": 'Goodbye'});` 我们只要保持一个原则就可以提高小程序的渲染性能：每次只设置需要改变的最小单位数据。

```javascript
// page.js
Page({
  data: {
    a: 1, b: 2, c: 3,
    d: [1, {text: 'Hello'}, 3, 4]
  }
  onLoad: function(){
       // a需要变化时，只需要setData设置a字段即可
    this.setData({a : 2})
  }
})
```

此外需要注意以下3点：

- 直接修改 Page实例的this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
- 由于setData是需要两个线程的一些通信消耗，为了提高性能，每次设置的数据不应超过1024kB。
- 不要把data中的任意一项的value设为undefined，否则可能会有引起一些不可预料的bug。

### 页面的用户行为

小程序宿主环境提供了四个和页面相关的用户行为回调：

1. 下拉刷新 onPullDownRefresh
监听用户下拉刷新事件，需要在app.json的window选项中或页面配置page.json中设置enablePullDownRefresh为true。当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
2. 上拉触底 onReachBottom
监听用户上拉触底事件。可以在app.json的window选项中或页面配置page.json中设置触发距离onReachBottomDistance。在触发距离内滑动期间，本事件只会被触发一次。
3. 页面滚动 onPageScroll
监听用户滑动页面事件，参数为 Object，包含 scrollTop 字段，表示页面在垂直方向已滚动的距离（单位px）。
4. 用户转发 onShareAppMessage
只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮，在用户点击转发按钮的时候会调用，此事件需要return一个Object，包含title和path两个字段，用于自定义转发内容

### 页面跳转和路由

一个小程序拥有多个页面，我们可以通过wx.navigateTo推入一个新的页面形成页面层级，页面层级称为页面栈。

- 使用 `wx.navigateTo({ url: 'pageD' })` 可以往当前页面栈多推入一个 pageD，此时页面栈变成 [ pageA, pageB, pageC, pageD ]。
- 使用 `wx.navigateBack()` 可以退出当前页面栈的最顶上页面。
- 使用`wx.redirectTo({ url: 'pageE' })` 是替换当前页变成pageE，当页面栈到达10层没法再新增的时候，往往就是使用redirectTo这个API进行页面跳转。
- 小程序提供了原生的Tabbar支持，我们可以在app.json声明tabBar字段来定义Tabbar页

```javascript
// app.json定义小程序底部tab
{
  "tabBar": {
    "list": [
      { "text": "Tab1", "pagePath": "pageA" },
      { "text": "Tab1", "pagePath": "pageF" },
      { "text": "Tab1", "pagePath": "pageG" }
    ]
  }
}
```

- 使用`wx.switchTab({ url: 'pageF' })`，此时原来的页面栈会被清空（除了已经声明为Tabbar页pageA外其他页面会被销毁），wx.navigateTo和wx.redirectTo只能打开非TabBar页面，wx.switchTab只能打开Tabbar页面。
- 使用 `wx. reLaunch({ url: 'pageH' })` 重启小程序，并且打开pageH，此时页面栈为 [ pageH ]。

## 事件

常见的事件类型见[文档](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=000846df9a03909b0086a50025180a)

事件绑定的写法和组件属性一致，以key="value"的形式，其中：

1. key以bind或者catch开头，然后跟上事件的类型，如bindtap、catchtouchstart。bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。自基础库版本1.5.0起，bind和catch后可以紧跟一个冒号，其含义不变，如bind:tap、catch:touchstart。同时bind和catch前还可以加上capture-来表示捕获阶段。
2. value是一个字符串，需要在对应的页面Page构造器中定义同名的函数，否则触发事件时在控制台会有报错信息。


以下示例中，点击 inner view 会先后调用handleTap2、handleTap4、handleTap3、handleTap1。

```javascript
<view
  id="outer"
  bind:touchstart="handleTap1"
  capture-bind:touchstart="handleTap2"
>
  outer view
  <view
    id="inner"
    bind:touchstart="handleTap3"
    capture-bind:touchstart="handleTap4"
  >
    inner view
  </view>
</view>
```

如果将上面代码中的第一个capture-bind改为capture-catch，将只触发handleTap2(capture-catch将中断捕获阶段和取消冒泡阶段)

## 兼容

我们可以使用 wx.getSystemInfo 或者 wx.getSystemInfoSync 来获取手机品牌、操作系统版本号、微信版本号以及小程序基础库版本号等

小程序还提供了wx.canIUse这个API，用于判断接口或者组件在当前宿主环境是否可用，其参数格式为: `${API}.${method}.${param}.${options}`或者`${component}.${attribute}.${option}`
- ${API} 代表 API 名字
- ${method} 代表调用方式，有效值为return, success, object, callback
- ${param} 代表参数或者返回值
- ${options} 代表参数的可选值
- ${component} 代表组件名字
- ${attribute} 代表组件属性
- ${option} 代表组件属性的可选值

在不得已的情况下（小程序强依赖某个新的API或者组件时），还可以通过在小程序管理后台设置“基础库最低版本设置”来达到不向前兼容的目的。当不满足最低版本的微信用户打开你的小程序的时候，微信客户端会显示当前小程序不可用，并且提示用户应该去升级微信客户端。

>参考资料：
[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
