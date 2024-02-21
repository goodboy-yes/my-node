import{_ as p,r as c,o as i,c as l,a as n,b as s,d as e,e as a}from"./app-CtA61ec0.js";const o={},u=a(`<h1 id="小技巧" tabindex="-1"><a class="header-anchor" href="#小技巧"><span>小技巧</span></a></h1><h2 id="不定宽文字跑马灯来回滚动展示" tabindex="-1"><a class="header-anchor" href="#不定宽文字跑马灯来回滚动展示"><span>不定宽文字跑马灯来回滚动展示</span></a></h2><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>我的宽度是正常宽度<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>我的宽度是正常宽度<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scroll<span class="token punctuation">&quot;</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>我的宽度是溢出了溢出了很大一部分<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    我的宽度是溢出了溢出了很大一部分
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>父容器定宽</strong></p>`,4),r={href:"https://codepen.io/Chokcoco/pen/QWyoMrx",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token comment">/* &lt;p&gt; 标签的宽度为父元素的 100%，需借助 inline-block 的特性取得实际宽度，不使用inline是因为 transform 是无法作用在内联元素之上的 */</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p:hover</span> <span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> move 1.5s infinite alternate linear<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> move</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 使用 transform: translate() 进行位移的时候，如果使用百分比表示，那么百分比的基准元素是元素本身 */</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span><span class="token function">calc</span><span class="token punctuation">(</span>-100% + 150px<span class="token punctuation">)</span><span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父容器不定宽</p>`,2),k={href:"https://codepen.io/Chokcoco/pen/oNbVGrd",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p:hover</span> <span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> move 1.5s infinite alternate linear<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> move</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 使用 margin-left 替换 left 也是一样可以实现的，使用百分比表示的 margin-left 位移的基准也是父元素的宽度 */</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-100%<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不足</strong></p><ul><li>无法判断文本长度是否超出父元素宽度，需要借助 JavaScript 简单判断，然后通过一个 class 进行控制。</li><li>在父容器不定宽度的情况下，由于需要同时对两个属性进行动画，并且位移的方向是相反的，所以动画看上去会有一点闪烁</li></ul>`,3),m={href:"https://mp.weixin.qq.com/s/aX8Sh3beSmMh0OF_79nw_A",target:"_blank",rel:"noopener noreferrer"},b=a(`<h2 id="文本超出显示省略号" tabindex="-1"><a class="header-anchor" href="#文本超出显示省略号"><span>文本超出显示省略号...</span></a></h2><p><strong>单行</strong></p><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
<span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多行</strong></p><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
<span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
<span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="居中布局方式" tabindex="-1"><a class="header-anchor" href="#居中布局方式"><span>居中布局方式</span></a></h2><h3 id="行内元素" tabindex="-1"><a class="header-anchor" href="#行内元素"><span>行内元素</span></a></h3><h4 id="text-align" tabindex="-1"><a class="header-anchor" href="#text-align"><span>text-align</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="line-height" tabindex="-1"><a class="header-anchor" href="#line-height"><span>line-height</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token comment">/* 垂直居中*/</span>

<span class="token comment">/*&lt;div class=&quot;wrap&quot; &gt; &lt;div class=&quot;box1&quot; &gt; &lt;/div &gt; &lt;/div &gt;*/</span>
<span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.box1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vertical-align" tabindex="-1"><a class="header-anchor" href="#vertical-align"><span>vertical-align</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token comment">/* 水平垂直居中*/</span>

<span class="token comment">/*&lt;div class=&quot;wrap&quot; &gt; &lt;div class=&quot;box1&quot; &gt; &lt;/div &gt; &lt;/div &gt;*/</span>
<span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrap::after</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box1</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="块级元素" tabindex="-1"><a class="header-anchor" href="#块级元素"><span>块级元素</span></a></h3><h4 id="flex" tabindex="-1"><a class="header-anchor" href="#flex"><span>flex</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="transform-和-postition" tabindex="-1"><a class="header-anchor" href="#transform-和-postition"><span>transform 和 postition</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="margin" tabindex="-1"><a class="header-anchor" href="#margin"><span>margin</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="定位" tabindex="-1"><a class="header-anchor" href="#定位"><span>定位</span></a></h4><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-写出一个三角形角标" tabindex="-1"><a class="header-anchor" href="#css-写出一个三角形角标"><span>css 写出一个三角形角标</span></a></h2><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token comment">/* 等腰 */</span>
<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 4px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-bottom-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 等边 */</span>
<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 4px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 8px solid red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24);function h(g,y){const t=c("ExternalLinkIcon");return i(),l("div",null,[u,n("p",null,[n("a",r,[s("codepen"),e(t)])]),d,n("p",null,[n("a",k,[s("codepen"),e(t)])]),v,n("blockquote",null,[n("p",null,[s("参考链接："),n("a",m,[s("小技巧 | 巧妙实现不定宽溢出文本循环滚动展示"),e(t)])])]),b])}const f=p(o,[["render",h],["__file","skill.html.vue"]]),w=JSON.parse('{"path":"/css/skill.html","title":"小技巧","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"不定宽文字跑马灯来回滚动展示","slug":"不定宽文字跑马灯来回滚动展示","link":"#不定宽文字跑马灯来回滚动展示","children":[]},{"level":2,"title":"文本超出显示省略号...","slug":"文本超出显示省略号","link":"#文本超出显示省略号","children":[]},{"level":2,"title":"居中布局方式","slug":"居中布局方式","link":"#居中布局方式","children":[{"level":3,"title":"行内元素","slug":"行内元素","link":"#行内元素","children":[]},{"level":3,"title":"块级元素","slug":"块级元素","link":"#块级元素","children":[]}]},{"level":2,"title":"css 写出一个三角形角标","slug":"css-写出一个三角形角标","link":"#css-写出一个三角形角标","children":[]}],"git":{"updatedTime":1708503944000,"contributors":[{"name":"guokc","email":"guokc@tsintergy.com","commits":1}]},"filePathRelative":"css/skill.md"}');export{f as comp,w as data};
