import{_ as n,o as s,c as e,e as a}from"./app-CtA61ec0.js";const i={},l=a(`<h1 id="伪类和伪元素" tabindex="-1"><a class="header-anchor" href="#伪类和伪元素"><span>伪类和伪元素</span></a></h1><h2 id="伪类" tabindex="-1"><a class="header-anchor" href="#伪类"><span>伪类</span></a></h2><p>伪类存在的意义是为了通过选择器找到那些<strong>不存在于 DOM 树中的信息</strong>（例如&lt;a&gt;标签的:link、:visited 等，这些信息不存在于 DOM 树结构中，只能通过 CSS 选择器来获取）以及<strong>不能被常规 CSS 选择器获取到的信息</strong>（例如要修改第几个子元素的样式）</p><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">selector: pseudo-class</span> <span class="token punctuation">{</span>
  <span class="token property">property</span><span class="token punctuation">:</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
常见伪类：
:active —— 样式添加到正在被激活的元素
:focus —— 样式添加到获得焦点的元素
:hover —— 样式添加到鼠标悬浮的元素
:link —— 样式添加到未被访问过的链接
:visited —— 样式添加到已经访问过的链接
:first-child —— 样式添加到第一个子元素
*/</span>

<span class="token comment">/*例子：*/</span>
<span class="token selector">p:first-child</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*能够被5整除的奇数行*/</span>
<span class="token selector">table tr:nth-child(2n + 1):nth-child(5n) td</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f0f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="伪元素" tabindex="-1"><a class="header-anchor" href="#伪元素"><span>伪元素</span></a></h2><p>伪元素用于<strong>创建一些不在文档树中的元素</strong>，并为其添加样式。比如我们可以通过:before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中</p><p>简单来说，伪元素创建了一个虚拟容器，这个容器不包含任何 DOM 元素，但是可以包含内容。另外，开发者还可以为伪元素定制样式。</p><p><strong>一个选择器只能使用一个伪元素</strong>，并且伪元素必须处于选择器语句的最后。</p><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">selector:pseudo-element</span> <span class="token punctuation">{</span>
  <span class="token property">property</span><span class="token punctuation">:</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
常见伪元素：
:first-letter —— 样式添加到文本首字母
:first-line —— 样式添加到文本首行
:before —— 样式添加到元素之前
:after —— 样式添加到元素之后
*/</span>

<span class="token comment">/*例子：*/</span>
<span class="token selector">p:first-letter</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>实际使用中<code>:before</code>，<code>::before</code>这两种写法都是等效。只是<code>:befor</code> 是 CSS2 的写法，<code>::before</code> 是 CSS3 的写法。双冒号(::)这是 CSS3 规范中的要求，目的是为了区分伪类和伪元素，大多数浏览器都支持这两种表示方式。单冒号(:)用于 CSS3 伪类，双冒号(::)用于 CSS3 伪元素。对于 CSS2 中已经有的伪元素，例如 <code>:before</code>，单冒号和双冒号的写法 <code>::before</code> 作用是一样的。一般情况下为兼容性考虑使用单冒号。</p></blockquote><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li><p>伪类和伪元素都是用来表示文档树以外的&quot;元素&quot;</p></li><li><p>伪类和伪元素分别用单冒号:和双冒号::来表示</p></li><li><p>伪类的效果需要一个实际的类才能达到，而伪元素需要一个实际的元素才能达到。</p></li><li><p>伪类可以同时运用多个，而伪元素只能一次用一个。</p></li><li><p>在 CSS3 中，伪类用一个冒号:，伪元素用两个冒号::。</p></li></ul>`,12),t=[l];function c(o,d){return s(),e("div",null,t)}const r=n(i,[["render",c],["__file","pseudo-classes-and-elements.html.vue"]]),u=JSON.parse('{"path":"/css/pseudo-classes-and-elements.html","title":"伪类和伪元素","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"伪类","slug":"伪类","link":"#伪类","children":[]},{"level":2,"title":"伪元素","slug":"伪元素","link":"#伪元素","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"updatedTime":1708503944000,"contributors":[{"name":"guokc","email":"guokc@tsintergy.com","commits":1}]},"filePathRelative":"css/pseudo-classes-and-elements.md"}');export{r as comp,u as data};
