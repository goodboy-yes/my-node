# aspect-ratio

我们过去是通过在 CSS 中使用百分比 padding 来实现宽高比的，如今主要的浏览器中都得到了 aspect-ratio css 属性的原生支持。

## Padding-Top Hack

当一个元素有一个垂直百分比的 padding 时，它将基于它的父级宽度

当标题有 padding-top: 50%时，该值是根据其父元素的宽度来计算的。假如父元素的宽度是 200px，所以 padding-top 会变成 100px。

```html
<div class="content">
  <div class="container">
    <img src="https://source.unsplash.com/random/400x300" />
  </div>
</div>
```

```css
.container {
  margin: 10px;
  position: relative;
  padding-top: 75%;
  width: 100%;
}
.container img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

通过上述，我们定义了缩略图包装器`container`的高度取决于其宽度。另外，图片是绝对定位的，它有它的父元素的全部宽度和高度，有 `object-fit: cover`，用于上传不同大小的图片的情况

> [codepen：Padding-Top Hack](https://codepen.io/goodboy-yes/pen/xxrejJe?editors=1100)

## aspect-ratio 属性

如今 Chrome、Safari TP 和 Firefox Nightly 都支持 aspect-ratioCSS 属性。最近，它在 Safari 15 的官方版本中得到支持。

之前的例子我们可以这样改写它

```html
<div class="content">
  <div class="container">
    <img src="https://source.unsplash.com/random/400x300" />
  </div>
</div>
```

```css
.container {
  margin: 10px;
  position: relative;
  aspect-ratio: 16/9;
  width: 100%;
}
.container img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

> [codepen：aspect-ratio](https://codepen.io/goodboy-yes/pen/vYZMQKr?editors=1100)

我们可以通过使用 CSS @supports 和 CSS 变量来使用 CSS aspect-ratio。

```css
.card {
  --aspect-ratio: 16/9;
  padding-top: calc((1 / (var(--aspect-ratio))) \* 100%);
}

@supports (aspect-ratio: 1) {
  .card {
    aspect-ratio: var(--aspect-ratio);
    padding-top: initial;
  }
}
```

你是否曾经需要创建一个应该是响应式的圆形元素？CSS aspect-ratio 是这种使用情况的最佳选择。

```css
.person {
  width: 180px;
  aspect-ratio: 1;
}
```

如果宽高比的两个值相同，我们可以写成 aspect-ratio: 1 而不是 aspect-ratio: 1/1。如果你使用 flexbox 或 grid，宽度将是可选的，它可以被添加作为一个最小值。
