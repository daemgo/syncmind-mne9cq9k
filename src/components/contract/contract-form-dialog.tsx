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
import { Contract, ContractStatus } from "@/types/crm";
import { getDictItems } from "@/lib/dict";
import { customers, opportunities } from "@/mock/crm";

interface ContractFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Contract | null;
  onSave: (data: Partial<Contract>) => void;
}

const emptyForm: Partial<Contract> = {
  name: "",
  customerId: "",
  customerName: "",
  opportunityId: "",
  opportunityName: "",
  amount: 0,
  signedDate: "",
  startDate: "",
  endDate: "",
  status: "draft",
};

export function ContractFormDialog({
  open,
  onOpenChange,
  data,
  onSave,
}: ContractFormDialogProps) {
  const [form, setForm] = useState<Partial<Contract>>(emptyForm);
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
    const selectedOpp = opportunities.find((o) => o.id === form.opportunityId);
    if (selectedOpp) {
      form.opportunityName = selectedOpp.name;
    }
    onSave(form);
    onOpenChange(false);
  };

  const statusItems = getDictItems("dict-contract-status");
  const customerOpportunities = opportunities.filter(
    (o) => o.customerId === form.customerId && o.status === "won"
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑合同" : "新建合同"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">合同名称 *</Label>
            <Input
              id="name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="请输入合同名称"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerId">关联客户 *</Label>
            <Select
              value={form.customerId || ""}
              onValueChange={(value) => {
                setForm({ ...form, customerId: value, opportunityId: "" });
              }}
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
          <div className="grid gap-2">
            <Label htmlFor="opportunityId">关联商机</Label>
            <Select
              value={form.opportunityId || ""}
              onValueChange={(value) => setForm({ ...form, opportunityId: value })}
              disabled={!form.customerId}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择商机（可选）" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">无</SelectItem>
                {customerOpportunities.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">合同金额 *</Label>
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
              <Label htmlFor="status">合同状态 *</Label>
              <Select
                value={form.status || "draft"}
                onValueChange={(value) =>
                  setForm({ ...form, status: value as ContractStatus })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择状态" />
                </SelectTrigger>
                <SelectContent>
                  {statusItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="signedDate">签署日期 *</Label>
              <Input
                id="signedDate"
                type="date"
                value={form.signedDate || ""}
                onChange={(e) => setForm({ ...form, signedDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">开始日期 *</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate || ""}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">结束日期 *</Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate || ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
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