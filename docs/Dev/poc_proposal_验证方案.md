# PoC 概念验证方案 — 积分卡管理

## 1. 验证目标

### 1.1 背景
验证 React 19 + TypeScript + Vite 6 + Tailwind CSS v4 技术栈在移动端积分卡管理场景下的可行性，重点验证纯前端图片存储和 GitHub Pages 自动部署流程。

### 1.2 验证目标
- 目标1: 实现条形码图片上传（拍照/相册）、Base64 压缩存储到 LocalStorage
- 目标2: 实现响应式卡片列表 + 全屏大图展示
- 目标3: 打通 GitHub Actions → GitHub Pages 自动部署流水线

### 1.3 成功标准
- [x] 标准1: 上传图片后正确显示在列表中，点击可全屏查看
- [x] 标准2: 手机 2 列 / 平板 3 列响应式布局正常
- [x] 标准3: 推送 main 分支后自动构建部署，页面可访问

## 2. 验证范围

### 2.1 包含内容
- React 19 + TypeScript 组件化开发
- React Router v7 SPA 路由
- Tailwind CSS v4 响应式布局
- Vite 6 构建
- LocalStorage 纯前端存储
- GitHub Actions CI/CD + GitHub Pages 部署

### 2.2 不包含内容
- 条形码 OCR 识别
- 后端服务、数据库
- PWA / 屏幕常亮
- 数据导出导入
- 卡片删除/编辑

## 3. 技术方案

### 3.1 技术选型
| 层面 | 方案 | 说明 |
| --- | --- | --- |
| 框架 | React 19 + TypeScript | 类型安全，生态成熟 |
| 路由 | React Router v7 | SPA 路由 |
| 样式 | Tailwind CSS v4 | 原子化 CSS，移动优先 |
| 构建 | Vite 6 | 毫秒级 HMR |
| 存储 | LocalStorage | 零服务器成本 |
| CI/CD | GitHub Actions | 自动构建部署到 Pages |

### 3.2 技术架构
```
[浏览器] → [Vite 构建] → [GitHub Actions] → [GitHub Pages]
                  ↕
          [LocalStorage]
```

### 3.3 关键技术点
1. **图片上传与压缩**: 使用 Canvas 将图片压缩至 800px 宽、JPEG 0.8 质量，转为 Base64 存储
2. **响应式网格**: Tailwind `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` 自适应
3. **CI/CD 流水线**: 推送 main 触发 Actions → npm ci → npm run build → upload artifact → deploy-pages

## 4. 实施计划

### 4.1 时间安排
| 阶段 | 时间 | 主要任务 | 交付物 |
|------|------|----------|--------|
| 准备 | Day 1 | 项目初始化、依赖安装、配置文件 | 可构建的项目骨架 |
| 开发 | Day 1 | 类型定义、useCards hook、所有组件 | 完整功能 Demo |
| 验证 | Day 1 | 构建验证、本地启动测试 | 构建通过 |
| 部署 | Day 1 | GitHub Actions 配置、Pages 启用、部署验证 | 线上可访问 |

### 4.2 资源需求
- 人员: 1 人
- 硬件: 本地开发机
- 软件: VSCode、Node.js 20、GitHub 账号

## 5. 风险评估

| 风险项 | 可能性 | 影响 | 缓解措施 |
|--------|--------|------|----------|
| LocalStorage 5MB 限额 | 低 | 中 | 图片压缩至 ~200KB/张 |
| GitHub Pages 首次配置 | 中 | 高 | 使用 gh CLI API 配置 |
| Base64 大图渲染性能 | 低 | 低 | 压缩后单图 < 200KB |

## 6. 验证方法

### 6.1 功能验证
- TC-001: 从相册选择图片，填写商户名/卡名，保存后出现在列表
- TC-002: 点击列表卡片，全屏展示条形码大图，点击关闭返回
- TC-003: 空态页面显示引导文字，添加卡片后消失

### 6.2 部署验证
- DP-001: 推送 main 分支后 Actions 自动执行
- DP-002: 构建产物正确上传并部署到 Pages
- DP-003: Pages URL 可正常访问，页面功能完整

## 7. 交付物

- [x] PoC 源代码（points-card-manager/）
- [x] GitHub Actions 工作流（.github/workflows/deploy.yml）
- [x] 一键部署脚本（deploy.sh）
- [x] 验证脚本（poc_verification.py）
- [x] 需求文档 / 部署记录 / 验证方案 / 验证报告

## 8. 决策标准

### 8.1 通过标准
所有成功标准均达成，且无重大技术障碍。

### 8.2 不通过标准
- 关键技术指标未达成
- 存在无法解决的技术问题

### 8.3 后续行动
- **通过**: 进入正式开发阶段
- **不通过**: 重新评估技术方案或调整需求

## 9. 附录

### 9.1 参考资料
- React 19: https://react.dev
- React Router v7: https://reactrouter.com
- Tailwind CSS v4: https://tailwindcss.com
- Vite 6: https://vitejs.dev
- GitHub Pages: https://pages.github.com

---

**文档版本**: 1.0
**创建日期**: 2026-06-20
