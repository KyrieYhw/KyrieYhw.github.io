---
title: "论文笔记:ReAct —— 让语言模型推理并行动"
description: "ReAct 的核心思想是让 LLM 在推理(Reason)和行动(Act)之间交替,本文记录我阅读这篇论文时的理解。"
pubDate: 2026-07-18
updatedDate: 2026-07-20
tags: ["论文", "AI", "ReAct"]
---

> **ReAct: Synergizing Reasoning and Acting in Language Models**
> Shunyu Yao et al., ICLR 2023

## 一句话概括

让大语言模型在做决策时,**一边推理一边行动**,推理文本（thought）作为行动（action）的"草稿纸",两者交替进行,从而解决复杂任务。

## 为什么需要它

之前的做法要么只推理（Chain-of-Thought）,要么只行动（传统的 agent 循环）。只推理没法跟环境交互,只行动又缺乏规划。ReAct 把两者合在一起,类似人类解决问题时的"边想边做"。

## 关键设计

- **Thought**：模型写下的自然语言推理,解释下一步为什么这么做
- **Action**：调用工具或做出决策
- **Observation**：环境返回的结果,喂回给模型

三个步骤循环,直到任务完成。论文用了一个经典的例子:查找苹果创始人。

```text
Thought: 我需要查一下苹果公司的创始人是谁
Action: Search["苹果公司 创始人"]
Observation: 苹果公司由史蒂夫·乔布斯等人于 1976 年创立
Thought: 答案是乔布斯
Answer: 史蒂夫·乔布斯
```

## 我学到的

1. 关键是 **thought 要能约束行动**,不然就是无效的中间层
2. 在 HotpotQA 和 Fever 这类需要外部知识的任务上提升明显,在简单算术任务上反而不如纯推理
3. 失败模式：模型可能陷入重复的 thought-action 循环,需要限制最大步数

## 下一步

我计划用 DeepSeek 的 API 复现一个简化版,只保留 search 工具,先把"推理-行动"循环跑通。
