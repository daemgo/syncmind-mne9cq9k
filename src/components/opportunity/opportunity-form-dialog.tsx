import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Opportunity, OpportunityStage } from "@/types/crm";
import { getDictItems } from "@/lib/dict";
import { customers } from "@/mock/crm";

interface OpportunityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Opportunity | null;
  onSave: (data: Partial<Opportunity>) => void;
}

const emptyForm: Partial<Opportunity> = {
  name: "",
  customerId: "",
  customerName: "",
  amount: 0,
  stage: "initial",
  expectedCloseDate: "",
  status: "open",
};

export function OpportunityFormDialog({
  open,
  onOpenChange,
  data,
  onSave,
}: OpportunityFormDialogProps) {
  const [form, setForm] = useState<Partial<Opportunity>>(emptyForm);
  const isEdit = !!data;

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm(emptyForm);
    }
  }, [data, open]);

  const handleSave = () => {
    const selectedCustomer = customers.find((c) => c.id === form.customerId);
    if (selectedCustomer) {
      form.customerName = selectedCustomer.name;
    }
    onSave(form);
    onOpenChange(false);
  };

  const stageItems = getDictItems("dict-opportunity-stage");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑商机" : "新建商机"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">商机名称 *</Label>
            <Input
              id="name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="请输入商机名称"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerId">关联客户 *</Label>
            <Select
              value={form.customerId || ""}
              onValueChange={(value) => setForm({ ...form, customerId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择客户" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">商机金额 *</Label>
              <Input
                id="amount"
                type="number"
                value={form.amount || ""}
                onChange={(e) =>
                  setForm({ ...form, amount: parseFloat(e.target.value) || 0 })
                }
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stage">商机阶段 *</Label>
              <Select
                value={form.stage || "initial"}
                onValueChange={(value) =>
                  setForm({ ...form, stage: value as OpportunityStage })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择阶段" />
                </SelectTrigger>
                <SelectContent>
                  {stageItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expectedCloseDate">预计成交日期 *</Label>
              <Input
                id="expectedCloseDate"
                type="date"
                value={form.expectedCloseDate || ""}
                onChange={(e) =>
                  setForm({ ...form, expectedCloseDate: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">状态 *</Label>
              <Select
                value={form.status || "open"}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    status: value as "open" | "closed",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">进行中</SelectItem>
                  <SelectItem value="closed">已关闭</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>{isEdit ? "保存" : "创建"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}