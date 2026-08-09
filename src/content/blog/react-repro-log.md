---
title: "复现日志:用 DeepSeek API 跑通一个最小 ReAct"
description: "没有 stop 参数怎么办?四个任务一起测?记录这次复现踩的坑和心得。"
pubDate: 2026-07-30
tags: ["代码", "复现", "ReAct"]
---

## 目标

把 ReAct 论文里的想法落地：用 DeepSeek 的 chat API,实现一个"推理-行动-观察"循环,让它能完成几个小任务（比如查资料、算日期、做选择题）。

## 遇到的第一个坑：没有 stop 参数

OpenAI 的 API 支持 `stop` 参数来截断输出,但 DeepSeek 的 chat 接口不支持。ReAct 的循环恰恰依赖在固定位置截断——让模型先输出 thought,再输出 action。

**解决思路**：改成**后处理截断**。让模型一次性输出一整段文本,我在代码里按关键词切分,把 thought 和 action 分开。

```python
# 伪代码
output = model.generate(prompt)
thought = output.split("Action:")[0].strip()
action = output.split("Action:")[1].split("\n")[0].strip()
```

缺点很明显：模型可能不按格式来,切分会出错。所以 prompt 里要反复强调输出格式,还要写容错逻辑。

## 设计

- 一个 `runner.py`,四个任务,每个任务有自己的评估函数
- 工具先只做一个 `search`,内部用本地知识库模拟,方便离线调试
- 加了 `--mock` 参数,没 API key 也能跑通流程

## 待改进

- 记忆还很原始,下一步尝试 Reflexion 式的反思
- 工具太少,想加个计算器工具
- 没有可视化,调试靠打印日志,想加个简单的轨迹展示

## 收获

最大的收获是理解了 agent 循环的"脆弱性"：**格式约束比想象中重要**。模型不是不会推理,而是输出格式稍微不听话,整条链路就断了。这也让我明白为什么论文里要花那么大力气设计 prompt。
