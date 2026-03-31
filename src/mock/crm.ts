// CRM Mock Data
import type {
  Customer,
  Opportunity,
  Contract,
  Followup,
} from "@/types/crm";

// Customers - 18 records
export const customers: Customer[] = [
  { id: "1", code: "CUS-2026001", name: "深圳市腾云科技有限公司", contact: "张伟", phone: "138-1234-5678", email: "zhangwei@tengyun.com", industry: "互联网", status: "active", createdAt: "2026-01-05", updatedAt: "2026-03-15" },
  { id: "2", code: "CUS-2026002", name: "广州智联网络有限公司", contact: "李娜", phone: "139-2345-6789", email: "lina@zhilianwl.com", industry: "电子商务", status: "active", createdAt: "2026-01-08", updatedAt: "2026-03-10" },
  { id: "3", code: "CUS-2026003", name: "北京华泰数据服务公司", contact: "王芳", phone: "136-3456-7890", email: "wangfang@huataidata.com", industry: "数据服务", status: "potential", createdAt: "2026-01-12", updatedAt: "2026-02-28" },
  { id: "4", code: "CUS-2026004", name: "上海鼎新信息科技公司", contact: "刘强", phone: "137-4567-8901", email: "liuqiang@dingxintech.com", industry: "信息技术", status: "active", createdAt: "2026-01-15", updatedAt: "2026-03-18" },
  { id: "5", code: "CUS-2026005", name: "杭州云创软件股份公司", contact: "陈静", phone: "135-5678-9012", email: "chenjing@yunchuangsoft.com", industry: "软件服务", status: "inactive", createdAt: "2025-12-20", updatedAt: "2026-01-30" },
  { id: "6", code: "CUS-2026006", name: "成都天府智能科技公司", contact: "赵磊", phone: "138-6789-0123", email: "zhaolei@tianfuzhineng.com", industry: "智能制造", status: "active", createdAt: "2026-02-01", updatedAt: "2026-03-20" },
  { id: "7", code: "CUS-2026007", name: "武汉光谷创新科技公司", contact: "孙燕", phone: "139-7890-1234", email: "sunyan@guangugc.com", industry: "光电技术", status: "potential", createdAt: "2026-02-05", updatedAt: "2026-03-01" },
  { id: "8", code: "CUS-2026008", name: "南京紫金山软件公司", contact: "周涛", phone: "136-8901-2345", email: "zhoutao@zijinshan.com", industry: "软件服务", status: "active", createdAt: "2026-02-08", updatedAt: "2026-03-12" },
  { id: "9", code: "CUS-2026009", name: "西安古都信息技术公司", contact: "吴婷", phone: "137-9012-3456", email: "wuting@guduinfo.com", industry: "信息技术", status: "inactive", createdAt: "2025-11-15", updatedAt: "2026-02-10" },
  { id: "10", code: "CUS-2026010", name: "苏州工业园区智能工业公司", contact: "郑鑫", phone: "135-0123-4567", email: "zhengxin@sip-smart.com", industry: "智能制造", status: "active", createdAt: "2026-02-15", updatedAt: "2026-03-22" },
  { id: "11", code: "CUS-2026011", name: "天津滨海新区数据公司", contact: "黄敏", phone: "138-1122-3344", email: "huangmin@tjbhdata.com", industry: "数据服务", status: "potential", createdAt: "2026-02-18", updatedAt: "2026-03-05" },
  { id: "12", code: "CUS-2026012", name: "重庆两江新区智能汽车公司", contact: "马超", phone: "139-2233-4455", email: "machao@cqljcar.com", industry: "智能制造", status: "active", createdAt: "2026-02-20", updatedAt: "2026-03-25" },
  { id: "13", code: "CUS-2026013", name: "青岛海尔数字科技公司", contact: "林青", phone: "136-3344-5566", email: "linqing@haierdigital.com", industry: "软件服务", status: "active", createdAt: "2026-02-22", updatedAt: "2026-03-28" },
  { id: "14", code: "CUS-2026014", name: "大连软件园信息技术公司", contact: "徐鹏", phone: "137-4455-6677", email: "xupeng@dlsoftpark.com", industry: "信息技术", status: "inactive", createdAt: "2025-10-10", updatedAt: "2026-01-15" },
  { id: "15", code: "CUS-2026015", name: "厦门自贸区跨境电商公司", contact: "方玲", phone: "135-5566-7788", email: "fangling@xmftz.com", industry: "电子商务", status: "potential", createdAt: "2026-03-01", updatedAt: "2026-03-20" },
  { id: "16", code: "CUS-2026016", name: "长沙高新区人工智能公司", contact: "余洋", phone: "138-6677-8899", email: "yuyang@csgxai.com", industry: "人工智能", status: "active", createdAt: "2026-03-05", updatedAt: "2026-03-28" },
  { id: "17", code: "CUS-2026017", name: "东莞松山湖智能装备公司", contact: "何欢", phone: "139-7788-9900", email: "hehuan@sslsmart.com", industry: "智能制造", status: "active", createdAt: "2026-03-08", updatedAt: "2026-03-26" },
  { id: "18", code: "CUS-2026018", name: "佛山禅城区新材料公司", contact: "梁文", phone: "136-8899-0011", email: "liangwen@fsmaterial.com", industry: "新材料", status: "potential", createdAt: "2026-03-10", updatedAt: "2026-03-22" },
];

// Opportunities - 16 records
export const opportunities: Opportunity[] = [
  { id: "1", code: "OPP-2026001", name: "企业数字化转型解决方案", customerId: "1", customerName: "深圳市腾云科技有限公司", amount: 580000, stage: "negotiation", expectedCloseDate: "2026-04-15", status: "open", createdAt: "2026-01-10", updatedAt: "2026-03-20" },
  { id: "2", code: "OPP-2026002", name: "电商平台升级项目", customerId: "2", customerName: "广州智联网络有限公司", amount: 320000, stage: "proposal", expectedCloseDate: "2026-04-30", status: "open", createdAt: "2026-01-15", updatedAt: "2026-03-18" },
  { id: "3", code: "OPP-2026003", name: "数据中台建设合同", customerId: "3", customerName: "北京华泰数据服务公司", amount: 850000, stage: "qualified", expectedCloseDate: "2026-05-20", status: "open", createdAt: "2026-02-01", updatedAt: "2026-03-10" },
  { id: "4", code: "OPP-2026004", name: "智能制造系统集成", customerId: "4", customerName: "上海鼎新信息科技公司", amount: 1200000, stage: "won", expectedCloseDate: "2026-03-15", status: "closed", createdAt: "2026-01-20", updatedAt: "2026-03-15" },
  { id: "5", code: "OPP-2026005", name: "云原生平台建设", customerId: "6", customerName: "成都天府智能科技公司", amount: 680000, stage: "initial", expectedCloseDate: "2026-06-30", status: "open", createdAt: "2026-02-10", updatedAt: "2026-03-12" },
  { id: "6", code: "OPP-2026006", name: "智慧园区解决方案", customerId: "7", customerName: "武汉光谷创新科技公司", amount: 450000, stage: "qualified", expectedCloseDate: "2026-05-15", status: "open", createdAt: "2026-02-15", updatedAt: "2026-03-08" },
  { id: "7", code: "OPP-2026007", name: "企业ERP系统实施", customerId: "8", customerName: "南京紫金山软件公司", amount: 380000, stage: "proposal", expectedCloseDate: "2026-05-30", status: "open", createdAt: "2026-02-18", updatedAt: "2026-03-15" },
  { id: "8", code: "OPP-2026008", name: "工业互联网平台", customerId: "10", customerName: "苏州工业园区智能工业公司", amount: 920000, stage: "negotiation", expectedCloseDate: "2026-04-20", status: "open", createdAt: "2026-02-20", updatedAt: "2026-03-22" },
  { id: "9", code: "OPP-2026009", name: "数据治理咨询项目", customerId: "11", customerName: "天津滨海新区数据公司", amount: 260000, stage: "initial", expectedCloseDate: "2026-07-15", status: "open", createdAt: "2026-02-25", updatedAt: "2026-03-05" },
  { id: "10", code: "OPP-2026010", name: "智能网联汽车平台", customerId: "12", customerName: "重庆两江新区智能汽车公司", amount: 1500000, stage: "won", expectedCloseDate: "2026-03-10", status: "closed", createdAt: "2026-01-25", updatedAt: "2026-03-10" },
  { id: "11", code: "OPP-2026011", name: "智能家居生态平台", customerId: "13", customerName: "青岛海尔数字科技公司", amount: 520000, stage: "proposal", expectedCloseDate: "2026-06-01", status: "open", createdAt: "2026-03-01", updatedAt: "2026-03-25" },
  { id: "12", code: "OPP-2026012", name: "跨境电商独立站建设", customerId: "15", customerName: "厦门自贸区跨境电商公司", amount: 180000, stage: "qualified", expectedCloseDate: "2026-05-10", status: "open", createdAt: "2026-03-05", updatedAt: "2026-03-20" },
  { id: "13", code: "OPP-2026013", name: "AI视觉检测系统", customerId: "16", customerName: "长沙高新区人工智能公司", amount: 750000, stage: "negotiation", expectedCloseDate: "2026-04-25", status: "open", createdAt: "2026-03-08", updatedAt: "2026-03-28" },
  { id: "14", code: "OPP-2026014", name: "智能仓储物流系统", customerId: "17", customerName: "东莞松山湖智能装备公司", amount: 620000, stage: "won", expectedCloseDate: "2026-03-28", status: "closed", createdAt: "2026-02-28", updatedAt: "2026-03-28" },
  { id: "15", code: "OPP-2026015", name: "新材料研发管理平台", customerId: "18", customerName: "佛山禅城区新材料公司", amount: 340000, stage: "lost", expectedCloseDate: "2026-03-20", status: "closed", createdAt: "2026-02-05", updatedAt: "2026-03-20" },
  { id: "16", code: "OPP-2026016", name: "企业协作办公平台", customerId: "1", customerName: "深圳市腾云科技有限公司", amount: 280000, stage: "won", expectedCloseDate: "2026-02-28", status: "closed", createdAt: "2026-01-05", updatedAt: "2026-02-28" },
];

// Contracts - 15 records
export const contracts: Contract[] = [
  { id: "1", code: "CON-2026001", name: "智能制造系统集成项目合同", customerId: "4", customerName: "上海鼎新信息科技公司", opportunityId: "4", opportunityName: "智能制造系统集成", amount: 1200000, signedDate: "2026-03-15", startDate: "2026-03-20", endDate: "2026-09-20", status: "active", createdAt: "2026-03-15", updatedAt: "2026-03-15" },
  { id: "2", code: "CON-2026002", name: "智能网联汽车平台开发合同", customerId: "12", customerName: "重庆两江新区智能汽车公司", opportunityId: "10", opportunityName: "智能网联汽车平台", amount: 1500000, signedDate: "2026-03-10", startDate: "2026-03-15", endDate: "2026-12-31", status: "active", createdAt: "2026-03-10", updatedAt: "2026-03-10" },
  { id: "3", code: "CON-2026003", name: "智能仓储物流系统合同", customerId: "17", customerName: "东莞松山湖智能装备公司", opportunityId: "14", opportunityName: "智能仓储物流系统", amount: 620000, signedDate: "2026-03-28", startDate: "2026-04-01", endDate: "2026-10-01", status: "pending", createdAt: "2026-03-28", updatedAt: "2026-03-28" },
  { id: "4", code: "CON-2026004", name: "企业协作办公平台合同", customerId: "1", customerName: "深圳市腾云科技有限公司", opportunityId: "16", opportunityName: "企业协作办公平台", amount: 280000, signedDate: "2026-02-28", startDate: "2026-03-01", endDate: "2026-08-31", status: "active", createdAt: "2026-02-28", updatedAt: "2026-02-28" },
  { id: "5", code: "CON-2026005", name: "电商平台年度运维合同", customerId: "2", customerName: "广州智联网络有限公司", amount: 180000, signedDate: "2026-01-20", startDate: "2026-02-01", endDate: "2027-01-31", status: "active", createdAt: "2026-01-20", updatedAt: "2026-01-20" },
  { id: "6", code: "CON-2026006", name: "数据中台规划咨询合同", customerId: "3", customerName: "北京华泰数据服务公司", amount: 150000, signedDate: "2025-12-15", startDate: "2025-12-20", endDate: "2026-03-20", status: "completed", createdAt: "2025-12-15", updatedAt: "2026-03-20" },
  { id: "7", code: "CON-2026007", name: "企业数字化转型战略合作框架", customerId: "1", customerName: "深圳市腾云科技有限公司", amount: 2000000, signedDate: "2026-01-10", startDate: "2026-01-15", endDate: "2026-12-31", status: "active", createdAt: "2026-01-10", updatedAt: "2026-01-10" },
  { id: "8", code: "CON-2026008", name: "智慧园区IOC平台合同", customerId: "10", customerName: "苏州工业园区智能工业公司", amount: 450000, signedDate: "2025-11-25", startDate: "2025-12-01", endDate: "2026-05-31", status: "active", createdAt: "2025-11-25", updatedAt: "2025-11-25" },
  { id: "9", code: "CON-2026009", name: "云原生技术培训合同", customerId: "6", customerName: "成都天府智能科技公司", amount: 85000, signedDate: "2026-02-15", startDate: "2026-02-20", endDate: "2026-04-20", status: "completed", createdAt: "2026-02-15", updatedAt: "2026-04-20" },
  { id: "10", code: "CON-2026010", name: "ERP系统实施服务合同", customerId: "8", customerName: "南京紫金山软件公司", amount: 380000, signedDate: "2026-01-05", startDate: "2026-01-10", endDate: "2026-07-10", status: "active", createdAt: "2026-01-05", updatedAt: "2026-01-05" },
  { id: "11", code: "CON-2026011", name: "AI算法优化服务合同", customerId: "16", customerName: "长沙高新区人工智能公司", amount: 220000, signedDate: "2026-02-28", startDate: "2026-03-05", endDate: "2026-08-05", status: "active", createdAt: "2026-02-28", updatedAt: "2026-02-28" },
  { id: "12", code: "CON-2026012", name: "工业互联网平台二期合同", customerId: "10", customerName: "苏州工业园区智能工业公司", amount: 680000, signedDate: "2025-10-20", startDate: "2025-11-01", endDate: "2026-04-30", status: "terminated", createdAt: "2025-10-20", updatedAt: "2026-03-01" },
  { id: "13", code: "CON-2026013", name: "智能家居标准版SaaS服务", customerId: "13", customerName: "青岛海尔数字科技公司", amount: 96000, signedDate: "2026-03-01", startDate: "2026-03-01", endDate: "2027-02-28", status: "draft", createdAt: "2026-03-01", updatedAt: "2026-03-01" },
  { id: "14", code: "CON-2026014", name: "跨境电商独立站技术服务", customerId: "15", customerName: "厦门自贸区跨境电商公司", amount: 120000, signedDate: "2026-03-15", startDate: "2026-03-20", endDate: "2026-09-20", status: "pending", createdAt: "2026-03-15", updatedAt: "2026-03-15" },
  { id: "15", code: "CON-2026015", name: "企业信息安全评估合同", customerId: "4", customerName: "上海鼎新信息科技公司", amount: 75000, signedDate: "2025-09-10", startDate: "2025-09-15", endDate: "2025-12-15", status: "completed", createdAt: "2025-09-10", updatedAt: "2025-12-15" },
];

// Follow-ups - 20 records
export const followups: Followup[] = [
  { id: "1", customerId: "1", customerName: "深圳市腾云科技有限公司", opportunityId: "1", opportunityName: "企业数字化转型解决方案", type: "meeting", content: "与张伟总及其技术团队进行数字化转型方案演示，重点展示了我们的大数据处理能力和行业成功案例。客户对方案非常感兴趣，要求提供详细报价。", followupBy: "李明", followupAt: "2026-03-20 14:00", nextFollowupDate: "2026-03-28", createdAt: "2026-03-20" },
  { id: "2", customerId: "2", customerName: "广州智联网络有限公司", type: "call", content: "电话沟通了电商平台升级项目的需求细节。李娜反馈现有系统主要问题是并发处理能力不足，希望新平台能支持双十一期间的流量峰值。", followupBy: "王芳", followupAt: "2026-03-18 10:30", nextFollowupDate: "2026-03-25", createdAt: "2026-03-18" },
  { id: "3", customerId: "3", customerName: "北京华泰数据服务公司", opportunityId: "3", opportunityName: "数据中台建设合同", type: "visit", content: "拜访王芳总，参观了其数据中心。客户目前使用多套独立系统，数据孤岛问题严重。希望我们能提供统一的数据中台解决方案。", followupBy: "张伟", followupAt: "2026-03-10 09:00", nextFollowupDate: "2026-03-20", createdAt: "2026-03-10" },
  { id: "4", customerId: "4", customerName: "上海鼎新信息科技公司", opportunityId: "4", opportunityName: "智能制造系统集成", type: "meeting", content: "签订智能制造系统集成项目合同。刘强总对项目交付时间表提出新要求，需要在6个月内完成全厂区部署。", followupBy: "李明", followupAt: "2026-03-15 15:00", createdAt: "2026-03-15" },
  { id: "5", customerId: "6", customerName: "成都天府智能科技公司", opportunityId: "5", opportunityName: "云原生平台建设", type: "email", content: "发送了云原生技术白皮书和案例资料。赵磊总回复说技术团队正在评估，下周安排线上交流。", followupBy: "王芳", followupAt: "2026-03-12 11:00", nextFollowupDate: "2026-03-19", createdAt: "2026-03-12" },
  { id: "6", customerId: "7", customerName: "武汉光谷创新科技公司", opportunityId: "6", opportunityName: "智慧园区解决方案", type: "call", content: "孙燕总电话中表示智慧园区项目已纳入公司年度重点工程，预算已经获批。希望尽快安排技术对接。", followupBy: "张伟", followupAt: "2026-03-08 16:00", nextFollowupDate: "2026-03-15", createdAt: "2026-03-08" },
  { id: "7", customerId: "8", customerName: "南京紫金山软件公司", opportunityId: "7", opportunityName: "企业ERP系统实施", type: "visit", content: "拜访周涛总，演示了ERP系统的核心功能。客户关注与现有SAP系统的集成问题，需要我方提供接口方案。", followupBy: "李明", followupAt: "2026-03-15 10:00", nextFollowupDate: "2026-03-22", createdAt: "2026-03-15" },
  { id: "8", customerId: "10", customerName: "苏州工业园区智能工业公司", opportunityId: "8", opportunityName: "工业互联网平台", type: "meeting", content: "在苏州工业园区展厅向郑鑫总及其团队演示了工业互联网平台能力。客户对实时监控大屏功能非常认可，进入商务谈判阶段。", followupBy: "王芳", followupAt: "2026-03-22 14:00", nextFollowupDate: "2026-04-01", createdAt: "2026-03-22" },
  { id: "9", customerId: "11", customerName: "天津滨海新区数据公司", opportunityId: "9", opportunityName: "数据治理咨询项目", type: "call", content: "和黄敏总进行了首次电话沟通，了解了客户当前数据治理的痛点。客户希望先做一次免费的数据评估。", followupBy: "张伟", followupAt: "2026-03-05 09:30", nextFollowupDate: "2026-03-12", createdAt: "2026-03-05" },
  { id: "10", customerId: "12", customerName: "重庆两江新区智能汽车公司", opportunityId: "10", opportunityName: "智能网联汽车平台", type: "meeting", content: "智能网联汽车平台项目正式签约。马超总对交付里程碑表示满意，希望保持每周项目同步。", followupBy: "李明", followupAt: "2026-03-10 11:00", createdAt: "2026-03-10" },
  { id: "11", customerId: "13", customerName: "青岛海尔数字科技公司", opportunityId: "11", opportunityName: "智能家居生态平台", type: "email", content: "发送了智能家居生态平台的产品介绍和定价方案。林青总回复说需要内部讨论后回复。", followupBy: "王芳", followupAt: "2026-03-25 15:00", nextFollowupDate: "2026-04-02", createdAt: "2026-03-25" },
  { id: "12", customerId: "15", customerName: "厦门自贸区跨境电商公司", opportunityId: "12", opportunityName: "跨境电商独立站建设", type: "visit", content: "拜访方玲总，了解了其跨境电商业务现状和独立站建设需求。客户目标是在6.18前上线。", followupBy: "张伟", followupAt: "2026-03-20 10:00", nextFollowupDate: "2026-03-27", createdAt: "2026-03-20" },
  { id: "13", customerId: "16", customerName: "长沙高新区人工智能公司", opportunityId: "13", opportunityName: "AI视觉检测系统", type: "meeting", content: "向余洋总及其研发团队演示了AI视觉检测系统。双方就技术指标进行了深入讨论，基本达成一致。", followupBy: "李明", followupAt: "2026-03-28 14:00", nextFollowupDate: "2026-04-05", createdAt: "2026-03-28" },
  { id: "14", customerId: "17", customerName: "东莞松山湖智能装备公司", opportunityId: "14", opportunityName: "智能仓储物流系统", type: "call", content: "何欢总电话确认智能仓储物流系统项目已验收，对我方交付质量表示满意，希望未来继续合作。", followupBy: "王芳", followupAt: "2026-03-28 16:00", createdAt: "2026-03-28" },
  { id: "15", customerId: "18", customerName: "佛山禅城区新材料公司", type: "visit", content: "初次拜访梁文总，介绍了公司整体解决方案能力。客户表示目前没有明确预算，但对我方的新材料研发管理平台有兴趣。", followupBy: "张伟", followupAt: "2026-03-22 09:00", nextFollowupDate: "2026-04-10", createdAt: "2026-03-22" },
  { id: "16", customerId: "1", customerName: "深圳市腾云科技有限公司", type: "call", content: "电话回访张伟总，询问数字化转型项目进展。客户表示技术团队正在做选型对比，希望我方能提供更详细的案例数据。", followupBy: "李明", followupAt: "2026-03-28 10:00", nextFollowupDate: "2026-04-05", createdAt: "2026-03-28" },
  { id: "17", customerId: "5", customerName: "杭州云创软件股份公司", type: "email", content: "发送了公司最新产品介绍。陈静总一直没有回复，考虑安排电话沟通了解原因。", followupBy: "王芳", followupAt: "2026-03-01 11:00", nextFollowupDate: "2026-03-15", createdAt: "2026-03-01" },
  { id: "18", customerId: "9", customerName: "西安古都信息技术公司", type: "call", content: "电话联系吴婷总，了解到公司近期在重组，客户关系需要重新建立。表示等公司稳定后会考虑合作。", followupBy: "张伟", followupAt: "2026-02-10 14:00", createdAt: "2026-02-10" },
  { id: "19", customerId: "14", customerName: "大连软件园信息技术公司", type: "visit", content: "拜访徐鹏总，发现公司已搬迁至新地址。客户表示目前项目暂停，等政策明朗后再联系。", followupBy: "李明", followupAt: "2026-01-15 10:00", createdAt: "2026-01-15" },
  { id: "20", customerId: "2", customerName: "广州智联网络有限公司", type: "meeting", content: "参加广州智联网络有限公司年会，与李娜总进行了简短交流。客户表示对电商平台升级项目有紧迫需求。", followupBy: "王芳", followupAt: "2026-03-05 18:00", nextFollowupDate: "2026-03-12", createdAt: "2026-03-05" },
];

// Helper functions to get related data
export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return opportunities.find((o) => o.id === id);
}

export function getOpportunitiesByCustomerId(customerId: string): Opportunity[] {
  return opportunities.filter((o) => o.customerId === customerId);
}

export function getFollowupsByCustomerId(customerId: string): Followup[] {
  return followups.filter((f) => f.customerId === customerId);
}

export function getFollowupsByOpportunityId(opportunityId: string): Followup[] {
  return followups.filter((f) => f.opportunityId === opportunityId);
}

export function getContractsByCustomerId(customerId: string): Contract[] {
  return contracts.filter((c) => c.customerId === customerId);
}

export function getContractByOpportunityId(opportunityId: string): Contract | undefined {
  return contracts.find((c) => c.opportunityId === opportunityId);
}