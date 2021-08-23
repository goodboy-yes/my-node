# 算法

## 动态规划

### 斐波那契数列

斐波那契数列（Fibonacci sequence），又称黄金分割数列，因数学家莱昂纳多·斐波那契（Leonardoda Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”，指的是这样一个数列：

0、1、1、2、3、5、8、13、21、34、……

在数学上，斐波那契数列以如下被以递推的方法定义：

F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N\*）

**斐波那契数列的 JS 实现**

- 递归

  ```js
  function recurFib(n) {
    if (n < 2) {
      return n;
    } else {
      return recurFib(n - 1) + recurFib(n - 2);
    }
  }
  ```

  递归的执行效率非常低，因为太多值在递归中被重新计算，我们可以使用**动态规划**的技巧来设计一个效率更高的算法

- 动态规划

  动态规划从它能解决的最简单的子问题开始，继而通过得到的解，去解决其他更复杂的子问题，直到整个问题都被解决。所有子问题的解通常被存储在一个数组中

  ```js
  function dynFib(n) {
    let val = new Array(n).fill(0);
    if (n < 2) {
      return n;
    } else {
      val[1] = 1;
      for (let i = 2; i <= n; i++) {
        val[i] = val[i - 1] + val[i - 2];
      }
      return val[n];
    }
  }
  ```

  也可不使用数组

  ```js
  function iterFib(n) {
    let last = 1;
    let nextLast = 0;
    let result = 1;
    if (n < 2) {
      return n;
    } else {
      for (let i = 2; i <= n; i++) {
        result = last + nextLast;
        nextLast = last;
        last = result;
      }
      return result;
    }
  }
  ```

> 参考：《数据结构与算法 JavaScript 描述》
