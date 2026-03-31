import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { CustomerFilter } from "@/components/customer/customer-filter";
import { CustomerTable } from "@/components/customer/customer-table";
import { CustomerFormDialog } from "@/components/customer/customer-form-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { customers } from "@/mock/crm";
import type { Customer } from "@/types/crm";

export const Route = createFileRoute("/customer/")({
  component: CustomerIndex,
});

const PAGE_SIZE = 10;

function CustomerIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredData = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.includes(search) ||
        c.contact.includes(search);
      const matchesStatus = status === "all" || c.status === status;
      const matchesIndustry = industry === "all" || c.industry === industry;
      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [search, status, industry]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const handleAddClick = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setDeleteTarget(customer);
    setDeleteOpen(true);
  };

  const handleSave = (data: Partial<Customer>) => {
    if (editingCustomer) {
      // Edit existing - in real app would update state
      console.log("Edit customer:", editingCustomer.id, data);
    } else {
      // Create new - in real app would add to state
      console.log("Create customer:", data);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log("Delete customer:", deleteTarget.id);
    }
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">客户管理</h1>
        <p className="text-muted-foreground mt-1">
          管理所有客户信息，共 {filteredData.length} 个客户
        </p>
      </div>

      <CustomerFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        industry={industry}
        onIndustryChange={setIndustry}
        onAddClick={handleAddClick}
      />

      <div className="border rounded-lg bg-card">
        <CustomerTable
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

      <CustomerFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={editingCustomer}
        onSave={handleSave}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除客户 "{deleteTarget?.name}" 吗？此操作无法撤销。
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