---
title: A Thinking on Different LMs
date: 2025-11-16
category: AI
description: Autoregressive models write forward. Diffusion models begin with a shape, then refine.
---

最近在做 DLM（Diffusion Language Model）相关的分析，把这篇文章当成我的一个思考记录，用敲击键盘刺激我的大脑被迫思考。

大多数时间，甚至是 100% 的时间，大家使用的模型都是 Autoregressive 的。何为 Autoregressive 呢，实际上简单描述就是 next token prediction，在进行预测的时候只能看到前文看不到后文。而 DLM，简单描述，就是能够更像人类一样，先模糊的有一个概念，再从这个概念上去落实到一个一个字。

举个例子，AR 模型更像是小学初中写反思的状态，把纸拿过来就是写，写到哪里算哪里，字数不够就靠编，可能在写之前会有一些简单的认知，比如需要道歉、描述事情经过、展现改过自新的决心等等，但是总体来说还是一个字一个字，一句话一句话地往外崩字的。而 DLLM 不一样，他更像是小时候语文老师推荐的写作文形式，先在落笔之前写一个提纲，然后很快的写出一版非常差的，然后再在此基础上进行微调修改成一个没那么差的，在这个基础上继续修改，一直修改到我们认为足够优秀为止。

因此，DLM 也更符合大多数人以为的对于语言和思维的关系的定义 —— 语言只是传达我思维的一个方式，人在说出第一个字之前就有了“想说什么”的一个模糊概，即 DLM 开始 denoise 之前的模糊的初始态。

那么我现在面临的问题是什么呢？现在没有什么针对 DLM 场景的 benchmarks，大部分的 bench 还是服务于 AR 模型，例如 MMLU 这种选择题，模型不需要在生成后文后对前文进行反复的修改，因此也就没办法完全展现 DLM 的能力。因此现在需要的是一个针对于 DLM 这种生成方式的 benchmark 可以展现 DLM 的优势，并且可以客观地评价 DLM 的能力。

## 什么是好的 benchmark？

首先回到 benchmarks 本身，什么是好的 benchmarks，现在我们见到的 benchmarks 有什么问题呢？

1. **题目泄漏和刷榜危机：**由于最早的一批 benchmarks 已经是过去式了，MMLU 是 2020 年 released 的测试集，而 “PRO” 版的 MMLU-PRO 也已经是 2024 年中旬的工作。相关题目的讨论、研究、批评、褒奖，连带着原题和答案，都已经在公开互联网上被无数次讨论。这种情况会导致模型实际上并非在答题，而是在预训练语料中检索答案。同时，很多 benchmarks 强调“可验证”性，例如多选题、输出某个数字答案的数学题等。这类 benchmarks 即使在一定程度上有效，也很容易通过 RL 的方式被刷榜，导致当前模型的评测分数被极度 inflated。

---

已经退出这个项目了，做了一些 benchmark 发现 DLLM 就是个 tmd 彻头彻尾的骗局！！！！！（至少我们没做出来）

有什么其他的思考我再继续补吧，有时间。Lemme publish all things above for now.
