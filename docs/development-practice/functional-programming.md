# 函数式编程

## 定义

函数式编程（英语：functional programming），又称泛函编程，是一种编程范式，它将电脑运算视为数学上的函数计算，并且避免使用程序状态以及易变对象。

## 一些概念

### 纯函数

纯函数是函数式编程的基石，无副作用的函数

- 函数在相同的输入值时，总是产生相同的输出。函数的输出和当前运行环境的上下文状态无关。
- 函数运行过程不影响运行环境，也就是无副作用（如触发事件、发起 http 请求、打印/log 等）

简单来说，也就是当一个函数的输出不受外部环境影响，同时也不影响外部环境时，该函数就是纯函数，也就是它只关注逻辑运算和数学运算，同一个输入总得到同一个输出。javascript 内置函数有不少纯函数，也有不少非纯函数。

纯函数：`Array.prototype.slice`，`Array.prototype.map`，`String.prototype.toUpperCase`

非纯函数：`Math.random`，`Date.now`，`Array.ptototype.splice`

纯函数在可缓存性、可移植性、可测试性以及并行计算方面都有着巨大的优势：

- 可以进行缓存。我们就可以采用动态规划的方法保存中间值，用来代替实际函数的执行结果，大大提升效率。
- 可以进行高并发。因为不依赖于环境，可以调度到另一个线程、worker 甚至其它机器上，反正也没有环境依赖。
- 容易测试，容易证明正确性。不容易产生偶现问题，也跟环境无关，非常利于测试。

### 函数柯里化

将一个低阶函数转换为高阶函数的过程就叫柯里化。

```js
//es5写法
var add = function (x) {
  return function (y) {
    return x + y;
  };
};

//es6写法
var add = (x) => (y) => x + y;

//试试看
var increment = add(1);
var addTen = add(10);

increment(2); // 3

addTen(2); // 12
```

函数柯里化是一种“预加载”函数的能力，通过传递一到两个参数调用函数，就能得到一个记住了这些参数的新函数。从某种意义上来讲，这是一种对参数的缓存。

### 声明式和命令式代码

**命令式代码**：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。

**声明式代码**：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。与命令式不同，声明式意味着我们要写表达式，而不是一步一步的指示。

```js
// 命令式
var makes = [];
for (var i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}

// 声明式
var makes = cars.map(function (car) {
  return car.make;
});
```

命令式的循环要求你必须先实例化一个数组，而且执行完这个实例化语句之后，解释器才继续执行后面的代码。然后再直接迭代 cars 列表，手动增加计数器

声明式的写法是一个表达式，如何进行计数器迭代，返回的数组如何收集，这些细节都隐藏了起来。它指明的是做什么，而不是怎么做，更加清晰和简洁。

函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。

相反，不纯的不函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。

### 偏函数和高阶函数

函数式编程与命令行编程体感上的最大区别：

- 函数是一等公式，我们应该熟悉变量中保存函数再对其进行调用

- 函数可以出现在返回值里，最重要的用法就是把输入是 n(n>2)个参数的函数转换成 n 个 1 个参数的串联调用，这就是传说中的柯里化。这种减少了参数的新函数，我们称之为**偏函数**

- 函数可以用做函数的参数，这样的函数称为**高阶函数**

## 使用方式

### 函数组合

当我们需要对数据做一系列操作时，往往使用嵌套调用函数的方式

```js
const shut = exclaim(toUpperCase(x));
```

这样代码是由内往外执行，不直观，我们希望代码从右往左执行，这个时候我们就得使用组合。

```js
//定义compose
var compose =
  (...args) =>
  (x) =>
    args.reduceRight((value, item) => item(value), x);

var toUpperCase = function (x) {
  return x.toUpperCase();
};
var exclaim = function (x) {
  return x + "!";
};

var shout = compose(exclaim, toUpperCase);

shout("send in the clowns");
//=> "SEND IN THE CLOWNS!"
```

代码从右往左执行，非常清晰明了，一目了然。我们定义的 compose 像 N 面胶一样，可以将任意多个纯函数结合到一起。这种灵活的组合可以让我们像拼积木一样来组合函数式的代码

### 用容器封装函数能力

当我们需要重用一个函数时，我们可以用面向对象的思维将函数封装到一个类中：

```js
class MayBeNumber {
  constructor(x) {
    this.x = x;
  }

  map(fn) {
    return new MayBeNumber(fn(isNum(this.x)));
  }

  getValue() {
    return this.x;
  }
}
```

我们不管拿到一个什么对象，用其构造一个 MayBeNumber 对象出来，再调用这个对象的 map 方法去调用数学函数，就自带了 isNum 的能力。

```js
let num1 = new MayBeNumber(3.3).map(sqr2).getValue();
let notnum1 = new MayBeNumber(undefined).map(sqr2).getValue();
```

封装到对象中的另一个好处是我们可以用"."多次调用了，比如我们想调两次算 4 次方，只要在.map(sqr2)之后再来一个.map(sqr2)

```js
let num3 = new MayBeNumber(3.5).map(sqr2).map(sqr2).getValue();
```

使用对象封装之后的另一个好处是，函数嵌套调用跟命令式是相反的顺序，而用 map 则与命令式一致。

```js
//old
console.log(sqr2(Math.sin(1)));

//now
let num4 = new MayBeNumber(1).map(Math.sin).map(sqr2).getValue();
```

封装到对象中，看起来还不错，但是函数式编程还搞出来 new 对象再 map，为什么不能构造对象时也用个函数呢？这好办，我们给它定义个 of 方法吧：

```js
MayBeNumber.of = function (x) {
  return new MayBeNumber(x);
};
```

我们来总结下前面这种容器的设计模式：

- 有一个用于存储值的容器

- 这个容器提供一个 map 函数，作用是 map 函数使其调用的函数可以跟容器中的值进行计算，最终返回的还是容器的对象

我们可以把这个设计模式叫做 **Functor 函子**。

如果这个容器还提供一个 of 函数将值转换成容器，那么它叫做 **Pointed Functor**.

比如我们看下 js 中的 Array 类型：

```js
let aa1 = Array.of(1);
console.log(aa1);
console.log(aa1.map(Math.sin));
```

它支持 of 函数，它还支持 map 函数调用 Math.sin 对 Array 中的值进行计算，map 的结果仍然是一个 Array。

那么我们可以说，Array 是一个 Pointed Functor.

### 一次有效的函数

如何用函数式方法实现一个只执行一次有效的函数？用闭包。

```js
const once = (fn) => {
  let done = false;
  return function () {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

let init_data = once(() => {
  console.log("Initialize data");
});

init_data();
init_data();
```

## 小结

- 函数式编程的核心概念很简单，就是将函数存到变量里，用在参数里，用在返回值里

- 在编程时要时刻记住将无副作用与有副作用代码分开

- 函数式编程的原理虽然很简单，但是因为大家习惯了命令式编程，刚开始学习时会有诸多不习惯，用多了就好了

- 函数式编程背后有其数学基础，在学习时可以先不要管它，当成设计模式学习。等将来熟悉之后，还是建议去了解下背后的真正原理

> 参考链接
>
> [前端开发函数式编程入门](https://mp.weixin.qq.com/s/_4xCDS3uJNsBScWMtnfMOA)
>
> [javascript 函数式编程基础](https://mp.weixin.qq.com/s/32DwoU2OtAcYPpTQAo6npA)
