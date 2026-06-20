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

- `index.html` — POC 演示页面（入口）
- `poc/src/` — POC 原型代码 / 验证脚本
- `docs/02_poc/` — POC 方案与报告文档

### 3. 推送自动部署

推送 `main` 分支即可触发 GitHub Actions 自动部署：

```bash
git add .
git commit -m "初始化 POC"
git push origin main
```

### 4. 开启 GitHub Pages

- 仓库 → **Settings** → **Pages**
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` `/ (root)`
- 点击 **Save**

访问 `https://<用户名>.github.io/<仓库名>/` 查看 POC。

## 目录结构

```
.
├── .github/workflows/deploy.yml # 自动部署到 GitHub Pages
├── docs/02_poc/                 # POC 文档
│   ├── poc_proposal_验证方案.md
│   └── poc_report_验证报告.md
├── poc/src/                     # POC 原型代码
│   └── sources code
├── LICENSE
├── .gitignore
└── README.md
```

## 工作流程

每次推送 `main` 分支 → GitHub Actions 自动构建 → 部署到 `gh-pages` 分支 → GitHub Pages 展示。

[线上地址](https://znbdev.github.io/POC-Repository-Template/)