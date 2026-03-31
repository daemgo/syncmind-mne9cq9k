// Global Data Dictionaries
import type {
  CustomerStatus,
  OpportunityStage,
  ContractStatus,
  FollowupType,
} from "@/types/crm";

export interface DictItem {
  label: string;
  value: string;
  color: string;
}

export const dictionaries = {
  "dict-customer-status": [
    { label: "潜在客户", value: "potential", color: "blue" },
    { label: "活跃客户", value: "active", color: "green" },
    { label: "沉默客户", value: "inactive", color: "gray" },
  ] as { label: string; value: CustomerStatus; color: string }[],

  "dict-opportunity-stage": [
    { label: "初步接触", value: "initial", color: "blue" },
    { label: "需求确认", value: "qualified", color: "violet" },
    { label: "方案报价", value: "proposal", color: "amber" },
    { label: "商务谈判", value: "negotiation", color: "orange" },
    { label: "成交", value: "won", color: "green" },
    { label: "失败", value: "lost", color: "red" },
  ] as { label: string; value: OpportunityStage; color: string }[],

  "dict-contract-status": [
    { label: "草稿", value: "draft", color: "gray" },
    { label: "待签署", value: "pending", color: "amber" },
    { label: "执行中", value: "active", color: "green" },
    { label: "已完成", value: "completed", color: "blue" },
    { label: "已终止", value: "terminated", color: "red" },
  ] as { label: string; value: ContractStatus; color: string }[],

  "dict-followup-type": [
    { label: "电话", value: "call", color: "blue" },
    { label: "邮件", value: "email", color: "violet" },
    { label: "拜访", value: "visit", color: "green" },
    { label: "会议", value: "meeting", color: "amber" },
  ] as { label: string; value: FollowupType; color: string }[],

  "dict-industry": [
    { label: "互联网", value: "互联网" },
    { label: "电子商务", value: "电子商务" },
    { label: "数据服务", value: "数据服务" },
    { label: "信息技术", value: "信息技术" },
    { label: "软件服务", value: "软件服务" },
    { label: "智能制造", value: "智能制造" },
    { label: "光电技术", value: "光电技术" },
    { label: "人工智能", value: "人工智能" },
    { label: "新材料", value: "新材料" },
  ] as { label: string; value: string }[],
} as const;

export type DictKey = keyof typeof dictionaries;

export function getDictItems(dictKey: DictKey) {
  return dictionaries[dictKey] as readonly { label: string; value: string; color?: string }[];
}

export function getDictLabel(dictKey: DictKey, value: string): string {
  const items = getDictItems(dictKey);
  const item = items.find((i) => i.value === value);
  return item?.label ?? value;
}

export function getDictColor(dictKey: DictKey, value: string): string {
  const items = getDictItems(dictKey);
  const item = items.find((i) => i.value === value);
  return item?.color ?? "gray";
}