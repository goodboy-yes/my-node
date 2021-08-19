# 知识点

## 省略`http:`前缀

如果你对形如 `//cdn.com/id/app_a6976b6d.css` 这样的 URL 感到陌生，你需要知道这种 `URL` 省掉了前面的 `http:` 或者 `https:` 前缀， 这样做的好处时在访问这些资源的时候会自动的根据当前`HTML` 的 `URL` 是采用什么模式去决定是采用 `HTTP` 还是 `HTTPS` 模式。

```css
body {
  background: url(//cdn.com/id/arch_ae805d49.png) repeat;
}
```

## json 对象和普通 JS 对象的区别

JSON 是 JavaScript 原生格式，它是一种严格的 js 对象的格式，JSON 的属性名必须有**双**引号，如果值是字符串，也必须是**双**引号。

```json
let obj = {}; //这只是JS对象
let obj2={'width':100,'height':100}//JS对象
let obj3={"width":100,"height":100,"name":"rose"}//JSON格式的JS对象

//json转字符串
JSON.stringify({
        name: '苹果 X',
        price: 8888
    }
)

//字符串转json
JSON.parse("{name: '苹果 X',price: 8888}")
```

## Tips

- `Json`文件不能写注释
- 移动端开发为什么不使用`jquery`：
  1、`jquery`体积大
  2、`jquery`做了大量的兼容，移动端都是高版本浏览器，没有必要做兼容，并不是说一定不用，最好不要用
- `{color:’blue’, ’font-size’:5px}`对象里键名里有`-`的要加引号
