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

interface CustomerFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  industry: string;
  onIndustryChange: (value: string) => void;
  onAddClick: () => void;
}

export function CustomerFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  industry,
  onIndustryChange,
  onAddClick,
}: CustomerFilterProps) {
  const statusItems = getDictItems("dict-customer-status");
  const industryItems = getDictItems("dict-industry");

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户名称、联系人..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="客户状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部状态</SelectItem>
          {statusItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={industry} onValueChange={onIndustryChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="所属行业" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部行业</SelectItem>
          {industryItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        新建客户
      </Button>
    </div>
  );
}