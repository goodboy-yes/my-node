# 小技巧

## 不定宽文字跑马灯来回滚动展示

```html
<div class="wrap">
  <p title="我的宽度是正常宽度">我的宽度是正常宽度</p>
  <p class="scroll" title="我的宽度是溢出了溢出了很大一部分">
    我的宽度是溢出了溢出了很大一部分
  </p>
</div>
```

**父容器定宽**

[codepen](https://codepen.io/Chokcoco/pen/QWyoMrx)

```css
.wrap {
  position: relative;
  width: 150px;
  overflow: hidden;
}
p {
  /* <p> 标签的宽度为父元素的 100%，需借助 inline-block 的特性取得实际宽度，不使用inline是因为 transform 是无法作用在内联元素之上的 */
  white-space: nowrap;
  display: inline-block;
}
p:hover {
  animation: move 1.5s infinite alternate linear;
}

@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    /* 使用 transform: translate() 进行位移的时候，如果使用百分比表示，那么百分比的基准元素是元素本身 */
    transform: translate(calc(-100% + 150px), 0);
  }
}
```

父容器不定宽

[codepen](https://codepen.io/Chokcoco/pen/oNbVGrd)

```css
.wrap {
  position: relative;
  width: 150px;
  overflow: hidden;
}

p {
  white-space: nowrap;
  display: inline-block;
  position: relative;
}
p:hover {
  animation: move 1.5s infinite alternate linear;
}

@keyframes move {
  0% {
    left: 0;
    transform: translate(0, 0);
  }
  100% {
    /* 使用 margin-left 替换 left 也是一样可以实现的，使用百分比表示的 margin-left 位移的基准也是父元素的宽度 */
    left: 100%;
    transform: translate(-100%, 0);
  }
}
```

**不足**

- 无法判断文本长度是否超出父元素宽度，需要借助 JavaScript 简单判断，然后通过一个 class 进行控制。
- 在父容器不定宽度的情况下，由于需要同时对两个属性进行动画，并且位移的方向是相反的，所以动画看上去会有一点闪烁

> 参考链接：[小技巧 | 巧妙实现不定宽溢出文本循环滚动展示](https://mp.weixin.qq.com/s/aX8Sh3beSmMh0OF_79nw_A)
