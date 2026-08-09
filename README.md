# 成蹊 · 个人博客

一个用 Astro 搭建的极简明亮风博客,适合记录技术学习笔记与生活随笔。

## 本地运行

```bash
npm install
npm run dev
```

然后打开浏览器访问 `http://localhost:4321`。

## 写新文章

在 `src/content/blog/` 目录下新建一个 `.md` 文件即可,顶部是文章信息:

```markdown
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-08-09
tags: ["AI", "论文"]
---

正文内容...
```

## 构建与部署

```bash
npm run build        # 生成静态文件到 dist/
npm run preview      # 本地预览构建结果
```

部署到 GitHub Pages 的方法见 `DEPLOY_GUIDE.md`。
你的网址是 https://KyrieYhw.github.io,部署前需先清空旧的 KyrieYhw.github.io 仓库。

## 改站点信息

所有站点信息(博客名、作者、网址等)都在 `src/consts.ts` 里,改这一处即可。
