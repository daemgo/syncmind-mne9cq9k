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

interface FollowupFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  onAddClick: () => void;
}

export function FollowupFilter({
  search,
  onSearchChange,
  type,
  onTypeChange,
  onAddClick,
}: FollowupFilterProps) {
  const typeItems = getDictItems("dict-followup-type");

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索跟进内容、客户名..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="跟进方式" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部方式</SelectItem>
          {typeItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        新建跟进
      </Button>
    </div>
  );
}