# 使用

## 定义组件

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

## Hook

在 React 中，useState 以及任何其他以“ use,”开头的函数都称为 Hook。

Hooks 是特殊的函数，仅在 React 渲染时可用。它们让你“连接”到不同的 React 特性。

> 调用 Hooks 仅在组件或另一个 Hook 的顶层有效，不能在条件、循环或其他嵌套函数中调用 Hook

### useState

但组件里的数据改变时，要使用新数据更新组件，需要做两件事：

- 保留渲染之间的数据。
- 触发 React 以使用新数据渲染组件（重新渲染）。

当定义常规变量，有两件事阻止了视图更新：

- 常规变量不会在渲染之间持续存在。当 React 第二次渲染这个组件时，它会从头开始渲染——它不考虑对常规变量的任何更改。
- 对常规变量的更改不会触发渲染。React 没有意识到它需要使用新数据再次渲染组件。

而使用 `useState` 可以保持呈现之间的数据，并提供一个状态设置函数，用于更新变量并触发 React 再次渲染组件

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
f

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

### useRef

#### 使用 Refs 引用值

当您希望组件“记住”某些信息，但又不希望该信息触发新的渲染时，您可以使用 ref

```javascript
import { useRef } from "react";
const ref = useRef(0);
```

ref 是一个普通的 JavaScript 对象，具有可以读取和修改的属性 current。

```javascript
{
  current: 0;
}
```

**组件不会随着 ref 改变而重新渲染**。与 state 一样，refs 在重新渲染之间值由 React 保留，不使用 useRef 定义的局部变量重新渲染时都会从头开始初始化

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

**使用 `flushSync` 同步刷新状态更新**

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

## JSX

JSX 是 JavaScript 的语法扩展，允许您在 JavaScript 文件中编写类似 HTML 的标记。React 组件用 JSX 将渲染逻辑与标记组合在一起，因为它们是相关的。

### 返回单个根元素

要从一个组件返回多个元素，请将它们用单个父标签包裹起来

```html
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <ul>
    ...
  </ul>
</div>
```

如果不想额外添加`<div>`，可以改为<></>

```html
<>
  <h1>Hedy Lamarr's Todos</h1>
  <ul>
    ...
  </ul>
</>
```

> 这个空标签称为 React 片段。React 片段让您可以对事物进行分组，而不会在浏览器 HTML 树中留下任何痕迹。JSX 看起来像 HTML，但在底层它被转换成普通的 JavaScript 对象。

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

`JSX` 变成了 JavaScript，用 `JSX` 编写的属性成为 JavaScript 对象的键。 JavaScript 对变量名有限制。例如，它们的名称不能包含破折号。

这就是为什么在 `React` 中，许多 `HTML` 和 `SVG` 属性都是用驼峰命名法编写的。例如，使用 `stroke-width` 代替 `strokeWidth`。因为 class 是保留字，所以在 `React` 中你可以写成 `className`

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

一个组件必须返回，如果不想显示内容，可以返回 null

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

### 保持组件为纯函数

React 假设编写的每个组件都是纯函数。这意味着在给定相同输入的情况下，React 组件必须始终返回相同的 JSX

React 提供了一种“严格模式”，在这种模式下，它在开发过程中两次调用每个组件的函数。通过两次调用组件函数，严格模式有助于找到违反纯函数的组件。严格模式在生产中没有任何影响，因此它不会降低用户的应用程序速度。要选择严格模式，可以将根组件包装到`<React.StrictMode>`

**什么时候不需要纯函数？**

更新屏幕、开始动画、改变数据等被称为副作用。它们不是在渲染过程中发生的事情

在 React 中，副作用通常属于事件处理程序。事件处理程序是 React 在您执行某些操作时运行的函数，例如，当单击按钮时，即使在组件中定义了事件处理程序，它们也不会在渲染期间运行，所以事件处理程序不需要是纯的。

可以通过在组件中调用`useEffect`将其附加到 JSX ，这告诉 React 在渲染之后，在允许副作用的情况下稍后执行它。

## 交互

### 添加事件处理

```javascript
export default function Button() {
  function handleClick() {
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
const [count, setCount] = useState(0)

// 通过 ref 来记忆最新的 count
const countRef = useRef(count)
countRef.current = count

useEffect(() => {
  const timer = setTimeout(() => {
    console.log(countRef.current)
  }, 3000)
  return () => {
    clearTimeout(timer)
  }
}, [])
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

```javascript
import { useReducer } from "react";
import tasksReducer from "./tasksReducer.js";
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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
import { TasksDispatchContext } from "./TasksContext.js";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");
  const dispatch = useContext(TasksDispatchContext);
  return <>...</>;
}

let nextId = 3;
```

如果你的函数以 `use` 开头，像 `useTasks` 和 `useTasksDispatch`， 这样的函数称为 自定义 Hook，可以在其中使用其他 Hook
