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
import { Customer, CustomerStatus } from "@/types/crm";
import { getDictItems } from "@/lib/dict";

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Customer | null;
  onSave: (data: Partial<Customer>) => void;
}

const emptyForm: Partial<Customer> = {
  name: "",
  contact: "",
  phone: "",
  email: "",
  industry: "",
  status: "potential",
};

export function CustomerFormDialog({
  open,
  onOpenChange,
  data,
  onSave,
}: CustomerFormDialogProps) {
  const [form, setForm] = useState<Partial<Customer>>(emptyForm);
  const isEdit = !!data;

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm(emptyForm);
    }
  }, [data, open]);

  const handleSave = () => {
    onSave(form);
    onOpenChange(false);
  };

  const statusItems = getDictItems("dict-customer-status");
  const industryItems = getDictItems("dict-industry");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑客户" : "新建客户"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">客户名称 *</Label>
            <Input
              id="name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="请输入客户名称"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">联系人 *</Label>
            <Input
              id="contact"
              value={form.contact || ""}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder="请输入联系人姓名"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">联系电话 *</Label>
              <Input
                id="phone"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="138-xxxx-xxxx"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">电子邮箱</Label>
              <Input
                id="email"
                type="email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@company.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="industry">所属行业 *</Label>
              <Select
                value={form.industry || ""}
                onValueChange={(value) => setForm({ ...form, industry: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {industryItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">客户状态 *</Label>
              <Select
                value={form.status || "potential"}
                onValueChange={(value) =>
                  setForm({ ...form, status: value as CustomerStatus })
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
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>
            {isEdit ? "保存" : "创建"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}