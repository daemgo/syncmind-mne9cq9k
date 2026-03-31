import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CustomerDetail } from "@/components/customer/customer-detail";
import { CustomerFormDialog } from "@/components/customer/customer-form-dialog";
import { customers, getCustomerById, getOpportunitiesByCustomerId, getFollowupsByCustomerId } from "@/mock/crm";
import type { Customer } from "@/types/crm";

export const Route = createFileRoute("/customer/$id")({
  component: CustomerDetailPage,
});

function CustomerDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [formOpen, setFormOpen] = useState(false);

  const customer = useMemo(() => getCustomerById(id), [id]);
  const opportunities = useMemo(
    () => (customer ? getOpportunitiesByCustomerId(customer.id) : []),
    [customer]
  );
  const followups = useMemo(
    () => (customer ? getFollowupsByCustomerId(customer.id) : []),
    [customer]
  );

  const handleSave = (data: Partial<Customer>) => {
    console.log("Edit customer:", id, data);
    setFormOpen(false);
  };

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">客户不存在</h2>
          <p className="text-muted-foreground mt-2">
            未找到 ID 为 {id} 的客户
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <CustomerDetail
        customer={customer}
        opportunities={opportunities}
        followups={followups}
        onEdit={() => setFormOpen(true)}
        onBack={() => navigate({ to: "/customer" })}
      />

      <CustomerFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={customer}
        onSave={handleSave}
      />
    </div>
  );
}