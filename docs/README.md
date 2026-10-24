# docs/ — 文档目录

本仓库采用「**通用模板层 → 技术栈细则 → 项目示例层**」三层结构：新项目从 `templates/` 复制模板起步，工程规范按技术栈取用，`Product/` 与 `Dev/` 保留积分卡 PoC 作为完整示例。

## 目录结构

| 路径 | 用途 |
| --- | --- |
| `AGENTS.template.md` | AGENTS.md 模板（AI 速览文档），复制到目标仓库根目录后填空 |
| `templates/` | 通用文档模板：PRD、ARCH、PoC 方案/报告、部署记录 |
| `从零构建清单.md` | 从需求到上线的六步信息清单与步骤（技术栈无关） |
| `engineering/` | 通用工程规范，内含前端 / Node / Java / Python 技术栈细则 |
| `Product/` | **示例**：积分卡 PoC 的 `PRD.md` 与 `ARCH.md` |
| `Dev/` | **示例**：积分卡 PoC 的验证方案、验证报告、部署记录 |

## 模板使用方式

```bash
# 在目标仓库根目录
cp <本仓库>/docs/AGENTS.template.md ./AGENTS.md
cp <本仓库>/docs/templates/PRD.template.md docs/PRD.md
cp <本仓库>/docs/templates/ARCH.template.md docs/ARCH.md
```

然后：删除模板内所有 `<!-- -->` 注释 → 按注释指引填空 → 对照各文件末尾说明验收 → 提交。

## 通用规则（每个工程必须满足，与技术栈无关）

以下规则已内置于 `AGENTS.template.md` §0，是新工程的验收底线：

1. **PRD 文档** `docs/PRD.md`：需求、功能清单、验收标准；
2. **技术栈文档** `docs/TECHSTACK.md`：选型及理由、架构决策（选型与架构合写一份时可用 `ARCH.md`）；
3. **使用文档**：仓库根目录 `README.md`（开发者快速开始）；面向非开发人员的手册放 `docs/USAGE.md`；
4. **配置统一 `.env`**：根目录 `.env` 管理全部环境变量；提交 `.env.example`，`.env` 入 gitignore；禁止硬编码密钥/主机；CI Secrets 注入同名变量；
5. **启动脚本** `start.sh`（或 Makefile）：一条命令安装 + 启动，文档只引用该脚本。

## 维护规则

1. `AGENTS.template.md`、`templates/`、`engineering/` 只放**通用**内容；凡是绑定具体项目事实的说明（如部署事故复盘）放各自仓库 `AGENTS.md` 的「已知坑」小节或项目 `docs/`，不要加进模板。
2. 模板里的占位符必须保持 `<!-- ... -->` 注释形式，禁止把示例值写成"看起来像真的"内容，避免误用。
3. 新增/修改模板后，按文件内自检说明逐项验收（命令实测、路径真实、AGENTS.md <250 行）。
