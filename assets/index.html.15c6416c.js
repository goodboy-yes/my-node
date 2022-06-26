import{r as a,o as e,c as p,a as n,d as l,F as r,e as c,b as i}from"./app.7ec5ed72.js";import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";const o={},u=c(`<h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h1><h2 id="\u4F7F\u7528\u60C5\u666F" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u60C5\u666F" aria-hidden="true">#</a> \u4F7F\u7528\u60C5\u666F</h2><p>\u5728\u5E73\u65F6\u5982\u679C\u60F3\u5728 Windows \u4F7F\u7528\u5B89\u88C5 Linux \u73AF\u5883\uFF0C\u6CA1\u6709\u4E91\u670D\u52A1\u5668\u7684\u60C5\u51B5\u4E0B\u5927\u591A\u6570\u4EBA\u8FD9\u65F6\u4F1A\u9009\u62E9\u53BB\u7528\u865A\u62DF\u673A\u5B89\u88C5\u4E00\u4E2A ubuntu \u7CFB\u7EDF\u3002\u4E0D\u8FC7\u5B89\u88C5\u865A\u62DF\u673A\u524D\uFF0C\u4F60\u5F97\u5148\u53BB\u4E0B\u8F7D\u51E0\u4E2A G \u7684\u955C\u50CF\uFF0C\u7136\u540E\u5728 VMware \u91CC\u914D\u7F6E\u4E00\u4E9B\u53C2\u6570\uFF0C\u6700\u540E\u8FD8\u8981\u7B49\u5F85\u6700\u5C11\u5341\u51E0\u5206\u949F\u7684\u7CFB\u7EDF\u5B89\u88C5\u3002\u7B49\u4F60\u5B89\u88C5\u5B8C\u4E00\u4E2A ubuntu \u7CFB\u7EDF\uFF0C\u4F30\u8BA1\u5DF2\u7ECF\u6D6A\u8D39\u4E86\u51E0\u4E2A\u5C0F\u65F6\u3002</p><p>\u7136\u800C\u4F7F\u7528 Docker\uFF0C\u4F60\u53EA\u9700\u8981\u51E0\u5206\u949F\uFF01</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u62C9\u53D6ubuntu\u955C\u50CF</span>
docker pull ubuntu

<span class="token comment"># \u521B\u5EFA\u4E00\u4E2Aubuntu\u5BB9\u5668\u5E76\u4E14\u4F7F\u7528\u7EC8\u7AEF\u8FDB\u884C\u4EA4\u4E92</span>

<span class="token comment"># --rm \u9000\u51FA\u65F6\u81EA\u52A8\u6E05\u7406\u5BB9\u5668\u5185\u90E8\u7684\u6587\u4EF6\u7CFB\u7EDF\u3002</span>
docker run -it --name my-ubuntu --rm ubuntu /bin/bash

<span class="token comment"># \u9000\u51FA\u5BB9\u5668</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="\u57FA\u672C\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a> \u57FA\u672C\u6982\u5FF5</h2><ul><li><p>\u955C\u50CF\uFF08Image\uFF09\uFF1A\u7C7B\u4F3C\u4E8E\u865A\u62DF\u673A\u4E2D\u7684\u955C\u50CF\u3002\u955C\u50CF\u6709\u4E24\u79CD\uFF1A\u57FA\u7840\u955C\u50CF\u548C\u4E2A\u4EBA\u955C\u50CF\u3002\u57FA\u7840\u955C\u50CF\u7531\u5404\u5927\u5382\u5546\u63D0\u4F9B\uFF0C\u6BD4\u5982 ubuntu \u955C\u50CF\uFF0Cnode \u955C\u50CF\u3002\u4E2A\u4EBA\u955C\u50CF\u5219\u662F\u7531\u4E2A\u4EBA\u5F00\u53D1\u8005\u6784\u5EFA\u4E0A\u4F20\u3002</p></li><li><p>\u5BB9\u5668\uFF08Container\uFF09\uFF1A\u7C7B\u4F3C\u4E8E\u4E00\u4E2A\u8F7B\u91CF\u7EA7\u7684\u6C99\u76D2\u3002\u5BB9\u5668\u662F\u57FA\u4E8E\u955C\u50CF\u6765\u521B\u5EFA\u7684\uFF0Cubuntu \u955C\u50CF\u5E76\u4E0D\u80FD\u548C\u6211\u4EEC\u8FDB\u884C\u5404\u79CD\u4EA4\u4E92\uFF0C\u6211\u4EEC\u5E0C\u671B\u6709\u4E2A\u73AF\u5883\u80FD\u8FD0\u884C ubuntu\uFF0C\u4E8E\u662F\u57FA\u4E8E ubuntu \u955C\u50CF\u521B\u5EFA\u4E86\u4E00\u4E2A\u5BB9\u5668\u3002</p></li><li><p>\u4ED3\u5E93\uFF08Repository\uFF09\uFF1A\u7C7B\u4F3C\u4E8E\u4EE3\u7801\u4ED3\u5E93\uFF0C\u8FD9\u91CC\u662F\u955C\u50CF\u4ED3\u5E93\uFF0C\u662F Docker \u7528\u6765\u96C6\u4E2D\u5B58\u653E\u955C\u50CF\u6587\u4EF6\u7684\u5730\u65B9\u3002</p></li></ul><h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u5E38\u7528\u547D\u4EE4</h2><h3 id="\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF" aria-hidden="true">#</a> \u955C\u50CF</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u627E\u955C\u50CF</span>
docker search ubuntu

<span class="token comment"># \u62C9\u53D6\u7279\u5B9Atag\u7248\u672C\u7684\u955C\u50CF(\u9ED8\u8BA4\u662Flatest)</span>
docker pull ubuntu:18.0.4

<span class="token comment"># \u67E5\u770B\u4E0B\u8F7D\u7684\u6240\u6709\u672C\u5730\u955C\u50CF</span>
docker images

<span class="token comment"># \u5220\u9664\u955C\u50CF</span>
docker rmi ubuntu:18.0.4

<span class="token comment"># \u6784\u5EFA\u955C\u50CF\uFF08\u8BE6\u60C5\u89C1\u4E0B\u6587\uFF09</span>
<span class="token comment"># -t: \u955C\u50CF\u7684\u540D\u5B57\u53CA\u6807\u7B7E\uFF0C\u901A\u5E38 name:tag \u6216\u8005 name \u683C\u5F0F\uFF1B\u53EF\u4EE5\u5728\u4E00\u6B21\u6784\u5EFA\u4E2D\u4E3A\u4E00\u4E2A\u955C\u50CF\u8BBE\u7F6E\u591A\u4E2A\u6807\u7B7E\u3002</span>
docker build -t myname/node-pm2:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668" aria-hidden="true">#</a> \u5BB9\u5668</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u5BB9\u5668</span>
<span class="token comment"># \u955C\u50CF\u540D\u9700\u653E\u5230\u6700\u540E</span>
docker run -it myname/node-pm2:1.0 /bin/bash

<span class="token comment"># -i: \u4EE5\u4EA4\u4E92\u6A21\u5F0F\u8FD0\u884C\u5BB9\u5668\uFF0C\u901A\u5E38\u4E0E -t \u540C\u65F6\u4F7F\u7528\uFF1B</span>
<span class="token comment"># -t: \u4E3A\u5BB9\u5668\u91CD\u65B0\u5206\u914D\u4E00\u4E2A\u4F2A\u8F93\u5165\u7EC8\u7AEF\uFF0C\u901A\u5E38\u4E0E -i \u540C\u65F6\u4F7F\u7528\uFF1B</span>
<span class="token comment"># --name=&quot;my-ubuntu&quot;: \u4E3A\u5BB9\u5668\u6307\u5B9A\u4E00\u4E2A\u540D\u79F0\uFF1B\u9ED8\u8BA4\u662F\u968F\u673A\u7684\u540D\u5B57</span>
<span class="token comment"># /bin/bash: \u542F\u52A8\u5BB9\u5668\u540E\u7ACB\u5373\u6267\u884C\u7684\u547D\u4EE4\u3002\u8868\u793A\u8F7D\u5165\u5BB9\u5668\u540E\u8FD0\u884Cbash\uFF0Cdocker\u4E2D\u5FC5\u987B\u8981\u4FDD\u6301\u4E00\u4E2A\u8FDB\u7A0B\u7684\u8FD0\u884C\uFF0C\u8981\u4E0D\u7136\u6574\u4E2A\u5BB9\u5668\u542F\u52A8\u540E\u5C31\u4F1A\u9A6C\u4E0Akill</span>

<span class="token comment"># \u57FA\u4E8Eubuntu\u955C\u50CF\u521B\u5EFAmy-ubuntu\u5BB9\u5668\u3002\u5982\u679C\u672C\u5730\u6CA1\u6709ubuntu\u955C\u50CF\uFF0C\u4F1A\u5148\u53BBdocker pull\u4E0B\u8F7D</span>
docker run -it --name my-ubuntu ubuntu:latest /bin/bash

<span class="token comment"># \u542F\u52A8\u4E86\u5BB9\u5668\uFF0C\u7136\u540E\u5BB9\u5668\u7ACB\u5373\u5173\u95ED</span>
docker run ubuntu /bin/bash

<span class="token comment"># \u542F\u52A8\u4E86\u5BB9\u5668\uFF0C\u5E76\u4E14\u5728\u540E\u53F0\u4E00\u76F4\u8FD0\u884C\uFF0C\u6BCF\u96941s\u8F93\u51FAhello world</span>
docker run -d ubuntu /bin/sh -c <span class="token string">&quot;while true; do echo hello world; sleep 1; done&quot;</span>

<span class="token comment"># \u505C\u6B62\u5BB9\u5668</span>
docker stop my-ubuntu

<span class="token comment"># \u542F\u52A8\u5BB9\u5668</span>
docker start my-ubuntu

<span class="token comment"># \u5220\u9664\u5BB9\u5668</span>
docker <span class="token function">rm</span> my-ubuntu

<span class="token comment"># \u5220\u9664\u6240\u6709\u5BB9\u5668</span>
docker <span class="token function">rm</span> <span class="token variable"><span class="token variable">\`</span>docker <span class="token function">ps</span> -aq<span class="token variable">\`</span></span>

<span class="token comment"># \u67E5\u770B\u6B63\u5728\u8FD0\u884C\u7684\u5BB9\u5668</span>
docker <span class="token function">ps</span>

<span class="token comment"># \u67E5\u770B\u6240\u6709\u521B\u5EFA\u8FC7\u7684\u5BB9\u5668(\u8FD0\u884C\u6216\u8005\u5173\u95ED)</span>
docker <span class="token function">ps</span> -a

<span class="token comment"># \u8FDB\u5165\u8FD0\u884C\u7740\u7684\u5BB9\u5668</span>
docker <span class="token builtin class-name">exec</span> -it my-ubuntu /bin/bash
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h3 id="\u67E5\u770B\u5BB9\u5668\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5BB9\u5668\u65E5\u5FD7" aria-hidden="true">#</a> \u67E5\u770B\u5BB9\u5668\u65E5\u5FD7</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker run -d --name my_container ubuntu /bin/sh -c <span class="token string">&quot;while true; do echo hello world; sleep 1; done&quot;</span>
<span class="token comment"># \u67E5\u770B\u540E\u53F0\u8FD0\u884C\u7684\u65E5\u5FD7</span>
docker logs my_container

<span class="token comment"># \u5B9E\u65F6\u76D1\u63A7(\u7C7B\u4F3Ctail -f)</span>
docker logs -f my_container

<span class="token comment"># \u83B7\u53D6\u6700\u540E10\u884C</span>
docker logs --tail <span class="token number">10</span> my_container

<span class="token comment"># \u5B9E\u65F6\u67E5\u770B\u6700\u8FD1\u7684\u65E5\u5FD7</span>
docker logs --tail <span class="token number">0</span> -f my_container

<span class="token comment"># \u52A0\u4E0A\u65F6\u95F4\u6233</span>
docker logs -t my_container
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="\u6620\u5C04\u7AEF\u53E3" tabindex="-1"><a class="header-anchor" href="#\u6620\u5C04\u7AEF\u53E3" aria-hidden="true">#</a> \u6620\u5C04\u7AEF\u53E3</h3><p>Docker \u91CC\u6BCF\u4E2A\u5BB9\u5668\u90FD\u662F\u76F8\u5BF9\u72EC\u7ACB\u7684\uFF0C\u62E5\u6709\u81EA\u5DF1\u7684\u5185\u90E8 ip\u3002\u5BB9\u5668\u91CC\u8FD0\u884C\u7684\u4E00\u4E9B\u7F51\u7EDC\u5E94\u7528\uFF0C\u8981\u8BA9\u5916\u90E8\u4E5F\u53EF\u4EE5\u8BBF\u95EE\uFF0C\u5C31\u9700\u8981\u5C06\u7AEF\u53E3\u6620\u5C04\u5230\u5BBF\u4E3B\u673A\u4E0A\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u8BBF\u95EE http://localhost:8888/ \u5373\u53EF\u770B\u5230nginx\u6B22\u8FCE\u9875\u9762</span>
docker run -d --name my-nginx -p <span class="token number">8888</span>:80 nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="\u6784\u5EFA\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u6784\u5EFA\u955C\u50CF" aria-hidden="true">#</a> \u6784\u5EFA\u955C\u50CF</h2><p>\u6211\u4EEC\u4E00\u822C\u90FD\u662F\u57FA\u4E8E\u57FA\u7840\u955C\u50CF\u6765\u6784\u5EFA\u4E2A\u4EBA\u955C\u50CF\u3002\u955C\u50CF\u662F\u7531\u4E00\u6761\u6761\u6307\u4EE4\u6784\u5EFA\u51FA\u6765(Dockerfile)</p><p>\u6211\u4EEC\u6765\u6784\u5EFA\u4E00\u4E2A node-pm2 \u955C\u50CF\uFF0C\u8FD9\u4E2A\u955C\u50CF\u81EA\u5E26 node \u548C pm2:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> node-pm2
<span class="token builtin class-name">cd</span> node-pm2
<span class="token function">touch</span> Dockerfile
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Dockerfile \u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u57FA\u4E8Enode11\u57FA\u7840\u955C\u50CF</span>
FROM node:11

<span class="token comment"># \u4E00\u4E9B\u5143\u6570\u636E,\u6BD4\u5982\u4F5C\u8005\u4FE1\u606F</span>
LABEL <span class="token assign-left variable">maintainer</span><span class="token operator">=</span><span class="token string">&quot;myname &lt;myname@gamil.com&gt;&quot;</span>

<span class="token comment"># \u5B89\u88C5pm2</span>
RUN <span class="token function">npm</span> <span class="token function">install</span> pm2 -g --registry<span class="token operator">=</span>https://registry.npm.taobao.org

<span class="token comment"># \u66B4\u9732\u5BB9\u5668\u7684\u7AEF\u53E3</span>
EXPOSE <span class="token number">80</span> <span class="token number">443</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u521B\u5EFA</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker build -t myname/node-pm2:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="\u4E0A\u4F20\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u4E0A\u4F20\u955C\u50CF" aria-hidden="true">#</a> \u4E0A\u4F20\u955C\u50CF</h2><p>\u6211\u4EEC\u672C\u5730\u6784\u5EFA\u7684\u955C\u50CF\u5982\u679C\u5E0C\u671B\u53EF\u4EE5\u88AB\u5176\u4ED6\u4EBA\u4F7F\u7528\uFF0C\u5C31\u9700\u8981\u628A\u955C\u50CF\u4E0A\u4F20\u5230\u4ED3\u5E93\u3002\u767B\u5F55 dockerhub\uFF0C\u6CE8\u518C\u4E00\u4E2A\u8D26\u6237\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u767B\u5165\u8D26\u6237\uFF0C\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801</span>
docker login

<span class="token comment"># \u4E0A\u4F20\u955C\u50CF</span>
docker push myname/node-pm2:1.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="\u6570\u636E\u5377-volume" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5377-volume" aria-hidden="true">#</a> \u6570\u636E\u5377(Volume)</h2><p>\u7C7B\u4F3C\u7AEF\u53E3\u6620\u5C04\uFF0C\u6211\u4EEC\u53EF\u4EE5\u628A\u5BB9\u5668\u5185\u90E8\u7684\u76EE\u5F55\u6620\u5C04\u5230\u5BBF\u4E3B\u673A\u7684\u76EE\u5F55\uFF0C\u5B9E\u73B0\u5BB9\u5668\u4E4B\u95F4\u5B9E\u73B0\u5171\u4EAB\u548C\u91CD\u7528\u3002</p><p>\u4FEE\u6539 nginx \u91CC\u7684 index.html</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker run --name nginx-test <span class="token punctuation">\\</span>
--rm -p <span class="token number">8888</span>:80 <span class="token punctuation">\\</span>
-v <span class="token environment constant">$PWD</span>:/usr/share/nginx/html <span class="token punctuation">\\</span>
-d nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>-v: $PWD:/usr/share/nginx/html</code>\u8868\u793A\u628A\u5BB9\u5668\u5185\u7684/usr/share/nginx/html \u6620\u5C04\u5230\u5F53\u524D\u76EE\u5F55</p><p>\u8BD5\u7740\u5728\u672C\u5730\u65B0\u5EFA\u4E00\u4E2A 1.html\uFF0C\u7136\u540E\u8BBF\u95EE <code>http://localhost:8888/1.html</code> \u4E5F\u53EF\u4EE5\u770B\u5230\u8F93\u51FA\u4E86\u5185\u5BB9\u3002</p><p>\u6211\u4EEC\u4E5F\u53EF\u4EE5\u5728\u6784\u5EFA\u65F6\u66FF\u6362</p><p>\u5728 my-nginx \u76EE\u5F55\uFF0C\u65B0\u5EFA Dockerfile</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM nginx
<span class="token comment"># \u5C06\u5F53\u524D\u7684index.html\u62F7\u8D1D\u5230\u5BB9\u5668\u7684/usr/share/nginx/html/index.html</span>
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE <span class="token number">80</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u6784\u5EFA\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker build -t my-nginx <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u521B\u5EFA\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker run -d --rm -p <span class="token number">4445</span>:80 my-nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="\u6784\u5EFA\u5355\u9875\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#\u6784\u5EFA\u5355\u9875\u5E94\u7528" aria-hidden="true">#</a> \u6784\u5EFA\u5355\u9875\u5E94\u7528</h2><p>\u4EE5 Vue \u4E3A\u4F8B\uFF0C\u5148\u521B\u5EFA\u4E00\u4E2A\u57FA\u7840 Vue \u9879\u76EE\uFF0C\u5728\u76EE\u5F55\u4E0B\u65B0\u5EFA<code>Dockerfile</code>, <code>.dockerignore</code>\u548C<code>nginx.conf</code></p><p>dockerignore \u6307\u5B9A\u4E86\u54EA\u4E9B\u6587\u4EF6\u4E0D\u9700\u8981\u88AB\u62F7\u8D1D\u8FDB\u955C\u50CF\u91CC\uFF0C\u7C7B\u4F3C.gitignore\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">//.dockerignore</span>
node_modules
dist
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>nginx.conf</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    server_name  localhost<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
        root   /app/dist<span class="token punctuation">;</span> <span class="token comment"># \u6253\u5305\u7684\u8DEF\u5F84</span>
        index  index.html index.htm<span class="token punctuation">;</span>
        try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span> <span class="token comment"># \u9632\u6B62\u91CD\u5237\u65B0\u8FD4\u56DE404</span>
    <span class="token punctuation">}</span>

    error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
    location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u4F7F\u7528\u591A\u5C42\u6784\u5EFA\uFF0CDockerfile</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># node\u955C\u50CF\u4EC5\u4EC5\u662F\u7528\u6765\u6253\u5305\u6587\u4EF6</span>
FROM node:alpine as builder

COPY package*.json /app/

WORKDIR /app

RUN <span class="token function">npm</span> <span class="token function">install</span> --registry<span class="token operator">=</span>https://registry.npm.taobao.org

COPY <span class="token builtin class-name">.</span> /app

RUN <span class="token function">npm</span> run build

<span class="token comment"># \u9009\u62E9\u66F4\u5C0F\u4F53\u79EF\u7684\u57FA\u7840\u955C\u50CF</span>
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from<span class="token operator">=</span>builder /app/build /app/build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>\u9700\u8981\u7279\u522B\u6CE8\u610F\u7684\u662F:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>COPY package*.json /app/
RUN <span class="token function">npm</span> <span class="token function">install</span>
COPY <span class="token builtin class-name">.</span> /app
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u4E3A\u4E86\u5145\u5206\u5229\u7528 docker \u7F13\u5B58\uFF0C\u9700\u8981\u5C06<code>package.json</code>\u6587\u4EF6\u5148\u62F7\u8D1D\u5230 app\uFF0C\u5B89\u88C5\u5B8C\u4F9D\u8D56\uFF0C\u7136\u540E\u624D\u628A\u6240\u6709\u7684\u6587\u4EF6\u62F7\u8D1D\u5230 app\uFF0C\u8FD9\u6837\u53EA\u6709\u5F53 package.json \u53D1\u751F\u6539\u53D8\u4E86\uFF0C\u624D\u4F1A\u91CD\u65B0\u4E0B\u8F7D npm \u5305\u3002</p><p>\u5F53\u7136\u7F13\u5B58\u6709\u65F6\u5019\u4E5F\u4F1A\u9020\u6210\u4E00\u4E9B\u9EBB\u70E6\uFF0C\u6BD4\u5982\u5728\u8FDB\u884C\u4E00\u4E9B shell \u64CD\u4F5C\u8F93\u51FA\u5185\u5BB9\u65F6\uFF0C\u7531\u4E8E\u7F13\u5B58\u7684\u5B58\u5728\uFF0C\u5BFC\u81F4\u65B0\u6784\u5EFA\u7684\u955C\u50CF\u91CC\u7684\u5185\u5BB9\u8FD8\u662F\u65E7\u7248\u672C\u7684\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u6307\u5B9A\u6784\u5EFA\u955C\u50CF\u65F6\u4E0D\u4F7F\u7528\u7F13\u5B58</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker build --no-cache -t myname/vue-app <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u6700\u4F73\u5B9E\u8DF5\u662F\u5728\u6587\u4EF6\u9876\u90E8\u6307\u5B9A\u4E00\u4E2A\u73AF\u5883\u53D8\u91CF\uFF0C\u5982\u679C\u5E0C\u671B\u4E0D\u7528\u7F13\u5B58\uFF0C\u5219\u66F4\u65B0\u8FD9\u4E2A\u73AF\u5883\u53D8\u91CF\u5373\u53EF\uFF0C\u56E0\u4E3A\u7F13\u5B58\u5931\u6548\u662F\u4ECE\u7B2C\u4E00\u6761\u53D1\u751F\u53D8\u5316\u7684\u6307\u4EE4\u5F00\u59CB\u3002</p><p>\u6253\u5305\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker build -t myname/vue-app <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u542F\u52A8\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker run -d --name my-vue-app  -p <span class="token number">8888</span>:80 myname/vue-app
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u8BBF\u95EE http://localhost:8888 \u5373\u53EF\u770B\u5230\u9875\u9762</p><h2 id="\u5BB9\u5668\u95F4\u7684\u901A\u4FE1" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u95F4\u7684\u901A\u4FE1" aria-hidden="true">#</a> \u5BB9\u5668\u95F4\u7684\u901A\u4FE1</h2><p>Docker \u91CC\u4F7F\u7528 Networking \u8FDB\u884C\u5BB9\u5668\u95F4\u7684\u901A\u4FE1</p><p>\u521B\u5EFA\u4E00\u4E2A app-test \u7F51\u7EDC</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker network create app-test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u6211\u4EEC\u53EA\u9700\u8981\u628A\u9700\u8981\u901A\u4FE1\u7684\u5BB9\u5668\u90FD\u52A0\u5165\u5230 app-test \u7F51\u7EDC\u91CC\uFF0C\u4E4B\u540E\u5BB9\u5668\u95F4\u5C31\u53EF\u4EE5\u4E92\u76F8\u8BBF\u95EE\u4E86\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker run -d --name redis-app --network app-test  -p <span class="token number">6389</span>:6379 redis
docker run -it --name node-app --network app-test node:11 /bin/bash
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u6211\u4EEC\u521B\u5EFA\u4E86\u4E24\u4E2A\u5BB9\u5668\uFF0C\u8FD9\u4E24\u4E2A\u5BB9\u5668\u90FD\u5728 app-test \u7F51\u7EDC\u91CC\u3002</p><p>\u6211\u4EEC\u8FDB\u5165 node-app \u5BB9\u5668\u91CC\uFF0C\u7136\u540E ping redis-app\uFF0C\u53D1\u73B0\u53EF\u4EE5\u8BBF ping \u901A\uFF0C\u8BF4\u660E\u5BB9\u5668\u95F4\u53EF\u4EE5\u901A\u4FE1\u4E86\uFF01</p><h2 id="\u542F\u52A8\u591A\u4E2A\u5BB9\u5668-docker-compose" tabindex="-1"><a class="header-anchor" href="#\u542F\u52A8\u591A\u4E2A\u5BB9\u5668-docker-compose" aria-hidden="true">#</a> \u542F\u52A8\u591A\u4E2A\u5BB9\u5668 Docker compose</h2><p>\u9996\u5148\u9700\u8981\u5B89\u88C5 docker compose\uFF0C\u5B89\u88C5\u5B8C\u6210\u4E4B\u540E</p><p>\u6211\u4EEC\u65B0\u5EFA\u4E00\u4E2A my-all-app \u76EE\u5F55\uFF0C\u7136\u540E\u65B0\u5EFA docker-compose.yml</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>version: <span class="token string">&#39;3.7&#39;</span>

services:
  db:
    image: redis
    restart: always
    ports:
      - <span class="token number">6389</span>:6379
    networks:
      - app-test

  node-redis-app:
    image: myname/node-redis-app
    restart: always
    depends_on:
      - db
    ports:
      - <span class="token number">4444</span>:3000
    networks:
      - app-test

  vue-app-multi:
    image: myname/vue-app-multi
    restart: always
    depends_on:
      - node-redis-app
    ports:
      - <span class="token number">9999</span>:80
    networks:
      - app-test

networks:
  app-test:
    driver: bridge
    \`\`<span class="token variable"><span class="token variable">\`</span>

    <span class="token variable">\`</span></span>\`\`



<span class="token comment"># \u542F\u52A8\u6240\u6709\u5BB9\u5668</span>
docker-compose up -d

<span class="token comment"># \u505C\u6B62\u6240\u6709\u5BB9\u5668</span>
docker-compose stop

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>\u53EF\u4EE5\u770B\u89C1\uFF0C\u4F7F\u7528 docker-compose.yml \u914D\u7F6E\u5B8C\u542F\u52A8\u6B65\u9AA4\u540E\uFF0C\u542F\u52A8\u591A\u4E2A\u5BB9\u5668\u5C31\u53D8\u5F97\u5341\u5206\u7B80\u5355\u4E86\u3002</p><h2 id="\u53C2\u8003\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u94FE\u63A5" aria-hidden="true">#</a> \u53C2\u8003\u94FE\u63A5</h2>`,75),m={href:"https://mp.weixin.qq.com/s/RolY_Qt_xYC_Y4iDn6tSiA",target:"_blank",rel:"noopener noreferrer"},t=i("\u5199\u7ED9\u524D\u7AEF\u7684 Docker \u4E0A\u624B\u6307\u5357");function d(h,k){const s=a("ExternalLinkIcon");return e(),p(r,null,[u,n("p",null,[n("a",m,[t,l(s)])])],64)}var x=b(o,[["render",d]]);export{x as default};
