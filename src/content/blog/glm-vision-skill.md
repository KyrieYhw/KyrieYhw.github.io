---
title: "给纯文本大模型装一双眼睛:GLM-4V-Flash + MinerU 视觉增强 Skill"
description: "DeepSeek 这类纯文本模型看不懂图片怎么办?用智谱免费视觉模型 GLM-4V-Flash 配合 MinerU 文档解析,做一个零依赖的视觉增强 skill,让主模型'看见'图片。"
pubDate: 2026-08-10
tags: ["Claude", "DeepSeek", "GLM", "MinerU", "LLM", "技能"]
---

## 给纯文本大模型装一双眼睛

> 用免费通道给 DeepSeek 这类纯文本模型补上视觉能力:GLM-4V-Flash 负责"看懂图片",MinerU 负责"解析文档",OCR 做兜底。

## 背景:模型没有眼睛怎么办

很多推理模型(比如 DeepSeek)是纯文本模型,没有多模态能力。在 Claude 里发一张图,主模型只会显示 `[Unsupported Image]`,然后说"我看不到图片"。

这不怪模型——它天生没有视觉。但日常场景里,我们经常需要让 AI 处理截图、图表、PDF、数学题图片。怎么办?

**思路很简单:把"看图"这件事外包出去。** 找一个免费的视觉模型来读图,把图片内容转成文字,再喂给主模型。主模型拿到文字,继续推理。这就是"视觉增强 skill"的核心思想。

## 选型:为什么是 GLM-4V-Flash + MinerU

调研了一圈,确定了三个免费/低成本通道:

| 通道 | 用途 | 成本 |
|---|---|---|
| 智谱 **GLM-4V-Flash** | 图片理解、视觉推理 | 免费 |
| **MinerU** 文档解析 | PDF/Word/PPT/Excel → Markdown | flash 免 token,精准模式有免费额度 |
| **Windows OCR**(本地) | 纯文字提取的离线兜底 | 免费、不出网 |

**GLM-4V-Flash** 是智谱开放平台上的免费视觉模型,走 OpenAI 兼容接口,支持图片 URL 和 base64 传参。注册 open.bigmodel.cn 就能拿到 key。

**MinerU** 是 OpenDataLab 的文档解析引擎,能把 PDF 变成干净的 Markdown(保留公式、表格)。它的 flash 模式连 token 都不需要,非常适合快速解析。

## 架构:单入口 + 分流 + 降级

参考了 GitHub 上 [ds-vision-skill](https://github.com/Sorwcyra/ds-vision-skill) 的思路,做了精简:

```
图片 / PDF / 文档
      │
      ▼
vision-router.js(单入口,自动分流)
      ├── 图片+推理  → GLM-4V-Flash(免费)
      ├── 文档       → MinerU flash / extract
      └── 纯文字     → MinerU OCR → Windows OCR → GLM 兜底
      │
      ▼
统一 JSON 信封 → 主模型继续推理
```

三个设计要点:

**1. 单入口路由。** 所有调用都走 `vision-router.js`,按意图(`reason`/`document`/`ocr`)分流。主模型不需要知道底层细节,只需要跑一个脚本。

**2. 统一 JSON 契约。** 所有通道输出同一种结构:

```json
{
  "task_type": "image_reasoning | document_parsing | ocr",
  "tool_used": "glm-4v-flash | mineru-flash | ...",
  "confidence": "high | medium | low",
  "result": "识别出的内容",
  "metadata": {}
}
```

主模型**只读 `result` 字段**继续推理,完全不接触像素。

**3. 降级链。** 免费通道有速率限制(429),失败不重试,直接切下一个通道。比如 OCR:先试 MinerU,不行切 Windows 本地 OCR,再不行用 GLM 兜底。

## 实现:零依赖的 Node.js

整个 skill 用纯 Node.js(≥18)实现,**零第三方依赖**。最 tricky 的部分是 MinerU 精准模式返回的 zip 解压——用 Node 内置 `zlib.inflateRawSync` 手写了一个最小 zip 解析器,只有 30 行。

## 踩过的坑

**1. Claude Desktop vs Claude Code CLI 的机制差异。**

这是最大的坑。CLI 版用 `~/.claude/skills/` 和 `CLAUDE.md`,但 Desktop 版的每个会话跑在**全新隔离沙箱**里,既不读 Windows 环境变量,也不保留上会话文件。所以:

- `setx` 设置的环境变量,Desktop 沙箱**读不到**。
- 必须让脚本从**本地 `config.json`** 读 key,并放到**持久化文件夹**(挂载目录)。

**2. API key 绝对不能进 git。**

key 只放在 `config.json`,并用 `.gitignore` 忽略。开源前务必扫描全仓库确认无泄漏。

**3. GLM 免费档有速率限制。**

图片理解频繁调用会 429,需要提示用户稍后重试,或走 OCR/文档通道。

## 效果

用一张自拍照片测试,GLM-4V-Flash 返回:

> "这是一张在室内拍摄的照片。照片中可以看到一个人正在用手机自拍。背景是一个宽敞明亮的房间,地板是木质的…整体环境看起来像是一个健身房或者瑜伽馆。"

纯文本模型拿到这段文字,就能正常回答用户"这张图是什么"了。

## 展望

- 接入更多免费视觉通道做"竞速池"(谁先返回用谁)
- MinerU 精准模式接入结构化提取(从文档生成 Q&A)
- 支持批量图片处理

项目代码已开源:[glm-vision-skill](https://github.com/KyrieYhw/glm-vision-skill)

---

*这篇是研究手记,记录给纯文本模型做视觉增强的过程。如果你也在折腾 DeepSeek/Claude 的视觉能力,欢迎交流。*
