# 部署指南:把新博客发布到 GitHub Pages(替换旧博客)

你的 GitHub 用户名是 **KyrieYhw**,已经有一个 `KyrieYhw.github.io` 仓库(旧的 Hexo 博客)。
本指南教你**用新的 Astro 博客替换掉它**,网址不变,还是 `https://KyrieYhw.github.io`。

面向没怎么用过 GitHub 的新手,每一步都很具体。全程免费,大约 20 分钟。

---

## 准备:装一个 Git

打开浏览器,进入 <https://git-scm.com/downloads>,下载 Windows 版并一路「下一步」安装。
装完后,打开「命令提示符」(按 Win 键,输入 `cmd`,回车),输入下面命令确认装好了:

```
git --version
```

看到类似 `git version 2.4x.x` 就说明成功。

---

## 第 1 步:把旧仓库清空(最简单、最安全的做法)

旧博客里只有 2 篇 Hexo 自带的示例文章,没有你自己的内容,所以**直接把旧仓库删掉重建**最干净。

1. 用浏览器打开你的仓库:<https://github.com/KyrieYhw/KyrieYhw.github.io>
2. 点仓库页面上方的 **Settings**(齿轮图标)。
3. 拉到页面最底部,在 **Danger Zone**(危险区域)里点 **Delete this repository**。
4. 它会让你输入仓库名确认,输入 `KyrieYhw/KyrieYhw.github.io` 点删除。
5. 删除后,回到 <https://github.com/new> **新建一个同名仓库**:
   - Repository name 填:`KyrieYhw.github.io`(必须完全一致)
   - 可见性保持 **Public**,其余默认,点 **Create repository**。
6. 创建完成后页面不要关,后面要用。

> 如果不放心删仓库,也可以用「不删除、直接覆盖」的方式,见文末的「备选方案」。

---

## 第 2 步:把新博客代码传上去

打开「命令提示符」,依次执行下面每条命令(一行一条,回车)。

**2.1 先告诉 Git 你是谁(只需做一次):**

```
git config --global user.name "KyrieYhw"
git config --global user.email "你的注册邮箱"
```

**2.2 进入博客文件夹:**

```
cd C:\Users\22767\AppData\Local\Claude-3p\local-agent-mode-sessions\c91d8b65\00000000\local_dbf38972-995e-4dc6-ad88-7b05ea3f6dc5\outputs\blog
```

**2.3 初始化并上传:**

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/KyrieYhw/KyrieYhw.github.io.git
git push -u origin main
```

最后一条会弹出登录窗口,用浏览器里的 GitHub 账号登录即可。
看到类似 `To github.com:...` 和 `Branch 'main' set up...` 就成功了。

---

## 第 3 步:让 GitHub 自动帮你建网站

1. 回到仓库页面,点 **Settings**(齿轮图标)。
2. 左侧菜单往下找,点 **Pages**。
3. 在 **Source** 下拉框里选 **GitHub Actions**。
4. 这一步会自动匹配到仓库里的部署脚本(项目已自带),点 **Save**。

之后每次你把新文章提交上去,GitHub 都会自动重新生成网站。

---

## 第 4 步:部署脚本说明

项目里已经自带了一个 `.github/workflows/deploy.yml`,它是 GitHub Actions 的配置文件,
作用就是「代码推上去 → 自动编译 → 发布到网站」。你不需要看懂它,只要它在仓库里就行。

> 如果第 3 步选完 GitHub Actions 后,页面没有自动出现任何脚本,那也没关系——
> 脚本已经在你推上去的代码里,保存即可。

---

## 第 5 步:打开你的博客

部署完成后(通常 1-2 分钟),在浏览器访问:

```
https://KyrieYhw.github.io
```

第一次可能要等几分钟,如果打不开,去仓库页面的 **Actions** 标签看有没有报错,
把报错截图发给我,我帮你看。

---

## 第 6 步(可选):绑定自己的域名

如果不想用 `KyrieYhw.github.io` 这种地址,可以买一个域名(比如阿里云、腾讯云,几十块一年),
然后在 GitHub Pages 设置页的 Custom domain 里填上你的域名,再按提示去域名商那里加一条 CNAME 解析。

---

## 以后怎么写新文章?

1. 在电脑上打开博客文件夹里的 `src/content/blog/` 目录。
2. 新建一个文本文件,名字用英文(比如 `my-new-post.md`),内容照 README 里的格式写。
3. 写完保存,然后在命令提示符里执行:

```
git add .
git commit -m "新文章"
git push
```

2 分钟后文章就上线了。

---

## 常见问题

**Q: 打不开网站 / 显示 404**
A: 等几分钟再刷新。还不行就去仓库 Actions 标签看日志,截图发我。

**Q: 推代码时提示用户名/密码错误**
A: 现在 GitHub 不允许用密码,必须用个人访问令牌(Token)。
登录 GitHub → 头像 → Settings → Developer settings → Personal access tokens →
Generate new token,勾选 `repo` 权限,把生成的 Token 当密码用即可。

**Q: 我想换个博客名**
A: 打开 `src/consts.ts`,把 `title` 和 `sealText` 改掉,重新 `git push` 就生效。

**Q: 网站更新后浏览器还是旧的?**
A: 按 Ctrl+F5 强制刷新,或者等一两分钟。

---

## 备选方案:不想删仓库,直接覆盖

如果你不想删掉旧仓库,也可以这样:

1. 进入旧仓库页面,点 **Add file → Upload files**,把旧文件全部勾选删除比较麻烦,更简单的做法是:
   - 打开 <https://github.com/KyrieYhw/KyrieYhw.github.io>,先点 **Add file → Upload files**,
     这一步先不动;改用命令行覆盖:
2. 在本机把旧仓库克隆下来,清空内容,再推入新代码:

```
cd C:\Users\22767\AppData\Local\Claude-3p\local-agent-mode-sessions\c91d8b65\00000000\local_dbf38972-995e-4dc6-ad88-7b05ea3f6dc5\outputs
git clone https://github.com/KyrieYhw/KyrieYhw.github.io.git blog-old
cd blog-old
```

然后删掉里面所有文件(在文件资源管理器里全选删除即可,保留隐藏的 `.git` 文件夹),
把 `blog` 文件夹里的**所有文件**复制进来(注意别把 `blog` 文件夹本身复制进来),
再执行:

```
git add .
git commit -m "replace with Astro blog"
git push
```

之后同样到 Settings → Pages 里把 Source 改成 **GitHub Actions**。

> 两种方式效果一样,推荐先试「删除重建」,更省事。
