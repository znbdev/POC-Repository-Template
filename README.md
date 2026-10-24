# POC Template

> 概念验证（Proof of Concept）专用项目模板 — 使用 GitHub Actions 自动部署到 GitHub Pages。

## 使用方式

### 1. 创建仓库

点击本仓库右上角的 **Use this template** → **Create a new repository**，或手动克隆：

```bash
git clone <your-repo-url>
cd <repo-name>
```

### 2. 编写 POC 代码

- `points-card-manager/` — POC 原型代码（React 19 + TypeScript + Vite，`index.html` 为入口）
- `docs/Product/` — PRD 与架构文档
- `docs/Dev/` — POC 验证方案、验证报告、部署过程记录
- `docs/engineering/` — 工程规范

### 3. 推送自动部署

推送 `main` 分支即可触发 GitHub Actions 自动部署：

```bash
./deploy.sh   # 封装 git add → commit → push
```

### 4. 开启 GitHub Pages（首次）

- 仓库 → **Settings** → **Pages** → **Source** 选择 **GitHub Actions**
- 或用 GitHub CLI 一步完成：

```bash
gh api -X POST /repos/<owner>/<repo>/pages --input - <<'EOF'
{
  "build_type": "workflow"
}
EOF
```

启用后重跑一次 Actions 即可。详细排错见 `docs/Dev/部署过程记录.md`。

访问 `https://<用户名>.github.io/<仓库名>/` 查看 POC。

## 目录结构

```
.
├── .github/workflows/deploy.yml  # 自动部署到 GitHub Pages（Actions 模式）
├── points-card-manager/          # POC 原型代码（React + Vite）
├── deploy.sh                     # 一键部署脚本
├── poc_verification.py           # 根目录验证脚本
├── docs/
│   ├── AGENTS.template.md        # AGENTS.md 模板
│   ├── templates/                # 通用文档模板（PRD/ARCH/PoC 方案与报告/部署记录）
│   ├── 从零构建清单.md
│   ├── engineering/              # 通用工程规范（前端/Node/Java/Python 细则）
│   ├── Product/                  # 示例：PRD.md、ARCH.md
│   └── Dev/                      # 示例：验证方案 / 验证报告 / 部署记录
├── LICENSE
├── .gitignore
└── README.md
```

## 工作流程

每次推送 `main` 分支 → GitHub Actions 自动构建（`npm ci` → `vite build`）→ `actions/deploy-pages` 部署上线（Actions 模式，不经过 gh-pages 分支）。

[线上地址](https://znbdev.github.io/POC-Repository-Template/)
