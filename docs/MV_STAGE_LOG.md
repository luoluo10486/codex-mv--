# MV 重制阶段日志

## 阶段 0 · 计划和接口冻结

- 状态：已冻结，等待共享资产视觉检查
- 分支：`codex/mv-remake`
- 基线提交：`19192b3 chore: checkpoint existing MV before warm remake`
- 已完成：读取完整歌词、现有 22 场景、参考 MV 时长和暖色方向；创建可恢复分支。
- 已落地：48 镜头、40/40 歌词映射、机器恢复状态、资产清单、暖色令牌、共享 SVG 组件和独立关键帧渲染器。
- 检查：上一轮 `npm run lint` 通过；本轮将复验并增加时间轴连续性检查。

## 2026-10-20 · 恢复和多代理执行

- 恢复来源：Git `19192b3`、本日志、`MV_PROGRESS.json`。未启动过子代理，未将任何场景冒充完成。
- 决策：原批准计划的子代理工作区由本仓库显式路径创建 Git linked worktree；桌面原生工作区工具无法指定此 D 盘外部仓库。
- 决策：保留用户要求的项目内永久日志；子代理分别维护 `docs/agents/agent-*/HANDOFF.md` 和状态片段，由根代理汇总，避免并发写总状态。
- 决策：8 个额外镜头固定为开场 2、第一间奏 2、第二间奏 2、结尾 2；与 40 个歌词镜头连续覆盖 5508 帧。
- 决策：已有成片全部保留，新片先输出到 `out/remake/` 并以 `.partial.mp4` 验证后改名，避免覆盖有效文件。

## 阶段 1 · 共享接口

- `WarmArt.tsx` 提供舞台、月亮、云、信件、礼物、圣诞老人、雪橇、人物、水瓢、世界球、山、桥、红线和钟表。
- `remake/types.ts` 冻结 `SceneProps = { durationInFrames: number }`，每个场景使用局部帧；总时间轴负责绝对入点和音轨。
- 子代理可在独占模块内添加专属插画；共享接口不得由子代理改写。
- 待检查：共享资产接触表和完整关键帧。未验收的状态保持 planned/in_progress。

## 2026-10-20 · 开场与恢复工具检查

- 根代理两个开场镜头完成，`npm run lint` 通过；实际渲染并查看 `out/remake/root/contact-sheet.jpg`。
- 修复关键帧接触表生成：当前随 Remotion 提供的 FFmpeg 缺少 drawtext/xstack，改用本地 sharp 合成，已实际运行成功。
- 分镜初始化脚本改为保留已有场景状态，JSON 通过临时文件原子替换，重复初始化不会清空已提交进度。
- 三组独立工作区仍保留，待逐组读取提交、交接报告和抽帧后合并；全局状态暂不冒充 merged。

## 阶段 0、1 · 验收补齐

- 48 镜头连续覆盖 0–5508 帧；40 句歌词各对应唯一镜头，圣诞与礼物对象锁定；`node scripts/verify-remake-storyboard.mjs` 通过。
- 共享人物、圣诞老人、雪橇、礼物、信件、月亮、世界、钟表、山桥和水瓢已实际渲染。资产接触表为 `out/remake/shared-assets.png` 和 `shared-landscape-assets.png`，根代理已查看。
- 资产检查入口 `src/dream/remake/entry-assets.tsx`，`npm run lint` 通过。阶段 0、1 完成。
- 新导出脚本将成片先写 partial，元数据和解码验证后才改名；正式完整版另外执行逐帧亮度、源画面对照、原曲相关性和暖色代表帧检查。
