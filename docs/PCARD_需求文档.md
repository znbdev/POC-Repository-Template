# 积分卡管理（Points Card Manager）—— Demo 需求文档

> 版本：v1.0-demo  
> 最后更新：2026-06-20

---

## 1. 项目概述

超市/商场场景下管理积分卡的轻量级 Web 应用。纯前端，数据存 LocalStorage，支持手机和 iPad 自适应。

**核心功能只有三个：**
1. 上传条形码图片（相册）
2. 首页以卡片列表展示
3. 点击卡片全屏展示条形码大图

---

## 2. 功能需求

### 2.1 首页列表

- 按创建时间倒序展示所有积分卡
- 每张卡片显示：商户名 + 条形码缩略图
- 无卡片时显示空态引导文字："点击 + 添加积分卡"
- 右下角固定悬浮按钮（`+`）

### 2.2 条形码上传

- 点击 `+` 按钮 → 从相册选图
- 手动输入卡名（如"山姆会员卡"）和商户名（如"山姆"）
- 点击保存，存入 LocalStorage

### 2.3 条形码大图

- 点击卡片 → 全屏深色背景展示条形码大图
- 点击关闭按钮或空白区域返回首页

---

## 3. 数据模型

```typescript
interface Card {
  id: string;            // UUID
  name: string;          // 卡名
  merchant: string;      // 商户名
  barcodeImage: string;  // Base64 图片
  createdAt: number;     // 创建时间戳
}
```

存储：`localStorage` 键 `pcards:cards`，JSON 序列化。

---

## 4. 技术栈

| 层面 | 技术 | 说明 |
| --- | --- | --- |
| 框架 | React 19 + TypeScript | 组件化，类型安全 |
| 路由 | React Router v7 | SPA 路由 |
| 样式 | Tailwind CSS v4 | 原子化 CSS，移动优先 |
| 构建 | Vite 6 | 极速 HMR + 打包 |
| 存储 | LocalStorage | 纯前端本地存储 |
| CI/CD | GitHub Actions | 推送 main 自动构建部署 |
| 托管 | GitHub Pages | 免费静态托管 |

---

## 5. 目录结构

```
POC-Repository-Template/
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions: 自动构建部署到 Pages
├── docs/
│   └── PCARD_需求文档.md
├── points-card-manager/     # 主项目
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── types/
│       │   └── card.ts
│       ├── hooks/
│       │   └── useCards.ts
│       ├── components/
│       │   ├── CardGrid.tsx
│       │   ├── CardItem.tsx
│       │   ├── BarcodeViewer.tsx
│       │   ├── UploadModal.tsx
│       │   └── EmptyState.tsx
│       └── pages/
│           └── HomePage.tsx
├── poc_verification.py      # 验证脚本
├── .gitignore
├── index.html               # (仓库模板入口)
├── LICENSE
└── README.md
```

---

## 6. 页面原型

| 页面 | 说明 |
| --- | --- |
| 首页 | 网格卡片 + `+` 按钮 FAB |
| 空态 | 引导文字 + 上传入口 |
| 上传弹窗 | Modal：图片预览 + 卡名/商户名输入 + 保存 |
| 大图展示 | 全屏深色背景 + 条形码 + 关闭按钮 |

---

## 7. 部署

### 7.1 CI/CD 流程

推送 `main` 分支后，GitHub Actions 自动执行：

```
push → npm ci → npm run build → upload artifact → deploy to Pages
```

- 仅 `points-card-manager/**` 或 `.github/workflows/deploy.yml` 变更时触发
- `BASE_URL` 自动设为 `/<仓库名>/`，保证资源路径正确
- 构建产物推送至 `gh-pages` 分支

### 7.2 首次配置

1. 将仓库推送至 GitHub
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. 推送 `main` 分支触发自动部署
4. 访问 `https://<用户>.github.io/<仓库名>/`

---

## 8. Demo 范围

**做：**
- 上传图片 + 手动填卡名/商户名
- 列表展示 + 空态
- 点击查看大图

**不做：**
- 删除/编辑卡片
- 搜索/排序
- PWA / 屏幕常亮
- 数据导出导入
- 条形码 OCR 识别
