# Points Card Manager — Demo 架构文档

> 版本：v1.0-demo  
> 最后更新：2026-06-20

---

## 1. 项目定位

纯前端积分卡管理 Demo，验证 React 19 + Vite 6 + Tailwind CSS v4 技术栈在移动端响应式场景下的可行性。

| 维度 | 说明 |
| --- | --- |
| 类型 | 技术 Demo / PoC |
| 核心命题 | 移动端响应式 + 纯前端图片存储 + CI/CD 自动部署 |
| 非目标 | 生产可用、数据持久化、多设备同步 |

---

## 2. 架构概览

### 2.1 分层

```
┌─────────────────────────────┐
│        页面层 (pages)        │  HomePage
├─────────────────────────────┤
│       组件层 (components)    │  CardGrid, CardItem, BarcodeViewer,
│                             │  UploadModal, EmptyState
├─────────────────────────────┤
│        逻辑层 (hooks)        │  useCards (CRUD + LocalStorage)
├─────────────────────────────┤
│        类型层 (types)        │  Card 接口定义
├─────────────────────────────┤
│    基础设施 (Vite + Tailwind)│  构建、样式、HMR
└─────────────────────────────┘
```

### 2.2 数据流

```
用户操作 → 组件事件 → useCards hook → LocalStorage
                                          ↕
                                    React 状态驱动 UI 更新
```

- 单向数据流：`useCards` 是唯一数据源，组件只读
- 图片以 Base64 Data URL 存储，保存前经 Canvas 压缩（max 800px, JPEG 0.8）

---

## 3. 目录结构

```
points-card-manager/
├── index.html                 # Vite 入口 HTML
├── package.json               # 依赖声明
├── tsconfig.json              # TypeScript 配置
├── vite.config.ts             # Vite + React + Tailwind 插件配置
└── src/
    ├── main.tsx               # ReactDOM 挂载入口
    ├── App.tsx                # 路由配置 (BrowserRouter)
    ├── index.css              # Tailwind CSS v4 入口 (@import "tailwindcss")
    ├── types/
    │   └── card.ts            # Card 接口定义
    ├── hooks/
    │   └── useCards.ts        # 数据读写 + LocalStorage 持久化
    ├── components/
    │   ├── CardGrid.tsx       # 响应式网格容器 (grid-cols-2/3/4)
    │   ├── CardItem.tsx       # 单张卡片展示
    │   ├── BarcodeViewer.tsx  # 全屏大图查看
    │   ├── UploadModal.tsx    # 上传弹窗（拍照/相册 + 表单）
    │   └── EmptyState.tsx     # 空态引导页
    └── pages/
        └── HomePage.tsx       # 首页（组合所有组件）
```

### 组件树

```
App (BrowserRouter)
└── HomePage
    ├── Header (标题 + 统计)
    ├── EmptyState | CardGrid
    │   └── CardItem × N
    ├── FAB Button (右下角 +)
    ├── UploadModal (条件渲染)
    └── BarcodeViewer (条件渲染)
```

---

## 4. 技术栈决策

| 技术 | 版本 | Demo 选型理由 |
| --- | --- | --- |
| React | 19 | Hooks 驱动 UI，组件化清晰，生态最成熟 |
| TypeScript | 5.7 | 类型定义即文档，降低协作成本 |
| Vite | 6 | 启动 < 200ms，HMR 毫秒级，Rollup 打包即用 |
| Tailwind CSS | 4 | 移动优先断点系统，零 JS 运行时，CSS 文件极小 |
| React Router | 7 | SPA 路由，为后续多页面预留 |
| LocalStorage | — | 零依赖，API 简单，Demo 足够 |
| GitHub Actions | — | 免费 CI/CD，YAML 配置即用 |
| GitHub Pages | — | 免费静态托管，一键部署 |

### 为什么不选

| 方案 | 排除原因 |
| --- | --- |
| Next.js | 不需要 SSR，纯静态 SPA 更简单 |
| Zustand / Redux | 状态只有卡片列表，`useState` 足够 |
| IndexedDB | Demo 数据量小，LocalStorage 更简单 |
| 后端 + 数据库 | 零服务器成本是核心诉求 |

---

## 5. 关键实现细节

### 5.1 图片压缩

```typescript
// UploadModal.tsx
function compressImage(file: File): Promise<string> {
  // 1. FileReader 读为 Data URL
  // 2. new Image() 加载
  // 3. Canvas 绘制并缩放至 max 800px
  // 4. canvas.toDataURL('image/jpeg', 0.8) 输出
}
```

压缩效果：~3MB 手机照片 → ~150KB Base64，LocalStorage 可存约 30 张卡。

### 5.2 响应式断点

```css
grid-cols-2     /* 手机 (< 640px) 默认 */
md:grid-cols-3  /* 平板 (≥ 768px) */
lg:grid-cols-4  /* 桌面 (≥ 1024px) */
```

### 5.3 数据模型

```typescript
// types/card.ts
interface Card {
  id: string
  name: string
  merchant: string
  barcodeImage: string  // Base64 Data URL
  createdAt: number
}
```

存储键：`pcards:cards` — `JSON.stringify(Card[])`

### 5.4 相机 vs 相册

两个独立 `<input type="file">`：

| 按钮 | 属性 | 行为 |
| --- | --- | --- |
| 拍照 | `capture="environment"` | 直接打开后置相机 |
| 从相册选择 | 无 `capture` | 打开系统相册 |

---

## 6. 部署流水线

```
push → actions/checkout → setup-node → npm ci → vite build
  → upload-pages-artifact → deploy-pages → 上线
```

- 工作流：`.github/workflows/deploy.yml`
- 触发条件：推送 `main` 分支，仅 `points-card-manager/**` 或 `.yml` 变更
- `BASE_URL` 自动注入为 `/<repo-name>/`
- 构建产出：~240KB JS + ~16KB CSS

---

## 7. Demo 边界

### 已实现
- 拍照或从相册上传条形码图片
- Canvas 压缩 + LocalStorage 存储
- 响应式卡片网格（2/3/4 列）
- 空态引导
- 全屏大图查看（纯图片，无文字）
- CI/CD 自动部署到 GitHub Pages

### 未实现（后续扩展点）
- 卡片删除/编辑 —— 加操作菜单 + 确认对话框
- 搜索/排序 —— 加搜索框或下拉排序
- PWA 离线支持 —— manifest.json + Service Worker
- 屏幕常亮 —— Screen Wake Lock API
- 图片 OCR 识别 —— 接入条形码解码库
- 数据导出导入 —— JSON 文件读写
- 多设备同步 —— WebDAV / iCloud
- 单元测试 —— Vitest + Testing Library

---

## 8. 本地开发

```bash
cd points-card-manager
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
npm run preview  # 预览构建产物
```

```bash
# 根目录验证脚本
python3 poc_verification.py
```

---

## 9. 线上地址

https://znbdev.github.io/POC-Repository-Template/
