# 《勾指起誓》暖色完整版交付报告

交付日期：2026-10-20。阶段 0–6 已完成，40 个歌词镜头与 8 个开场、间奏、结尾镜头均已合并。

## 成片

以下路径相对于 `D:/develop/github-repositity/codex-mv/film`。

| 文件 | 规格 | 大小 |
| --- | --- | --- |
| `out/remake/gou-zhi-qi-shi-warm-full.mp4` | 1920×1080、30fps、5508 帧、H.264/AAC | 35,724,469 字节 |
| `out/remake/gou-zhi-qi-shi-warm-preview.mp4` | 1920×1080、30fps、900 帧、H.264/AAC | 5,156,067 字节 |
| `out/remake/gou-zhi-qi-shi-warm-full-preview.mp4` | 960×540、30fps、5508 帧、H.264/AAC | 12,726,223 字节 |

每个 MP4 同目录均有 `.validation.json`。画面时长为 183.600 秒，MP4 容器时长 183.616 秒包含 AAC 填充。最终低清版从已验证的正式成片缩放，音轨直接复制。30 秒版复用完整版同一组件。

本地播放：`http://127.0.0.1:3001`。编辑预览：`http://localhost:3000/GouZhiQiShiFull`。服务停止后，可运行 `node scripts/serve-remake.mjs` 恢复播放器，运行 `npm run dev` 恢复 Studio。

## 验收证据

- `npm run lint`、`npm run build`、`npm run verify:storyboard`、`npm run verify:full` 本轮均退出 0。
- `render:preview`、`render:full` 已实际生成并验证成片；导出途中校验工具修正后使用 `--verify-only` 验收既有 partial，再改名为正式输出。最终低清命令为 `node scripts/render-remake.mjs full-preview --from-full`。
- 全部 5508 帧可解码，黑帧 0、纯色空白帧 0。50 张源画面与编码抽帧对照通过，最大平均通道误差 1.543/255。
- 12 张代表帧暖色统计通过，并已查看场景、转场与字幕接触表。圣诞段具象包含圣诞老人、雪橇、雪夜、礼物、铃铛及送到窗边的动作。
- 40/40 字幕 cue 与文字完整性在浏览器实测通过，包围范围 x489.35–1420.91、y110.17–205.47，未越界。
- 音轨偏移 23 毫秒，小于一帧；对齐相关系数 0.989411，2936588 个源采样全覆盖。编码音频多出的尾部填充为 16.25 毫秒。
- 正式版与 30 秒版均在浏览器 1x 从头播放至 `ended=true`，没有媒体错误。正式版结束时间 183.616 秒，截图为 `out/remake/review/browser-playback-ended.png`。

机器报告：`docs/MV_VERIFICATION_REPORT.json`。审片报告：`docs/MV_REVIEW_REPORT.md`。231 张时间轴抽帧、三张接触表及其索引：`out/remake/review/`。

## 计划与恢复

总计划：`docs/MV_REMAKE_PLAN.md`。阶段日志：`docs/MV_STAGE_LOG.md`。机器状态：`docs/MV_PROGRESS.json`，48/48 场景为 merged，三项最终导出为 verified。各代理的逐场提交、状态和交接位于 `docs/agents/agent-*/`。

| 恢复点 | Git 提交 |
| --- | --- |
| 原项目基线 | `19192b3` |
| 冻结接口与分镜 | `6154004` |
| A 组交付 | `6dc6730` |
| B 组交付 | `3576b2c` |
| C 组逐场恢复分支交付 | `d8414cd`，分支 `codex/mv-agent-c-scenes` |
| 48 镜头集成 | `cd96616` |
| 画面修正 | `59c4bd3` |
| 正式完整版渲染源码检查点 | `38ebd93` |
| 最终导出验收与阶段 5 | `c2d36a4` |

交付归档提交可用 `git log -1 -- docs/MV_FINAL_REPORT.md` 定位。媒体输出遵循原仓库忽略规则，未装入 Git；应保留当前 `out/remake/`。旧成片及恢复 worktree 均保留。

## 文件校验

SHA-256：

```text
完整版    84552030DCE932C7575E8D86DDF49847C441A6B39AE89D8EBA573FD744DD15DB
30秒预览  11770D65459D81FB90BE6F0B353FEA2749A7F7AC856130333772F08DFF7A6705
低清全片  A08F36861046C2A8541049FF7C274D7EB76314C7BCEFB1DCAE235A318B081935
```

## 未解决问题

当前未发现阻塞交付的技术问题。歌词时间沿用现有校准 cue，本次没有重新逐字人工校准；自动音轨相关性检查用于检查导出音轨相对原曲的偏移，不替代人工歌词节奏判断。视觉技术验收已完成，最终审美满意度由用户观看成片后判断。
