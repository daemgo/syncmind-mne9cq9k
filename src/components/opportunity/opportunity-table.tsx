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
import { Opportunity } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import { Edit, Trash2, Eye } from "lucide-react";

interface OpportunityTableProps {
  data: Opportunity[];
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (opportunity: Opportunity) => void;
}

export function OpportunityTable({
  data,
  onEdit,
  onDelete,
}: OpportunityTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>商机编号</TableHead>
          <TableHead>商机名称</TableHead>
          <TableHead>客户</TableHead>
          <TableHead>金额</TableHead>
          <TableHead>阶段</TableHead>
          <TableHead>预计成交日期</TableHead>
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
          data.map((opp) => (
            <TableRow key={opp.id}>
              <TableCell className="font-mono text-sm">{opp.code}</TableCell>
              <TableCell className="font-medium">
                <Link
                  to="/opportunity/$id"
                  params={{ id: opp.id }}
                  className="hover:text-primary hover:underline"
                >
                  {opp.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to="/customer/$id"
                  params={{ id: opp.customerId }}
                  className="hover:text-primary hover:underline"
                >
                  {opp.customerName}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                ¥{opp.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: `var(--${getDictColor("dict-opportunity-stage", opp.stage)})`,
                    color: `var(--${getDictColor("dict-opportunity-stage", opp.stage)})`,
                  }}
                >
                  {getDictLabel("dict-opportunity-stage", opp.stage)}
                </Badge>
              </TableCell>
              <TableCell>{opp.expectedCloseDate}</TableCell>
              <TableCell>
                <Badge variant={opp.status === "open" ? "default" : "secondary"}>
                  {opp.status === "open" ? "进行中" : "已关闭"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/opportunity/$id" params={{ id: opp.id }}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(opp)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(opp)}
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