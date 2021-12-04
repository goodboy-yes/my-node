# keep-alive

## 用法

`<keep-alive>`组件可接收三个属性：

Props：
`include - string | RegExp | Array`。只有名称匹配的组件会被缓存。
`exclude - string | RegExp | Array`。任何名称匹配的组件都不会被缓存。
`max - number | string`。最多可以缓存多少组件实例。

`include` 和 `exclude prop` 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- regex (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- Array (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

max 表示最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

## 使用场景

从首页–>列表页–>商品详情页–>返回到列表页(需要缓存)–>返回到首页(需要缓存)–>再次进入列表页(不需要缓存)

- 在路由 meta 对象里定义两个值：

  `keepAlive`：这个路由是否需要缓存

  `deepth`：代表页面之间的前进后退的层级关系

```javascript
   {
       path: '*',
       name: 'Home',
       component: () => import(/* webpackPreload: true */ '@/views/home'),
       meta: {
         keepAlive: true,
         deepth: 1
       }
     },
     {
       path: '/list',
       name: 'list',
       component: () => import('@/views/list'),
       meta: {
         keepAlive: true,
         deepth: 2
       }
     },
     {
       path: '/detail',
       name: 'Detail',
       component: () => import('@/views/detail'),
       meta: {
         keepAlive: true,
         deepth: 3
       }
     },
```

- 监听路由动态控制需要缓存的值

```javascript
//3x版本router-view不允许直接写在keep-alive里面，需注意 https://next.router.vuejs.org/zh/guide/migration/#router-view-%E3%80%81-keep-alive-%E5%92%8C-transition
<template>
    <div id="app">
    <keep-alive :include="include">
        <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    </div>
</template>

export default {
    data() {
    return {
        include: []
    };
    },
    watch: {
    $route(to, from) {
        // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
        if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
        }
        // 如果 要 form(离开) 的页面是 keepAlive缓存的，
        // 再根据 deepth 来判断是前进还是后退
        // 如果是后退：
        if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
        }
    }
    }
};
```

以上场景在通过监听路由，动态的设置了在第一次进入并回退回来时的缓存实现，并在第二次进入时重新开始进行新一轮缓存设置,实现动态控制缓存。

## 原理

> 参考链接
> [聊聊 vue 中的 keep-alive](https://mp.weixin.qq.com/s?__biz=MzU0OTExNzYwNg==&mid=2247492067&idx=1&sn=afd964fce52e360310362ffde61033ab&scene=21#wechat_redirect)
