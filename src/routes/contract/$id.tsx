import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ContractDetail } from "@/components/contract/contract-detail";
import { ContractFormDialog } from "@/components/contract/contract-form-dialog";
import { contracts, getCustomerById, getOpportunityById } from "@/mock/crm";
import type { Contract } from "@/types/crm";

export const Route = createFileRoute("/contract/$id")({
  component: ContractDetailPage,
});

function ContractDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [formOpen, setFormOpen] = useState(false);

  const contract = useMemo(() => {
    return contracts.find((c) => c.id === id);
  }, [id]);

  const customer = useMemo(() => {
    if (!contract) return undefined;
    return getCustomerById(contract.customerId);
  }, [contract]);

  const opportunity = useMemo(() => {
    if (!contract || !contract.opportunityId) return undefined;
    return getOpportunityById(contract.opportunityId);
  }, [contract]);

  const handleSave = (data: Partial<Contract>) => {
    console.log("Edit contract:", id, data);
    setFormOpen(false);
  };

  if (!contract) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">合同不存在</h2>
          <p className="text-muted-foreground mt-2">
            未找到 ID 为 {id} 的合同
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
      <ContractDetail
        contract={contract}
        customer={customer}
        opportunity={opportunity}
        onEdit={() => setFormOpen(true)}
        onBack={() => navigate({ to: "/contract" })}
      />

      <ContractFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={contract}
        onSave={handleSave}
      />
    </div>
  );
}