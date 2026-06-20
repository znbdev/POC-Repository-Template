# Git 工作流

## 分支策略

```
main        ← 生产分支，只接受 PR merge
  └─ feat/*  ← 功能开发分支
  └─ fix/*   ← 修复分支
```

- `main`：保护分支，禁止直接推送
- `feat/<name>`：新功能开发
- `fix/<name>`：Bug 修复

Demo 阶段可直接推送 `main`。

## 提交信息格式

```
<type>(<scope>): <subject>
```

| type | 说明 |
| --- | --- |
| feat | 新功能 |
| fix | 修复 |
| refactor | 重构 |
| docs | 文档 |
| chore | 构建/配置 |

示例：

```
feat(UploadModal): 分离拍照和相册为两个按钮
fix(BarcodeViewer): 修复大图模式下文字遮挡
docs(ARCH): 更新技术选型说明
```

## 提交频率

- 每个逻辑变更一个提交（不要求细粒度）
- 不提交未编译通过的代码
