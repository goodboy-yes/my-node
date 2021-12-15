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

**入门版**

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

**进阶版**

[原文](https://juejin.cn/post/6844903665686282253)

```javascript
// 判断变量否为function
const isFunction = (variable) => typeof variable === "function";
// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    // 添加状态
    this._status = PENDING;
    // 添加状态
    this._value = undefined;
    // 添加成功回调函数队列
    this._fulfilledQueues = [];
    // 添加失败回调函数队列
    this._rejectedQueues = [];
    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  // 添加resovle时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value);
        }
      };
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while ((cb = this._rejectedQueues.shift())) {
          cb(error);
        }
      };
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
      if (val instanceof MyPromise) {
        val.then(
          (value) => {
            this._value = value;
            this._status = FULFILLED;
            runFulfilled(value);
          },
          (err) => {
            this._value = err;
            this._status = REJECTED;
            runRejected(err);
          }
        );
      } else {
        this._value = val;
        this._status = FULFILLED;
        runFulfilled(val);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  // 添加reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while ((cb = this._rejectedQueues.shift())) {
        cb(err);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  // 添加then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this;
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = (value) => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      // 封装一个失败时执行的函数
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(
          (res) => {
            values[i] = res;
            count++;
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values);
          },
          (err) => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err);
          }
        );
      }
    });
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) =>
        MyPromise.resolve(cb()).then(() => {
          throw reason;
        })
    );
  }
}
```
