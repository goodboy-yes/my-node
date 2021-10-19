# 知识点

## Tips

- `Json`文件不能写注释

- 移动端开发为什么不使用`jquery`：
  1、`jquery`体积大
  2、`jquery`做了大量的兼容，移动端都是高版本浏览器，没有必要做兼容，并不是说一定不用，最好不要用

- `{color:'blue', 'font-size':5px}`对象里键名里有`-`的要加引号

- `!!`常常用来做类型判断，省去了多次判断 null、undefined 和空字符串的冗余代码
  ```js
  if (!!a) {
    //a有内容才执行的代码...
  }
  ```
- 省略`http:`前缀

  如果你对形如 `//cdn.com/id/app_a6976b6d.css` 这样的 URL 感到陌生，你需要知道这种 `URL` 省掉了前面的 `http:` 或者 `https:` 前缀， 这样做的好处时在访问这些资源的时候会自动的根据当前`HTML` 的 `URL` 是采用什么模式去决定是采用 `HTTP` 还是 `HTTPS` 模式。

  ```css
  body {
    background: url(//cdn.com/id/arch_ae805d49.png) repeat;
  }
  ```

## 概念

### 执行栈

执行栈，也叫调用栈，具有 `LIFO`（Last in, First out 后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。

当 `JavaScript` 引擎首次读取脚本时，会创建一个全局执行上下文并将其 Push 到当前执行栈中。每当发生函数调用时，引擎都会为该函数创建一个新的执行上下文并 Push 到当前执行栈的栈顶。

引擎会运行执行上下文在执行栈栈顶的函数，根据 `LIFO` 规则，当此函数运行完成后，其对应的执行上下文将会从执行栈中 Pop 出，上下文控制权将转到当前执行栈的下一个执行上下文

## API

### Number.EPSILON

在 JS 当中，`Number` 类型实际上是 `double` 类型，运算小数时存在精度问题。因为计算机只认识二进制，在进行运算时，需要将其他进制的数值转换成二进制，然后再进行计算

双精度浮点数的小数部分最多支持 53 位二进制位，所以两者相加后，因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了 0.30000000000000004，这样在进行算术计算时会产生误差。

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```

ES6 在 Number 对象上面，新增一个极小的常量 `Number.EPSILON`。它表示 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的 1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的-52 次方。

`Number.EPSILON`实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

```javascript
0.1 + 0.2 - 0.3 < Number.EPSILON; // true
```

### getOwnPropertyDescriptors

获取对象的描述信息

`Object.assign` 复制时，将对象的属性和方法当做普通属性来复制，并不会复制完整的描述信息，比如 this。

```js
const p1 = {
  a: "y",
  b: "d",
  get name() {
    return `${this.a} ${this.b}`;
  },
};
const p2 = Object.assign({}, p1);
p2.a = "z";
p2.name; // y d; 发现并没有修改p2.a的值，是因为this仍旧指向p1
```

使用 `Object.getOwnPropertyDescriptors` 获取完整描述信息

```js
const description = Object.getOwnPropertyDescriptors(p1);
const p2 = Object.defineProperties({}, description);
p2.a = "z";
p2.name; // z d
```

### document.designMode

打开浏览器控制台，输入以下内容打开设计模式可以编辑页面上的任何内容

```javascript
document.designMode = "on";
```

## 机制

### Slice 无参调用

Slice 无参调用可以将对象转化成数组，**数组的 Slice 无参调用是浅拷贝**，复制出新的 Array，再里面嵌套的内容是引用

**类似数组的对象**

DOM 操作返回的 NodeList 集合
函数内部的`arguments`对象

```javascript
let arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
```

**转为数组的方法**

```javascript
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

### 报错代码与 eventloop

```js
console.log(a);
console.log("执行");
// Uncaught ReferenceError: a is not defined
```

可以看到第一句代码报错后，后面的代码并没有执行，这符合我们平常的开发认知

```js
setTimeout(() => {
  console.log(a);
}, 0);
console.log("执行");
// 执行
// Uncaught ReferenceError: a is not defined
```

异步代码出错，并不会影响后面同步代码的执行，让我们来看下一个例子

```js
setTimeout(() => {
  console.log("执行1");
}, 0);
console.log(a);
setTimeout(() => {
  console.log("执行2");
}, 0);
// Uncaught ReferenceError: a is not defined
// 执行1
```

结果是第一个异步代码执行了，这是 eventloop 的经典场景，js 是单线程执行的，所以出现未捕获的异常必然会导致后面的代码不执行。例子里面，代码从上往下执行，执行`settimeout`时只是把回调推进事件队列，如果前面代码就报错了，自然不会有把回调放入事件队列这个动作，所以不会执行回调。换言之，先有`settimeout`的话，已经加入到队列了，后面同步代码报错，但是事件队列里已经有这个回调了，js 线程会取队列下一个任务继续执行，所以就出现第一个定时器的代码执行了，第二个不执行。

如果我们想要保证某块可能出错的同步代码后面的代码继续执行的话，那么我们必须对这块同步代码进行异常捕获。

## 对比

### json 对象和普通 JS 对象的区别

JSON 是 JavaScript 原生格式，它是一种严格的 js 对象的格式，JSON 的属性名必须有**双**引号，如果值是字符串，也必须是**双**引号。

```json
let obj = {}; //这只是JS对象
let obj2={'width':100,'height':100}//JS对象
let obj3={"width":100,"height":100,"name":"rose"}//JSON格式的JS对象

//对象转json
JSON.stringify({
        name: '苹果 X',
        price: 8888
    }
)

//Json转对象
JSON.parse('{"name": "苹果 X","price": "8888"}')
```

### call()，apply()，bind()区别

`bind()` 返回的是一个函数

`apply()` 方法接受两个参数第一个是函数运行的作用域，另外一个是一个参数数组(arguments)。

`call()` 方法第一个参数的意义与 `apply()` 方法相同，只是其他的参数需要一个个列举出来。

```js
const myObject = { value: 100 };

const foo = function () {
  console.log(this);
};

foo.apply(myObject); // { value: 100 }
foo.call(myObject); // { value: 100 }

const newFoo = foo.bind(myObject);
newFoo(); // { value: 100 }
```

### Set、WeakSet 和 array

Set 与 Array 是不同的两种数据结构，它并不是要完全替换 Array，而是提供额外的数据类型来完成 Array 缺少的一些功能

**使用 set 的场景：**

- 如果我们只希望存储不同的元素，使用 Set 会更好

- 当我们想要以最小成本维护不重复的数据，或者使用到大量不同的数据集时只需要使用最基本的集合操作而无需直接访问元素。

- 可以利用 Set 的一些原生方法轻松的完成数组去重，查找数组公共元素及不同元素等操作

  ```js
  let a = new Set([1, 2, 3]);
  let b = new Set([4, 3, 2]);

  // 并集
  let union = new Set([...a, ...b]);
  // Set {1, 2, 3, 4}

  // 交集
  let intersect = new Set([...a].filter((x) => b.has(x)));
  // set {2, 3}

  // （a 相对于 b 的）差集
  let difference = new Set([...a].filter((x) => !b.has(x)));
  // Set {1}
  ```

**使用 array 的场景**

- 数组适用于希望保留重复元素，可能进行大量修改（增、删操作），array 获取元素更节省 CPU 工作量，或是希望通过索引对元素进行快速访问的场景，

**使用 WeakSet 的场景**

- WeakSet 的成员只能是对象，WeakSet 不可遍历。

- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

### Map、WeakMap 和 object

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数。这就是说，Set 和 Map 都可以用来生成新的 Map。

**使用 map 的场景**

- 如果你需要“键值对”的数据结构，Map 比 Object 更合适。

**使用 WeakMap 的场景**

- `WeakMap`只接受对象作为键名（`null`除外），`WeakMap`的键名所指向的对象，不计入垃圾回收机制，它的键名所引用的对象都是弱引用。WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。没有遍历操作。

- 在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构。

  ```js
  const wm = new WeakMap();

  const element = document.getElementById("example");

  wm.set(element, "some information");
  wm.get(element); // "some information"
  ```

- WeakMap 的另一个用处是部署私有属性

  ```javascript
  const _counter = new WeakMap();
  const _action = new WeakMap();

  class Countdown {
    constructor(counter, action) {
      _counter.set(this, counter);
      _action.set(this, action);
    }
    dec() {
      let counter = _counter.get(this);
      if (counter < 1) return;
      counter--;
      _counter.set(this, counter);
      if (counter === 0) {
        _action.get(this)();
      }
    }
  }

  const c = new Countdown(2, () => console.log("DONE"));

  c.dec();
  c.dec();
  // DONE
  ```

  上面代码中，`Countdown`类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

> 参考链接:
> [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

### Attributes 和 DOM Properties

我们知道浏览器在加载页面之后会对页面中的标签进行解析，并生成与之相符的 DOM 对象，每个标签中都可能包含一些属性，如果这些属性是**标准属性**，那么解析生成的 DOM 对象中也会包含与之对应的属性

```html
<body id="page"></body>
```

由于 `id` 是标准属性，所以我们可以通过 `document.body.id` 来访问它的值，实际上我们常说的 `Attr` 指的就是那些存在于标签上的属性，而 `DOM Prop` 就是存在于 DOM 对象上的属性。但是当标签上存在非标准属性时，该属性不会被转化为 `DOM Prop`，例如：

```html
<body custom="val"></body>
```

由于 `custom` 是非标准属性，所以当你尝试通过 `document.body.custom` （访问 prop）访问其值时会得到 `undefined`，这也是为什么 `setAttribute` （set 的是 html 元素的 attr）方法存在的原因，因为该方法允许我们为 DOM 元素设置自定义属性。另外该方法也允许我们为 DOM 元素设置标准属性的值，所以我们可不可以总是使用 `setAttribute` 设置全部的 DOM 属性呢？答案是：不行。举个例子：

```js
// checkbox 元素
const checkboxEl = document.querySelector("input");
// 使用 setAttribute 设置 checked 属性为 false
checkboxEl.setAttribute("checked", false);

console.log(checkboxEl.checked); // true
```

可以看到虽然我们使用 `setAttribute` 函数将复选框的 `checked` 属性设置为 `false`，但是当我们访问 `checkboxEl.checked` 时得到的依然是 `true`，这是因为在 `setAttribute` 函数为元素设置属性时，无论你传递的值是什么类型，它都会将该值转为字符串再设置到元素上，所以如下两句代码是等价的：

```js
checkboxEl.setAttribute("checked", false);
// 等价于
checkboxEl.setAttribute("checked", "false");
```

- 一些特殊的 `attribute`，比如 `checked/disabled` 等，只要出现了，对应的 `property` 就会被初始化为 `true`，无论设置的值是什么,只有调用 `removeAttribute` 删除这个 `attribute`，对应的 `property` 才会变成 `false`。

这就指引我们有些属性不能通过 `setAttribute` 设置，而是应该直接通过 DOM 元素设置：`el.checked = true`。好在这样的属性不多，我们可以列举出来：`value`、`checked`、`selected`、`muted`。除此之外还有一些属性也需要使用 `Property` 的方式设置到 DOM 元素上，例如 `innerHTML` 和 `textContent` 等等。\*\*

`getAttribute()`不区分大小写,有的`attr`和`prop`可同步，如

```js
let input = document.querySelector("input");

// 特性 => 属性
input.setAttribute("id", "id");
alert(input.id); // id（更新了）

// 属性 => 特性
input.id = "newId";
alert(input.getAttribute("id")); // newId（更新了）
```

有些只能从单向传递

```js
let input = document.querySelector("input");

// 特性 => 属性
input.setAttribute("value", "text");
alert(input.value); // text

// 这操作无效 属性 => 特性
input.value = "newValue"; //（input框内的值会更新）
alert(input.getAttribute("value")); // text（没有更新！）
```

当属性值是布尔值

```js
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // 特性值是：空字符串
  alert(input.checked); // 属性的值是：true
</script>
```

当属性值是对象时

```js
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // 字符串
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // 对象
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

但是自定义的特性也存在问题。如果我们使用了一个非标准化的特性，之后却变成了一个标准化的值并用来做其他事情，HTML 语言一直在发展，越来越多的标准化特性解决了开发者的开发需求。这就是一个不可控的例子。

为了解决这个冲突产生了 [data-\*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) 这个特性。

**所有以 “data-” 开头的特性值可以给编程人员正常使用，同时它还是 dataset 合法值。**

例如, 如果一个 `elem` 有一个键名是 `"data-about"` 的特性，那么可以通过 `elem.dataset.about` 取到这个合法值。

```js
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

### for in 和 for of 的区别

#### for in

不要使用 for in 遍历数组，会存在诸多问题

- index 索引为字符串型数字，不能直接进行几何运算，但可以使用 arr[index]
- 遍历顺序有可能不是按照实际数组的内部顺序
- 使用 for in 会遍历数组所有的可枚举属性，包括原型

可用 for in 遍历对象，并且也会遍历到对象的原型方法，如果不想遍历原型方法和属性的话，可以在循环内部使用 hasOwnPropery 方法判断属性是否是该对象的实例属性

```js
for (var key in myObject) {
　　if（myObject.hasOwnProperty(key)){
　　　　console.log(key);
　　}
}
```

或者使用`Object.keys(obj)`获取对象的实例属性组成的数组，不包括原型方法和属性

#### for of

- for of 遍历数组是遍历元素值，不包括数组的原型属性，不可得到索引
- for of 循环不支持普通对象
- for..of 适用遍历数/数组对象/字符串/map/set 等拥有迭代器对象的集合，但是不能遍历对象，因为没有迭代器对象。与 `forEach()`不同的是，它可以正确响应 `break`、`continue` 和 `return` 语句
- 遍历 map 对象时适合用解构,例如;
  ```js
  for (var [key, value] of phoneBookMap) {
    console.log(key + "'s phone number is: " + value);
  }
  ```

### split() 、splice()、slice()

#### split()

**定义和用法**

split() 方法用于把一个字符串分割成字符串数组。

**语法**

```js
stringObject.split(separator, howmany);
```

| 参数      | 描述                                                                                                                                                       |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| separator | 必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。                                                                                            |
| howmany   | 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。 |

```js
const str = "How are you doing today?";

console.log(str.split(" "));
console.log(str.split(""));
console.log(str.split(" ", 3));
```

输出：

```
How,are,you,doing,today?
H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?
How,are,you
```

#### splice()

**定义和用法**

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

**该方法会改变原始数组。**

**语法**

```js
arrayObject.splice(index,howmany,item1,.....,itemX)
```

| 参数              | 描述                                                                  |
| :---------------- | :-------------------------------------------------------------------- |
| index             | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。 |
| howmany           | 必需。要删除的项目数量。如果设置为 0，则不会删除项目。                |
| item1, ..., itemX | 可选。向数组添加的新项目。                                            |

**返回值**

| 类型  | 描述                                 |
| :---- | :----------------------------------- |
| Array | 包含被删除项目的新数组，如果有的话。 |

```js
const arr = ["George", "John", "Thomas", "James", "Adrew", "Martin"];
console.log(arr);
arr.splice(2, 0, "William");
console.log(arr);
```

输出：

```
George,John,Thomas,James,Adrew,Martin
George,John,William,Thomas,James,Adrew,Martin
```

#### slice()

**定义和用法**

`slice()` 方法可从已有的数组（或字符串）中返回选定的元素。

该方法并**不会修改数组**，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 `Array.splice()`。

**语法**

```js
arrayObject.slice(start, end);
```

| 参数  | 描述                                                                                                                                                                                          |
| :---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start | 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。                                                        |
| end   | 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。 |

```js
const arr = ["George", "John", "Thomas", "James", "Adrew", "Martin"];
arr.slice(2, 4); //Thomas,James
```

### JS 中数据类型检测

`tyepof [value]` ：检测数据类型的运算符

`[example] instanceof [class]` ： 检测某一个实例是否属于这个类

`[example].constructor===[class]` ：检测实例和类关系的，从而检测数据类型

`Object.prototype.toString.call([value])`：检测数据类型

#### typeof

typeof 检测的结果是一个字符串，包含了对应的数据类型（ `number`、`string`、`boolean`、`undefined`、`object`、`function`、`symbol`、`bigint`）

**优点**：使用起来简单，基本数据类型值基本上都可以有效检测，引用数据类型值也可以检测出来

**局限性**：

- typeof null 的结果是“object”;（这是浏览器的 BUG：所有的值在计算中都以二进制编码储存，浏览器中把前三位 000 的当作对象，而 null 的二进制前三位是 000，所以被识别为对象，但是他不是对象，他是空对象指针，是基本类型值）

- typeof 普通对象/数组对象/正则对象...， 结果都是“object”，这样就无法基于 typeof 区分是普通对象还是数组对象

```js
type NaN //NaN、Infinity 都是数字类型的，检测结果都是“number”;

// 判断是否为对象
if (x != null && typeof x == "object") {
  // ...
}
```

#### instanceof

用来检测某个实例是否属于这个类，当前类的原型只要出现在了实例的原型链上就返回 true

**优点**：弥补 typeof 无法细分对象类型的缺点

```js
let arr = [10, 20];
console.log(typeof arr); //=>"object"
console.log(arr instanceof Array); //=>true
console.log(arr instanceof Object); //=>true 数组对象是Object的实例
```

**局限性**：

- 要求检测的实例必须是对象数据类型的，基本数据类型的实例是无法基于它检测出来的（字面量方式创建的不能检测，构造函数创建的就可以检测）。从严格意义上来讲，只有实例创建出来的结果才是标准的对象数据类型值，但由于 JS 的松散特点，导致了字面量方式创建的结果可以使用 prototype 上提供的方法

- 不管是什么对象，都是 Object 的实例，检测结果都是 TRUE，所以无法基于这个结果判断是否为普通对象

```js
// instanceof检测的实例必须都是引用数据类型的，它对基本数据类型值操作无效
console.log(10 instanceof Number); //=>false
console.log(new Number(10) instanceof Number); //=>true

// instanceof检测机制：验证当前类的原型prototype是否会出现在实例的原型链__proto__上，只要在它的原型链上，则结果都为TRUE
function Fn() {}
Fn.prototype = Object.create(Array.prototype);
let f = new Fn();
console.log(f instanceof Array); //=>true f其实不是数组，因为它连数组的基本结构都是不具备的
```

#### constructor

判断当前的实例的 constructor 的属性值是不是预估的类。`实例.constructor` 一般都等于 `类.prototype.constructor` 也就是当前类本身（前提是 constructor 并没有被破坏）

**优点**：

- 能检测基本数据类型，也可细分对象类型

**局限性**：

- 不能够给当前类的原型进行重定向，不能够给当前实例增加私有属性 constructor，会造成检测的结果不准确
- 存在不确定性，非常容易被修改，因为 JS 中的 constructor 是不被保护的（用户可以自己随便改）

```js
let arr = [],
  obj = {},
  num = 10;
console.log(arr.constructor === Array); //=>true
console.log(arr.constructor === Object); //=>false
console.log(obj.constructor === Object); //=>true
console.log(num.constructor === Number); //=>true
```

#### Object.prototype.toString.call()

找到 Object.prototype 上的 toString 方法，让 toString 方法执行，并且基于 call 让方法中的 this 指向检测的数据值，这样就可以实现数据类型检测了。**是最准确最常用的方式**

每一种数据类型的构造函数的原型上都有 toString 方法，除了 Object.prototype 上的 toString 是用来返回当前实例所属类的信息（检测数据类型的），其余的都是转换为字符串的

**优点**：专门用来检测数据类型的方法，基本上不存在局限性的数据类型检测方式,基于他可以有效的检测任何数据类型的值

**局限性**：只能检测内置类，不能检测自定义类，只要是自定义类返回的都是`[Object Object]`

```js
let class2type = {};
let toString = class2type.toString; //=>Object.prototype.toString

console.log(toString.call(10)); //=>"[object Number]"
console.log(toString.call(NaN)); //=>"[object Number]"
console.log(toString.call("xxx")); //=>"[object String]"
console.log(toString.call(true)); //=>"[object Boolean]"
console.log(toString.call(null)); //=>"[object Null]"
console.log(toString.call(undefined)); //=>"[object Undefined]"
console.log(toString.call(Symbol())); //=>"[object Symbol]"
console.log(toString.call(BigInt(10))); //=>"[object BigInt]"
console.log(toString.call({ xxx: "xxx" })); //=>"[object Object]"
console.log(toString.call([10, 20])); //=>"[object Array]"
console.log(toString.call(/^\d+$/)); //=>"[object RegExp]"
console.log(toString.call(function () {})); //=>"[object Function]"
```

### defineProperty 和 defineProperties

#### Object.defineProperty

该方法会直接在一个对象上定义 一个 新属性，或者修改一个对象的现有属性

`Object.defineProperty( obj , prop , descriptor )`

- obj : 要定义属性的对象。

- prop : 要定义或修改的属性的名称或 Symbol 。

- descriptor : 要定义或修改的属性描述符

```js
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static",
});
```

#### Object.defineProperties

方法直接在一个对象上定义 一个或多个 新的属性或修改现有属性

`Object.defineProperties( obj , props )`

- obj :在其上定义或修改属性的对象。

- props:定义其可枚举属性或修改的属性描述符的对象

```js
var obj = {};
Object.defineProperties(obj, {
  property1: {
    value: true,
    writable: true,
  },
  property2: {
    value: "Hello",
    writable: false,
  },
  // etc. etc.
});
```
