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
