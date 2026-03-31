import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FollowupFilter } from "@/components/followup/followup-filter";
import { FollowupTable } from "@/components/followup/followup-table";
import { FollowupFormDialog } from "@/components/followup/followup-form-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { followups } from "@/mock/crm";
import type { Followup } from "@/types/crm";

export const Route = createFileRoute("/followup/")({
  component: FollowupIndex,
});

const PAGE_SIZE = 10;

function FollowupIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingFollowup, setEditingFollowup] = useState<Followup | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Followup | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredData = useMemo(() => {
    return followups.filter((f) => {
      const matchesSearch =
        search === "" ||
        f.content.includes(search) ||
        f.customerName.includes(search);
      const matchesType = type === "all" || f.type === type;
      return matchesSearch && matchesType;
    });
  }, [search, type]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const handleAddClick = () => {
    setEditingFollowup(null);
    setFormOpen(true);
  };

  const handleEdit = (followup: Followup) => {
    setEditingFollowup(followup);
    setFormOpen(true);
  };

  const handleDelete = (followup: Followup) => {
    setDeleteTarget(followup);
    setDeleteOpen(true);
  };

  const handleSave = (data: Partial<Followup>) => {
    if (editingFollowup) {
      console.log("Edit followup:", editingFollowup.id, data);
    } else {
      console.log("Create followup:", data);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log("Delete followup:", deleteTarget.id);
    }
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">跟进记录</h1>
        <p className="text-muted-foreground mt-1">
          管理所有跟进记录，共 {filteredData.length} 条记录
        </p>
      </div>

      <FollowupFilter
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        onAddClick={handleAddClick}
      />

      <div className="border rounded-lg bg-card">
        <FollowupTable
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

      <FollowupFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        data={editingFollowup}
        onSave={handleSave}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这条跟进记录吗？此操作无法撤销。
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