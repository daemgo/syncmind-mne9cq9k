import { useState } from "react";
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
  TrendingUp,
  FileText,
} from "lucide-react";
import { Opportunity, Customer, Followup } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OpportunityDetailProps {
  opportunity: Opportunity;
  customer: Customer;
  followups: Followup[];
  onEdit: () => void;
  onBack: () => void;
}

export function OpportunityDetail({
  opportunity,
  customer,
  followups,
  onEdit,
  onBack,
}: OpportunityDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{opportunity.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-muted-foreground font-mono text-sm">
                {opportunity.code}
              </span>
              <Badge
                variant="outline"
                style={{
                  borderColor: `var(--${getDictColor("dict-opportunity-stage", opportunity.stage)})`,
                  color: `var(--${getDictColor("dict-opportunity-stage", opportunity.stage)})`,
                }}
              >
                {getDictLabel("dict-opportunity-stage", opportunity.stage)}
              </Badge>
              <Badge variant={opportunity.status === "open" ? "default" : "secondary"}>
                {opportunity.status === "open" ? "进行中" : "已关闭"}
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
          <TabsTrigger value="followups">
            跟进记录 ({followups.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">商机信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">商机金额</div>
                    <div className="text-lg font-semibold">
                      ¥{opportunity.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">预计成交日期</div>
                    <div>{opportunity.expectedCloseDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">当前阶段</div>
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: `var(--${getDictColor("dict-opportunity-stage", opportunity.stage)})`,
                        color: `var(--${getDictColor("dict-opportunity-stage", opportunity.stage)})`,
                      }}
                    >
                      {getDictLabel("dict-opportunity-stage", opportunity.stage)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">创建时间</div>
                    <div>{opportunity.createdAt}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">更新时间</div>
                    <div>{opportunity.updatedAt}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">关联客户</CardTitle>
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
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">所属行业</div>
                    <div>{customer.industry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
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
              </CardContent>
            </Card>
          </div>
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