# 跨域

## 解决方案

### JSONP

JSONP 是 JSON with Padding 的缩写，利用了`<script>` 标签的 src 属性没有跨域限制

具体实现思路大致分为以下步骤：

- 本站的脚本创建一个 元素，src 地址指向跨域请求数据的服务器
- 提供一个回调函数来接受数据，函数名可以通过地址参数传递进行约定
- 服务器收到请求后，返回一个包装了 JSON 数据的响应字符串，类似这样：callback({...})

浏览器接受响应后就会去执行回调函数 callback，传递解析后的 JSON 对象作为参数，这样我们就可以在 callback 里处理数据了

```javascript
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    // 创建一个临时的 script 标签用于发起请求
    const script = document.createElement('script');
    // 将回调函数临时绑定到 window 对象，回调函数执行完成后，移除 script 标签
    window[callback] = data => {
      resolve(data);
      document.body.removeChild(script);
    };
    // 构造 GET 请求参数，key=value&callback=callback
    const formatParams = { ...params, callback };
    const requestParams = Object.keys(formatParams)
      .reduce((acc, cur) => {
        return acc.concat([`${cur}=${formatParams[cur]}`]);
      }, [])
   .join('&');
 // 构造 GET 请求的 url 地址
    const src = `${url}?${requestParams}`;
    script.setAttribute('src', src);
    document.body.appendChild(script);
  });
}

// 调用时
jsonp({
  url: 'https://xxx.xxx',
  params: {...},
  callback: 'func',
})

```

本质上就是：

```html
<script src='https://xxx.xxx.xx?key=value&callback=xxx'><script>
```

**缺点：** 需要服务器支持而且只支持 GET 请求

### CORS

CORS（Cross-Origin Resource Sharing）的全称叫 跨域资源共享

CORS 实现的原理：使用额外的 HTTP 头来告诉浏览器，让运行在某一个 origin 上的 Web 应用允许访问来自不同源服务器上的指定的资源。

整个 CORS 的通信过程，都是浏览器自动完成。

浏览器一旦发现请求是一个跨域请求，首先会判断请求的类型，

如果是**简单请求**，会在请求头中增加一个 Origin 字段，表示这次请求是来自哪一个源。而服务器接受到请求后，会返回一个响应，响应头中会包含一个叫 Access-Control-Allow-Origin 的字段，它的值要么包含由 Origin 首部字段所指明的域名，要么是一个 "\*"，表示接受任意域名的请求。如果响应头中没有这个字段，就说明当前源不在服务器的许可范围内，浏览器就会报错

如果是**非简单请求**，会在正式通信之前，发送一个预检请求（preflight），目的在于询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段，只有得到肯定答复，浏览器才会发出正式的请求，否则就报错。

>简单请求:
GET, HEAD, POST,并且 Content-Type 的值仅限于下列三者之一：
text/plain
multipart/form-data
application/x-www-form-urlencoded

实现 CORS 的关键是服务器，只要服务器实现了 CORS 的相关接口，就可以实现跨域。

CORS 与 JSONP相比，**优势**是支持所有的请求方法，**缺点**是兼容性上较 JSONP 差

### PostMessage

PostMessage 是 Html5 XMLHttpRequest Level 2 中的 API，它可以实现跨文档通信（Cross-document messaging）

### Websocket

Websocket 是 HTML5 的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。

### Nginx 反向代理 和 Node 中间件代理

### document.domain

二级域名相同的情况下，设置 document.domain 就可以实现跨域。