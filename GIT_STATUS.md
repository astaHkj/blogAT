# Git 状态报告

## 仓库位置
- 路径: /Users/huangkaijie/Documents/sideProject/blogAT
- 分支: main
- 远程: origin/main

## 暂存文件统计
- 总计: 76 个文件
- 新增: client/ (25 文件), server/ (19 文件), docker-compose.yml
- 修改: README.md, package.json, .gitignore
- 删除: 28 个旧 Astro 文件

## 主要变更
### 新增 ✨
- server/src/index.ts - Express API 入口
- server/src/routes/auth.ts - 认证路由
- server/src/routes/posts.ts - 文章路由
- server/src/routes/comments.ts - 评论路由
- server/src/middlewares/auth.ts - JWT 中间件
- server/src/models/*.ts - 数据模型
- client/pages/*.vue - Nuxt 页面
- client/components/*.vue - Vue 组件
- client/composables/useApi.ts - API 封装
- client/stores/user.ts - Pinia 状态管理

### 删除 🗑️
- astro.config.mjs
- src/pages/*.astro
- src/components/*.astro
- src/content/blog/*.md

### 修改 📝
- package.json - 添加并发启动脚本
- README.md - 更新项目文档
- .gitignore - 更新忽略规则

## 提交命令
```bash
git commit -m "refactor: migrate from Astro to Nuxt 3 + Express full-stack"
git push origin main
```
