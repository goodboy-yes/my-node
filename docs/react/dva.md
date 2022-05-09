# dva

## 介绍

`dva` 首先是一个基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，

为了简化开发体验，`dva` 还额外内置了 [react-router](https://github.com/ReactTraining/react-router) 和 [fetch](https://github.com/github/fetch)，所以也可以理解为一个轻量级的应用框架。

## 为什么使用 dva

### React 没有解决的问题

React 本身只是一个 DOM 的抽象层，使用组件构建虚拟 DOM。

如果开发大应用，还需要解决一个问题。

- 通信：组件之间如何通信？
- 数据流：数据如何和视图串联起来？路由和数据如何绑定？如何编写异步逻辑？等等

### 目前最流行的数据流方案

截止 2017.1，最流行的社区 React 应用架构方案如下。

- 路由： [React-Router](https://github.com/ReactTraining/react-router/tree/v2.8.1)
- 架构： [Redux](https://github.com/reactjs/redux)
- 异步操作： [Redux-saga](https://github.com/yelouafi/redux-saga)

### dva 是什么

dva 是体验技术部开发的 React 应用框架，将上面三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷。

`dva` = `React-Router` + `Redux` + `Redux-saga`

## 上手

### 定义 Model

`dva` 通过 `model` 的概念把一个领域模型管理起来，包含同步更新 `state` 的 `reducers`，处理异步逻辑的 `effects`，订阅数据源的 `subscriptions`

```js
export default {
  namespace: "products",
  state: [],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter((item) => item.id !== id);
    },
  },
};
```

这个 model 里：

- namespace 表示在全局 state 上的 key
- state 是初始值，在这里是空数组
- reducers 等同于 redux 里的 reducer，接收 action，同步更新 state

### connect 起来

dva 提供了 connect 方法。如果你熟悉 redux，这个 connect 就是 react-redux 的 connect 。

```jsx
import React from "react";
import { connect } from "dva";
import ProductList from "../components/ProductList";

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: "products/delete",
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
```

### 示例

```jsx
import React from "react";
import dva, { connect } from "dva";
import "./style.css";

// 1. Initialize
const app = dva();

console.log(2);

// 2. Model
app.model({
  namespace: "count",
  state: 0,
  reducers: {
    add(count) {
      return count + 1;
    },
    minus(count) {
      return count - 1;
    },
  },
});

class TestError extends React.Component {
  componentDidCatch(e) {
    alert(e.message);
  }
  componentDidMount() {
    // throw new Error('a');
  }
  render() {
    return <div>TestError</div>;
  }
}

// 3. View
const App = connect(({ count }) => ({
  count,
}))(function (props) {
  return (
    <div>
      <TestError />
      <h2>{props.count}</h2>
      <button
        key="add"
        onClick={() => {
          props.dispatch({ type: "count/add" });
        }}
      >
        +
      </button>
      <button
        key="minus"
        onClick={() => {
          props.dispatch({ type: "count/minus" });
        }}
      >
        -
      </button>
    </div>
  );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start("#root");
```

## Dva 概念

### 数据流向

数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，改变数据的时候可以通过 `dispatch` 发起一个 action，

如果是同步行为会直接通过 `Reducers` 改变 `State` ，

如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`

<img src="https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png" width="807" />

### State 和 View

State 是储存数据的地方，收到 Action 以后，会更新数据。

View 就是 React 组件构成的 UI 层，从 State 取数据后，渲染成 HTML 代码。只要 State 有变化，View 就会自动更新。

### Models

#### State

State 表示 Model 的状态数据，通常表现为一个 javascript 对象（当然它可以是任何值）；操作的时候每次都要当作不可变数据（immutable data）来对待，便于测试和追踪变化。

#### Action

Action 是一个普通 javascript 对象，它是改变 State 的唯一途径。通过 dispatch 函数调用一个 action，从而改变对应的数据。

action 必须带有 type 属性指明具体的行为，其它字段可以自定义

需要注意的是 dispatch 是在组件 connect Models 以后，通过 props 传入的

#### dispatch 函数

dispatching function 是一个用于触发 action 的函数

在 dva 中，connect Model 的组件通过 props 可以访问到 dispatch，可以调用 Model 中的 Reducer 或者 Effects，常见的形式如：

```javascript
dispatch({
  type: "user/add", // 如果在 model 外调用，需要添加 namespace
  payload: {}, // 需要传递的信息
});
```

#### Reducer

Reducer（也称为 reducing function）函数接受两个参数：之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果

在 dva 中，reducers 聚合积累的结果是当前 model 的 state 对象。通过 actions 中传入的值，与当前 reducers 中的值进行运算获得新的值（也就是新的 state）

需要注意的是 Reducer 必须是纯函数，所以同样的输入必然得到同样的输出，它们不应该产生任何副作用。

#### Effect

处理异步动作，基于 Redux-saga 实现

Effect 被称为副作用，在我们的应用中，最常见的就是异步操作。它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出。

```js
function* addAfter1Second(action, { put, call }) {
  yield call(delay, 1000);
  yield put({ type: "add" });
}
```

Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。

dva 提供多个 effect 函数内部的处理函数，比较常用的是 `call` 和 `put`。

- call：执行异步函数
- put：发出一个 Action，类似于 dispatch

#### Subscription

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

```javascript
import key from 'keymaster';
...
app.model({
  namespace: 'count',
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  }
});
```

#### connect 方法

connect 是一个函数，绑定 State 到 View。

```js
import { connect } from "dva";
function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```

connect 方法返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。

connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。

#### Model 对象的例子

```js
{
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) { return state + 1 },
  },
  effects: {
    *addAfter1Second(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
}
```
