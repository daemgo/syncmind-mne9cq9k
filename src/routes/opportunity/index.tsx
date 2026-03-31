import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OpportunityFilter } from "@/components/opportunity/opportunity-filter";
import { OpportunityTable } from "@/components/opportunity/opportunity-table";
import { OpportunityFormDialog } from "@/components/opportunity/opportunity-form-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { opportunities } from "@/mock/crm";
import type { Opportunity } from "@/types/crm";

export const Route = createFileRoute("/opportunity/")({
  component: OpportunityIndex,
});

const PAGE_SIZE = 10;

function OpportunityIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("all");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Opportunity | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredData = useMemo(() => {
    return opportunities.filter((o) => {
      const matchesSearch =
        search === "" ||
        o.name.includes(search) ||
        o.customerName.includes(search);
      const matchesStage = stage === "all" || o.stage === stage;
      const matchesStatus = status === "all" || o.status === status;
      return matchesSearch && matchesStage && matchesStatus;
    });
  }, [search, stage, status]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const handleAddClick = () => {
    setEditingOpportunity(null);
    setFormOpen(true);
  };

  const handleEdit = (opp: Opportunity) => {
    setEditingOpportunity(opp);
    setFormOpen(true);
  };

  const handleDelete = (opp: Opportunity) => {
    setDeleteTarget(opp);
    setDeleteOpen(true);
  };

  const handleSave = (data: Partial<Opportunity>) => {
    if (editingOpportunity) {
      console.log("Edit opportunity:", editingOpportunity.id, data);
    } else {
      console.log("Create opportunity:", data);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log("Delete opportunity:", deleteTarget.id);
    }
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">商机管理</h1>
        <p className="text-muted-foreground mt-1">
          管理所有商机信息，共 {filteredData.length} 个商机
        </p>
      </div>

      <OpportunityFilter
        search={search}
        onSearchChange={setSearch}
        stage={stage}
        onStageChange={setStage}
        status={status}
        onStatusChange={setStatus}
        onAddClick={handleAddClick}
      />

      <div className="border rounded-lg bg-card">
        <OpportunityTable
          data={paginatedData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              <PaginationItem className="px-4">
                第 {currentPage} / {totalPages} 页
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <OpportunityFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={editingOpportunity}
        onSave={handleSave}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除商机 "{deleteTarget?.name}" 吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}