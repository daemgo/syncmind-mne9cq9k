import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Building2, User, Calendar, MessageSquare, TrendingUp } from "lucide-react";
import { Followup, Customer, Opportunity } from "@/types/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";

interface FollowupDetailProps {
  followup: Followup;
  customer: Customer;
  opportunity?: Opportunity;
  onEdit: () => void;
  onBack: () => void;
}

export function FollowupDetail({
  followup,
  customer,
  opportunity,
  onEdit,
  onBack,
}: FollowupDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">跟进记录详情</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                style={{
                  borderColor: `var(--${getDictColor("dict-followup-type", followup.type)})`,
                  color: `var(--${getDictColor("dict-followup-type", followup.type)})`,
                }}
              >
                {getDictLabel("dict-followup-type", followup.type)}
              </Badge>
              <span className="text-muted-foreground text-sm">
                {followup.followupAt}
              </span>
            </div>
          </div>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">跟进信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">跟进内容</div>
                <div className="mt-1 whitespace-pre-wrap">{followup.content}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">跟进人</div>
                <div>{followup.followupBy}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">跟进时间</div>
                <div>{followup.followupAt}</div>
              </div>
            </div>
            {followup.nextFollowupDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">下次跟进</div>
                  <div>{followup.nextFollowupDate}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">创建时间</div>
                <div>{followup.createdAt}</div>
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
    </div>
  );
}