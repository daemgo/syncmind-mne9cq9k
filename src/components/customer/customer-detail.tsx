import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Building2, Phone, Mail, Calendar, User } from "lucide-react";
import { Customer, Opportunity, Followup } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import { cn } from "@/lib/utils";

interface CustomerDetailProps {
  customer: Customer;
  opportunities: Opportunity[];
  followups: Followup[];
  onEdit: () => void;
  onBack: () => void;
}

export function CustomerDetail({
  customer,
  opportunities,
  followups,
  onEdit,
  onBack,
}: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{customer.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-muted-foreground font-mono text-sm">
                {customer.code}
              </span>
              <Badge
                variant="outline"
                style={{
                  borderColor: `var(--${getDictColor("dict-customer-status", customer.status)})`,
                  color: `var(--${getDictColor("dict-customer-status", customer.status)})`,
                }}
              >
                {getDictLabel("dict-customer-status", customer.status)}
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
          <TabsTrigger value="opportunities">
            商机 ({opportunities.length})
          </TabsTrigger>
          <TabsTrigger value="followups">
            跟进记录 ({followups.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">所属行业</div>
                    <div>{customer.industry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">创建时间</div>
                    <div>{customer.createdAt}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">更新时间</div>
                    <div>{customer.updatedAt}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">联系信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">联系人</div>
                    <div>{customer.contact}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">联系电话</div>
                    <div>{customer.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">电子邮箱</div>
                    <div>{customer.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="opportunities" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {opportunities.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  暂无商机记录
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商机编号</TableHead>
                      <TableHead>商机名称</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>阶段</TableHead>
                      <TableHead>预计成交日期</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opp) => (
                      <TableRow key={opp.id}>
                        <TableCell className="font-mono text-sm">
                          {opp.code}
                        </TableCell>
                        <TableCell>
                          <Link
                            to="/opportunity/$id"
                            params={{ id: opp.id }}
                            className="hover:text-primary hover:underline"
                          >
                            {opp.name}
                          </Link>
                        </TableCell>
                        <TableCell>¥{opp.amount.toLocaleString()}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="followups" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {followups.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  暂无跟进记录
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>跟进方式</TableHead>
                      <TableHead>跟进内容</TableHead>
                      <TableHead>跟进人</TableHead>
                      <TableHead>跟进时间</TableHead>
                      <TableHead>下次跟进</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {followups.map((fu) => (
                      <TableRow key={fu.id}>
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
                        <TableCell className="max-w-md truncate">
                          {fu.content}
                        </TableCell>
                        <TableCell>{fu.followupBy}</TableCell>
                        <TableCell>{fu.followupAt}</TableCell>
                        <TableCell>{fu.nextFollowupDate || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import Table components at the end to avoid circular issues
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";