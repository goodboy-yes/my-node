# API

## 全局

### PureComponent

`React.PureComponent` 与 `React.Component` 的区别在于 `React.Component` 并未实现 `shouldComponentUpdate()`，而 `React.PureComponent` 中以**浅层对比** `prop` 和 `state` 的方式来实现了该函数。如果赋予 React 组件相同的 `props` 和 `state`，`render()` 函数会渲染相同的内容

### memo

`React.memo` 为高阶组件。

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。

这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

`React.memo` 仅检查 `props` 变更。如果函数组件拥有 `useState`，`useReducer` 或 `useContext` 的 Hook，当 `state` 或 `context` 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，如果想要控制对比过程，可通过第二个参数传入来实现。

```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

这个方法与 `shouldComponentUpdate` 相反：如果返回的是 true，那么表示不重新渲染，如果返回的是 false，那么要重新渲染。

### cloneElement()

以 `element` 元素为样板克隆并返回新的 React 元素。config 中应包含新的 `props`，`key` 或 `ref`。返回元素的 `props` 是将新的 `props` 与原始元素的 `props` 浅层合并后的结果。新的子元素将取代现有的子元素，如果在 config 中未出现 `key` 或 `ref`，那么原始元素的 `key` 和 `ref` 将被保留。

```jsx
React.cloneElement(element, [config], [...children]);

// 等同于
<element.type {...element.props} {...props}>
  {children}
</element.type>;
```

当通过 `ref` 获取子节点时，你将不会意外地从你祖先节点上窃取它。相同的 `ref` 将添加到克隆后的新元素中

### isValidElement()

```jsx
React.isValidElement(object);
```

验证对象是否为 React 元素，返回值为 true 或 false。

### createRef

`React.createRef` 创建一个能够通过 `ref` 属性附加到 `React` 元素的 `ref`。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

#### forwardRef

`React.forwardRef` 会创建一个 `React` 组件，这个组件能够将其接受的 `ref` 属性转发到其组件树下的另一个组件中。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

### lazy

`React.lazy()` 允许你定义一个动态加载的组件。这有助于缩减 `bundle` 的体积，并延迟加载在初次渲染时未用到的组件。

渲染 lazy 组件依赖该组件渲染树上层的 `<React.Suspense>` 组件

```jsx
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

## 生命周期

`React` 的组件可以定义为 `class` 或函数的形式。在 `React.Component` 的子类中有个必须定义的 `render()` 函数。

**挂载阶段**

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- `constructor()`
- `static getDerivedStateFromProps()`
- `render()`
- `componentDidMount()`

**更新阶段**

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`
- `render()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`

**卸载阶段**

当组件从 DOM 中移除时会调用如下方法：

- `componentWillUnmount()`

**错误处理**

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- `static getDerivedStateFromError()`
- `componentDidCatch()`

### render

render() 方法是 class 组件中唯一必须实现的方法。它会返回以下内容

- React 元素。通常通过 JSX 创建。例如，`<div />` 会被 React 渲染为 DOM 节点，`<MyComponent />` 会被 React 渲染为自定义组件，无论是 `<div />` 还是 `<MyComponent />` 均为 React 元素。
- 数组或 fragments。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 fragments 文档。
- Portals。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 portals 的文档。
- 字符串或数值类型。它们在 DOM 中会被渲染为文本节点。
- 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && `<Child />` 的模式，其中 test 为布尔类型。)

`render()` 函数应该为纯函数，并且它不会直接与浏览器交互。如需与浏览器进行交互，请在 `componentDidMount()` 或其他生命周期方法中执行你的操作。

**如果 `shouldComponentUpdate()` 返回 false，则不会调用 `render()`。**

### constructor()

如果不初始化 `state` 或不进行方法绑定，则不需要为 `React` 组件实现构造函数。

在为 `React.Component` 子类实现构造函数时，应在其他语句之前调用 `super(props)`。否则，`this.props` 在构造函数中可能会出现未定义的 bug。

在 `constructor()` 函数中直接为 `this.state` 赋值初始 `state`。在其他方法中赋值应使用 `this.setState()`

要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 `componentDidMount` 中。

### componentDidMount()

`componentDidMount()` 会在**组件挂载后**（插入 DOM 树中）立即调用。**依赖于 DOM 节点的初始化应该放在这**里。如需通过网络请求获取数据，此处是实例化请求的好地方。

如果在`componentDidMount()` 添加了订阅，请不要忘记在 `componentWillUnmount()` 里取消订阅

可以在 `componentDidMount()` 里直接调用 `setState()`。它将触发额外渲染，但**此渲染会发生在浏览器更新屏幕之前**。如此保证了即使在 `render()` 两次调用的情况下，用户也不会看到中间状态。**请谨慎使用该模式，因为它会导致性能问题。**

**通常应该在 `constructor()` 中初始化 state**。如果渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，可以使用此方式处理

### componentDidUpdate()

```js
componentDidUpdate(prevProps, prevState, snapshot);
```

`componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法。

```jsx
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

也可以在 `componentDidUpdate()` 中直接调用 `setState()`，但请注意它必须被包裹在一个条件语句里，否则会导致死循环。

> 如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。

### componentWillUnmount()

`componentWillUnmount()` 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。
