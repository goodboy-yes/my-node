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
