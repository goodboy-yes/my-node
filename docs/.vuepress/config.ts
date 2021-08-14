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
    // navbar: [
    //   { text: "主页", link: "/" },
    //   { text: "测试", link: "/test/test1.md" },
    //   { text: "百度", link: "https://www.baidu.com" },
    //   {
    //     text: "Group",
    //     children: ["/group/foo.md", "/group/bar.md"],
    //   },
    //   {
    //     text: "技术",
    //     children: [
    //       { text: "cst", link: "/cst/" },
    //       { text: "new", link: "/new/" },
    //     ],
    //   },
    // ],
    sidebar: [
      {
        text: "JS",
        link: "/js/",
      },
      {
        text: "CSS",
        link: "/css/",
        // children: ["/test/test3.md"],
      },
    ],
  },
});
