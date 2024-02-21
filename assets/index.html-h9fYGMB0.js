import{_ as a,r as e,o as i,c as l,a as n,b as d,d as c,e as t}from"./app-ZrMgA43q.js";const r={},p=t(`<h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h1><h2 id="使用情景" tabindex="-1"><a class="header-anchor" href="#使用情景"><span>使用情景</span></a></h2><p>在平时如果想在 Windows 使用安装 Linux 环境，没有云服务器的情况下大多数人这时会选择去用虚拟机安装一个 ubuntu 系统。不过安装虚拟机前，你得先去下载几个 G 的镜像，然后在 VMware 里配置一些参数，最后还要等待最少十几分钟的系统安装。等你安装完一个 ubuntu 系统，估计已经浪费了几个小时。</p><p>然而使用 Docker，你只需要几分钟！</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 拉取ubuntu镜像</span>
<span class="token function">docker</span> pull ubuntu

<span class="token comment"># 创建一个ubuntu容器并且使用终端进行交互</span>

<span class="token comment"># --rm 退出时自动清理容器内部的文件系统。</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> my-ubuntu <span class="token parameter variable">--rm</span> ubuntu /bin/bash

<span class="token comment"># 退出容器</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><ul><li><p>镜像（Image）：类似于虚拟机中的镜像。镜像有两种：基础镜像和个人镜像。基础镜像由各大厂商提供，比如 ubuntu 镜像，node 镜像。个人镜像则是由个人开发者构建上传。</p></li><li><p>容器（Container）：类似于一个轻量级的沙盒。容器是基于镜像来创建的，ubuntu 镜像并不能和我们进行各种交互，我们希望有个环境能运行 ubuntu，于是基于 ubuntu 镜像创建了一个容器。</p></li><li><p>仓库（Repository）：类似于代码仓库，这里是镜像仓库，是 Docker 用来集中存放镜像文件的地方。</p></li></ul><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><h3 id="镜像" tabindex="-1"><a class="header-anchor" href="#镜像"><span>镜像</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查找镜像</span>
<span class="token function">docker</span> search ubuntu

<span class="token comment"># 拉取特定tag版本的镜像(默认是latest)</span>
<span class="token function">docker</span> pull ubuntu:18.0.4

<span class="token comment"># 查看下载的所有本地镜像</span>
<span class="token function">docker</span> images

<span class="token comment"># 删除镜像</span>
<span class="token function">docker</span> rmi ubuntu:18.0.4

<span class="token comment"># 构建镜像（详情见下文）</span>
<span class="token comment"># -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> myname/node-pm2:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容器" tabindex="-1"><a class="header-anchor" href="#容器"><span>容器</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 启动容器</span>
<span class="token comment"># 镜像名需放到最后</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> myname/node-pm2:1.0 /bin/bash

<span class="token comment"># -i: 以交互模式运行容器，通常与 -t 同时使用；</span>
<span class="token comment"># -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；</span>
<span class="token comment"># --name=&quot;my-ubuntu&quot;: 为容器指定一个名称；默认是随机的名字</span>
<span class="token comment"># /bin/bash: 启动容器后立即执行的命令。表示载入容器后运行bash，docker中必须要保持一个进程的运行，要不然整个容器启动后就会马上kill</span>

<span class="token comment"># 基于ubuntu镜像创建my-ubuntu容器。如果本地没有ubuntu镜像，会先去docker pull下载</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> my-ubuntu ubuntu:latest /bin/bash

<span class="token comment"># 启动了容器，然后容器立即关闭</span>
<span class="token function">docker</span> run ubuntu /bin/bash

<span class="token comment"># 启动了容器，并且在后台一直运行，每隔1s输出hello world</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> ubuntu /bin/sh <span class="token parameter variable">-c</span> <span class="token string">&quot;while true; do echo hello world; sleep 1; done&quot;</span>

<span class="token comment"># 停止容器</span>
<span class="token function">docker</span> stop my-ubuntu

<span class="token comment"># 启动容器</span>
<span class="token function">docker</span> start my-ubuntu

<span class="token comment"># 删除容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> my-ubuntu

<span class="token comment"># 删除所有容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">\`</span></span>

<span class="token comment"># 查看正在运行的容器</span>
<span class="token function">docker</span> <span class="token function">ps</span>

<span class="token comment"># 查看所有创建过的容器(运行或者关闭)</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 进入运行着的容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> my-ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看容器日志" tabindex="-1"><a class="header-anchor" href="#查看容器日志"><span>查看容器日志</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> my_container ubuntu /bin/sh <span class="token parameter variable">-c</span> <span class="token string">&quot;while true; do echo hello world; sleep 1; done&quot;</span>
<span class="token comment"># 查看后台运行的日志</span>
<span class="token function">docker</span> logs my_container

<span class="token comment"># 实时监控(类似tail -f)</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> my_container

<span class="token comment"># 获取最后10行</span>
<span class="token function">docker</span> logs <span class="token parameter variable">--tail</span> <span class="token number">10</span> my_container

<span class="token comment"># 实时查看最近的日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">--tail</span> <span class="token number">0</span> <span class="token parameter variable">-f</span> my_container

<span class="token comment"># 加上时间戳</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-t</span> my_container
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="映射端口" tabindex="-1"><a class="header-anchor" href="#映射端口"><span>映射端口</span></a></h3><p>Docker 里每个容器都是相对独立的，拥有自己的内部 ip。容器里运行的一些网络应用，要让外部也可以访问，就需要将端口映射到宿主机上。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 访问 http://localhost:8888/ 即可看到nginx欢迎页面</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> my-nginx <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像"><span>构建镜像</span></a></h2><p>我们一般都是基于基础镜像来构建个人镜像。镜像是由一条条指令构建出来(Dockerfile)</p><p>我们来构建一个 node-pm2 镜像，这个镜像自带 node 和 pm2:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> node-pm2
<span class="token builtin class-name">cd</span> node-pm2
<span class="token function">touch</span> Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Dockerfile 文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 基于node11基础镜像</span>
FROM node:11

<span class="token comment"># 一些元数据,比如作者信息</span>
LABEL <span class="token assign-left variable">maintainer</span><span class="token operator">=</span><span class="token string">&quot;myname &lt;myname@gamil.com&gt;&quot;</span>

<span class="token comment"># 安装pm2</span>
RUN <span class="token function">npm</span> <span class="token function">install</span> pm2 <span class="token parameter variable">-g</span> <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npm.taobao.org

<span class="token comment"># 暴露容器的端口</span>
EXPOSE <span class="token number">80</span> <span class="token number">443</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> myname/node-pm2:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="上传镜像" tabindex="-1"><a class="header-anchor" href="#上传镜像"><span>上传镜像</span></a></h2><p>我们本地构建的镜像如果希望可以被其他人使用，就需要把镜像上传到仓库。登录 dockerhub，注册一个账户。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 登入账户，输入用户名和密码</span>
<span class="token function">docker</span> login

<span class="token comment"># 上传镜像</span>
<span class="token function">docker</span> push myname/node-pm2:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据卷-volume" tabindex="-1"><a class="header-anchor" href="#数据卷-volume"><span>数据卷(Volume)</span></a></h2><p>类似端口映射，我们可以把容器内部的目录映射到宿主机的目录，实现容器之间实现共享和重用。</p><p>修改 nginx 里的 index.html</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> nginx-test <span class="token punctuation">\\</span>
<span class="token parameter variable">--rm</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token environment constant">$PWD</span>:/usr/share/nginx/html <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-v: $PWD:/usr/share/nginx/html</code>表示把容器内的/usr/share/nginx/html 映射到当前目录</p><p>试着在本地新建一个 1.html，然后访问 <code>http://localhost:8888/1.html</code> 也可以看到输出了内容。</p><p>我们也可以在构建时替换</p><p>在 my-nginx 目录，新建 Dockerfile</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>FROM nginx
<span class="token comment"># 将当前的index.html拷贝到容器的/usr/share/nginx/html/index.html</span>
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> my-nginx <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建容器</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">-p</span> <span class="token number">4445</span>:80 my-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="构建单页应用" tabindex="-1"><a class="header-anchor" href="#构建单页应用"><span>构建单页应用</span></a></h2><p>以 Vue 为例，先创建一个基础 Vue 项目，在目录下新建<code>Dockerfile</code>, <code>.dockerignore</code>和<code>nginx.conf</code></p><p>dockerignore 指定了哪些文件不需要被拷贝进镜像里，类似.gitignore。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//.dockerignore</span>
node_modules
dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx.conf</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    server_name  localhost<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
        root   /app/dist<span class="token punctuation">;</span> <span class="token comment"># 打包的路径</span>
        index  index.html index.htm<span class="token punctuation">;</span>
        try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span> <span class="token comment"># 防止重刷新返回404</span>
    <span class="token punctuation">}</span>

    error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
    location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用多层构建，Dockerfile</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># node镜像仅仅是用来打包文件</span>
FROM node:alpine as builder

COPY package*.json /app/

WORKDIR /app

RUN <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npm.taobao.org

COPY <span class="token builtin class-name">.</span> /app

RUN <span class="token function">npm</span> run build

<span class="token comment"># 选择更小体积的基础镜像</span>
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY <span class="token parameter variable">--from</span><span class="token operator">=</span>builder /app/build /app/build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要特别注意的是:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>COPY package*.json /app/
RUN <span class="token function">npm</span> <span class="token function">install</span>
COPY <span class="token builtin class-name">.</span> /app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了充分利用 docker 缓存，需要将<code>package.json</code>文件先拷贝到 app，安装完依赖，然后才把所有的文件拷贝到 app，这样只有当 package.json 发生改变了，才会重新下载 npm 包。</p><p>当然缓存有时候也会造成一些麻烦，比如在进行一些 shell 操作输出内容时，由于缓存的存在，导致新构建的镜像里的内容还是旧版本的。</p><p>我们可以指定构建镜像时不使用缓存</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> build --no-cache <span class="token parameter variable">-t</span> myname/vue-app <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最佳实践是在文件顶部指定一个环境变量，如果希望不用缓存，则更新这个环境变量即可，因为缓存失效是从第一条发生变化的指令开始。</p><p>打包镜像</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> myname/vue-app <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动容器</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> my-vue-app  <span class="token parameter variable">-p</span> <span class="token number">8888</span>:80 myname/vue-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问 http://localhost:8888 即可看到页面</p><h2 id="容器间的通信" tabindex="-1"><a class="header-anchor" href="#容器间的通信"><span>容器间的通信</span></a></h2><p>Docker 里使用 Networking 进行容器间的通信</p><p>创建一个 app-test 网络</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> network create app-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们只需要把需要通信的容器都加入到 app-test 网络里，之后容器间就可以互相访问了。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> redis-app <span class="token parameter variable">--network</span> app-test  <span class="token parameter variable">-p</span> <span class="token number">6389</span>:6379 redis
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> node-app <span class="token parameter variable">--network</span> app-test node:11 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了两个容器，这两个容器都在 app-test 网络里。</p><p>我们进入 node-app 容器里，然后 ping redis-app，发现可以访 ping 通，说明容器间可以通信了！</p><h2 id="启动多个容器-docker-compose" tabindex="-1"><a class="header-anchor" href="#启动多个容器-docker-compose"><span>启动多个容器 Docker compose</span></a></h2><p>首先需要安装 docker compose，安装完成之后</p><p>我们新建一个 my-all-app 目录，然后新建 docker-compose.yml</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>version: <span class="token string">&#39;3.7&#39;</span>

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



<span class="token comment"># 启动所有容器</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 停止所有容器</span>
<span class="token function">docker-compose</span> stop

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看见，使用 docker-compose.yml 配置完启动步骤后，启动多个容器就变得十分简单了。</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2>`,75),o={href:"https://mp.weixin.qq.com/s/RolY_Qt_xYC_Y4iDn6tSiA",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const s=e("ExternalLinkIcon");return i(),l("div",null,[p,n("p",null,[n("a",o,[d("写给前端的 Docker 上手指南"),c(s)])])])}const k=a(r,[["render",u],["__file","index.html.vue"]]),h=JSON.parse('{"path":"/docker/","title":"Docker","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"使用情景","slug":"使用情景","link":"#使用情景","children":[]},{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[]},{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[{"level":3,"title":"镜像","slug":"镜像","link":"#镜像","children":[]},{"level":3,"title":"容器","slug":"容器","link":"#容器","children":[]},{"level":3,"title":"查看容器日志","slug":"查看容器日志","link":"#查看容器日志","children":[]},{"level":3,"title":"映射端口","slug":"映射端口","link":"#映射端口","children":[]}]},{"level":2,"title":"构建镜像","slug":"构建镜像","link":"#构建镜像","children":[]},{"level":2,"title":"上传镜像","slug":"上传镜像","link":"#上传镜像","children":[]},{"level":2,"title":"数据卷(Volume)","slug":"数据卷-volume","link":"#数据卷-volume","children":[]},{"level":2,"title":"构建单页应用","slug":"构建单页应用","link":"#构建单页应用","children":[]},{"level":2,"title":"容器间的通信","slug":"容器间的通信","link":"#容器间的通信","children":[]},{"level":2,"title":"启动多个容器 Docker compose","slug":"启动多个容器-docker-compose","link":"#启动多个容器-docker-compose","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"git":{"updatedTime":1708502740000,"contributors":[{"name":"guokc","email":"guokc@tsintergy.com","commits":1}]},"filePathRelative":"docker/README.md"}');export{k as comp,h as data};
