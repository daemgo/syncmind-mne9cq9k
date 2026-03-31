import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OpportunityDetail } from "@/components/opportunity/opportunity-detail";
import { OpportunityFormDialog } from "@/components/opportunity/opportunity-form-dialog";
import { opportunities, getOpportunityById, getCustomerById, getFollowupsByOpportunityId } from "@/mock/crm";
import type { Opportunity } from "@/types/crm";

export const Route = createFileRoute("/opportunity/$id")({
  component: OpportunityDetailPage,
});

function OpportunityDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [formOpen, setFormOpen] = useState(false);

  const opportunity = useMemo(() => {
    const opp = opportunities.find((o) => o.id === id);
    return opp;
  }, [id]);

  const customer = useMemo(() => {
    if (!opportunity) return undefined;
    return getCustomerById(opportunity.customerId);
  }, [opportunity]);

  const followups = useMemo(() => {
    if (!opportunity) return [];
    return getFollowupsByOpportunityId(opportunity.id);
  }, [opportunity]);

  const handleSave = (data: Partial<Opportunity>) => {
    console.log("Edit opportunity:", id, data);
    setFormOpen(false);
  };

  if (!opportunity) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">商机不存在</h2>
          <p className="text-muted-foreground mt-2">
            未找到 ID 为 {id} 的商机
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">客户不存在</h2>
          <p className="text-muted-foreground mt-2">
            未找到关联的客户
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <OpportunityDetail
        opportunity={opportunity}
        customer={customer}
        followups={followups}
        onEdit={() => setFormOpen(true)}
        onBack={() => navigate({ to: "/opportunity" })}
      />

      <OpportunityFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={opportunity}
        onSave={handleSave}
      />
    </div>
  );
}