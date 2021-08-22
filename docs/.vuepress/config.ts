import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  lang: "zh-CN",
  title: "Gkc's notes",
  description: "Record knowledge",
  base: "/my-notes/",

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
          "/js/principle-analysis",
          "/js/code-style",
          "/js/knowledge-points",
          "/js/regular-expression",
          "/js/code-snippet",
          "/js/performance-optimization",
          "/js/design-pattern",
        ],
      },
      {
        text: "CSS",
        children: ["/css/knowledge-points"],
      },
      {
        text: "GIT",
        children: ["/git/basic-command", "/git/reset-and-revert"],
      },
      {
        text: "个人实践",
        children: ["/interactive"],
      },
    ],
  },
});
