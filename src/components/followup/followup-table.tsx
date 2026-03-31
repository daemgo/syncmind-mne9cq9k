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
import { Followup } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import { Edit, Trash2, Eye } from "lucide-react";

interface FollowupTableProps {
  data: Followup[];
  onEdit: (followup: Followup) => void;
  onDelete: (followup: Followup) => void;
}

export function FollowupTable({ data, onEdit, onDelete }: FollowupTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>关联客户</TableHead>
          <TableHead>关联商机</TableHead>
          <TableHead>跟进方式</TableHead>
          <TableHead>跟进内容</TableHead>
          <TableHead>跟进人</TableHead>
          <TableHead>跟进时间</TableHead>
          <TableHead>下次跟进</TableHead>
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
          data.map((fu) => (
            <TableRow key={fu.id}>
              <TableCell>
                <Link
                  to="/customer/$id"
                  params={{ id: fu.customerId }}
                  className="hover:text-primary hover:underline"
                >
                  {fu.customerName}
                </Link>
              </TableCell>
              <TableCell>
                {fu.opportunityId ? (
                  <Link
                    to="/opportunity/$id"
                    params={{ id: fu.opportunityId }}
                    className="hover:text-primary hover:underline"
                  >
                    {fu.opportunityName}
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: `var(--${getDictColor("dict-followup-type", fu.type)})`,
                    color: `var(--${getDictColor("dict-followup-type", fu.type)})`,
                  }}
                >
                  {getDictLabel("dict-followup-type", fu.type)}
                </Badge>
              </TableCell>
              <TableCell className="max-w-md truncate">{fu.content}</TableCell>
              <TableCell>{fu.followupBy}</TableCell>
              <TableCell>{fu.followupAt}</TableCell>
              <TableCell>{fu.nextFollowupDate || "-"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/followup/$id" params={{ id: fu.id }}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(fu)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(fu)}
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