# 对话摘要

---
### 2026-03-31

**Skills**: N/A (直接生成代码)

**变更**:
- 创建 `/src/types/crm.ts` - CRM 全量类型定义
- 创建 `/src/mock/crm.ts` - Mock 数据（客户18条、商机16条、合同15条、跟进20条）
- 创建 `/src/lib/dict.ts` - 数据字典
- 创建 `/src/components/layout/sidebar.tsx` - 可折叠侧边导航
- 更新 `/src/routes/__root.tsx` - 注入 Sidebar + Outlet
- 创建 `/src/components/customer/*.tsx` - 客户管理全量组件
- 创建 `/src/components/opportunity/*.tsx` - 商机管理全量组件
- 创建 `/src/components/contract/*.tsx` - 合同管理全量组件
- 创建 `/src/components/followup/*.tsx` - 跟进记录全量组件
- 创建 `/src/routes/customer/*.tsx` - 客户路由（index + $id）
- 创建 `/src/routes/opportunity/*.tsx` - 商机路由
- 创建 `/src/routes/contract/*.tsx` - 合同路由
- 创建 `/src/routes/followup/*.tsx` - 跟进路由
- 更新 `/src/routes/index.tsx` - Dashboard 首页（含图表）
- 修复 mock 数据中 `followAt` -> `followupAt` 拼写错误
- 添加 `getOpportunityById` 缺失函数
- Build 验证通过

**待跟进**: 无