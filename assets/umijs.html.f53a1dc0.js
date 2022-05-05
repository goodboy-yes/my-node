import{r as a,o as e,c as p,a as n,d as c,F as o,e as t,b as l}from"./app.08fdc0e7.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";const i={},u=t(`<h1 id="umijs-md" tabindex="-1"><a class="header-anchor" href="#umijs-md" aria-hidden="true">#</a> umijs.md</h1><h2 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h2><p>Umi \u5728\xA0<code>.umirc.ts</code>\u6216\xA0<code>config/config.ts</code>\xA0\u4E2D\u914D\u7F6E\u9879\u76EE\u548C\u63D2\u4EF6\uFF0C\u63A8\u8350\u4E24\u79CD\u914D\u7F6E\u65B9\u5F0F\u4E8C\u9009\u4E00\uFF0C<strong><code>.umirc.ts</code> \xA0\u4F18\u5148\u7EA7\u66F4\u9AD8</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;umi&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  routes<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> component<span class="token operator">:</span> <span class="token string">&#39;@/pages/index&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u5982\u679C\u9879\u76EE\u7684\u914D\u7F6E\u4E0D\u590D\u6742\uFF0C\u63A8\u8350\u5728\xA0<code>.umirc.ts</code>\u4E2D\u5199\u914D\u7F6E\uFF1B \u5982\u679C\u9879\u76EE\u7684\u914D\u7F6E\u6BD4\u8F83\u590D\u6742\uFF0C\u53EF\u4EE5\u5C06\u914D\u7F6E\u5199\u5728\xA0<code>config/config.ts</code>\u4E2D\uFF0C\u5E76\u628A\u914D\u7F6E\u7684\u4E00\u90E8\u5206\u62C6\u5206\u51FA\u53BB\uFF0C\u6BD4\u5982\u8DEF\u7531\u914D\u7F6E\u53EF\u4EE5\u62C6\u5206\u6210\u5355\u72EC\u7684\xA0<code>routes.ts</code></p><h3 id="\u672C\u5730\u4E34\u65F6\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u672C\u5730\u4E34\u65F6\u914D\u7F6E" aria-hidden="true">#</a> \u672C\u5730\u4E34\u65F6\u914D\u7F6E</h3><p>\u53EF\u4EE5\u65B0\u5EFA <code>.umirc.local.ts</code>\uFF0C\u8FD9\u4EFD\u914D\u7F6E\u4F1A\u548C <code>.umirc.ts</code> \u505A deep merge \u540E\u5F62\u6210\u6700\u7EC8\u914D\u7F6E\u3002<code>.umirc.local.ts </code>\u4EC5\u5728 <code>umi dev</code> \u65F6\u6709\u6548\u3002<code>umi build</code> \u65F6\u4E0D\u4F1A\u88AB\u52A0\u8F7D\u3002</p><p><code>.local.ts</code> \u914D\u7F6E\u7684\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u6BD4 <code>UMI_ENV</code> \u6307\u5B9A\u7684\u914D\u7F6E\u66F4\u9AD8</p><h3 id="\u591A\u73AF\u5883\u591A\u4EFD\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u591A\u73AF\u5883\u591A\u4EFD\u914D\u7F6E" aria-hidden="true">#</a> \u591A\u73AF\u5883\u591A\u4EFD\u914D\u7F6E</h3><p>\u53EF\u4EE5\u901A\u8FC7\u73AF\u5883\u53D8\u91CF UMI_ENV \u533A\u5206\u4E0D\u540C\u73AF\u5883\u6765\u6307\u5B9A\u914D\u7F6E\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// .umirc.js \u6216\u8005 config/config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// .umirc.cloud.js \u6216\u8005 config/config.cloud.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> b<span class="token operator">:</span> <span class="token string">&#39;cloud&#39;</span><span class="token punctuation">,</span> c<span class="token operator">:</span> <span class="token string">&#39;cloud&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// .umirc.local.js \u6216\u8005 config/config.local.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> c<span class="token operator">:</span> <span class="token string">&#39;local&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u4E0D\u6307\u5B9A UMI_ENV \u65F6\uFF0C\u62FF\u5230\u7684\u914D\u7F6E\u662F\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  c<span class="token operator">:</span> <span class="token string">&#39;local&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u6307\u5B9A UMI_ENV=cloud \u65F6\uFF0C\u62FF\u5230\u7684\u914D\u7F6E\u662F\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token string">&#39;cloud&#39;</span><span class="token punctuation">,</span>
  c<span class="token operator">:</span> <span class="token string">&#39;local&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> \u73AF\u5883\u53D8\u91CF</h2><h3 id="\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> \u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</h3><p><strong>\u6267\u884C\u547D\u4EE4\u65F6\u6DFB\u52A0</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># OS X, Linux</span>
$ <span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">3000</span> umi dev

<span class="token comment"># Windows (cmd.exe)</span>
$ <span class="token builtin class-name">set</span> <span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">3000</span><span class="token operator">&amp;&amp;</span>umi dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>\u5728 .env \u6587\u4EF6\u4E2D\u5B9A\u4E49</strong></p><p>Umi \u4E2D\u7EA6\u5B9A\u6839\u76EE\u5F55\u4E0B\u7684 .env \u4E3A\u73AF\u5883\u53D8\u91CF\u914D\u7F6E\u6587\u4EF6\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token constant">PORT</span><span class="token operator">=</span><span class="token number">3000</span>
<span class="token constant">BABEL_CACHE</span><span class="token operator">=</span>none
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,22),d={href:"https://umijs.org/zh-CN/docs/env-variables#umi_env",target:"_blank",rel:"noopener noreferrer"},m=l("\u73AF\u5883\u53D8\u91CF\u5217\u8868");function k(b,g){const s=a("ExternalLinkIcon");return e(),p(o,null,[u,n("p",null,[n("a",d,[m,c(s)])])],64)}var f=r(i,[["render",k]]);export{f as default};
