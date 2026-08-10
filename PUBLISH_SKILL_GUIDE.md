# 发布指南:把 glm-vision-skill 开源到 GitHub + 发博客文章

这份指南分两部分:
- **第一部分**:把技能项目上传到 GitHub 开源。
- **第二部分**:把介绍这篇技能的文章发到你的博客。

**你的技能项目现在分两份**:
- `F:\桌面\glm-vision-skill` —— **纯净源码副本**(没有 git,只用来查看/使用)
- `F:\存放文件\ClaudeWork\glm-vision-skill` —— **git 管理版**(用来推 GitHub,你要新建)

> 为什么分开?你说过想让桌面文件夹保持"纯洁",所以 git 的事都在 ClaudeWork 那份里做。

---

## 第一部分:上传技能到 GitHub

### 第 0 步:把带 git 的版本放到 ClaudeWork

我已经帮你准备好一个**带 git 历史**的压缩包,你下载后解压到 `ClaudeWork` 即可。

1. 下载我给你的压缩包:glm-vision-skill.git-ready.zip
2. 解压后得到一个 `glm-vision-skill` 文件夹,**把这个文件夹整个移动到** `F:\存放文件\ClaudeWork\` 下。
3. 确认路径是:`F:\存放文件\ClaudeWork\glm-vision-skill`,里面应该能看到 `.git` 文件夹(如果看不到,在资源管理器里打开"查看 → 隐藏的项目")。

> 这份已经 `git init` 好、提交过一次、分支是 `main`,你不需要再初始化。

### 第 1 步:建一个 GitHub 仓库

1. 浏览器打开 <https://github.com/new>。
2. **Repository name** 填:`glm-vision-skill`
3. **可见性**选 **Public**(开源就是要公开)。
4. 不要勾选 "Add a README"(项目里已经有 README 了)。
5. 点 **Create repository**。
6. 创建完成后,页面别关,继续下一步。

### 第 2 步:进入 ClaudeWork 里的技能文件夹

打开「命令提示符」,进入:

```
cd /d F:\存放文件\ClaudeWork\glm-vision-skill
```

> 更稳的方法:用文件资源管理器进到 `F:\存放文件\ClaudeWork\glm-vision-skill`,在地址栏输入 `cmd` 回车,直接在这个目录打开命令行。

### 第 3 步:关联远程仓库并推送

依次执行:

```
git remote add origin https://github.com/KyrieYhw/glm-vision-skill.git
git push -u origin main
```

> 如果 `git remote add` 提示 "remote origin already exists",改用:
>
> ```
> git remote set-url origin https://github.com/KyrieYhw/glm-vision-skill.git
> ```

最后一条 `git push` 会弹出登录窗口,用你的 GitHub 账号登录。如果提示要 Token,按 `DEPLOY_GUIDE.md` 常见问题里的方法生成个人访问令牌。

看到 `To github.com:KyrieYhw/glm-vision-skill.git` 和 `Branch 'main' set up...` 就成功了。刷新 GitHub 仓库页面,应该能看到全部代码文件。

---

## 第二部分:把介绍文章发到博客

文章我已经写好了,放在博客项目的 `src/content/blog/glm-vision-skill.md`,本地构建验证通过。

### 第 4 步:进入博客文件夹并推送

```
cd /d C:\Users\22767\AppData\Local\Claude-3p\local-agent-mode-sessions\c91d8b65\00000000\local_dbf38972-995e-4dc6-ad88-7b05ea3f6dc5\outputs\blog
```

然后:

```
git add .
git commit -m "发布:给纯文本大模型装一双眼睛"
git push
```

> 注意:两个仓库的 push 操作,**不要搞混**。
> - 推技能:在 `F:\存放文件\ClaudeWork\glm-vision-skill` 里操作
> - 推博客:在 `...\outputs\blog` 里操作

### 第 5 步:确认上线

1. 去博客仓库 <https://github.com/KyrieYhw/KyrieYhw.github.io> → **Actions** 页,等最新一条 `Deploy to GitHub Pages` 变绿。
2. 打开 <https://KyrieYhw.github.io>,**Ctrl+F5** 强制刷新。
3. 首页"最近文章"里应该出现《给纯文本大模型装一双眼睛》,文末有指向你 GitHub 开源仓库的链接。

---

## 常见问题

**Q: push 时提示用户名/密码错误?**
A: 现在 GitHub 不用密码,用个人访问令牌(Token)。见 `DEPLOY_GUIDE.md` 常见问题。

**Q: 两个仓库分不清?**
A: 记住口诀——**技能在 ClaudeWork 推,博客在 outputs 推**。
- `cd /d F:\存放文件\ClaudeWork\glm-vision-skill` → 推技能
- `cd /d C:\Users\...\outputs\blog` → 推博客

**Q: 以后更新了技能代码怎么推?**
A: 进 `F:\存放文件\ClaudeWork\glm-vision-skill`,执行 `git add .` → `git commit -m "改动说明"` → `git push`,一条龙。

**Q: 桌面的纯净副本想更新怎么办?**
A: 桌面那份只是"查看用",不带 git。如果想同步,从 ClaudeWork 那份复制改动过去即可,或者在桌面直接编辑后,把文件复制回 ClaudeWork 再提交推送。
