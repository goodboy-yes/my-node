# umijs.md

## 配置

Umi 在 `.umirc.ts`或 `config/config.ts` 中配置项目和插件，推荐两种配置方式二选一，**`.umirc.ts`
 优先级更高**

```js
import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
```
如果项目的配置不复杂，推荐在 `.umirc.ts`中写配置； 如果项目的配置比较复杂，可以将配置写在 `config/config.ts`中，并把配置的一部分拆分出去，比如路由配置可以拆分成单独的 `routes.ts`

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
PORT=3000
BABEL_CACHE=none
```

[环境变量列表](https://umijs.org/zh-CN/docs/env-variables#umi_env)