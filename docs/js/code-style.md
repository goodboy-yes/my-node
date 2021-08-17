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
;(function () {
  console.log('hello')
})()

;`hello`.toString()
```

