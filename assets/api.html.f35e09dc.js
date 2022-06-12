import{e as n}from"./app.a92cb46c.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h1><h2 id="\u5168\u5C40" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40" aria-hidden="true">#</a> \u5168\u5C40</h2><h3 id="purecomponent" tabindex="-1"><a class="header-anchor" href="#purecomponent" aria-hidden="true">#</a> PureComponent</h3><p><code>React.PureComponent</code> \u4E0E <code>React.Component</code> \u7684\u533A\u522B\u5728\u4E8E <code>React.Component</code> \u5E76\u672A\u5B9E\u73B0 <code>shouldComponentUpdate()</code>\uFF0C\u800C <code>React.PureComponent</code> \u4E2D\u4EE5<strong>\u6D45\u5C42\u5BF9\u6BD4</strong> <code>prop</code> \u548C <code>state</code> \u7684\u65B9\u5F0F\u6765\u5B9E\u73B0\u4E86\u8BE5\u51FD\u6570\u3002\u5982\u679C\u8D4B\u4E88 React \u7EC4\u4EF6\u76F8\u540C\u7684 <code>props</code> \u548C <code>state</code>\uFF0C<code>render()</code> \u51FD\u6570\u4F1A\u6E32\u67D3\u76F8\u540C\u7684\u5185\u5BB9</p><h3 id="memo" tabindex="-1"><a class="header-anchor" href="#memo" aria-hidden="true">#</a> memo</h3><p><code>React.memo</code> \u4E3A\u9AD8\u9636\u7EC4\u4EF6\u3002</p><p>\u5982\u679C\u4F60\u7684\u7EC4\u4EF6\u5728\u76F8\u540C props \u7684\u60C5\u51B5\u4E0B\u6E32\u67D3\u76F8\u540C\u7684\u7ED3\u679C\uFF0C\u90A3\u4E48\u4F60\u53EF\u4EE5\u901A\u8FC7\u5C06\u5176\u5305\u88C5\u5728 <code>React.memo</code> \u4E2D\u8C03\u7528\uFF0C\u4EE5\u6B64\u901A\u8FC7\u8BB0\u5FC6\u7EC4\u4EF6\u6E32\u67D3\u7ED3\u679C\u7684\u65B9\u5F0F\u6765\u63D0\u9AD8\u7EC4\u4EF6\u7684\u6027\u80FD\u8868\u73B0\u3002</p><p>\u8FD9\u610F\u5473\u7740\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0CReact \u5C06\u8DF3\u8FC7\u6E32\u67D3\u7EC4\u4EF6\u7684\u64CD\u4F5C\u5E76\u76F4\u63A5\u590D\u7528\u6700\u8FD1\u4E00\u6B21\u6E32\u67D3\u7684\u7ED3\u679C\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* \u4F7F\u7528 props \u6E32\u67D3 */</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>React.memo</code> \u4EC5\u68C0\u67E5 <code>props</code> \u53D8\u66F4\u3002\u5982\u679C\u51FD\u6570\u7EC4\u4EF6\u62E5\u6709 <code>useState</code>\uFF0C<code>useReducer</code> \u6216 <code>useContext</code> \u7684 Hook\uFF0C\u5F53 <code>state</code> \u6216 <code>context</code> \u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u5B83\u4ECD\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002</p><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u5176\u53EA\u4F1A\u5BF9\u590D\u6742\u5BF9\u8C61\u505A\u6D45\u5C42\u5BF9\u6BD4\uFF0C\u5982\u679C\u60F3\u8981\u63A7\u5236\u5BF9\u6BD4\u8FC7\u7A0B\uFF0C\u53EF\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4F20\u5165\u6765\u5B9E\u73B0\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* \u4F7F\u7528 props \u6E32\u67D3 */</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">areEqual</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> nextProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/*
  \u5982\u679C\u628A nextProps \u4F20\u5165 render \u65B9\u6CD5\u7684\u8FD4\u56DE\u7ED3\u679C\u4E0E
  \u5C06 prevProps \u4F20\u5165 render \u65B9\u6CD5\u7684\u8FD4\u56DE\u7ED3\u679C\u4E00\u81F4\u5219\u8FD4\u56DE true\uFF0C
  \u5426\u5219\u8FD4\u56DE false
  */</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">,</span> areEqual<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u8FD9\u4E2A\u65B9\u6CD5\u4E0E <code>shouldComponentUpdate</code> \u76F8\u53CD\uFF1A\u5982\u679C\u8FD4\u56DE\u7684\u662F true\uFF0C\u90A3\u4E48\u8868\u793A\u4E0D\u91CD\u65B0\u6E32\u67D3\uFF0C\u5982\u679C\u8FD4\u56DE\u7684\u662F false\uFF0C\u90A3\u4E48\u8981\u91CD\u65B0\u6E32\u67D3\u3002</p><h3 id="cloneelement" tabindex="-1"><a class="header-anchor" href="#cloneelement" aria-hidden="true">#</a> cloneElement()</h3><p>\u4EE5 <code>element</code> \u5143\u7D20\u4E3A\u6837\u677F\u514B\u9686\u5E76\u8FD4\u56DE\u65B0\u7684 React \u5143\u7D20\u3002config \u4E2D\u5E94\u5305\u542B\u65B0\u7684 <code>props</code>\uFF0C<code>key</code> \u6216 <code>ref</code>\u3002\u8FD4\u56DE\u5143\u7D20\u7684 <code>props</code> \u662F\u5C06\u65B0\u7684 <code>props</code> \u4E0E\u539F\u59CB\u5143\u7D20\u7684 <code>props</code> \u6D45\u5C42\u5408\u5E76\u540E\u7684\u7ED3\u679C\u3002\u65B0\u7684\u5B50\u5143\u7D20\u5C06\u53D6\u4EE3\u73B0\u6709\u7684\u5B50\u5143\u7D20\uFF0C\u5982\u679C\u5728 config \u4E2D\u672A\u51FA\u73B0 <code>key</code> \u6216 <code>ref</code>\uFF0C\u90A3\u4E48\u539F\u59CB\u5143\u7D20\u7684 <code>key</code> \u548C <code>ref</code> \u5C06\u88AB\u4FDD\u7559\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>React<span class="token punctuation">.</span><span class="token function">cloneElement</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> <span class="token punctuation">[</span>config<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span>children<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u7B49\u540C\u4E8E</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>element.type</span> <span class="token spread"><span class="token punctuation">{</span><span class="token operator">...</span>element<span class="token punctuation">.</span>props<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token punctuation">{</span>children<span class="token punctuation">}</span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>element.type</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u5F53\u901A\u8FC7 <code>ref</code> \u83B7\u53D6\u5B50\u8282\u70B9\u65F6\uFF0C\u4F60\u5C06\u4E0D\u4F1A\u610F\u5916\u5730\u4ECE\u4F60\u7956\u5148\u8282\u70B9\u4E0A\u7A83\u53D6\u5B83\u3002\u76F8\u540C\u7684 <code>ref</code> \u5C06\u6DFB\u52A0\u5230\u514B\u9686\u540E\u7684\u65B0\u5143\u7D20\u4E2D</p><h3 id="isvalidelement" tabindex="-1"><a class="header-anchor" href="#isvalidelement" aria-hidden="true">#</a> isValidElement()</h3><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>React<span class="token punctuation">.</span><span class="token function">isValidElement</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u9A8C\u8BC1\u5BF9\u8C61\u662F\u5426\u4E3A React \u5143\u7D20\uFF0C\u8FD4\u56DE\u503C\u4E3A true \u6216 false\u3002</p><h3 id="createref" tabindex="-1"><a class="header-anchor" href="#createref" aria-hidden="true">#</a> createRef</h3><p><code>React.createRef</code> \u521B\u5EFA\u4E00\u4E2A\u80FD\u591F\u901A\u8FC7 <code>ref</code> \u5C5E\u6027\u9644\u52A0\u5230 <code>React</code> \u5143\u7D20\u7684 <code>ref</code>\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="forwardref" tabindex="-1"><a class="header-anchor" href="#forwardref" aria-hidden="true">#</a> forwardRef</h4><p><code>React.forwardRef</code> \u4F1A\u521B\u5EFA\u4E00\u4E2A <code>React</code> \u7EC4\u4EF6\uFF0C\u8FD9\u4E2A\u7EC4\u4EF6\u80FD\u591F\u5C06\u5176\u63A5\u53D7\u7684 <code>ref</code> \u5C5E\u6027\u8F6C\u53D1\u5230\u5176\u7EC4\u4EF6\u6811\u4E0B\u7684\u53E6\u4E00\u4E2A\u7EC4\u4EF6\u4E2D\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token keyword">const</span> FancyButton <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> ref</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>FancyButton<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>children<span class="token punctuation">}</span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// You can now get a ref directly to the DOM button:</span>
<span class="token keyword">const</span> ref <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">FancyButton</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Click me!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">FancyButton</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="lazy" tabindex="-1"><a class="header-anchor" href="#lazy" aria-hidden="true">#</a> lazy</h3><p><code>React.lazy()</code> \u5141\u8BB8\u4F60\u5B9A\u4E49\u4E00\u4E2A\u52A8\u6001\u52A0\u8F7D\u7684\u7EC4\u4EF6\u3002\u8FD9\u6709\u52A9\u4E8E\u7F29\u51CF <code>bundle</code> \u7684\u4F53\u79EF\uFF0C\u5E76\u5EF6\u8FDF\u52A0\u8F7D\u5728\u521D\u6B21\u6E32\u67D3\u65F6\u672A\u7528\u5230\u7684\u7EC4\u4EF6\u3002</p><p>\u6E32\u67D3 lazy \u7EC4\u4EF6\u4F9D\u8D56\u8BE5\u7EC4\u4EF6\u6E32\u67D3\u6811\u4E0A\u5C42\u7684 <code>&lt;React.Suspense&gt;</code> \u7EC4\u4EF6</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token comment">// \u8BE5\u7EC4\u4EF6\u662F\u52A8\u6001\u52A0\u8F7D\u7684</span>
<span class="token keyword">const</span> OtherComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;./OtherComponent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token comment">// \u663E\u793A &lt;Spinner&gt; \u7EC4\u4EF6\u76F4\u81F3 OtherComponent \u52A0\u8F7D\u5B8C\u6210</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spinner</span></span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">OtherComponent</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Suspense</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="\u751F\u547D\u5468\u671F" tabindex="-1"><a class="header-anchor" href="#\u751F\u547D\u5468\u671F" aria-hidden="true">#</a> \u751F\u547D\u5468\u671F</h2><p><code>React</code> \u7684\u7EC4\u4EF6\u53EF\u4EE5\u5B9A\u4E49\u4E3A <code>class</code> \u6216\u51FD\u6570\u7684\u5F62\u5F0F\u3002\u5728 <code>React.Component</code> \u7684\u5B50\u7C7B\u4E2D\u6709\u4E2A\u5FC5\u987B\u5B9A\u4E49\u7684 <code>render()</code> \u51FD\u6570\u3002</p><p><strong>\u6302\u8F7D\u9636\u6BB5</strong></p><p>\u5F53\u7EC4\u4EF6\u5B9E\u4F8B\u88AB\u521B\u5EFA\u5E76\u63D2\u5165 DOM \u4E2D\u65F6\uFF0C\u5176\u751F\u547D\u5468\u671F\u8C03\u7528\u987A\u5E8F\u5982\u4E0B\uFF1A</p><ul><li><code>constructor()</code></li><li><code>static getDerivedStateFromProps()</code></li><li><code>render()</code></li><li><code>componentDidMount()</code></li></ul><p><strong>\u66F4\u65B0\u9636\u6BB5</strong></p><p>\u5F53\u7EC4\u4EF6\u7684 props \u6216 state \u53D1\u751F\u53D8\u5316\u65F6\u4F1A\u89E6\u53D1\u66F4\u65B0\u3002\u7EC4\u4EF6\u66F4\u65B0\u7684\u751F\u547D\u5468\u671F\u8C03\u7528\u987A\u5E8F\u5982\u4E0B\uFF1A</p><ul><li><code>static getDerivedStateFromProps()</code></li><li><code>shouldComponentUpdate()</code></li><li><code>render()</code></li><li><code>getSnapshotBeforeUpdate()</code></li><li><code>componentDidUpdate()</code></li></ul><p><strong>\u5378\u8F7D\u9636\u6BB5</strong></p><p>\u5F53\u7EC4\u4EF6\u4ECE DOM \u4E2D\u79FB\u9664\u65F6\u4F1A\u8C03\u7528\u5982\u4E0B\u65B9\u6CD5\uFF1A</p><ul><li><code>componentWillUnmount()</code></li></ul><p><strong>\u9519\u8BEF\u5904\u7406</strong></p><p>\u5F53\u6E32\u67D3\u8FC7\u7A0B\uFF0C\u751F\u547D\u5468\u671F\uFF0C\u6216\u5B50\u7EC4\u4EF6\u7684\u6784\u9020\u51FD\u6570\u4E2D\u629B\u51FA\u9519\u8BEF\u65F6\uFF0C\u4F1A\u8C03\u7528\u5982\u4E0B\u65B9\u6CD5\uFF1A</p><ul><li><code>static getDerivedStateFromError()</code></li><li><code>componentDidCatch()</code></li></ul><h3 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> render</h3><p>render() \u65B9\u6CD5\u662F class \u7EC4\u4EF6\u4E2D\u552F\u4E00\u5FC5\u987B\u5B9E\u73B0\u7684\u65B9\u6CD5\u3002\u5B83\u4F1A\u8FD4\u56DE\u4EE5\u4E0B\u5185\u5BB9</p><ul><li>React \u5143\u7D20\u3002\u901A\u5E38\u901A\u8FC7 JSX \u521B\u5EFA\u3002\u4F8B\u5982\uFF0C<code>&lt;div /&gt;</code> \u4F1A\u88AB React \u6E32\u67D3\u4E3A DOM \u8282\u70B9\uFF0C<code>&lt;MyComponent /&gt;</code> \u4F1A\u88AB React \u6E32\u67D3\u4E3A\u81EA\u5B9A\u4E49\u7EC4\u4EF6\uFF0C\u65E0\u8BBA\u662F <code>&lt;div /&gt;</code> \u8FD8\u662F <code>&lt;MyComponent /&gt;</code> \u5747\u4E3A React \u5143\u7D20\u3002</li><li>\u6570\u7EC4\u6216 fragments\u3002 \u4F7F\u5F97 render \u65B9\u6CD5\u53EF\u4EE5\u8FD4\u56DE\u591A\u4E2A\u5143\u7D20\u3002\u6B32\u4E86\u89E3\u66F4\u591A\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605 fragments \u6587\u6863\u3002</li><li>Portals\u3002\u53EF\u4EE5\u6E32\u67D3\u5B50\u8282\u70B9\u5230\u4E0D\u540C\u7684 DOM \u5B50\u6811\u4E2D\u3002\u6B32\u4E86\u89E3\u66F4\u591A\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605\u6709\u5173 portals \u7684\u6587\u6863\u3002</li><li>\u5B57\u7B26\u4E32\u6216\u6570\u503C\u7C7B\u578B\u3002\u5B83\u4EEC\u5728 DOM \u4E2D\u4F1A\u88AB\u6E32\u67D3\u4E3A\u6587\u672C\u8282\u70B9\u3002</li><li>\u5E03\u5C14\u7C7B\u578B\u6216 null\u3002\u4EC0\u4E48\u90FD\u4E0D\u6E32\u67D3\u3002\uFF08\u4E3B\u8981\u7528\u4E8E\u652F\u6301\u8FD4\u56DE test &amp;&amp; <code>&lt;Child /&gt;</code> \u7684\u6A21\u5F0F\uFF0C\u5176\u4E2D test \u4E3A\u5E03\u5C14\u7C7B\u578B\u3002)</li></ul><p><code>render()</code> \u51FD\u6570\u5E94\u8BE5\u4E3A\u7EAF\u51FD\u6570\uFF0C\u5E76\u4E14\u5B83\u4E0D\u4F1A\u76F4\u63A5\u4E0E\u6D4F\u89C8\u5668\u4EA4\u4E92\u3002\u5982\u9700\u4E0E\u6D4F\u89C8\u5668\u8FDB\u884C\u4EA4\u4E92\uFF0C\u8BF7\u5728 <code>componentDidMount()</code> \u6216\u5176\u4ED6\u751F\u547D\u5468\u671F\u65B9\u6CD5\u4E2D\u6267\u884C\u4F60\u7684\u64CD\u4F5C\u3002</p><p><strong>\u5982\u679C <code>shouldComponentUpdate()</code> \u8FD4\u56DE false\uFF0C\u5219\u4E0D\u4F1A\u8C03\u7528 <code>render()</code>\u3002</strong></p><h3 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> constructor()</h3><p>\u5982\u679C\u4E0D\u521D\u59CB\u5316 <code>state</code> \u6216\u4E0D\u8FDB\u884C\u65B9\u6CD5\u7ED1\u5B9A\uFF0C\u5219\u4E0D\u9700\u8981\u4E3A <code>React</code> \u7EC4\u4EF6\u5B9E\u73B0\u6784\u9020\u51FD\u6570\u3002</p><p>\u5728\u4E3A <code>React.Component</code> \u5B50\u7C7B\u5B9E\u73B0\u6784\u9020\u51FD\u6570\u65F6\uFF0C\u5E94\u5728\u5176\u4ED6\u8BED\u53E5\u4E4B\u524D\u8C03\u7528 <code>super(props)</code>\u3002\u5426\u5219\uFF0C<code>this.props</code> \u5728\u6784\u9020\u51FD\u6570\u4E2D\u53EF\u80FD\u4F1A\u51FA\u73B0\u672A\u5B9A\u4E49\u7684 bug\u3002</p><p>\u5728 <code>constructor()</code> \u51FD\u6570\u4E2D\u76F4\u63A5\u4E3A <code>this.state</code> \u8D4B\u503C\u521D\u59CB <code>state</code>\u3002\u5728\u5176\u4ED6\u65B9\u6CD5\u4E2D\u8D4B\u503C\u5E94\u4F7F\u7528 <code>this.setState()</code></p><p>\u8981\u907F\u514D\u5728\u6784\u9020\u51FD\u6570\u4E2D\u5F15\u5165\u4EFB\u4F55\u526F\u4F5C\u7528\u6216\u8BA2\u9605\u3002\u5982\u9047\u5230\u6B64\u573A\u666F\uFF0C\u8BF7\u5C06\u5BF9\u5E94\u7684\u64CD\u4F5C\u653E\u7F6E\u5728 <code>componentDidMount</code> \u4E2D\u3002</p><h3 id="componentdidmount" tabindex="-1"><a class="header-anchor" href="#componentdidmount" aria-hidden="true">#</a> componentDidMount()</h3><p><code>componentDidMount()</code> \u4F1A\u5728<strong>\u7EC4\u4EF6\u6302\u8F7D\u540E</strong>\uFF08\u63D2\u5165 DOM \u6811\u4E2D\uFF09\u7ACB\u5373\u8C03\u7528\u3002<strong>\u4F9D\u8D56\u4E8E DOM \u8282\u70B9\u7684\u521D\u59CB\u5316\u5E94\u8BE5\u653E\u5728\u8FD9</strong>\u91CC\u3002\u5982\u9700\u901A\u8FC7\u7F51\u7EDC\u8BF7\u6C42\u83B7\u53D6\u6570\u636E\uFF0C\u6B64\u5904\u662F\u5B9E\u4F8B\u5316\u8BF7\u6C42\u7684\u597D\u5730\u65B9\u3002</p><p>\u5982\u679C\u5728<code>componentDidMount()</code> \u6DFB\u52A0\u4E86\u8BA2\u9605\uFF0C\u8BF7\u4E0D\u8981\u5FD8\u8BB0\u5728 <code>componentWillUnmount()</code> \u91CC\u53D6\u6D88\u8BA2\u9605</p><p>\u53EF\u4EE5\u5728 <code>componentDidMount()</code> \u91CC\u76F4\u63A5\u8C03\u7528 <code>setState()</code>\u3002\u5B83\u5C06\u89E6\u53D1\u989D\u5916\u6E32\u67D3\uFF0C\u4F46<strong>\u6B64\u6E32\u67D3\u4F1A\u53D1\u751F\u5728\u6D4F\u89C8\u5668\u66F4\u65B0\u5C4F\u5E55\u4E4B\u524D</strong>\u3002\u5982\u6B64\u4FDD\u8BC1\u4E86\u5373\u4F7F\u5728 <code>render()</code> \u4E24\u6B21\u8C03\u7528\u7684\u60C5\u51B5\u4E0B\uFF0C\u7528\u6237\u4E5F\u4E0D\u4F1A\u770B\u5230\u4E2D\u95F4\u72B6\u6001\u3002<strong>\u8BF7\u8C28\u614E\u4F7F\u7528\u8BE5\u6A21\u5F0F\uFF0C\u56E0\u4E3A\u5B83\u4F1A\u5BFC\u81F4\u6027\u80FD\u95EE\u9898\u3002</strong></p><p><strong>\u901A\u5E38\u5E94\u8BE5\u5728 <code>constructor()</code> \u4E2D\u521D\u59CB\u5316 state</strong>\u3002\u5982\u679C\u6E32\u67D3\u4F9D\u8D56\u4E8E DOM \u8282\u70B9\u7684\u5927\u5C0F\u6216\u4F4D\u7F6E\uFF0C\u6BD4\u5982\u5B9E\u73B0 modals \u548C tooltips \u7B49\u60C5\u51B5\u4E0B\uFF0C\u53EF\u4EE5\u4F7F\u7528\u6B64\u65B9\u5F0F\u5904\u7406</p><h3 id="componentdidupdate" tabindex="-1"><a class="header-anchor" href="#componentdidupdate" aria-hidden="true">#</a> componentDidUpdate()</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> prevState<span class="token punctuation">,</span> snapshot<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>componentDidUpdate()</code> \u4F1A\u5728\u66F4\u65B0\u540E\u4F1A\u88AB\u7ACB\u5373\u8C03\u7528\u3002\u9996\u6B21\u6E32\u67D3\u4E0D\u4F1A\u6267\u884C\u6B64\u65B9\u6CD5\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5178\u578B\u7528\u6CD5\uFF08\u4E0D\u8981\u5FD8\u8BB0\u6BD4\u8F83 props\uFF09\uFF1A</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>userID <span class="token operator">!==</span> prevProps<span class="token punctuation">.</span>userID<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>userID<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u4E5F\u53EF\u4EE5\u5728 <code>componentDidUpdate()</code> \u4E2D\u76F4\u63A5\u8C03\u7528 <code>setState()</code>\uFF0C\u4F46\u8BF7\u6CE8\u610F\u5B83\u5FC5\u987B\u88AB\u5305\u88F9\u5728\u4E00\u4E2A\u6761\u4EF6\u8BED\u53E5\u91CC\uFF0C\u5426\u5219\u4F1A\u5BFC\u81F4\u6B7B\u5FAA\u73AF\u3002</p><blockquote><p>\u5982\u679C shouldComponentUpdate() \u8FD4\u56DE\u503C\u4E3A false\uFF0C\u5219\u4E0D\u4F1A\u8C03\u7528 componentDidUpdate()\u3002</p></blockquote><h3 id="componentwillunmount" tabindex="-1"><a class="header-anchor" href="#componentwillunmount" aria-hidden="true">#</a> componentWillUnmount()</h3><p><code>componentWillUnmount()</code> \u4F1A\u5728\u7EC4\u4EF6\u5378\u8F7D\u53CA\u9500\u6BC1\u4E4B\u524D\u76F4\u63A5\u8C03\u7528\u3002\u5728\u6B64\u65B9\u6CD5\u4E2D\u6267\u884C\u5FC5\u8981\u7684\u6E05\u7406\u64CD\u4F5C\uFF0C\u4F8B\u5982\uFF0C\u6E05\u9664 timer\uFF0C\u53D6\u6D88\u7F51\u7EDC\u8BF7\u6C42\u6216\u6E05\u9664\u5728 <code>componentDidMount()</code> \u4E2D\u521B\u5EFA\u7684\u8BA2\u9605\u7B49\u3002</p>`,67);function p(t,o){return e}var u=s(a,[["render",p]]);export{u as default};
