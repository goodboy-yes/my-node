# umijs

## 配置

Umi 在  `.umirc.ts`或  `config/config.ts`  中配置项目和插件，推荐两种配置方式二选一，**`.umirc.ts`
  优先级更高**

```js
import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "@/pages/index" }],
});
```

如果项目的配置不复杂，推荐在  `.umirc.ts`中写配置； 如果项目的配置比较复杂，可以将配置写在  `config/config.ts`中，并把配置的一部分拆分出去，比如路由配置可以拆分成单独的  `routes.ts`

### 本地临时配置

可以新建 `.umirc.local.ts`，这份配置会和 `.umirc.ts` 做 deep merge 后形成最终配置。`.umirc.local.ts `仅在 `umi dev` 时有效。`umi build` 时不会被加载。

`.local.ts` 配置的优先级最高，比 `UMI_ENV` 指定的配置更高

### 多环境多份配置

可以通过环境变量 UMI_ENV 区分不同环境来指定配置。

```js
// .umirc.js 或者 config/config.js
export default { a: 1, b: 2 };

// .umirc.cloud.js 或者 config/config.cloud.js
export default { b: 'cloud', c: 'cloud' };

// .umirc.local.js 或者 config/config.local.js
export default { c: 'local' };
```

不指定 UMI_ENV 时，拿到的配置是：

```js
{
  a: 1,
  b: 2,
  c: 'local',
}
```

指定 UMI_ENV=cloud 时，拿到的配置是：

```js
{
  a: 1,
  b: 'cloud',
  c: 'local',
}
```

### 运行时配置

**配置方式**

运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、jsx、import 浏览器端依赖等等，注意不要引入 node 依赖。

约定 `src/app.tsx` 为运行时配置。

[配置项](https://umijs.org/zh-CN/docs/runtime-config)

**用法**

- 渲染之前做权限校验
- 修改路由
- 在初始加载和路由切换时做埋点统计、设置标题

## 环境变量

### 设置环境变量

**执行命令时添加**

```bash
# OS X, Linux
$ PORT=3000 umi dev

# Windows (cmd.exe)
$ set PORT=3000&&umi dev
```

**在 .env 文件中定义**

Umi 中约定根目录下的 .env 为环境变量配置文件。

```js
PORT = 3000;
BABEL_CACHE = none;
```

[环境变量列表](https://umijs.org/zh-CN/docs/env-variables#umi_env)

## HTML 模板

新建 `src/pages/document.ejs`，umi 约定如果这个文件存在，会作为默认模板

模板里可通过 context 来获取到 umi 提供的变量，context 包含：

- route，路由信息，需要打包出多个静态 HTML 时（即配置了 exportStatic 时）有效
- config，用户配置信息
  比如：

```html
<link
  rel="icon"
  type="image/x-icon"
  href="<%= context.config.publicPath %>favicon.png"
/>
```

## 使用 CSS

### 全局样式

Umi 中约定 `src/global.css` 为全局样式，如果存在此文件，会被自动引入到入口文件最前面。

比如用于覆盖样式

```css
.ant-select-selection {
  max-height: 51px;
  overflow: auto;
}
```

### CSS Modules

Umi 会自动识别 CSS Modules 的使用，你把他当做 CSS Modules 用时才是 CSS Modules

### CSS 预处理器

Umi 内置支持 less，不支持 sass 和 stylus，但如果有需求，可以通过 chainWebpack 配置或者 umi 插件的形式支持。

## 插件

### [@umijs/plugin-request](https://umijs.org/zh-CN/plugins/plugin-request)

`@umijs/plugin-request` 基于 `umi-request` 和 `ahooks` 的 `useRequest` 提供了一套统一的网络请求和错误处理方案。

#### 配置

**运行时配置**

在 src/app.ts 中你可以配置一些运行时的配置项来实现部分自定义需求

```js
import { RequestConfig } from "umi";

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};
```

该配置返回一个对象。除了 `errorConfig` 和 `middlewares` 以外其它配置都是直接透传 `umi-request` 的全局配置。

#### API

**request**

通过 `import { request } from 'umi';` 你可以使用内置的请求方法。 `request` 接收两个参数，第一个参数是 url，第二个参数是请求的 options。options 具体格式参考 [`umi-request`](https://github.com/umijs/umi-request)。

```js
request("/api/user", {
  params: {
    name: 1,
  },
});
```

**useRequest**

该插件内置了 `@ahooksjs/use-request`，你可以在组件内通过该 Hook 简单便捷的消费数据。

```jsx
import { useRequest } from "umi";

export default () => {
  const { data, error, loading } = useRequest(() => {
    return services.getUserList("/api/test");
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data.name}</div>;
};
```

更多配置你可以参考 [@ahooksjs/use-request](https://ahooks.js.org/zh-CN/hooks/use-request/index) 的文档，相比 @umijs/use-request 本身有如下两点差异：

- 按照接口请求规范内置了 formatResult: res => res?.data 让你可以更方便的使用数据，当然你也可以自己配置 formatResult 来覆盖内置的这个逻辑。
- 按照接口错误规范统一了错误处理逻辑。

### [@umijs/plugin-initial-state](https://umijs.org/zh-CN/plugins/plugin-initial-state)

约定一个地方生产和消费初始化数据。

#### 启动

有 `src/app.ts` 并且导出 `getInitialState` 方法时启用。本插件不可直接使用，必须搭配 `@umijs/plugin-model` 一起使用。

#### 配置

**getInitialState**

该配置是一个 async 的 function。会在整个应用最开始执行，返回值会作为全局共享的数据。Layout 插件、Access 插件以及用户都可以通过 useModel('@@initialState') 直接获取到这份数据。

```js
// src/app.ts
export async function getInitialState() {
  const data = await fetchXXX();
  return data;
}
```

#### API

**useModel**

获取初始值

```js
import { useModel } from "umi";

export default () => {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel("@@initialState");
  return <>{initialState}</>;
};
```

### [@umijs/plugin-dva](https://umijs.org/zh-CN/plugins/plugin-dva)

#### 启动

配置开启

```js
export default {
  dva: {
    hmr: false,
  },
};
```

#### 介绍

包含以下功能，

- 内置 dva，默认版本是 ^2.6.0-beta.20，如果项目中有依赖，会优先使用项目中依赖的版本。
- 约定式的 model 组织方式，不用手动注册 model
- 文件名即 namespace，model 内如果没有声明 namespace，会以文件名作为 namespace
- 内置 dva-loading，直接 connect loading 字段使用即可
- 支持 immer，通过配置 immer 开启

符合以下规则的文件会被认为是 model 文件，找到的文件，会做一次校验，校验通过后，才会被添加到最终到 dva model 列表

- src/models 下的文件
- src/pages 下，子目录中 models 目录下的文件
- src/pages 下，所有 model.ts 文件(不区分任何字母大小写)

#### 配置

**运行时配置**

通过 src/app.tsx 文件配置 dva 创建时的参数。

```js
import { createLogger } from "redux-logger";
import { message } from "antd";

export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
```

#### API

常用方法可从 umi 直接 import

```js
import { connect } from "umi";
```

## API

### 路由

#### withRouter

高阶组件，可以通过 withRouter 获取到 history、location、match 对象

```js
import { withRouter } from "umi";

export default withRouter(({ history, location, match }) => {
  return (
    <div>
      <ul>
        <li>history: {history.action}</li>
        <li>location: {location.pathname}</li>
        <li>match: {`${match.isExact}`}</li>
      </ul>
    </div>
  );
});
```
