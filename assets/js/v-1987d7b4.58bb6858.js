"use strict";(self.webpackChunkmy_notes=self.webpackChunkmy_notes||[]).push([[424],{7527:(l,e,n)=>{n.r(e),n.d(e,{data:()=>u});const u={key:"v-1987d7b4",path:"/node-js/",title:"NodeJs",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"组成",slug:"组成",children:[]}],filePathRelative:"node-js/README.md",git:{updatedTime:1637511077e3,contributors:[]}}},9822:(l,e,n)=>{n.r(e),n.d(e,{default:()=>h});var u=n(6252),s=n(507);const t=(0,u._)("h1",{id:"nodejs",tabindex:"-1"},[(0,u._)("a",{class:"header-anchor",href:"#nodejs","aria-hidden":"true"},"#"),(0,u.Uk)(" NodeJs")],-1),d=(0,u._)("h2",{id:"组成",tabindex:"-1"},[(0,u._)("a",{class:"header-anchor",href:"#组成","aria-hidden":"true"},"#"),(0,u.Uk)(" 组成")],-1),i=(0,u._)("p",null,"Node.js 主要是由 V8、Libuv 和一些第三方库组成。",-1),a=(0,u._)("ul",null,[(0,u._)("li",null,[(0,u._)("p",null,"V8 是一个 JS 引擎。但是它不仅实现了 JS 解析和执行，它还是自定义拓展。比如说我们可以通过 V8 提供一些 C++ API 去定义一些全局变量，这样话我们在 JS 里面去使用这个变量了。正是因为 V8 支持这个自定义的拓展，所以才有了 Node.js 等 JS 运行时。")]),(0,u._)("li",null,[(0,u._)("p",null,"Libuv 是一个跨平台的异步 IO 库。它主要的功能是它封装了各个操作系统的一些 API， 提供网络还有文件进程的这些功能。我们知道在 JS 里面是没有网络文件这些功能的，在前端时，是由浏览器提供的，而在 Node.js 里，这些功能是由 Libuv 提供的。")]),(0,u._)("li",null,[(0,u._)("p",null,"另外 Node.js 里面还引用了很多第三方库，比如 DNS 解析库，还有 HTTP 解析器等等。")])],-1),r=(0,u._)("p",null,[(0,u._)("strong",null,"Node.js 代码整体的架构")],-1),o=(0,u._)("p",null,[(0,u._)("img",{src:s,alt:""}),(0,u.Uk)(" Node.js 代码主要是分为三个部分，分别是 C、C++ 和 JS。")],-1),_=(0,u._)("ul",null,[(0,u._)("li",null,[(0,u._)("p",null,"JS 代码就是我们平时在使用的那些 JS 的模块，比方说像 http 和 fs 这些模块。")]),(0,u._)("li",null,[(0,u._)("p",null,"C++ 代码主要分为三个部分，第一部分主要是封装 Libuv 和第三方库的 C++ 代码，比如 net 和 fs 这些模块都会对应一个 C++ 模块，它主要是对底层的一些封装。第二部分是不依赖 Libuv 和第三方库的 C++ 代码，比方像 Buffer 模块的实现。第三部分 C++ 代码是 V8 本身的代码。")]),(0,u._)("li",null,[(0,u._)("p",null,"C 语言代码主要是包括 Libuv 和第三方库的代码，它们都是纯 C 语言实现的代码。")])],-1),h={render:function(l,e){return(0,u.wg)(),(0,u.iD)(u.HY,null,[t,d,i,a,r,o,_],64)}}},507:(l,e,n)=>{l.exports=n.p+"assets/img/node代码架构.7b6ee18c.webp"}}]);