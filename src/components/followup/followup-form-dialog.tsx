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
import { Textarea } from "@/components/ui/textarea";
import { Followup, FollowupType } from "@/types/crm";
import { getDictItems } from "@/lib/dict";
import { customers, opportunities } from "@/mock/crm";

interface FollowupFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Followup | null;
  onSave: (data: Partial<Followup>) => void;
}

const emptyForm: Partial<Followup> = {
  customerId: "",
  customerName: "",
  opportunityId: "",
  opportunityName: "",
  type: "call",
  content: "",
  followupBy: "",
  followupAt: "",
  nextFollowupDate: "",
};

export function FollowupFormDialog({
  open,
  onOpenChange,
  data,
  onSave,
}: FollowupFormDialogProps) {
  const [form, setForm] = useState<Partial<Followup>>(emptyForm);
  const isEdit = !!data;

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 16).replace("T", " ");
      setForm({ ...emptyForm, followupAt: dateStr });
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

  const typeItems = getDictItems("dict-followup-type");
  const customerOpportunities = opportunities.filter(
    (o) => o.customerId === form.customerId
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑跟进" : "新建跟进"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
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
                  <SelectItem value="">无</SelectItem>
                  {customerOpportunities.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">跟进方式 *</Label>
              <Select
                value={form.type || "call"}
                onValueChange={(value) =>
                  setForm({ ...form, type: value as FollowupType })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择方式" />
                </SelectTrigger>
                <SelectContent>
                  {typeItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="followupBy">跟进人 *</Label>
              <Input
                id="followupBy"
                value={form.followupBy || ""}
                onChange={(e) => setForm({ ...form, followupBy: e.target.value })}
                placeholder="请输入跟进人姓名"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="followupAt">跟进时间 *</Label>
              <Input
                id="followupAt"
                type="datetime-local"
                value={form.followupAt?.replace(" ", "T") || ""}
                onChange={(e) => {
                  const value = e.target.value.replace("T", " ");
                  setForm({ ...form, followupAt: value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextFollowupDate">下次跟进时间</Label>
              <Input
                id="nextFollowupDate"
                type="date"
                value={form.nextFollowupDate || ""}
                onChange={(e) =>
                  setForm({ ...form, nextFollowupDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">跟进内容 *</Label>
            <Textarea
              id="content"
              value={form.content || ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="请输入跟进内容..."
              rows={4}
            />
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