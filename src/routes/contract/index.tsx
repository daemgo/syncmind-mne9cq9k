import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ContractFilter } from "@/components/contract/contract-filter";
import { ContractTable } from "@/components/contract/contract-table";
import { ContractFormDialog } from "@/components/contract/contract-form-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { contracts } from "@/mock/crm";
import type { Contract } from "@/types/crm";

export const Route = createFileRoute("/contract/")({
  component: ContractIndex,
});

const PAGE_SIZE = 10;

function ContractIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Contract | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredData = useMemo(() => {
    return contracts.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.includes(search) ||
        c.customerName.includes(search);
      const matchesStatus = status === "all" || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const handleAddClick = () => {
    setEditingContract(null);
    setFormOpen(true);
  };

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract);
    setFormOpen(true);
  };

  const handleDelete = (contract: Contract) => {
    setDeleteTarget(contract);
    setDeleteOpen(true);
  };

  const handleSave = (data: Partial<Contract>) => {
    if (editingContract) {
      console.log("Edit contract:", editingContract.id, data);
    } else {
      console.log("Create contract:", data);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log("Delete contract:", deleteTarget.id);
    }
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">合同管理</h1>
        <p className="text-muted-foreground mt-1">
          管理所有合同信息，共 {filteredData.length} 个合同
        </p>
      </div>

      <ContractFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onAddClick={handleAddClick}
      />

      <div className="border rounded-lg bg-card">
        <ContractTable
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

      <ContractFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={editingContract}
        onSave={handleSave}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除合同 "{deleteTarget?.name}" 吗？此操作无法撤销。
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