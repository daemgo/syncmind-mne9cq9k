import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FollowupDetail } from "@/components/followup/followup-detail";
import { FollowupFormDialog } from "@/components/followup/followup-form-dialog";
import { followups, getCustomerById, getOpportunityById } from "@/mock/crm";
import type { Followup } from "@/types/crm";

export const Route = createFileRoute("/followup/$id")({
  component: FollowupDetailPage,
});

function FollowupDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [formOpen, setFormOpen] = useState(false);

  const followup = useMemo(() => {
    return followups.find((f) => f.id === id);
  }, [id]);

  const customer = useMemo(() => {
    if (!followup) return undefined;
    return getCustomerById(followup.customerId);
  }, [followup]);

  const opportunity = useMemo(() => {
    if (!followup || !followup.opportunityId) return undefined;
    return getOpportunityById(followup.opportunityId);
  }, [followup]);

  const handleSave = (data: Partial<Followup>) => {
    console.log("Edit followup:", id, data);
    setFormOpen(false);
  };

  if (!followup) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">跟进记录不存在</h2>
          <p className="text-muted-foreground mt-2">
            未找到 ID 为 {id} 的跟进记录
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
      <FollowupDetail
        followup={followup}
        customer={customer}
        opportunity={opportunity}
        onEdit={() => setFormOpen(true)}
        onBack={() => navigate({ to: "/followup" })}
      />

      <FollowupFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={followup}
        onSave={handleSave}
      />
    </div>
  );
}