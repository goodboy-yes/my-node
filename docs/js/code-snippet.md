# 代码段

## 求两个整数之间的随机数

```js
//[min,max)不包含max
function getRandom(min, max) {
  return Math.floor((max - min) * Math.random() + min);
}
```

## 阻止点击默认行为

`preventDefault()`阻止事件的默认行为但不支持 IE，IE 中使用 `returnValue` 阻止事件默认行为

```js
function stopDefault(e) {
  if (e && e.preventDefault) e.preventDefault();
  else window.event.returnValue = false;
}
```

##  检查对象是否为空

判断对象是否等于 `{}` 都会返回 false，即使该对象为空。下面的代码可以帮助判断对象是否为空

```js
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
```

## 打乱数组
```js
const shuffle = arr => arr.sort(() => 0.5 - Math.random())
```

## 数组求和，最小值和最大值

我们可以利用 reduce方法快速找到基本的数学运算。

```js
const array  = [5,4,7,8,9,2];

array.reduce((a,b) => a+b); // 求和
array.reduce((a,b) => a>b?a:b); // 最大值
array.reduce((a,b) => a<b?a:b); // 最小值
```

## 从数组中过滤到虚值

像 0, undefined, null, false, "", ''这样的假值可以通过`filter`方法过滤掉。

```js
const array = [3, 0, 6, 7, '', false];
array.filter(Boolean);
```