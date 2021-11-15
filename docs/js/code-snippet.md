# 小技巧

## 时间处理

### 给定日期转为 hh::mm::ss 格式

```js
const timeFromDate = (date) => date.toTimeString().slice(0, 8);

console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)));
```

## 数组

### 从数组中过滤掉虚值

像 0, undefined, null, false, "", ''这样的假值可以通过`filter`方法过滤掉。

```js
const array = [3, 0, 6, 7, "", false];
array.filter(Boolean);
```

### 数组求和，最小值和最大值

我们可以利用 reduce 方法快速找到基本的数学运算。

```js
const array = [5, 4, 7, 8, 9, 2];

array.reduce((a, b) => a + b); // 求和
array.reduce((a, b) => (a > b ? a : b)); // 最大值
array.reduce((a, b) => (a < b ? a : b)); // 最小值
```

### 打乱数组

```js
const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
```

### 生成指定长度的数组

```javascript
const List = (len) => [...new Array(len).keys()];
const list = List(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 检查数组中的假值

```javascript
const myArray = [null, false, "Hello", undefined, 0];

// 过滤虚值
const filtered = myArray.filter(Boolean);
console.log(filtered); // ['Hello']

// 检查至少一个值是否为真
const anyTruthy = myArray.some(Boolean);
console.log(anyTruthy); // true

// 检查所有的值是否为真
const allTruthy = myArray.every(Boolean);
console.log(allTruthy); // false
```

Boolean 函数本身接受一个参数，并根据参数的真实性返回 true 或 false。所以：

```javascript
myArray.filter((val) => Boolean(val));
```

等价于：

```javascript
myArray.filter(Boolean);
```

## DOM 操作

### 回到顶部

```js
const goToTop = () => window.scrollTo(0, 0);

goToTop();
```

### 阻止点击默认行为

`preventDefault()`阻止事件的默认行为但不支持 IE，IE 中使用 `returnValue` 阻止事件默认行为

```js
function stopDefault(e) {
  if (e && e.preventDefault) e.preventDefault();
  else window.event.returnValue = false;
}
```

### 复制内容到剪贴板

```js
export function copyToBoard(value) {
  const element = document.createElement("textarea");
  document.body.appendChild(element);
  element.value = value;
  element.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    document.body.removeChild(element);
    return true;
  }
  document.body.removeChild(element);
  return false;
}
```

或

```js
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

copyToClipboard("Hello World");
```

### 检查一个元素是否被聚焦

```javascript
const hasFocus = (ele) => ele === document.activeElement;
```

### 获取选中文本

```javascript
const getSelectedText = () => window.getSelection().toString();
```

## 数值操作

### 求两个整数之间的随机数

```js
//[min,max)不包含max
function getRandom(min, max) {
  return Math.floor((max - min) * Math.random() + min);
}
```

### 去除重复值

```js
const array = [5, 4, 7, 8, 9, 2, 7, 5];
array.filter((item, idx, arr) => arr.indexOf(item) === idx);
// or
const nonUnique = [...new Set(array)];
// Output: [5, 4, 7, 8, 9, 2]
```

### 将十进制转换为二进制或十六进制

```js
const num = 10;

num.toString(2);
// 输出: "1010"
num.toString(16);
// 输出: "a"
num.toString(8);
// 输出: "12"
```

### 颜色 RGB 转十六进制

```js
// (1 << 24)的作用为保证结果是6位数
// slice(1)的作用是去除字符串的最高位，即前面加的(1 << 24)
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(0, 51, 255);
// Result: #0033ff
```

### 位运算提升效率

```javascript
// ｜ 取整
let num1 = 1.7;
num1 = num1 | 0;

// << 加倍
let num3 = 6;
num3 = num3 << 1; / / 12

// & 判断奇数
let num6 = 10;
let num7 = 11;
num6 & 1 === 1; // true
num7 & 1 === 1; // false

// ^ 交换值
let num4 = 10;
let num5 = 20;
num4 ^= num5; // num4 = num4^num5 ^:异或
num5 ^= num4;
num4 ^= num5; // num4 === 20, num5 === 10

// ~ 判断是否存在
const data = '123456';
const key = '3';
const keyIsExist = !!~data.indexOf(key); // true ~：否运算符
```

[位运算](https://goodboy-yes.github.io/my-notes/js/bit-operation.html)

## 脚本操作

### 检查对象是否为空

判断对象是否等于 `{}` 都会返回 false，即使该对象为空。下面的代码可以帮助判断对象是否为空

```js
const isEmpty = (obj) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
```

### 休眠

```js
/**
 * 休眠xxxms
 * @param {Number} milliseconds
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//使用方式
const fetchData = async () => {
  await sleep(1000);
};
```

### 解析连接 url

```js
// 创建a标签
const aEle = document.createElement("a");
// 给a标签赋值href路径
aEle.href = "/test.html";
// 访问aEle中的属性
aEle.protocol; // 获取协议
aEle.pathname; // 获取path
aEle.origin;
aEle.host;
aEle.search;
```

### 从 URL 获取查询参数

```js
const getParameters = (URL) => {
  URL = JSON.parse(
    '{"' +
      decodeURI(URL.split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return JSON.stringify(URL);
};

getParameters(window.location.search); //goole.com?search=easy&page=3
// Result: { search : "easy", page : 3 }
```

或者

```js
const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
console.log(q);
```

或者

```js
Object.fromEntries(new URLSearchParams(window.location.search));
```

或者

```javascript
//利用 new URL 解析 URL
const parseURL = (url = "") => {
  const res = new URL(url);
  res.queryParams = (key) => {
    if (key) {
      //res.searchParams: URLSearchParams {}
      return res.searchParams.get(key);
    }
    const params = {};
    const paramGroup = res.search.replace(/^\?/, "").split("&");
    paramGroup.forEach((param) => {
      const [key, val] = param.split("=");
      params[key] = val;
    });
    return params;
  };
  return res;
};
parseURL("https://www.example.com/a/b?c=1&d=2");
```

### 生成随机字符串

```js
const str = Math.random().toString(36).substr(2, 10);
console.log(str);
```

Math.random() 生成 [0, 1) 的数，也就是 0.123312、0.982931 之类的，然后调用 number 的 toString 方法将其转换成 36 进制的，按照 MDN 的说法，36 进制的转换应该是包含了字母 a~z 和 数字 0~9 的，因为这样生成的是 0.89kjna21sa 类似这样的，所以要截取一下小数部分，即从索引 2 开始截取 10 个字符就是我们想要的随机字符串了

### 获取当前调用栈

```js
function firstFunction() {
  secondFunction();
}
function secondFunction() {
  thridFunction();
}
function thridFunction() {
  console.log(new Error().stack);
}

firstFunction();

//=> Error
//  at thridFunction (<anonymous>:2:17)
//  at secondFunction (<anonymous>:5:5)
//  at firstFunction (<anonymous>:8:5)
//  at <anonymous>:10:1
```

new Error().stack 这样就能随时获取到当前代码执行的调用栈信息，也不失一种调试代码的办法

### 判断数据类型

```javascript
const type = (data) => {
  let toString = Object.prototype.toString;
  const dataType =
    data instanceof Element
      ? "element" // 为了统一DOM节点类型输出
      : toString
          .call(data)
          .replace(/\[object\s(.+)\]/, "$1")
          .toLowerCase();
  return dataType;
};

type({}); // object
```

### 有条件地向对象添加属性

我们可以使用展开运算符号(...)来有条件地向 JS 对象快速添加属性。

```javascript
const condition = true;
const person = {
  id: 1,
  name: "John Doe",
  ...(condition && { age: 16 }),
};
```

### 使用 Promise 取消请求

当 Button 被频繁点击时，会在短时间内发出大量的请求，同时也会因请求响应的先后次序不同而导致渲染的数据与预期不符

我们通常只希望渲染最后一次发出请求响应的数据，而其他数据则丢弃。因此，我们需要丢弃（或不处理）除最后一次请求外的其他请求的响应数据。

axios 已经有了很好的实践，在 axios 中因为所有异步都是由 xhr 发出的，所以 axios 的实现中还借助了 xhr.abort()来取消一个请求。

在这里我们使用 Promise 来实现这个功能

```javascript
function CancelablePromise() {
  this.pendingPromise = null;
}

// 包装一个请求并取消重复请求
CancelablePromise.prototype.request = function (requestFn) {
  if (this.pendingPromise) {
    this.cancel("取消重复请求");
  }
  const _promise = new Promise((resolve, reject) => (this.reject = reject));
  this.pendingPromise = Promise.race([requestFn(), _promise]);
  return this.pendingPromise;
};

// 取消当前请求
CancelablePromise.prototype.cancel = function (reason) {
  // this.reject存放了上一次请求_promise的reject
  this.reject(new Error(reason));
  this.pendingPromise = null;
};

// ----------下面是测试用例------------

// 模拟一个异步请求函数
function createRequest(delay) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, delay);
    });
}

const cancelPromise = new CancelablePromise();
// 前四个请求将被自动取消
for (let i = 0; i < 5; i++) {
  cancelPromise
    .request(createRequest(1000))
    .then((res) => console.log(res)) // 最后一个 done
    .catch((err) => console.error(err)); // 前四个 error: 取消重复请求
}
```

**还有请求超时处理**

```javascript
// 用于超时一个Promise的工具
function timeoutPromise(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Timeout!");
    }, delay);
  });
}

// 设置foo()超时
Promise.race([foo(), timeoutPromise(3000)]).then(
  function () {
    // foo(..)及时完成！
  },
  function (err) {
    // 或者foo()被拒绝，或者只是没能按时完成
    // 查看err来了解是哪种情况
  }
);
```

### 手写 Promise

```javascript
function Promise(callback) {
  const pending = "pending";
  const fulfilled = "fulfilled";
  const rejected = "rejected";
  // 当前状态
  this.state = pending;
  // 当前值
  this.value = null;
  // 失败原因
  this.reason = null;
  // 成功和失败数组对象
  this.fulfilledCallback = [];
  this.rejectedCallback = [];

  // 成功处理
  this.resolve = (data) => {
    setTimeout(() => {
      if (this.state == pending) {
        this.state = fulfilled;
        this.value = data;
        this.fulfilledCallback.map((fn) => fn(this.value));
      }
    });
  };
  // 失败处理
  this.reject = (reason) => {
    setTimeout(() => {
      if (this.state == pending) {
        this.state = rejected;
        this.reason = reason;
        this.rejectedCallback.map((fn) => fn(this.reason));
      }
    });
  };
  // 捕获成功和失败，扔到成功和失败数组
  this.then = function (succesFn, errorFn) {
    succesFn && this.fulfilledCallback.push(succesFn);
    errorFn && this.rejectedCallback.push(errorFn);
    return this;
  };
  // 捕获异常，直接扔到异常数组中
  this.catch = (errorFn) => {
    errorFn && this.rejectedCallback.push(errorFn);
  };
  // 默认需要执行一次resolve和reject
  callback(this.resolve, this.reject);
}

// 验证结果
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
}).then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);
```

### compose 组合函数实现

```javascript
// 聚合函数
export default function compose(...funcs) {
  // 如果是空，直接返回空函数并接受一个参数
  if (funcs.length === 0) {
    return arg => arg
  }
  // 如果有一个，直接执行并返回结果
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 如果对reduce不了解，可以先去看下技术文章
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// Demo:
const add = num => num  + 10
const multiply = num => num * 2
const foo = compose(multiply, add)
foo(5) => 30
```

- compose 是一个聚合函数
- compose 执行后返回一个函数（所以这就是为什么当 func.length==0 的时候，要 return 一个箭头函数）
- reduce 始终返回一个箭头函数，后一个函数先执行并把结果作为前一个函数的参数，依次进行

### 数组转换为 Tree

```javascript
var list = [
  {
    id: 1,
    name: "jack",
    pid: 0,
  },
  {
    id: 2,
    name: "jack",
    pid: 1,
  },
  {
    id: 3,
    name: "jack",
    pid: 1,
  },
  {
    id: 4,
    name: "jack",
    pid: 2,
  },
];

const getTree = (root, result, pid) => {
  for (let i = 0; i < root.length; i++) {
    if (root[i].pid == pid) {
      let item = { ...root[i], children: [] };
      result.push(item);
      getTree(root, item.children, item.id);
    }
  }
};

let array = [];
getTree(list, array, 0);
console.log(JSON.stringify(array));
```

### 对象深拷贝

```javascript
// 对象深度克隆
let obj = {
  name: "jack",
  age: 10,
  fn: () => {
    return this.name;
  },
  list: ["fe", "node", "small"],
  all: {
    child: true,
  },
};
// 方法一：
JSON.parse(JSON.stringify(obj));
// 方法二：
function deepClone(obj) {
  let result;
  if (typeof obj === "object") {
    result = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
      result[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  } else {
    result = obj;
  }
  return result;
}
```

### 简易模板引擎

```javascript
const template = "嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}";

const data = {
  info: {
    name: {
      value: "张三",
    },
  },
  day: {
    value: "三",
  },
};

function render(template, data) {
  return template.replace(/{{\s+?([\w.]+)\s+?}}/g, function ($0, $1) {
    return eval(`data.${$1}`);
  });
}

const result = render(template, data);
// 嗨，张三您好，今天是星期三
console.log(result);
```

### 防抖动与函数截流

- **函数防抖**（debounce）：其概念其实是从机械开关和继电器的“去弹跳”（debounce）衍生出来的，基本思路就是把多个信号合并为一个信号。比如一个 `input` 每当输入结束后 0.5 秒执行搜索事件，这就是个很经典的防抖需求。
- **函数节流**（throttle）：节流的概念可以想象一下水坝，你建了水坝在河道中，不能让水流动不了，你只能让水流慢些。换言之，你不能让用户的方法都不执行。如果这样干，就是 debounce 了。为了让用户的方法在某个时间段内只执行一次，我们需要保存上次执行的时间点与定时器。

```javascript
//防抖,在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
function debounce(func, delay) {
  let timeOut;
  return function () {
    let args = arguments;
    if (timeOut) {
      clearTimeOut(timeOut);
    }
    timeOut = setTimeOut(() => {
      func.apply(this, args);
    }, delay);
  };
}
window.onscroll = debounce(() => {
  console.log("debounce");
}, 1000);

//截流,持续触发事件时，每隔一段时间，只执行一次函数。
// 函数节流会用在比input, keyup更频繁触发的事件中，如resize, touchmove, mousemove, scroll。
//`throttle` 会强制函数以固定的速率执行。因此这个方法比较适合应用于动画相关的场景。
function throttle(func, delay) {
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeOut(() => {
      clearTimeOut(timer);
      timer = null;
      func.apply(this, args);
    }, delay);
  };
}
```
