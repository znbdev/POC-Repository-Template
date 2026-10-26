# POC-Repository-Template 项目长期记忆

## 项目结构

- 本仓库是 POC 通用模板，docs 采用三层结构：通用模板层（AGENTS.template.md + templates/）→ 技术栈细则（engineering/，覆盖前端/Node/Java/Python）→ 项目示例层（Product/、Dev/ 为积分卡 PoC 示例）。
- 技术栈文档命名：规范名为 TECHSTACK.md，选型与架构合写时可用 ARCH.md（示例即此形态）。

## 用户规则（必须遵守）

- **模板同步规则**（2026-10-24）：每次更新工程文档都要同步更新 `docs/AGENTS.template.md`——工程实践中的新经验提炼为通用内容进模板；模板变更评估是否回灌到已应用该模板的工程（如 student-grade-svc）。

## 已应用的工程

- `/Users/znb/workspace/znbsys/student-grade-svc`（2026-10-24 从 ~/workspace 根移入 znbsys/）：Node 24 + TS + Hono + node:sqlite 成绩管理服务。已有 AGENTS.md（93 行）+ docs/engineering/ + .nvmrc。已知坑：node:sqlite ExperimentalWarning 属预期；8787 端口被占时启动 EADDRINUSE；seed 重复执行追加数据；成绩重复录入为 upsert 覆盖。git 仓库尚无 commit。
