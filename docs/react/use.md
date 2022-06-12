# 使用

## 核心概念

### 定义组件

React 允许您将标记、CSS 和 JavaScript 组合成自定义“组件” ，即应用程序的可重用 UI 元素。React 组件是一个 JavaScript 函数

```javascript
// App.js
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
// 或者
// return (
//   <div>
//     <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
//   </div>
// );
```

> React 组件是常规的 JavaScript 函数，但它们的名称必须以大写字母开头，否则它们将不起作用！

> 如果标签与 return 语句不在同一行，则必须将其括在一对括号中，如果没有括号，后面几行的任何代码 return 都将被忽略！

大多数 React 应用程序一直使用组件。这意味着您不仅可以将组件用于可重复使用的部分，例如按钮，还可以用于较大的部分，例如侧边栏、列表以及最终的完整页面！**组件是组织 UI 代码和标记的一种便捷方式**，即使其中一些仅使用一次。

### 元素渲染

#### 将一个元素渲染为 DOM

“根” DOM 节点

```html
<div id="root"></div>
```

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.createRoot()：

```jsx
const element = <h1>Hello, world</h1>;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
```

### Props

#### Props 的只读性

```js
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

### Rendering code 和 Event handlers

React 中有两个重要的概念：

- `Rendering code`（渲染代码）

- `Event handlers`（事件处理器）

`Rendering code` 指「开发者编写的组件渲染逻辑」，最终会返回一段 JSX。

```jsx
function App() {
  const [name, update] = useState("KaSong");

  return <div>Hello {name}</div>;
}
```

`Rendering code`的特点是：他应该是「不带副作用的纯函数」。

如下`Rendering code`包含副作用（count 变化），就是不推荐的写法：

```jsx
let count = 0;

function App() {
  count++;
  const [name, update] = useState("KaSong");

  return <div>Hello {name}</div>;
}
```

`Event handlers`是「组件内部包含的函数」，用于执行用户操作，可以包含副作用。

下面这些操作都属于`Event handlers`：

- 更新 input 输入框

- 提交表单

- 导航到其他页面

如下例子中组件内部的 changeName 方法就属于`Event handlers`：

```jsx
function App() {
  const [name, update] = useState("KaSong");

  const changeName = () => {
    update("KaKaSong");
  };

  return <div onClick={changeName}>Hello {name}</div>;
}
```

### Render Props

术语 `render prop` 是指一种在 `React` 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 `render prop` 的组件接受一个返回 `React` 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。

```jsx
<DataProvider render={(data) => <h1>Hello {data.target}</h1>} />
```

#### 使用 Render Props 来解决横切关注点（Cross-Cutting Concerns）

组件是 React 代码复用的主要单元，但如何将一个组件封装的状态或行为共享给其他需要相同状态的组件并不总是显而易见。

下面是一个显示鼠标坐标，并且可以任意呈现追逐鼠标位置的用例的组件

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src="/cat.jpg"
        style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {/*
          使用 `render`prop 动态决定要渲染的内容，
          而不是给出一个 <Mouse> 渲染结果的静态表示
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}
```

我们提供了一个 render 方法 让 `<Mouse>` 能够动态决定什么需要渲染，而不是克隆 `<Mouse>` 组件然后硬编码来解决特定的用例。更具体地说，`render prop` 是一个用于告知组件需要渲染什么内容的函数 prop。

### 使用 Props 而非 render

`render prop` 是因为模式才被称为 `render prop` ，不一定要用名为 `render` 的 `prop` 来使用这种模式。

也可以使用`children`

```jsx
<Mouse>
  {(mouse) => (
    <p>
      鼠标的位置是 {mouse.x}，{mouse.y}
    </p>
  )}
</Mouse>
```

## Class 组件用法

### State & 生命周期

- 每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<Clock />` ，就仅有一个 Clock 组件的 class 实例被创建使用。
- this.props 和 this.state 是 React 本身设置的，且都拥有特殊的含义，我们可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。
- componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // 组件挂载
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // 组件卸载
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Clock />);
```

构造函数是唯一可以给 this.state 赋值的地方，其他地方应使用`setState()`

this.props 和 this.state 可能会异步更新，不要依赖他们的值来更新下一个状态，可以让 setState() 接收一个函数而不是一个对象。

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state，你可以分别调用 setState() 来单独地更新它们

```js
 constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  this.setState({
    comments: response.comments
  });
```

`this.setState({comments})` 完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments`

### 事件处理

当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。

> 注意构造函数中需要对 handleClick 进行绑定

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
```

**向事件处理程序传递参数**

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

## Hook

在 React 中，useState 以及任何其他以`use`开头的函数都称为 Hook。

Hook 是 React 16.8 的新增特性，是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

React 内置了一些像 useState 这样的 Hook。你也可以创建你自己的 Hook 来**复用不同组件之间的状态逻辑**。

> 调用 Hooks 仅在组件或另一个 Hook 的顶层有效，不能在条件、循环或其他嵌套函数中调用 Hook

### Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

#### 只能在函数最外层调用 Hook。

不要在循环、条件判断或者子函数中调用，确保总是在 React 函数的最顶层以及任何 `return` 之前调用

遵守这条规则，你就能确保 `Hook` 在每一次渲染中都按照同样的顺序被调用。这让 `React` 能够在多次的 `useState` 和 `useEffect` 调用之间保持 `hook` 状态的正确。只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联

#### 只能在 React 的函数组件和自定义 Hook 中调用 Hook。

不要在其他 JavaScript 函数中调用。遵循此规则，确保组件的状态逻辑在代码中清晰可见。

### useState

但组件里的数据改变时，要使用新数据更新组件，需要做两件事：

- 保留渲染之间的数据。
- 触发 React 以使用新数据渲染组件（重新渲染）。

当定义常规变量，有两件事阻止了视图更新：

- 常规变量不会在渲染之间持续存在。当 React 第二次渲染这个组件时，它会从头开始渲染——它不考虑对常规变量的任何更改。
- 对常规变量的更改不会触发渲染。React 没有意识到它需要使用新数据再次渲染组件。

而使用 `useState` 可以保持呈现之间的数据，并提供一个状态设置函数，用于更新变量并触发 React 再次渲染组件，一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

```javascript
import { useState } from "react";

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{index} </i>
      </h2>
    </>
  );
}
```

> [React 如何知道要返回哪个状态？](https://beta.reactjs.org/learn/state-a-components-memory#giving-a-component-multiple-state-variables)

如果你渲染同一个组件两次，每个副本都会有完全隔离的状态！更改其中一个不会影响另一个。

#### 避免重新创建初始状态

传递给`useState`的初始状态仅用于初始渲染。对于下一次渲染，此参数将被忽略。如果创建初始状态的成本很高，那么在每次渲染时都创建并丢弃它是一种浪费。为避免这种情况，您可以将初始化函数传递给 `useState`。 `React` 只会在初始化期间运行它来计算初始状态，但不会在重新渲染时运行它。

```javascript
function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: "Item #" + i,
    });
  }
  return initialTodos;
}

const [todos, setTodos] = useState(createInitialTodos);
```

#### 用键重置状态

可以通过将不同的值传递给组件的`key`来重置组件的状态。

下面示例当点击`reset`按钮时，form 组件里的数据会被重置

```javascript
export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}
```

#### 跳过 state 更新

调用 State Hook 的更新函数并传入当前的 state 时（与当前 state 相同），React 将**跳过子组件的渲染及 effect 的执行**。（React 使用 Object.is 比较算法 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

### useEffect

`Effect Hook` 可以让你在函数组件中执行副作用操作，数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。

在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

默认情况下，`Effect Hook` 在第一次渲染之后和每次更新之后都会执行，**React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。** 传给 useEffect 的函数会在浏览器完成布局与绘制之后，**在一个延迟事件中被调用。**

**即使在 useEffect 被推迟到浏览器绘制之后的情况下，它也能保证在任何新的渲染前启动**。React 在开始新的更新前，总会先刷新之前的渲染的 effect。

然而，并非所有 effect 都可以被延迟执行。例如，一个对用户可见的 DOM 变更就必须在浏览器执行下一次绘制前被同步执行，这样用户才不会感觉到视觉上的不一致。React 为此提供了一个额外的 `useLayoutEffect` Hook 来处理这类 effect。它和 `useEffect` 的结构相同，区别只是调用时机不同。

> 使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。

此外，从 React 18 开始，当它是离散的用户输入（如点击）的结果时，或者当它是由 flushSync 包装的更新结果时，传递给 useEffect 的函数将在屏幕布局和绘制之前同步执行。这种行为便于事件系统或 flushSync 的调用者观察该效果的结果。

> 这只影响传递给 useEffect 的函数被调用时 — 在这些 effect 中执行的更新仍会被推迟。这与 useLayoutEffect 不同，后者会立即启动该函数并处理其中的更新。

可以在 `useEffect` 中返回一个函数，React 会在组件卸载的时候执行此函数

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。

例如可用于清除订阅

```jsx
import React, { useState, useEffect } from "react";

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

#### 使用 Effect 的提示

使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。我们可以使用多个 Effect 实现关注点分离，按照代码的用途分离他们

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

#### effect 的条件执行

每次渲染后都执行清理或者执行 effect 可能会导致性能问题，我们可以通知 React 跳过对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。

如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值

### useLayoutEffect

其函数签名与 useEffect 相同，**但它会在所有的 DOM 变更之后同步调用 effect**。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

尽可能使用标准的 useEffect 以避免阻塞视觉更新。

### useRef

#### 使用 Refs 引用值

当您希望组件“记住”某些信息，但又不希望该信息触发新的渲染时，您可以使用 ref

```javascript
import { useRef } from "react";
const ref = useRef(0);
```

ref 是一个普通的 JavaScript 对象，具有可以读取和修改的属性 current。返回的 ref 对象在组件的整个生命周期内持续存在。

```javascript
{
  current: 0;
}
```

**组件不会随着 ref 改变而重新渲染**。与 state 一样，refs 在重新渲染之间值由 React 保留，useRef 会在每次渲染时返回同一个 ref 对象。不使用 useRef 定义的局部变量重新渲染时都会从头开始初始化。

#### refs 和 state 的区别

- refs 更改时不会触发重新渲染，state 会
- refs 是“可变的”，可以在渲染过程之外修改和更新 current 的值，state 是“不可变”的，必须使用状态设置功能来修改状态变量以排队重新渲染。

#### 使用 Refs 操作 DOM

```javascript
import { useRef } from "react";
const myRef = useRef(null);
```

将其作为属性传递给 DOM 节点：

```javascript
<div ref={myRef}>
```

可以从事件处理程序访问此 DOM 节点并使用在其上定义的内置浏览器 API 。

```javascript
myRef.current.scrollIntoView();
```

在循环条件中使用 ref，解决方案是将函数传递给 ref 属性，这称为“引用回调”。React 将在设置 ref 时使用 DOM 节点调用 ref 回调，当 DOM 清除时为 null

```javascript
import { useRef } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            ></li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

**访问另一个组件的 DOM 节点**

在自己的组件上放置一个 ref，默认情况下会得到 null，发生这种情况是因为默认情况下 React 不允许组件访问其他组件的 DOM 节点。想要公开其 DOM 节点的组件必须使用 `forwardRef` API：

```javascript
import { forwardRef, useRef } from "react";

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);
  return (
    <>
      <MyInput ref={inputRef} />
    </>
  );
}
```

**使用命令句柄公开 API 的子集**

在上面的例子中，MyInput 暴露了原始的 DOM 输入元素，我们可以使用`useImperativeHandle`限制公开的功能

```javascript
import { forwardRef, useRef, useImperativeHandle } from "react";

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;
}
```

`inputRef.current`只会有 focus 方法。在这种情况下，引用“句柄”不是 DOM 节点，而是`useImperativeHandle` 创建的自定义对象。

#### 回调 ref 监听对象内容发生变化

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

```js
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

每当 ref 被附加到一个另一个节点，React 就会调用 `callback`。使用 `callback ref` 可以确保 即便子组件延迟显示被测量的节点 (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。

在上面示例中，当且仅当组件挂载和卸载时，`callback ref` 才会被调用，因为渲染的`<h1>`组件在整个重新渲染期间始终存在。如果你希望在每次组件调整大小时都收到通知，则可能需要使用 `ResizeObserver` 或基于其构建的第三方 Hook。

#### **使用 `flushSync` 同步刷新状态更新**

在 React 中，状态更新是排队的。这里会导致一个问题，因为 setState 它不会立即更新 DOM，我们在使用 ref 操作 DOM 时可能会发生意想不到的结果，要解决这个问题，可以使用`flushSync`强制 React 同步更新（“刷新”）DOM

```javascript
import { flushSync } from "react-dom";

flushSync(() => {
  setTodos([...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```

`flushSync`将指示 React 在包裹在其中的代码执行后立即同步更新 DOM 。结果，当您尝试滚动到最后一个 todo 时，它已经在 DOM 中

**我们应该避免用 ref 更改由 React 管理的 DOM 节点**，如果确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。

### useContext

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider> `的 value prop 决定。

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext provider` 的 value 值。即使祖先使用 `React.memo` 或 `shouldComponentUpdate`，也会在组件本身使用 `useContext` 时重新渲染。

调用了 useContext 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 [通过使用 memoization 来优化。](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

使用见下文"使用 Context 深度传递数据"

### useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

> React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。

#### 惰性初始化

你可以选择惰性地创建初始 state。为此，需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)。

这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利：

```js
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: "reset", payload: initialCount })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

#### 跳过 dispatch

如果 `Reducer` Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 `Object.is` 比较算法 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前再次渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 `useMemo` 来进行优化。

### useCallback

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 `memoized` 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

**`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`**

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

> 依赖项数组不会作为参数传给回调函数。从概念上来说它表现为：所有回调函数中引用的值都应该出现在依赖项数组中。

### useMemo

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

传入 useMemo 的函数会在渲染期间执行。请**不要在这个函数内部执行与渲染无关的操作**，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

**把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。** 将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。

先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

### 自定义 Hook

自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。

- 自定义 Hook 必须以 “use” 开头（是一个约定）
- 自定义 Hook 是一种重用状态逻辑的机制，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

例如 `useReducer` 的一个简单实现

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }
  return [state, dispatch];
}

// 使用
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: "add", text });
  }

  // ...
}
```

**在多个 Hook 之间传递信息**

由于 useState 为我们提供了 recipientID 状态变量的最新值，因此我们可以将它作为参数传递给自定义的 useFriendStatus Hook，当我们选择不同的好友并更新 recipientID 状态变量时，useFriendStatus Hook 将会取消订阅之前选中的好友，并订阅新选中的好友状态。

```js
function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? "green" : "red"} />
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(Number(e.target.value))}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

## JSX

JSX 是 JavaScript 的语法扩展，允许您在 JavaScript 文件中编写类似 HTML 的标记。React 组件用 JSX 将渲染逻辑与标记组合在一起，因为它们是相关的。

### JSX 表示对象

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```

```js
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

```js
// 注意：这是简化过的结构
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world!",
  },
};
```

### 返回单个根元素

要从一个组件返回多个元素，请将它们用单个父标签包裹起来

```html
<div>
  <td>Hello</td>
  <td>World</td>
</div>
```

如果不想额外添加`<div>`，可以改为`<Fragments></Fragments>`

`Fragments` 允许你将子列表分组，而无需向 DOM 添加额外节点

```jsx
return (
  <React.Fragment>
    <td>Hello</td>
    <td>World</td>
  </React.Fragment>
);
```

使用显式 `<Fragment>` 语法声明的片段可能具有 key。key 是唯一可以传递给 Fragment 的属性

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：

```jsx
<>
  <td>Hello</td>
  <td>World</td>
</>
```

你可以像使用其他任意元素一样使用`<> </>`，**但它并不支持 key 或属性。**

### 关闭所有标签

JSX 需要显式关闭标签，如`<img />`

```html
<>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### camelCase 大部分的东西

因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

JavaScript 对变量名有限制。例如，它们的名称不能包含破折号。

这就是为什么在 `React` 中，许多 `HTML` 和 `SVG` 属性都是用驼峰命名法编写的。例如，使用 `stroke-width` 代替 `strokeWidth`，而 tabindex 则变为 tabIndex。因为 class 是保留字，所以在 `React` 中你可以写成 `className`

### 带花括号使用 JavaScript

在 JSX 中只能以两种方式使用花括号：

- 作为直接在 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>`有效，但`<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 不会。
- 作为紧跟在=符号之后的属性：src={avatar}将读取 avatar 变量，但 src="{avatar}"将传递字符串{avatar}。

```javascript
export default function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

要在 JSX 中传递 JS 对象，您必须将该对象包裹在另一对花括号中：

```javascript
person={{ name: "Hedy Lamarr", inventions: 5 }}
```

当需要内联样式时，可以将一个对象传递给该 style 属性

```javascript
export default function TodoList() {
  return (
    <ul
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    >
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

可以将多个表达式移动到一个对象中，并在您的 JSX 中的大括号内引用它们

```javascript
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
    </div>
  );
}
```

### 将 props 传递给组件

```javascript
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={person.src}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

将所有的 props 转发给子组件

```javascript
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

通过 children 获取子组件

```javascript
function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}
```

一个组件可能会随着时间的推移接收不同的 props，props 是只读的时间快照：每个渲染都会收到一个新版本的 props，

子组件不要修改 props，当需要响应用户输入（例如更改所选颜色）时，要通过设置状态

### 条件渲染

在 React 中，可以使用 JavaScript 语法（如 if 语句、&&和? :运算符）有条件地呈现 JSX 。

```javascript
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}
```

也可以使用三元运算符

```javascript
return <li className="item">{isPacked ? name + " ✔" : name}</li>;
```

或者`&&`

```javascript
return (
  <li className="item">
    {name} {isPacked && "✔"}
  </li>
);
```

> 不要把数字放在`&&`左边，如果左边是 0，React 会渲染 0 而不是什么都不渲染。

可以在 JSX 树中使用花括号嵌入变量，将先前计算的表达式嵌套在 JSX 中，这不仅适用于文本，也适用于任意 JSX

```javascript
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = <del>{name + " ✔"}</del>;
  }
  return <li className="item">{itemContent}</li>;
}
```

**一个组件必须返回，如果不想显示内容，可以返回 null**

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}
```

### 渲染列表

可以使用 map()，filter()方法渲染组件列表。

```javascript
export default function List() {
  const chemists = people.filter((person) => person.profession === "chemist");
  const listItems = chemists.map((person) => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
```

> 需要为每个数组项提供一个字符串或数字作为 key ，以便在该数组中的其他项中唯一标识它

`<> </>`段语法不允许您传递密钥，因此您需要将它们组合成一个`<div>`，或者使用稍长且更明确的`<Fragment>`语法

```javascript
import { Fragment } from "react";
// ...
const listItems = people.map((person) => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
));
```

### JSX 防止注入攻击

你可以安全地在 JSX 当中插入用户输入内容，React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

### 保持组件为纯函数

React 假设编写的每个组件都是纯函数。这意味着在给定相同输入的情况下，React 组件必须始终返回相同的 JSX

React 提供了一种“严格模式”，在这种模式下，它在开发过程中两次调用每个组件的函数。通过两次调用组件函数，严格模式有助于找到违反纯函数的组件。严格模式在生产中没有任何影响，因此它不会降低用户的应用程序速度。要选择严格模式，可以将根组件包装到`<React.StrictMode>`

**什么时候不需要纯函数？**

更新屏幕、开始动画、改变数据等被称为副作用。它们不是在渲染过程中发生的事情

在 React 中，副作用通常属于事件处理程序。事件处理程序是 React 在您执行某些操作时运行的函数，例如，当单击按钮时，即使在组件中定义了事件处理程序，它们也不会在渲染期间运行，所以事件处理程序不需要是纯的。

可以通过在组件中调用`useEffect`将其附加到 JSX ，这告诉 React 在渲染之后，在允许副作用的情况下稍后执行它。

### 在运行时选择类型

不能将通用表达式作为 React 元素类型。如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量。这通常用于根据 prop 来渲染不同组件的情况下:

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 类型不能是一个表达式。
  return <components[props.storyType] story={props.story} />;
}

function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

### Props 默认值为 “True”

如果你没给 prop 赋值，它的默认值是 true。以下两个 JSX 表达式是等价的：

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

### 属性展开

可以使用展开运算符 `...` 来在 JSX 中传递整个 props 对象。还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去。

```jsx
const Button = (props) => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

### JSX 中的子元素

#### 字符串字面量

JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下的几种方式都是等价的：

```jsx
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

#### 函数作为子元素

通常，JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表。

不过，`props.children` 和其他 prop 一样，它可以传递任意类型的数据，而不仅仅是 React 已知的可渲染类型。例如，如果你有一个自定义组件，你可以把回调函数作为 `props.children` 进行传递：

```jsx
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

你可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。这种用法并不常见，但可以用于扩展 JSX。

#### 布尔类型、Null 以及 Undefined 将会忽略

false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。以下的 JSX 表达式渲染结果相同

```jsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

这有助于依据特定条件来渲染其他的 React 元素

```jsx
<div>{showHeader && <Header />}</div>
```

值得注意的是数字 0 仍然会被 React 渲染。

以下代码当 `props.messages` 是空数组时，0 仍然会被渲染：

```jsx
<div>{props.messages.length && <MessageList messages={props.messages} />}</div>
```

要解决这个问题，确保 && 之前的表达式总是布尔值：

```jsx
<div>
  {props.messages.length > 0 && <MessageList messages={props.messages} />}
</div>
```

反之，如果你想渲染 `false、true、null、undefined` 等值，你需要先将它们转换为字符串：

```jsx
<div>My JavaScript variable is {String(myVariable)}.</div>
```

## 交互

### 添加事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

```javascript
export default function Button() {
  function handleClick(e) {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
// 或者
<button onClick={() => {
  alert('You clicked me!');
}}>
```

> 传递给事件处理程序的函数必须被传递，而不是被调用，例如`<button onClick={handleClick()}>`是不正确的。应该使用`<button onClick={handleClick}> `

> e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。React 事件与原生事件不完全相同。

### 事件冒泡

事件处理程序将捕获来自您的组件可能具有的任何子级的事件。我们说一个事件在树上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上。如果你想阻止一个事件到达父组件，需要 `e.stopPropagation()`

> 所有事件都在 React 中传播，除了 onScroll，它仅适用于您附加到的 JSX 标签。

### 事件捕获

有时需要捕获子元素上的所有事件，即使它们停止了传播，可以通过在事件名称的末尾添加 Capture 来实现

```javascript
<div
  onClickCapture={() => {
    /* this runs first */
  }}
>
  <button onClick={(e) => e.stopPropagation()} />
  <button onClick={(e) => e.stopPropagation()} />
</div>
```

每个事件分三个阶段传播：

- 它向下移动，调用所有 onClickCapture 处理程序。
- 它运行被点击元素的 onClick 处理程序。
- 它向上移动，调用所有 onClick 处理程序。

### 阻止默认行为

某些浏览器事件具有与其关联的默认行为。例如，`<form>`当点击其中的按钮时发生提交事件，默认情况下将重新加载整个页面：

```javascript
export default function Signup() {
  return (
    <form onSubmit={() => alert("Submitting!")}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。

可以调用 `e.preventDefault()`事件对象来阻止这种情况发生：

```javascript
export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Submitting!");
      }}
    >
      <input />
      <button>Send</button>
    </form>
  );
}
```

### 渲染

React 渲染分为三个步骤：

- 触发渲染
- 渲染组件
- 提交到 DOM

#### 触发渲染

**初始渲染**

通过调用`ReactDOM.render`来完成

```javascript
import Image from "./Image.js";
import ReactDOM from "react-dom";

ReactDOM.render(<Image />, document.getElementById("root"));
```

**重新渲染**

组件初始渲染后，您可以通过使用`setState` 更新其状态来触发进一步的渲染

#### 渲染组件

触发渲染后，React 会调用您的组件来确定要在屏幕上显示的内容。“渲染”是 React 调用你的组件。

- 在初始渲染时， React 将调用根组件。
- 对于后续的渲染， React 将调用其状态更新触发渲染的函数组件。

这个过程是递归的：如果更新的组件返回某个其他组件，React 将接下来渲染该组件，如果该组件也返回某些内容，它将接下来渲染该组件，依此类推。这个过程将一直持续到没有更多的嵌套组件并且 React 确切地知道应该在屏幕上显示什么。

> 渲染必须始终是纯计算，否则，随着代码库复杂性的增加，可能会遇到令人困惑的错误和不可预测的行为。在“严格模式”下开发时，React 会调用每个组件的函数两次，这可以帮助暴露由不纯函数引起的错误。

#### 提交到 DOM

在渲染（调用）你的组件之后，React 会修改 DOM。

- 对于初始渲染， React 将使用 appendChild()DOM API 将它创建的所有 DOM 节点放在屏幕上。
- 对于重新渲染， React 将应用最少的必要操作（在渲染时计算！）以使 DOM 匹配最新的渲染输出。

如果渲染之间存在差异，React 只会更改 DOM 节点。如下面的组件它每秒使用从其父级传递的不同 props 重新渲染。将一些文本添加到 中`<input>`，更新其 value，但是当组件重新呈现时，文本不会消失

```javascript
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

如果渲染结果与上次相同，React 不会接触 DOM

### state 为快照

state 的行为更像是快照。设置它不会更改您已有的状态变量，而是会触发重新渲染。

“渲染”意味着 React 正在调用你的组件，它是一个函数。您从该函数返回的 JSX 就像 UI 的及时快照。它的 props、事件处理程序和局部变量都是**使用渲染时的状态计算的**。

返回的 UI“快照”是交互式的。它包括事件处理程序之类的逻辑，用于指定响应输入时发生的情况。然后 React 更新屏幕以匹配此快照并连接事件处理程序。因此，按下按钮将触发来自 JSX 的点击处理程序

当 React 重新渲染组件时：

- React 再次调用您的函数。
- 您的函数返回一个新的 JSX 快照。
- React 然后更新屏幕以匹配您返回的快照。

state 不像是在函数返回后消失的常规变量，状态实际上“存在”在 React 本身中

在下面例子中，每次点击按钮只会+1，setNumber 只会在下一次渲染时更改 number。即使调用了 `setNumber(number + 1)`3 次，在此渲染的事件处理程序 number 中始终为 0

```javascript
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}

// 第一次渲染时相当于
<button
  onClick={() => {
    setNumber(0 + 1);
    setNumber(0 + 1);
    setNumber(0 + 1);
  }}
>
  +3
</button>;
```

下面例子中 React 中存储的状态可能在定时器运行时已更改，但它是使用**用户与其交互时的状态快照**来安排的！

```javascript
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          setTimeout(() => {
            alert(number);
          }, 3000);
        }}
      >
        +5
      </button>
    </>
  );
}

// 相当于
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

下面示例使事件处理程序更不容易出现计时错误。React 将状态值“固定”在一个渲染的事件处理程序中，无需担心代码运行时状态是否已更改，点击 send 后在 5 秒内更改为 Bob，alert 显示的依然是 Alice。

```javascript
export default function Form() {
  const [to, setTo] = useState("Alice");
  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said Hello to ${to}`);
    }, 5000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{" "}
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
```

可使用`useRef` 来保证任何时候访问的变量都是最新的

```javascript
const [count, setCount] = useState(0);

// 通过 ref 来记忆最新的 count
const countRef = useRef(count);
countRef.current = count;

useEffect(() => {
  const timer = setTimeout(() => {
    console.log(countRef.current);
  }, 3000);
  return () => {
    clearTimeout(timer);
  };
}, []);
```

### 批量状态更新

在上一节中无论我们在同一事件处理程序中调用多少次`setNumber(number + 1)`，第一次渲染的值始终为 1，**React 会等待事件处理程序中的所有代码都运行完毕再处理状态更新**，这就是为什么重新渲染只在所有这些`setNumber()`调用之后发生的原因。这使得可以更新多个状态变量也不会触发太多的重新渲染，即使这些更新来自多个组件的状态变量也一样。但这也意味着在您的事件处理程序及其中的任何代码完成之后，UI 才会更新。这种行为，也称为**批处理**。

React 不会跨多个事件（如点击）进行批处理，例如，如果第一次单击按钮禁用了表单，则第二次单击不会再次提交它。

**我们如何在下一次渲染之前多次更新相同的状态变量？**

我们可以传递一个函数，该函数根据前一个状态计算下一个状态队列，如 `setNumber(n => n + 1)`。

在这里，`n => n + 1 `称为更新程序功能。当您将其传递给状态设置器时：

- 在事件处理程序中的所有其他代码运行后，React 将此函数排入队列以进行处理。
- 在下一次渲染期间，React 遍历队列并为您提供最终更新状态。

```javascript
import { useState } from "react";
export default function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          //第一次点击结果为6
          setNumber(number + 5);
          setNumber((n) => n + 1);
        }}
      >
        Increase the number
      </button>
    </>
  );
}
```

这是这个事件处理程序告诉 React 要做的事情：

- `setNumber(number + 5)`:number 是 0，所以 setNumber(0 + 5)。React 在其队列中添加了“替换为 5”。
- `setNumber(n => n + 1)`:n => n + 1 是一个更新程序功能。React 将该函数添加到其队列中。

事件处理程序完成后，React 将触发重新渲染。在重新渲染期间，React 将处理队列。更新程序函数在渲染期间运行，因此**更新程序函数必须是纯函数**并且只返回结果。

通常通过相应状态变量的第一个字母来命名更新程序函数参数：

```javascript
setEnabled((e) => !e);
setLastName((ln) => ln.reverse());
setFriendCount((fc) => fc * 2);
```

总结：

- 设置状态不会更改现有渲染中的变量，但会请求新的渲染。
- React 在事件处理程序完成运行后处理状态更新。这称为批处理。
- 要在一个事件中多次更新某些状态可以使用 `setNumber(n => n + 1)`更新程序功能。

### 更新状态中的对象

State 可以保存任何类型的 JavaScript 值，包括对象。但是你不应该直接改变你在 React 状态下持有的对象。相反，当您想要更新一个对象时，您需要创建一个新对象（或复制现有对象），然后将状态设置为该副本。

尽管 React 状态中的对象在技术上是可变的，但你应该将它们视为不可变的——就像数字、布尔值和字符串一样。您应该始终替换它们，而不是改变它们。

#### 使用扩展语法复制对象

```javascript
import { useState } from "react";

export default function Form() {
  const [person, setPerson] = useState({
    firstName: "Barbara",
    email: "bhepworth@sculpture.com",
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value,
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value,
    });
  }

  return (
    <>
      <label>
        First name:
        <input value={person.firstName} onChange={handleFirstNameChange} />
      </label>
        Email:
        <input value={person.email} onChange={handleEmailChange} />
      </label>
      <p>
        {person.firstName}({person.email})
      </p>
    </>
  );
}
```

您还可以在对象定义中使用`[]`大括号来指定具有动态名称的属性

```javascript
function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value,
  });
}
```

#### 更新嵌套对象

有这样的嵌套对象结构

```javascript
const [person, setPerson] = useState({
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
});
```

如果你想更新`person.artwork.city`，不可以使用`person.artwork.city = 'New Delhi';`，需要生成新的对象

```javascript
setPerson({
  ...person, // Copy other fields
  artwork: {
    // but replace the artwork
    ...person.artwork, // with the same one
    city: "New Delhi", // but in New Delhi!
  },
});
```

#### 用 Immer 编写简洁的更新逻辑

`Immer` 是一个流行的库，可让您使用方便但可变的语法进行编写，并负责为您生成副本。

> Immer 提供的 draft 是一种特殊类型的对象，称为 Proxy，它“记录”你用它做了什么。这就是为什么你可以随意改变它！在后台，Immer 会找出哪些部分 draft 已被更改，并生成一个包含您所做编辑的全新对象。

```javascript
import { useImmer } from "use-immer";

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value;
    });
  }
  return (
    <>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" by "}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  );
}
```

### 更新状态数组

数组是另一种类型的可变 JavaScript 对象，您可以将其存储在状态中，并且应该被视为不可变的。就像对象一样，当您想要更新存储在 state 中的数组时，您需要创建一个新数组（或复制现有数组），然后设置 state 以使用新数组。

您应该将 React 状态的数组视为只读的。这意味着您不应该重新分配数组中的项目，例如 `arr[0] = 'bird'`，也不应该使用改变数组的方法，例如 `push()`和 `pop()`。您可以通过调用其非变异方法（如`filter`、`concat`,`[...arr]`、`slice`和`map` ）创建一个新数组

**添加**

```javascript
setArtists(
  // Replace the state
  [
    // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name }, // and one new item at the end
  ]
);
```

**移除**

```javascript
setArtists(artists.filter((a) => a.id !== artist.id));
```

**替换**

```javascript
const nextCounters = counters.map((c, i) => {
  if (i === index) {
    // Increment the clicked counter
    return c + 1;
  } else {
    // The rest haven't changed
    return c;
  }
});
setCounters(nextCounters);
```

**插入**

```javascript
const insertAt = 1; // Could be any index
const nextArtists = [
  // Items before the insertion point:
  ...artists.slice(0, insertAt),
  // New item:
  { id: nextId++, name: name },
  // Items after the insertion point:
  ...artists.slice(insertAt),
];
setArtists(nextArtists);
```

**反转或排序**

`reverse()`和`sort()`方法会改变原始数组，需要先复制数组，然后对其进行更改。

```javascript
const nextList = [...list];
nextList.reverse();
setList(nextList);
```

**更新数组内的对象**

问题代码：

```javascript
const myNextList = [...myList];
const artwork = myNextList.find((a) => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

更改`artwork.seen`会更改原始数组，可以使用 map 没有突变的更新版本替换旧数组

```javascript
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
});

```

**用 Immer 编写简洁的更新逻辑**

```javascript
updateMyTodos((draft) => {
  const artwork = draft.find((a) => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

您也可以将和`pop()`、`push()`之类的变异方法应用于 draft.

## 管理状态

### 不要将 props 赋值给 state

```javascript
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

当 messageColor 改变时 color 状态变量将不会被更新

请直接在代码中使用 messageColor，如果你想给它一个更短的名字，使用一个常量：

```javascript
function Message({ messageColor }) {
  const color = messageColor;
}
```

### 受控和非受控组件

通常将具有某些本地状态的组件称为“不受控制”，相反，当组件中的重要信息由 props 而不是其自身的本地状态驱动时，您可能会说组件是“受控的”。这让父组件完全指定其行为。

不受控制的组件在其父组件中更易于使用，因为它们需要较少的配置。但是当您想将它们协调在一起时，它们就不太灵活了。受控组件具有最大的灵活性，但它们需要父组件使用 props 完全配置它们。

在实践中，“受控”和“不受控”并不是严格的技术术语——每个组件通常都有本地状态和道具的某种组合。但是，这是讨论组件如何设计以及它们提供哪些功能的有用方式。

### 保持和重置状态

**保持**

React 使用树结构来管理和建模您制作的 UI。React 从你的 JSX 生成 UI 树。然后 React DOM 更新浏览器 DOM 元素以匹配该 UI 树。（React Native 将这些树转换为特定于移动平台的元素。）

当给组件状态时，你可能会认为状态“存在”组件内部，但是状态实际上保存在 React 内部，React 通过该组件在 UI 树中的位置将其持有的每个状态与正确的组件相关联。

**只要组件在 UI 树中的位置呈现，React 就会保留组件的状态。** 相同位置的相同组件保留状态，如果它被移除，或者不同的组件被渲染在相同的位置，React 会丢弃它的状态。

```javascript
import { useState } from "react";

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

当您勾选或清除复选框时，Counter 状态不会重置。无论 isFancy 是 true 还是 false。从 React 的角度来看，它是同一个组件。

**重置**

当在同一位置渲染不同的组件时，它会重置其整个子树的状态。

```javascript
export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

单击复选框时，计数器状态会重置。因为`div`下第一个子元素从`div`变成了`section`，它下面的整个树（包括和它的状态）也被销毁了

不应该嵌套函数组件，例如

```javascript
export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState("");

    return <input value={text} onChange={(e) => setText(e.target.value)} />;
  }

  return (
    <>
      <MyTextField />
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Clicked {counter} times
      </button>
    </>
  );
}
```

每次渲染都会创建一个不同 MyTextField 函数，在同一个位置渲染了一个不同的组件，所以 React 会重置下面的所有状态。这会导致错误和性能问题。为避免此问题，**请始终在顶层声明组件函数，并且不要嵌套它们的定义。**

### 如何在同一位置重置状态

- 在不同位置渲染组件
- 给每个组件一个明确的身份 key

**在不同位置渲染组件**

```javascript
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

}

```

**使用键重置状态**

```javascript
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
}
```

> 如何保留已移除组件的状态？在真正的聊天应用程序中，可能希望在用户再次选择前一个收件人时恢复输入状态。有几种方法可以使不再可见的组件的状态保持“活动”：
>
> - 使用 CSS 隐藏其他聊天，此解决方案适用于简单的 UI，但是如果隐藏的树很大并且包含很多 DOM 节点，它会变得非常慢。
> - 提升状态将每个收件人的待处理消息保留在父组件中
> - 借助 localStorage 等存储信息

### 使用 reducer 整合状态逻辑

随着组件的增长，状态逻辑数量也在增长，为了降低这种复杂性并将所有逻辑保存在一个易于访问的位置，您可以将状态逻辑移动到组件外部的单个函数中，称为`“reducer”`。

**reducer 函数示例：**

```javascript
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
```

其中当前状态 tasks 声明为第一个参数，调用参数 action 为第二个参数

**使用 reducer：**

`useReducerHook` 有两个参数：

- 减速器功能
- 初始状态

```javascript
import { useReducer } from "react";
import tasksReducer from "./tasksReducer.js";

const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];

export default function TaskBoard() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  ...

}
```

### 使用 Immer 编写简洁的 reducer

```javascript
import { useImmerReducer } from 'use-immer';
function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex(t =>
        t.id === action.task.id
      );
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskBoard() {
  const [tasks, dispatch] = useImmerReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }
  ...
  return (
    ...
  );
}
```

### 使用 Context 深度传递数据

当你需要通过树深入传递一些 props 时，许多组件需要相同的道具，它可能会变得冗长和不方便。使用 React 的 Context 功能可以在不传递道具的情况下将数据“传送”到树中需要它的组件

使用 Context 的步骤：

- 创建 Context。
- 从需要数据的组件中使用该 Context。
- 从指定数据的组件中提供该 Context。

**创建 Context。**

```javascript
// LevelContext.js
import { createContext } from "react";
export const LevelContext = createContext(1);
```

您可以传递任何类型的值给默认值，甚至是对象

**使用 Context**

```javascript
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js"; // 上面定义的LevelContext
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```

useContext 是一个钩子。就像 useState 和 useReducer，你只能在 React 组件的顶层调用 Hook。

**提供 Context**

```javascript
import { LevelContext } from "./LevelContext.js";

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

这告诉 React：如果`<Section>`任意子组件要求 LevelContext，该组件将使用其上方 UI 树中最近的`<LevelContext.Provider>`的值。

**总结**

- 不要过度使用 Context，仅仅因为你需要将 props 传递几个层次，并不意味着你应该把这些信息放到 Context 中。
  使用 props 让哪些组件使用哪些数据非常清楚，维护代码的人会很高兴使用 props 明确数据流。在使用 Context 之前，请先考虑传递 props 或 JSX 做为 children.

- 通常将 reducer 与 Context 一起使用来管理复杂的状态并将其传递给远处的组件，Context 不限于静态值，**如果你在下一次渲染中传递一个不同的值，React 将更新下面读取它的所有组件**。这就是为什么 Context 经常与状态结合使用的原因。

### 使用 Reducer 和 Context 进行扩展

```javascript
// app.js
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";
import { TasksProvider } from "./TasksContext.js";

export default function TaskBoard() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```javascript
// TasksContext.js
import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    ...
  }
}
```

每个组件都读取它需要的 Context

```javascript
// AddTask.js
import { useState, useContext } from "react";
import { useTasksDispatch } from "./TasksContext.js";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();
  return <>...</>;
}

let nextId = 3;
```

如果你的函数以 `use` 开头，像 `useTasks` 和 `useTasksDispatch`， 这样的函数称为 自定义 Hook，可以在其中使用其他 Hook
