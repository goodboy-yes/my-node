# React

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

在上面例子中，每次点击按钮只会+1，setNumber 只会在下一次渲染时更改 number。即使调用了 `setNumber(number + 1)`3 次，在此渲染的事件处理程序 number 中始终为 0

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

上面例子中 React 中存储的状态可能在定时器运行时已更改，但它是使用**用户与其交互时的状态快照**来安排的！

下面示例使事件处理程序更不容易出现计时错误

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

React 将状态值“固定”在一个渲染的事件处理程序中，无需担心代码运行时状态是否已更改，点击 send 后在 5 秒内更改为 Bob，alert 显示的依然是 Alice。

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
