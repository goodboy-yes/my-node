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
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(0, 51, 255);
// Result: #0033ff
```

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
Object.fromEntries(new URLSearchParams(window.location.search));
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
