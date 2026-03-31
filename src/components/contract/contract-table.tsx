import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contract } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import { Edit, Trash2, Eye } from "lucide-react";

interface ContractTableProps {
  data: Contract[];
  onEdit: (contract: Contract) => void;
  onDelete: (contract: Contract) => void;
}

export function ContractTable({ data, onEdit, onDelete }: ContractTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>合同编号</TableHead>
          <TableHead>合同名称</TableHead>
          <TableHead>客户</TableHead>
          <TableHead>关联商机</TableHead>
          <TableHead>金额</TableHead>
          <TableHead>签署日期</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
              暂无数据
            </TableCell>
          </TableRow>
        ) : (
          data.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-mono text-sm">{contract.code}</TableCell>
              <TableCell className="font-medium">
                <Link
                  to="/contract/$id"
                  params={{ id: contract.id }}
                  className="hover:text-primary hover:underline"
                >
                  {contract.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to="/customer/$id"
                  params={{ id: contract.customerId }}
                  className="hover:text-primary hover:underline"
                >
                  {contract.customerName}
                </Link>
              </TableCell>
              <TableCell>
                {contract.opportunityId ? (
                  <Link
                    to="/opportunity/$id"
                    params={{ id: contract.opportunityId }}
                    className="hover:text-primary hover:underline"
                  >
                    {contract.opportunityName}
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                ¥{contract.amount.toLocaleString()}
              </TableCell>
              <TableCell>{contract.signedDate}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: `var(--${getDictColor("dict-contract-status", contract.status)})`,
                    color: `var(--${getDictColor("dict-contract-status", contract.status)})`,
                  }}
                >
                  {getDictLabel("dict-contract-status", contract.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/contract/$id" params={{ id: contract.id }}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(contract)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(contract)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}