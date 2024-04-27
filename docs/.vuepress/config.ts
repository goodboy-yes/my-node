import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: "https://v2.vuepress.vuejs.org/images/hero.png",
    repo: "https://github.com/goodboy-yes/my-node",
    editLink: false,
    sidebarDepth: 5,
    navbar: [{ text: "VuePress", link: "https://v2.vuepress.vuejs.org/zh/" }],
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
          "/vue3/style-guide",
        ],
      },
      {
        text: "React",
        children: [
          "/react/use",
          "/react/api",
          "/react/react-router",
          "/react/umijs",
          "/react/code-standard",
          "/react/redux",
          "/react/dva",
          "/react/ahooks",
        ],
      },
      {
        text: "Nodejs",
        link: "/node-js/",
      },
      {
        text: "Git",
        children: [
          "/git/basic-command",
          "/git/commit-standard",
          "/git/reset-and-revert",
          "/git/commit-amend",
          "/git/git-rebase",
        ],
      },
      {
        text: "Webpack",
        children: ["/webpack/principle-analysis"],
      },
      {
        text: "微信小程序",
        children: [
          "/winxin-miniprogram/introduction",
          "/winxin-miniprogram/develop",
        ],
      },
      {
        text: "数据结构与算法",
        children: [
          "/dataStructure-algorithms/complexity-analysis",
          "/dataStructure-algorithms/array",
          "/dataStructure-algorithms/linked-list",
          "/dataStructure-algorithms/stack",
        ],
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
        children: [
          "/knowledge-point/algorithm",
          "/knowledge-point/network",
          "/knowledge-point/character-encoding",
        ],
      },
      {
        text: "发展建议",
        link: "/development-proposals/",
      },
      {
        text: "VSCode",
        link: "/vs-code/",
      },
      {
        text: "Docker",
        link: "/docker/",
      },
      {
        text: "收藏",
        link: "/collection/",
      },
    ],
  }),
  lang: "zh-CN",
  title: "Gkc's notes",
  description: "Record knowledge",
  base: "/my-notes/",
  plugins: [searchPlugin()],
});
