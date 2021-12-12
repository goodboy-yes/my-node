# React

## 定义组件

React 允许您将标记、CSS 和 JavaScript 组合成自定义“组件” ，即应用程序的可重用 UI 元素。React 组件是一个 JavaScript 函数

```javascript
// App.js
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
// 或者 如果标记与 return 语句不在同一行，则必须将其括在一对括号中，如果没有括号，后面几行的任何代码return 都将被忽略！
// return (
//   <div>
//     <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
//   </div>
// );
```

> React 组件是常规的 JavaScript 函数，但它们的名称必须以大写字母开头，否则它们将不起作用！

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
