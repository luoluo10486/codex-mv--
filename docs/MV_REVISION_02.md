# 人物参考与浅暖色修订

用户要求：男孩基于第一份 SVG 补完整身体；女孩沿用第二份 SVG 的眼镜、马尾与脸部特征。全片用明亮、柔和、低饱和暖色，减少深黄与暗色大面积；加入淡粉；河水等物体使用符合语义的淡蓝环境色。

## 冻结接口与边界

- 根代理：`src/dream/StoryCharacters.tsx`、`src/dream/WarmArt.tsx`、`src/dream/palette.ts`、角色原始 SVG、导出审片工具、总日志及状态。
- A：只编辑 `src/dream/remake/ActA.tsx`、`ActAArt.tsx` 和 `docs/agents/agent-a/REVISION_02.md`。
- B：只编辑 `src/dream/remake/ActB.tsx`、`ActBArt.tsx` 和 `docs/agents/agent-b/REVISION_02.md`。
- C：只编辑 `src/dream/remake/ActC.tsx`、`ActCArt.tsx` 和 `docs/agents/agent-c/REVISION_02.md`。
- 共用人物导出 `StoryPerson`，属性 `{x?:number,y?:number,s?:number,girl?:boolean,walk?:number,lean?:number,arm?:number,face?:number,back?:boolean,turn?:number}`。局部 y=0 为腰上，头顶 -195、上衣 -65..100、脚底 180、左右手约 ±70,y30。girl=true 为马尾眼镜女孩，false 为男孩。
- A 的 variant=0 为女孩、1 为男孩；B 的 red=true 为女孩；C 的 second=false 为女孩。各包装组件通过同一 StoryPerson 适配尺度，保持已有镜头锚点。

## 配色与场景

- 大面积：奶白 #fffaf4、淡黄 #fff4ce、蜜桃 #fce2d8、淡粉 #f8dfe8、粉色暮光 #e9c5d2。
- 中景：玫瑰 #e6b8c6、杏色 #f1d3b5、柔绿 #c9d8bd。暗色只用于小面积五官、头发、局部边缘。
- 水域：浅蓝 #d6edf2、#bcdde8，配粉白倒影；岸景以淡粉、奶白、柔绿为主。
- A：“我的一瓢水”必须有河岸、淡蓝河水、涟漪、水滴和下探舀起的动作；保留水中世界意象。雪夜改为明亮粉色雪景。
- B：山海河流使用淡蓝；花园加入柔绿叶片与淡粉花朵；星海以粉白浅底维持微光，山体与契约背景不使用暗棕大块。
- C：开头复用的房间改奶白墙、浅粉窗帘、淡杏地板；回归、四季和远行加入粉白、浅绿，结尾维持明亮粉色天空。

## 验收和恢复

1. 先统一人物接口和各幕修改，逐组交接文件，根代理阅读源码并检查。
2. lint/build、48 镜头与角色全片复用检查；生成新人物与完整接触表，重点查看舀水动作起中末帧和人物近远景。
3. 原正式成片保留在 `out/remake/`。本次产物独立保存在 `out/remake-v2/`，先 partial 验证再命名；本次参考抽帧不得复用旧版。
4. 更新阶段日志、修订状态、报告与 Git；未验证阶段不得标为完成。恢复时先读本文件、`docs/MV_REVISION_02_PROGRESS.json` 和代理交接。

审片口径：50 张导出代表帧分别检查亮像素（亮度>180）占比>55%、暗像素（亮度<100）占比<15%、低饱和像素（HSV S<0.35）占比>65%。12 张色温代表帧平均暖色像素占比>65%，允许单个水域画面以自然浅蓝为主；同时人工查看全景、字幕及转场接触表。颜色统计只验证整体明暗与柔和程度，主体辨识度以实际画面复核为准。

## 重启入口

先读取本修订状态和 `git status`。本轮画面检查点为 `09c9464`，三组均已提交，不需要重新生成已完成镜头。

```powershell
$env:MV_OUTPUT_ROOT='out/remake-v2'
```

设置后，`npm run review:full`、`npm run render:preview`、`npm run render:full`、`npm run verify:full` 均指向本修订目录。若正式 MP4 已存在则导出工具会保留它并退出，不覆盖文件。若只存在 partial，先执行 `node scripts/render-remake.mjs full --verify-only` 验证已有输出，失败才检查是否需要重新渲染。最终低清命令为 `node scripts/render-remake.mjs full-preview --from-full`，播放器为 `node scripts/serve-remake.mjs`。
