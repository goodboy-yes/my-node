# dva

## 介绍

`dva` 首先是一个基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，

为了简化开发体验，`dva` 还额外内置了 [react-router](https://github.com/ReactTraining/react-router) 和 [fetch](https://github.com/github/fetch)，所以也可以理解为一个轻量级的应用框架。

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
