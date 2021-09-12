# 重构

## 最佳实践

### 命名

#### 使用有意义的变量代替数组下标

```js
👎
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);

👍
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

#### 避免硬编码值

确保声明有意义且可搜索的常量，而不是直接插入一个常量值

```js
👎
setTimeout(blastOff, 86400000);

👍
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000; //86400000;
setTimeout(blastOff, MILLISECONDS_PER_DAY);
```

### 函数

#### 函数参数多于两个使用解构

```js
👎
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
createMenu("Foo", "Bar", "Baz", true);

👍
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}
createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true
});
```

推荐使用解构的几个原因:

- 看到函数签名可以立即了解有哪些参数
- 解构能克隆传递到函数中的参数对象的值(浅克隆)，有助于防止副作用.
- linter 可以提示有哪些参数未被使用

#### 复杂函数进行拆分

```js
👎
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}

👍
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

#### 注意函数的副作用

```js
👎
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};

👍
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};
```

#### 避免过多分支

尽早 return 会使你的代码线性化、更具可读性且不那么复杂。

```js
👎
function addUserService(db, user) {
  if (!db) {
    if (!db.isConnected()) {
      if (!user) {
        return db.insert("users", user);
      } else {
        throw new Error("No user");
      }
    } else {
      throw new Error("No database connection");
    }
  } else {
    throw new Error("No database");
  }
}

👍
function addUserService(db, user) {
  if (!db) throw new Error("No database");
  if (!db.isConnected()) throw new Error("No database connection");
  if (!user) throw new Error("No user");

  return db.insert("users", user);
}
```

#### 优先使用 map 而不是 switch 语句

既能减少复杂度又能提升性能。

```js
👎
const getColorByStatus = (status) => {
  switch (status) {
    case "success":
      return "green";
    case "failure":
      return "red";
    case "warning":
      return "yellow";
    case "loading":
    default:
      return "blue";
  }
};

👍
const statusColors = {
  success: "green",
  failure: "red",
  warning: "yellow",
  loading: "blue",
};

const getColorByStatus = (status) => statusColors[status] || "blue";
```

---
