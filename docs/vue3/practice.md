# 实践

## 拖拽指令

利用 transform 开发的自定义拖拽指令，[项目地址](https://github.com/goodboy-yes/my-code/tree/master/vue-drag)

## 捕获异常

有时 Vue3 报错提示不明显，可以在 main.js 添加以下代码捕获

```js
app.config.errorHandler = (err, vm, info) => {
  console.log('😊😊😊[全局异常]', err, vm, info)
}
```
