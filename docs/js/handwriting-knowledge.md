# 手写知识点

## 原生的 AJAX 请求

```javascript
const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // 第三个参数异步与否
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responeText);
      }
    };
    xhr.send();
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responeText);
      }
    };
    xhr.send(data);
  },
};
```

## instanceof 关键字

```javascript
function instanceOf(father, child) {
  const fp = father.prototype;
  var cp = child.__proto__;

  while (cp) {
    if (cp === fp) {
      return true;
    }
    cp = cp.__proto__;
  }

  return false;
}
```

## 实现一个 LRU 缓存函数

LRU 最近最少使用缓存机制

```javascript
class LRUCache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  get(key) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      const val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    } else {
      return -1;
    }
  }

  put(key, val) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      this.cache.delete(key);
    }
    this.cache.set(key, val);
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
```

## compose 组合函数实现

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

## 手写 Promise

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
