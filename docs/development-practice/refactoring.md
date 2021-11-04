# 重构

## 编码风格

### 命名

#### 函数命名

```javascript
// 对于返回 boolean 的函数以 should/is/can/has 开头
function shouldShowFriendsList() {...}
function isEmpty() {...}
function canCreateDocuments() {...}
function hasLicense() {...}

// 动词开头
function sendEmailToUser(user) {
}
```

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

#### 特定的变量

```javascript
👎
if (value.length < 8) { // 看不出为什么要小于8
 ....
}

👍
const MAX_INPUT_LENGTH = 8;
if (value.length < MAX_INPUT_LENGTH) { // 一目了然，不能超过最大输入长度
 ....
}

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

👍
//Map 则更为强大，对象的键只能是一个字符串或符号，但 Map 的键可以是对象或更多，可以作为条件联合判断。
const actions = new Map([
  [/^sign_[1-3]$/, () => 'A'],
  [/^sign_5$/, () => 'B'],
  //...
]);

const action = [...actions].filter(([key, value]) => key.test(`sign_${status}`));
action.forEach(([key, value]) => value());
```

#### 传参说明

```javascript
👎
page.getSVG(api, true, false); // true和false无意义

👍
page.getSVG({
 imageApi: api,
 includePageBackground: true, // 一目了然
 compress: false,
})
```

### 其他

#### 赋值变量兜底

```javascript
👎
let lastName = fullName[1];
if(lastName.length > MIN_NAME_LENGTH) { // fullName[1]可能为undefined
}

👍
let lastName = fullName[1] || 0;
// lastName的变量类型还是number，number原型链上的特性都能使用，不会报错。不会变成undefined。
if(lastName.length > MIN_NAME_LENGTH) {
    ....
}
```

## 其他

#### 移除重复代码

重复代码在 Bad Smell 中排在第一位，所以，竭尽你的全力去避免重复代码。因为它意味着当你需要修改一些逻辑时会有多个地方需要修改。

#### 写好业务注释

优秀的代码命名无需注释，代码即注释，加上注释就会冗余。这时某个业务的逻辑就离不开准确的注释，这样可以帮助我们更加理解业务的详细逻辑。需要要求的是代码改动注释也要随之更新
