# 风格指南

## 优先级 A 的规则：必要的 (规避错误)

- 组件名应该始终由多个单词组成，除了根组件 App，以及 `<transition>`、`<component>` 之类的 Vue 内置组件。
- 为 v-for 设置 key 值
- 为组件样式设置作用域 scoped

## 优先级 B 的规则：强烈推荐 (增强代码可读性)

#### 组件文件

只要有能够拼接文件的构建系统，就把每个组件单独分成文件

```
components/
|- TodoList.vue
|- TodoItem.vue
```

#### 单文件组件文件的大小写

单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。

#### 基础组件名称

**应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。**

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

这些组件为你的应用奠定了一致的基础样式和行为。它们可能只包括：

- HTML 元素
- 其它基础组件
- 第三方 UI 组件

但是它们绝不会包括全局状态 (比如来自 Vuex store)。

#### 单例组件名称

**只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。**

这并不意味着组件只可被用于一个页面，而是每个页面只能使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用所定制的，而不是它们所在的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只不过目前在每个页面里只使用一次。

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

#### 紧密耦合的组件名称

**与父组件紧密耦合的子组件应该以父组件名作为前缀命名。**

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

#### 组件名称中的单词顺序强烈推荐

**组件名称应该以高阶的 (通常是一般化描述的) 单词开头，并以描述性的修饰词结尾。**

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

#### 模板中的组件名称大小写强烈推荐

对于绝大多数项目来说，在单文件组件和字符串模板中，组件名称应该始终是 PascalCase 的——但是在 DOM 模板中是 kebab-case 的。

#### 完整单词的组件名称强烈推荐

**组件名称应该倾向于完整的单词，而不是缩写。**

编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

#### Prop 命名强烈推荐

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

```
props: {
  greetingText: String
}

<WelcomeMessage greeting-text="hi"/>
```

## 优先级 D 的规则：谨慎使用 (潜在风险)

## scoped 中的元素选择器谨慎使用

**元素选择器应该避免在 scoped 中出现。**

在 scoped 样式中，类选择器要比元素选择器更好，因为大量地使用元素选择器是很慢的。大量的元素与 attribute 组合的选择器 (比如 button[data-v-f3f3eg9]) 会比类与 attribute 组合的选择器更慢，因此应该尽可能地选用类选择器。