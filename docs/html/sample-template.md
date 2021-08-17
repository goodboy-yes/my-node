# 示例模板
```html
<!--html5文档申明-->
<!DOCTYPE html>
<!--使用中文简体语言申明-->
<html lang="zh-CN">
<head>
    <!--字符编码-->
    <meta charset="utf-8">
    <!--指明当前IE浏览器按最新的渲染引擎来渲染页面-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--视口：视口的宽度和设备一致 缩放比默认是1.0 不运行用户自行缩放-->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <!-- 页面的解析顺序从上到小  优先告诉浏览器用最新的引擎来渲染并且这个一个移动端页面 -->
    <title>template</title>


    <!--html5标签和媒体查询在IE8一下浏览存在兼容问题，但是通过 html5shiv respond 俩解决-->
    <!-- HTML5 shiv and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--注意：不能以本地形式打开 可以http形式  webstorm 形式打开-->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--html5shiv H5标签兼容-->
    <!--respond  媒体查询兼容-->

    <!--条件注释  在IE9以下生效-->
    <!--[if lt IE 9]>
    <script src="../lib/html5shiv/html5shiv.min.js"></script>
    <script src="../lib/respond/respond.min.js"></script>
    <![endif]-->
</head>
<body>

<h1>你好，世界！</h1>

</body>
</html>
```