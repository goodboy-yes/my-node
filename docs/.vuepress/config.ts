import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  lang: "zh-CN",
  title: "Gkc's notes",
  description: "Record knowledge",
  base: "/my-notes/",
  plugins: ["@vuepress/plugin-search"],
  themeConfig: {
    logo: "https://img2.baidu.com/it/u=157071915,2692109510&fm=26&fmt=auto&gp=0.jpg",
    repo: "https://github.com/goodboy-yes/my-node",
    editLink: false,
    markdown: {
      extractHeaders: [1, 2, 3, 4, 5],
    },
    sidebarDepth: 5,
    navbar: [
      { text: "VuePress", link: "https://v2.vuepress.vuejs.org/zh/" },
      // { text: "主页", link: "/" },
      // { text: "测试", link: "/test/test1.md" },
      // { text: "百度", link: "https://www.baidu.com" },
      // {
      //   text: "Group",
      //   children: ["/group/foo.md", "/group/bar.md"],
      // },
      // {
      //   text: "技术",
      //   children: [
      //     { text: "cst", link: "/cst/" },
      //     { text: "new", link: "/new/" },
      //   ],
      // },
    ],
    sidebar: [
      {
        text: "HTML",
        children: ["/html/sample-template", "/html/knowledge-points"],
      },
      {
        text: "JS",
        children: [
          "/js/knowledge-points",
          "/js/handwriting-knowledge",
          "/js/code-snippet",
          "/js/bit-operation",
          "/js/regular-expression",
          "/js/file-operation",
          "/js/cross-domain",
          "/js/code-style",
          "/js/performance-optimization",
          "/js/design-pattern",
          "/js/principle-analysis",
        ],
      },
      {
        text: "TypeScript",
        children: ["/ts/basic-knowledge", "/ts/to-use"],
      },
      {
        text: "CSS",
        children: [
          "/css/knowledge-points",
          "/css/bfc",
          "/css/pseudo-classes-and-elements",
          "/css/aspect-ratio",
          "/css/skill",
          "/css/compositing-layer",
        ],
      },
      {
        text: "Vue2",
        children: ["/vue2/knowledge-points", "/vue2/keep-alive"],
      },
      {
        text: "Vue3",
        children: [
          "/vue3/difference-from-vue2",
          "/vue3/vite",
          "/vue3/practice",
        ],
      },
      {
        text: "React",
        children: ["/React/use", "/React/react-router"],
        link: "/react",
      },
      {
        text: "Nodejs",
        link: "/node-js",
      },
      {
        text: "Git",
        children: [
          "/git/basic-command",
          "/git/commit-standard",
          "/git/reset-and-revert",
          "/git/commit-amend",
        ],
      },
      {
        text: "Webpack",
        children: ["/webpack/principle-analysis"],
      },
      {
        text: "开发实践",
        children: [
          "/development-practice/functional-programming",
          "/development-practice/refactoring",
          "/development-practice/interactive",
          "/development-practice/technical-scheme",
        ],
      },
      {
        text: "知识点",
        children: ["/knowledge-point/algorithm", "/knowledge-point/network"],
      },
      {
        text: "发展建议",
        link: "/development-proposals",
      },
      {
        text: "VSCode",
        link: "/vs-code",
      },
    ],
  },
});
