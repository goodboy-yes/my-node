# 知识点

## 居中布局方式

### 行内元素

#### text-align

```css
text-align: center; /* 水平居中*/
```

#### line-height

```css
/* 垂直居中*/

/*<div class="wrap" > <div class="box1" > </div > </div >*/
.wrap {
  width: 500px;
  height: 500px;
  background-color: pink;
  line-height: 500px;
  text-align: center;
}

.box1 {
  width: 50px;
  height: 50px;
  background-color: green;
  display: inline-block;
}
```

#### vertical-align

```css
/* 水平垂直居中*/

/*<div class="wrap" > <div class="box1" > </div > </div >*/
.wrap {
  width: 500px;
  height: 500px;
  background-color: pink;
  text-align: center;
}

.wrap::after {
  height: 100%;
  content: "";
  display: inline-block;
  vertical-align: middle;
}
.box1 {
  display: inline-block;
  vertical-align: middle;
  background: blue;
  width: 300px;
  height: 300px;
}
```

### 块级元素

#### flex

```css
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### transform 和 postition

```css
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

#### margin

```css
.box {
    margin：0 auto
}
```

## perspective

perspective 属性定义 3D 元素距视图的距离，以像素计。该属性允许您改变 3D 元素查看 3D 元素的视图。

当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。perspective 属性只影响 3D 转换元素。

我们在屏幕上看到元素的大小不是元素本身，而是元素的投影

- `translateZ` 表示元素相对屏幕的距离

![translateZ示意图](./images/knowledge-points/translateZ.png)

- perspective 是人和屏幕的距离

![translateZ示意图](./images/knowledge-points/perspective.png)

> 参考链接：[css3 系列之详解 perspective](https://www.cnblogs.com/yanggeng/p/11285856.html)

## flex 撑出父容器探索

当 flex-item 的宽度由子元素决定时，Flex 容器可能会被撑大，如下所示

```html
<div class="container">
  <div class="item">
    <div class="child"></div>
  </div>
  <div class="item">
    <div class="child"></div>
  </div>
  <div class="item">
    <div class="child"></div>
  </div>
</div>
```

```css
.container {
  display: flex;
  width: 500px;
  height: 50px;
  background: green;
}
.item {
  border: 1px solid olive;
}
.child {
  width: 250px;
}
```

![](./images/knowledge-points/flex-out.png)

[flex 的规范](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)中说到在非滚动容器中，主轴方向 Flex Item 的最小尺寸是基于内容的最小尺寸，此时 min-width 的值是 auto。对于滚动容器，min-width 的值是 0（默认讨论水平布局）

当 item 的内容 child 宽度是 250px 时，此时也不能按照预期缩小。我们给 item 设置 `min-width:0` ，这个时候，item 会按照预期缩小，平分 500px 的大小。另外，规范也说明了在滚动容器中，min-width 也是 0，所以，给 item 增加 `overflow: auto` 或者 `overflow: hidden` 也一样可以达到目的。

>参考链接：[Flex 布局中一个不为人知的特性](https://mp.weixin.qq.com/s/24asWcdumoysdytvCNblNA)