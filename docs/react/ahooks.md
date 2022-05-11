# ahooks

## useRequest

useRequest 是一个强大的异步数据管理的 Hooks

目前已有能力包括：

- 自动请求/手动请求
- 轮询
- 防抖
- 节流
- 屏幕聚焦重新请求
- 错误重试
- loading delay
- SWR(stale-while-revalidate)
- 缓存

### 默认请求

默认情况下，`useRequest` 第一个参数是一个异步函数，在组件初始化时，**会自动执行该异步函数**。

```js
const { data, error, loading } = useRequest(service);
```

### 手动触发

设置了 `options.manual = true`，则 `useRequest` 不会默认执行，需要通过 `run` 或者 `runAsync` 来触发执行

run 与 runAsync 的区别在于：

- run 是一个普通的同步函数，我们会自动捕获异常，你可以通过 options.onError 来处理异常时的行为。
- runAsync 是一个返回 Promise 的异步函数，如果使用 runAsync 来调用，则意味着你需要自己捕获异常。

```js
import { message } from "antd";
const { data, error, loading, run } = useRequest(editUsername, {
  manual: true,
  onSuccess: (result, params) => {
    message.success(`The username was changed to "${params[0]}" !`);
  },
  onError: (error) => {
    message.error(error.message);
  },
});
```

### 生命周期

`useRequest` 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。

- onBefore：请求之前触发
- onSuccess：请求成功触发
- onError：请求失败触发
- onFinally：请求完成触发

### 刷新（重复上一次请求）

useRequest 提供了 `refresh` 和 `refreshAsync` 方法，使我们可以使用上一次的参数，重新发起请求。

### 立即变更数据

`useRequest` 提供了 `mutate`, 支持立即修改 `useRequest` 返回的 data 参数。

`mutate` 的用法与 `React.setState`一致，支持 `mutate(newData)` 和 `mutate((oldData) => newData)` 两种写法。

```js
const { data: username, mutate } = useRequest(getUsername);
```

### 取消请求

`useRequest` 提供了 `cancel` 函数，可以取消当前正在进行的请求。同时 `useRequest` 会在以下时机自动取消当前请求：

- 组件卸载时，取消正在进行的请求
- 竞态取消，当上一次请求还没返回时，又发起了下一次请求，则会取消上一次请求

```js
const { loading, run, cancel } = useRequest(editUsername, {
  manual: true,
  onSuccess: (result, params) => {
    setState("");
    message.success(`The username was changed to "${params[0]}" !`);
  },
  onError: (error) => {
    message.error(error.message);
  },
});
```

### 参数管理

`useRequest` 返回的 `params` 会记录当次调用 `service` 的参数数组。比如你触发了 `run(1, 2, 3)`，则 `params` 等于 `[1, 2, 3]` 。

如果我们设置了 `options.manual = false`，则首次调用 `service` 的参数可以通过 `options.defaultParams`来设置。

```js
// get username
const {
  data: username,
  run,
  params,
} = useRequest(getUsername, {
  defaultParams: ["1"],
});
```

### API

```js
const {
  loading: boolean,
  data?: TData,
  error?: Error,
  params: TParams || [],
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

### Loading Delay

通过设置 `options.loadingDelay` ，可以延迟 loading 变成 true 的时间，有效防止闪烁。

```js
const { loading, data } = useRequest(getUsername, {
  loadingDelay: 300,
});
```

### 轮询

通过设置 `options.pollingInterval`，进入轮询模式，useRequest 会定时触发 service 执行。

可以通过 `cancel` 来停止轮询，通过 `run/runAsync` 来启动轮询

`pollingWhenHidden`：在页面隐藏时，是否继续轮询

- `options.pollingInterval`、`options.pollingWhenHidden` 支持动态变化。
- 如果设置 `options.manual = true`，则初始化不会启动轮询，需要通过 `run/runAsync` 触发开始。
- 轮询原理是在每次请求完成后，等待 `pollingInterval` 时间，发起下一次请求。

```js
const { data, run, cancel } = useRequest(getUsername, {
  pollingInterval: 3000,
});
```

### Ready

`useRequest` 提供了一个 `options.ready` 参数，当其值为 false 时，请求永远都不会发出。

其具体行为如下：

- 当 `manual=false` 自动请求模式时，每次 ready 从 false 变为 true 时，都会自动发起请求，会带上参数 options.defaultParams。
- 当 `manual=true` 手动请求模式时，只要 `ready=false`，则通过 `run/runAsync` 触发的请求都不会执行。

### 依赖刷新

`useRequest` 提供了一个 `options.refreshDeps` 参数，当它的值变化后，会重新触发请求。

```js
const [userId, setUserId] = useState("1");

const { data, run } = useRequest(() => getUserSchool(userId), {
  refreshDeps: [userId],
});
```

### 屏幕聚焦重新请求

通过设置 `options.refreshOnWindowFocus`，在浏览器窗口 `refocus` 和 `revisible` 时，会重新发起请求。

`focusTimespan`：重新请求间隔，单位为毫秒

`options.refreshOnWindowFocus、options.focusTimespan` 支持动态变化。

```js
const { data } = useRequest(getUsername, {
  refreshOnWindowFocus: true,
});
```

### 防抖

通过设置 `options.debounceWait`，进入防抖模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以防抖策略进行请求。

频繁触发 run，只会在最后一次触发结束后执行

```js
const { data, run } = useRequest(getUsername, {
  debounceWait: 300,
  manual: true,
});
```

### 节流

通过设置 `options.throttleWait`，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。

频繁触发 run，只会每隔 300ms 执行一次。

```js
const { data, run } = useRequest(getUsername, {
  throttleWait: 300,
  manual: true,
});
```

### 缓存 & SWR

如果设置了 ` options.cacheKey``，useRequest ` 会将当前请求成功的数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。

你可以通过 `options.staleTime` 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。

你也可以通过 `options.cacheTime` 设置数据缓存时间，超过该时间，我们会清空该条缓存数据。

### 错误重试

通过设置 `options.retryCount`，指定错误重试次数，则 `useRequest` 在失败后会进行重试。

`cancel` 可以取消正在进行的重试行为

```js
const { data, run } = useRequest(getUsername, {
  retryCount: 3,
});
```
