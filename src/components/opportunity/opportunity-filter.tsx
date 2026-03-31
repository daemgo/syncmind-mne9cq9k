import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDictItems } from "@/lib/dict";

interface OpportunityFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  stage: string;
  onStageChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onAddClick: () => void;
}

export function OpportunityFilter({
  search,
  onSearchChange,
  stage,
  onStageChange,
  status,
  onStatusChange,
  onAddClick,
}: OpportunityFilterProps) {
  const stageItems = getDictItems("dict-opportunity-stage");

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索商机名称、客户名..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={stage} onValueChange={onStageChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="商机阶段" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部阶段</SelectItem>
          {stageItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="open">进行中</SelectItem>
          <SelectItem value="closed">已关闭</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        新建商机
      </Button>
    </div>
  );
}