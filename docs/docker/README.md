# Docker

## 使用情景

在平时如果想在 Windows 使用安装 Linux 环境，没有云服务器的情况下大多数人这时会选择去用虚拟机安装一个 ubuntu 系统。不过安装虚拟机前，你得先去下载几个 G 的镜像，然后在 VMware 里配置一些参数，最后还要等待最少十几分钟的系统安装。等你安装完一个 ubuntu 系统，估计已经浪费了几个小时。

然而使用 Docker，你只需要几分钟！

```bash
# 拉取ubuntu镜像
docker pull ubuntu

# 创建一个ubuntu容器并且使用终端进行交互

# --rm 退出时自动清理容器内部的文件系统。
docker run -it --name my-ubuntu --rm ubuntu /bin/bash

# 退出容器
exit
```

## 基本概念

- 镜像（Image）：类似于虚拟机中的镜像。镜像有两种：基础镜像和个人镜像。基础镜像由各大厂商提供，比如 ubuntu 镜像，node 镜像。个人镜像则是由个人开发者构建上传。

- 容器（Container）：类似于一个轻量级的沙盒。容器是基于镜像来创建的，ubuntu 镜像并不能和我们进行各种交互，我们希望有个环境能运行 ubuntu，于是基于 ubuntu 镜像创建了一个容器。

- 仓库（Repository）：类似于代码仓库，这里是镜像仓库，是 Docker 用来集中存放镜像文件的地方。

## 常用命令

### 镜像

```bash
# 查找镜像
docker search ubuntu

# 拉取特定tag版本的镜像(默认是latest)
docker pull ubuntu:18.0.4

# 查看下载的所有本地镜像
docker images

# 删除镜像
docker rmi ubuntu:18.0.4

# 构建镜像（详情见下文）
# -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。
docker build -t myname/node-pm2:1.0 .
```

### 容器

```bash
# 启动容器
# 镜像名需放到最后
docker run -it myname/node-pm2:1.0 /bin/bash

# -i: 以交互模式运行容器，通常与 -t 同时使用；
# -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
# --name="my-ubuntu": 为容器指定一个名称；默认是随机的名字
# /bin/bash: 启动容器后立即执行的命令。表示载入容器后运行bash，docker中必须要保持一个进程的运行，要不然整个容器启动后就会马上kill

# 基于ubuntu镜像创建my-ubuntu容器。如果本地没有ubuntu镜像，会先去docker pull下载
docker run -it --name my-ubuntu ubuntu:latest /bin/bash

# 启动了容器，然后容器立即关闭
docker run ubuntu /bin/bash

# 启动了容器，并且在后台一直运行，每隔1s输出hello world
docker run -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"

# 停止容器
docker stop my-ubuntu

# 启动容器
docker start my-ubuntu

# 删除容器
docker rm my-ubuntu

# 删除所有容器
docker rm `docker ps -aq`

# 查看正在运行的容器
docker ps

# 查看所有创建过的容器(运行或者关闭)
docker ps -a

# 进入运行着的容器
docker exec -it my-ubuntu /bin/bash
```

### 查看容器日志

```bash
docker run -d --name my_container ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
# 查看后台运行的日志
docker logs my_container

# 实时监控(类似tail -f)
docker logs -f my_container

# 获取最后10行
docker logs --tail 10 my_container

# 实时查看最近的日志
docker logs --tail 0 -f my_container

# 加上时间戳
docker logs -t my_container
```

### 映射端口

Docker 里每个容器都是相对独立的，拥有自己的内部 ip。容器里运行的一些网络应用，要让外部也可以访问，就需要将端口映射到宿主机上。

```bash
# 访问 http://localhost:8888/ 即可看到nginx欢迎页面
docker run -d --name my-nginx -p 8888:80 nginx
```

## 构建镜像

我们一般都是基于基础镜像来构建个人镜像。镜像是由一条条指令构建出来(Dockerfile)

我们来构建一个 node-pm2 镜像，这个镜像自带 node 和 pm2:

```bash
mkdir node-pm2
cd node-pm2
touch Dockerfile
```

Dockerfile 文件

```bash
# 基于node11基础镜像
FROM node:11

# 一些元数据,比如作者信息
LABEL maintainer="myname <myname@gamil.com>"

# 安装pm2
RUN npm install pm2 -g --registry=https://registry.npm.taobao.org

# 暴露容器的端口
EXPOSE 80 443
```

创建

```bash
docker build -t myname/node-pm2:1.0 .
```

## 上传镜像

我们本地构建的镜像如果希望可以被其他人使用，就需要把镜像上传到仓库。登录 dockerhub，注册一个账户。

```bash
# 登入账户，输入用户名和密码
docker login

# 上传镜像
docker push myname/node-pm2:1.0
```

## 数据卷(Volume)

类似端口映射，我们可以把容器内部的目录映射到宿主机的目录，实现容器之间实现共享和重用。

修改 nginx 里的 index.html

```bash
docker run --name nginx-test \
--rm -p 8888:80 \
-v $PWD:/usr/share/nginx/html \
-d nginx
```

`-v: $PWD:/usr/share/nginx/html`表示把容器内的/usr/share/nginx/html 映射到当前目录

试着在本地新建一个 1.html，然后访问 `http://localhost:8888/1.html` 也可以看到输出了内容。

我们也可以在构建时替换

在 my-nginx 目录，新建 Dockerfile

```bash
FROM nginx
# 将当前的index.html拷贝到容器的/usr/share/nginx/html/index.html
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

构建镜像

```bash
docker build -t my-nginx .
```

创建容器

```bash
docker run -d --rm -p 4445:80 my-nginx
```

## 构建单页应用

以 Vue 为例，先创建一个基础 Vue 项目，在目录下新建`Dockerfile`, `.dockerignore`和`nginx.conf`

dockerignore 指定了哪些文件不需要被拷贝进镜像里，类似.gitignore。

```javascript
//.dockerignore
node_modules
dist
```

nginx.conf

```bash
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /app/dist; # 打包的路径
        index  index.html index.htm;
        try_files $uri $uri/ /index.html; # 防止重刷新返回404
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

使用多层构建，Dockerfile

```bash
# node镜像仅仅是用来打包文件
FROM node:alpine as builder

COPY package*.json /app/

WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

COPY . /app

RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /app/build
```

需要特别注意的是:

```bash
COPY package*.json /app/
RUN npm install
COPY . /app
```

为了充分利用 docker 缓存，需要将`package.json`文件先拷贝到 app，安装完依赖，然后才把所有的文件拷贝到 app，这样只有当 package.json 发生改变了，才会重新下载 npm 包。

当然缓存有时候也会造成一些麻烦，比如在进行一些 shell 操作输出内容时，由于缓存的存在，导致新构建的镜像里的内容还是旧版本的。

我们可以指定构建镜像时不使用缓存

```bash
docker build --no-cache -t myname/vue-app .
```

最佳实践是在文件顶部指定一个环境变量，如果希望不用缓存，则更新这个环境变量即可，因为缓存失效是从第一条发生变化的指令开始。

打包镜像

```bash
docker build -t myname/vue-app .
```

启动容器

```bash
docker run -d --name my-vue-app  -p 8888:80 myname/vue-app
```

访问 http://localhost:8888 即可看到页面

## 容器间的通信

Docker 里使用 Networking 进行容器间的通信

创建一个 app-test 网络

```bash
docker network create app-test
```

我们只需要把需要通信的容器都加入到 app-test 网络里，之后容器间就可以互相访问了。

```bash
docker run -d --name redis-app --network app-test  -p 6389:6379 redis
docker run -it --name node-app --network app-test node:11 /bin/bash
```

我们创建了两个容器，这两个容器都在 app-test 网络里。

我们进入 node-app 容器里，然后 ping redis-app，发现可以访 ping 通，说明容器间可以通信了！

## 启动多个容器 Docker compose

首先需要安装 docker compose，安装完成之后

我们新建一个 my-all-app 目录，然后新建 docker-compose.yml

````bash
version: '3.7'

services:
  db:
    image: redis
    restart: always
    ports:
      - 6389:6379
    networks:
      - app-test

  node-redis-app:
    image: myname/node-redis-app
    restart: always
    depends_on:
      - db
    ports:
      - 4444:3000
    networks:
      - app-test

  vue-app-multi:
    image: myname/vue-app-multi
    restart: always
    depends_on:
      - node-redis-app
    ports:
      - 9999:80
    networks:
      - app-test

networks:
  app-test:
    driver: bridge
    ```

    ```



# 启动所有容器
docker-compose up -d

# 停止所有容器
docker-compose stop

````

可以看见，使用 docker-compose.yml 配置完启动步骤后，启动多个容器就变得十分简单了。

## 参考链接

[写给前端的 Docker 上手指南](https://mp.weixin.qq.com/s/RolY_Qt_xYC_Y4iDn6tSiA)
