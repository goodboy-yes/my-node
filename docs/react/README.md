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
