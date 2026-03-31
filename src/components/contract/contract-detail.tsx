import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Edit,
  Building2,
  Calendar,
  User,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Contract, Customer, Opportunity } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ContractDetailProps {
  contract: Contract;
  customer: Customer;
  opportunity?: Opportunity;
  onEdit: () => void;
  onBack: () => void;
}

export function ContractDetail({
  contract,
  customer,
  opportunity,
  onEdit,
  onBack,
}: ContractDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{contract.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-muted-foreground font-mono text-sm">
                {contract.code}
              </span>
              <Badge
                variant="outline"
                style={{
                  borderColor: `var(--${getDictColor("dict-contract-status", contract.status)})`,
                  color: `var(--${getDictColor("dict-contract-status", contract.status)})`,
                }}
              >
                {getDictLabel("dict-contract-status", contract.status)}
              </Badge>
            </div>
          </div>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">基本信息</TabsTrigger>
          <TabsTrigger value="related">关联信息</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">合同信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">合同金额</div>
                    <div className="text-lg font-semibold">
                      ¥{contract.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">签署日期</div>
                    <div>{contract.signedDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">开始日期</div>
                    <div>{contract.startDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">结束日期</div>
                    <div>{contract.endDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">当前状态</div>
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: `var(--${getDictColor("dict-contract-status", contract.status)})`,
                        color: `var(--${getDictColor("dict-contract-status", contract.status)})`,
                      }}
                    >
                      {getDictLabel("dict-contract-status", contract.status)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">创建时间</div>
                    <div>{contract.createdAt}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">更新时间</div>
                    <div>{contract.updatedAt}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">关联信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">客户名称</div>
                    <Link
                      to="/customer/$id"
                      params={{ id: customer.id }}
                      className="text-primary hover:underline"
                    >
                      {customer.name}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">联系人</div>
                    <div>{customer.contact}</div>
                  </div>
                </div>
                {opportunity && (
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">关联商机</div>
                      <Link
                        to="/opportunity/$id"
                        params={{ id: opportunity.id }}
                        className="text-primary hover:underline"
                      >
                        {opportunity.name}
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="related" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">客户信息</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>客户名称</TableHead>
                    <TableHead>联系人</TableHead>
                    <TableHead>电话</TableHead>
                    <TableHead>邮箱</TableHead>
                    <TableHead>行业</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Link
                        to="/customer/$id"
                        params={{ id: customer.id }}
                        className="hover:text-primary hover:underline"
                      >
                        {customer.name}
                      </Link>
                    </TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.industry}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: `var(--${getDictColor("dict-customer-status", customer.status)})`,
                          color: `var(--${getDictColor("dict-customer-status", customer.status)})`,
                        }}
                      >
                        {getDictLabel("dict-customer-status", customer.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}