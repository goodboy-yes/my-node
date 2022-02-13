# react-router(V6)

## 安装

```bash
npm install react-router-dom@6
```

## 使用

### 连接 URL

```jsx
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
```

### 设置路由

```jsx
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
      //"*"表示只有在没有其他路由匹配时才会匹配
      <Route
        path="*"
        element={
          <main>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);
```

嵌套路由里“父”路由中需要渲染一个`Outlet`作为子组件的渲染位置

```jsx
//App.jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

### 使用 useParams 读取 URL 参赛

```jsx
...
// 匹配/invoices/2005”和“/invoices/1998”等
<Route path="invoices" element={<Invoices />}>
  <Route path=":invoiceId" element={<Invoice />} />
</Route>
...
```

```jsx
import { useParams } from "react-router-dom";

export default function Invoice() {
  let params = useParams();
  return <h2>Invoice: {params.invoiceId}</h2>; //:invoiceId -> params.invoiceId
}
```

### 索引路由

- 当父路由匹配但其他子路由都不匹配时，`index routes`匹配。
- `index routes`是父路由的默认子路由。

```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="invoices" element={<Invoices />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
      />
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
  </Route>
</Routes>
```

### 活动链接

- 把`Link`换成`NavLink`。
- 将 `style` 从一个简单的对象更改为一个返回对象的函数。
- 通过查看传递给样式函数的 `isActive` 值来更改链接的颜色

```jsx
import { NavLink, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div>
      <nav>
        {invoices.map((invoice) => (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "red" : "",
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

### 搜索参数

使用`useSearchParams`获取搜索参数，它的工作原理很像 `useState()`

```jsx
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <nav>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
      </nav>
      <Outlet />
    </div>
  );
}
```

### 以编程方式导航

```jsx
import { useNavigate } from "react-router-dom";

export default function Invoice() {
  let navigate = useNavigate();

  return (
    <main>
      <p>
        <button
          onClick={() => {
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
```

### useRoutes

`useRoutes`功能上等同于`<Routes>`，但它使用 JavaScript 对象而不是`<Route>`元素来定义路由

```jsx
import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```
