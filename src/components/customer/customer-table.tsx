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
import { Customer } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import { Edit, Trash2, Eye } from "lucide-react";

interface CustomerTableProps {
  data: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerTable({ data, onEdit, onDelete }: CustomerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>客户编号</TableHead>
          <TableHead>客户名称</TableHead>
          <TableHead>联系人</TableHead>
          <TableHead>联系方式</TableHead>
          <TableHead>行业</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>创建时间</TableHead>
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
          data.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-mono text-sm">{customer.code}</TableCell>
              <TableCell className="font-medium">
                <Link
                  to="/customer/$id"
                  params={{ id: customer.id }}
                  className="hover:text-primary hover:underline"
                >
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell>{customer.contact}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{customer.phone}</div>
                  <div className="text-muted-foreground">{customer.email}</div>
                </div>
              </TableCell>
              <TableCell>{customer.industry}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`border-${getDictColor("dict-customer-status", customer.status)}/30 text-${getDictColor("dict-customer-status", customer.status)}`}
                  style={{
                    borderColor: `var(--${getDictColor("dict-customer-status", customer.status)})`,
                    color: `var(--${getDictColor("dict-customer-status", customer.status)})`,
                  }}
                >
                  {getDictLabel("dict-customer-status", customer.status)}
                </Badge>
              </TableCell>
              <TableCell>{customer.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/customer/$id" params={{ id: customer.id }}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(customer)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(customer)}
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