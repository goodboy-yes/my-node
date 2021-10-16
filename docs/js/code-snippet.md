# 代码段

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
