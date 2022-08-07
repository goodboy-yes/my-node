# 设计模式

## 工厂模式

简单的工厂模式可以理解为解决多个相似的问题

```js
function CreatePerson(name, age, sex) {
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sex = sex;
  obj.sayName = function () {
    return this.name;
  };
  return obj;
}
var p1 = new CreatePerson("longen", "28", "男");
var p2 = new CreatePerson("tugenhua", "27", "女");
console.log(p1.name); // longen
console.log(p1.age); // 28
console.log(p1.sex); // 男
console.log(p1.sayName()); // longen

console.log(p2.name); // tugenhua
console.log(p2.age); // 27
console.log(p2.sex); // 女
console.log(p2.sayName()); // tugenhua
```

## 策略模式

策略模式就是将一系列算法封装起来，并使它们相互之间可以替换。被封装起来的算法具有独立性，外部不可改变其特性

**举例：**

假如今天是双十一，商城有促销，促销方案如下：

1、满 100 减 5
2、满 200 减 15
3、满 300 减 30
4、满 400 减 50

设计一个算法来计算促销后的价格

```js
function full100(price) {
  return price - 5;
}
function full200(price) {
  return price - 15;
}
function full300(price) {
  return price - 30;
}
function full400(price) {
  return price - 50;
}
function calculate(type, price) {
  if (type == "full100") {
    return full100(price);
  }
  if (type == "full200") {
    return full200(price);
  }
  if (type == "full300") {
    return full300(price);
  }
  if (type == "full400") {
    return full400(price);
  }
}
```

从代码上看确实没啥毛病，但是如果情况有变呢？岂不是每添加一个方案就会写一个方法和一个 if 判断。显然，这种方式扩展性不高，需要改正

我们可以封装到一个对象中，每个算法都封装为一个方法，再写一个调用计算的方法给外部调用，再给它一个接口完成促销方案的添加。

```js
var countPrice = {
  returnPrice: {
    full100: function (price) {
      return price - 5;
    },
    full200: function (price) {
      return price - 15;
    },
    full300: function (price) {
      return price - 30;
    },
    full400: function (price) {
      return price - 50;
    },
  },
  getPirce: function (type, money) {
    return this.returnPrice[type] ? this.returnPrice[type](money) : money;
  },
  addRule: function (type, discount) {
    this.returnPrice[type] = function (price) {
      return price - discount;
    };
  },
};

console.log(countPrice.getPirce("full300", 399));
// 输出 369
countPrice.addRule("full500", 100);
console.log(countPrice.getPirce("full500", 599));
// 输出 499
```

策略模式属于对象行为型模式，主要针对一组算法，将每一个算法封装到具有共同接口的独立的类中， 而使得它们可以相互替换。通常，策略模式适用于当一个应用程序需要实现一种特定的服务或者功能，而且该程序有多种实现方式时使用。

用策略模式这种方式可以避免由于使用条件语句而带来的代码混乱，提高应用程序的灵活性与条理性

**优点：**

1. **优化多重条件判断**，采用策略模式是的算法更利于维护
2. **可扩展性**，策略模式提供了对“开闭原则”的完美支持，用户可以在不修改原有系统的基础上选择算法或行为，也可以灵活地增加新的算法或行为。
3. **策略类之间可以自由切换**，由于策略类都实现同一个接口，所以使它们之间可以自由切换。

**缺点：**

1. 由于选择哪种算法的决定权在用户，所以对用户来说就必须了解每种算法的实现。 对于用户，也就是没有参与封装的其他开发者来说，他们并不知道有哪些方法可以使用，如果不去阅读这些算法，很容易走回以前的老套路或者重复封装。这也是策略模式一个比较大的缺点。
2. 由于每种算法间相互独立，这样对于一些复杂的算法处理相同逻辑的部分无法实现共享，这就会造成一些资源的浪费。

当然，策略模式的优点是有目共睹的，将一个个算法封装起来，提高代码复用率，减少代码冗余；策略模式可看作为`if/else`判断的另一种表现形式，在达到相同目的的同时，极大的减少了代码量以及代码维护成本。

## 单例模式

**什么是单例模式？**

单例模式是只允许实例化一次的对象类，即一个类只有一个实例。单例模式可以作为命名空间管理，也可以用来管理静态变量，甚至可以说，某个模块无论创建多少次，只要在窗口中只能存在一个的这样的模块，都能用单例模式来封装

例如

```js
var Universe;

(function () {
  var instance;

  Universe = function Universe() {
    if (instance) {
      return instance;
    }

    instance = this;

    // 其它内容
    this.start_time = 0;
    this.bang = "Big";
  };
})();

//测试代码
var a = new Universe();
var b = new Universe();
alert(a === b); // true
a.bang = "123";
alert(b.bang); // 123
```

ES6 实现

```js
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

const single1 = new Singleton();
const single2 = new Singleton();

console.log(single1 === single2); // true
```

单例模式封装

```js
class SingleTon {
  constructor(fn) {
    let singleInstance;
    function singleConstructor(...args) {
      // 第一次实例化
      if (!singleInstance) {
        singleInstance = new fn(...args);
      }
      // 多次实例化直接返回
      return singleInstance;
    }

    singleConstructor.prototype = Object.create(fn.prototype);
    return singleConstructor;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log("My name is ", this.name);
  }
}
const createPerson = new SingleTon(Person);
const p1 = new createPerson("lebron");
const p2 = new createPerson("james");
p1.init(); // My name is  lebron
p2.init(); // My name is  lebron
console.log(p1 === p2); // true

class Tool {
  constructor(number) {
    this.number = number;
  }

  init() {
    console.log("This is tool ", this.number);
  }
}
const createTool = new SingleTon(Tool);
const t1 = new createTool(1);
const t2 = new createTool(2);
t1.init(); // This is tool  1
t2.init(); // This is tool  1
console.log(t1 === t2); // true
```

## 发布订阅

仿 vue 源码

```js
class EventBus {
  constructor() {
    this.eventList = {};
  }
  $on(event, fn) {
    const that = this;
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        that.$on(event[i], fn);
      }
    } else {
      (that.eventList[event] || (that.eventList[event] = [])).push(fn);
    }
    return that;
  }

  $emit(event) {
    const that = this;
    const _fnList = that.eventList[event];
    if (!_fnList || _fnList.length === 0) {
      console.log(`暂无注册${event}事件`);
    } else {
      const _arguments = Array.from(arguments).slice(1);
      for (let i = 0; i < _fnList.length; i++) {
        _fnList[i].call(that, ..._arguments);
      }
    }
    return that;
  }

  $off(event, fn) {
    const that = this;
    if (!arguments.length) {
      that.eventList = Object.create(null);
      return that;
    }
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        that.$off(event[i], fn);
      }
    }
    const _events = this.eventList[event];
    if (!_events) {
      console.log(`${event}事件无操作`);
      return that;
    }
    if (!fn) {
      this.eventList[event] = [];
      return that;
    }
    let _i = _events.length;
    while (_i--) {
      if (_events[_i] === fn || _events[_i].fn === fn) {
        _events.splice(_i, 1);
      }
      break;
    }
    return that;
  }

  $once(event, fn) {
    const that = this;
    function on() {
      that.$off(event, on);
      fn.apply(that, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return that;
  }
}
```

或者使用构造函数

```js
function EventBus() {
    this.eventList = {};
}
EventBus.prototype.$on = function (event, fn) {
    const that = this;
    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            that.$on(event[i], fn);
        }
    } else {
        (that.eventList[event] || (that.eventList[event] = [])).push(fn);
    }
    return that;
};

EventBus.prototype.emit....// 其余函数实现见上方

```

## 沙箱模式

将一些函数放到自执行函数里面,但要用闭包暴露接口,用变量接收暴露的接口,再调用里面的值,否则无法使用里面的值

```js
let sandboxModel = (function () {
  function sayName() {}
  function sayAge() {}
  return {
    sayName: sayName,
    sayAge: sayAge,
  };
})();
```

## 代理模式

代理模式（Proxy Pattern）是为一个对象提供一个代用品或占位符，以便控制对它的访问

**缓存代理**
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果

```javascript
// 无代理
var muti = function () {
  console.log("开始计算乘积");
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};

// 缓存代理
var proxyMult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = mult.apply(this, arguments));
  };
})();

proxyMult(1, 2, 3, 4); // 输出:24
proxyMult(1, 2, 3, 4); // 输出:24
```

**虚拟代理**

例如图片预加载功能
未使用代理模式，MyImage 对象除了负责给 img 节点设置 src 外，还要负责预加载图片，违反了面向对象设计的原则——单一职责原则

```javascript
let MyImage = (function () {
  let imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  // 创建一个Image对象，用于加载需要设置的图片
  let img = new Image();

  img.onload = function () {
    // 监听到图片加载完成后，设置src为加载完成后的图片
    imgNode.src = img.src;
  };

  return {
    setSrc: function (src) {
      // 设置图片的时候，设置为默认的loading图
      imgNode.src =
        "https://img.zcool.cn/community/01deed576019060000018c1bd2352d.gif";
      // 把真正需要设置的图片传给Image对象的src属性
      img.src = src;
    },
  };
})();

MyImage.setSrc("https://xxx.jpg");
```

使用代理模式

```javascript
// 图片本地对象，负责往页面中创建一个img标签，并且提供一个对外的setSrc接口
let myImage = (function () {
  let imgNode = document.createElement("img");
  document.body.appendChild(imgNode);

  return {
    //setSrc接口，外界调用这个接口，便可以给该img标签设置src属性
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();
// 代理对象，负责图片预加载功能
let proxyImage = (function () {
  // 创建一个Image对象，用于加载需要设置的图片
  let img = new Image();
  img.onload = function () {
    // 监听到图片加载完成后，给被代理的图片本地对象设置src为加载完成后的图片
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      // 设置图片时，在图片未被真正加载好时，以这张图作为loading，提示用户图片正在加载
      myImage.setSrc(
        "https://img.zcool.cn/community/01deed576019060000018c1bd2352d.gif"
      );
      img.src = src;
    },
  };
})();

proxyImage.setSrc("https://xxx.jpg");
```

代理对象负责在图片未加载完成之前，引入预加载的 loading 图，负责了图片预加载的功能

并且上述代理模式可以发现，代理和本体接口的一致性，如果有一天不需要预加载，那么就不需要代理对象，可以选择直接请求本体。其中关键是代理对象和本体都对外提供了 setSrc 方法

> [参考链接](https://www.zhihu.com/people/jacobwuzdong/posts)
