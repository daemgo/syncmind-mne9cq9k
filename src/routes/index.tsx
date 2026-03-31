import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { customers, opportunities, contracts, followups } from "@/mock/crm";
import { getDictLabel, getDictColor } from "@/lib/dict";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  TrendingUp,
  FileText,
  UserPlus,
  ArrowRight,
} from "lucide-react";

// Calculate stats
const totalCustomers = customers.length;
const totalOpportunities = opportunities.length;
const totalContracts = contracts.length;
const newCustomersThisMonth = customers.filter((c) => {
  const created = new Date(c.createdAt);
  const now = new Date();
  return (
    created.getMonth() === now.getMonth() &&
    created.getFullYear() === now.getFullYear()
  );
}).length;

// Opportunity stages for funnel
const stageData = [
  { stage: "初步接触", value: opportunities.filter((o) => o.stage === "initial").length, color: "var(--chart-1)" },
  { stage: "需求确认", value: opportunities.filter((o) => o.stage === "qualified").length, color: "var(--chart-3)" },
  { stage: "方案报价", value: opportunities.filter((o) => o.stage === "proposal").length, color: "var(--chart-2)" },
  { stage: "商务谈判", value: opportunities.filter((o) => o.stage === "negotiation").length, color: "var(--chart-5)" },
  { stage: "成交", value: opportunities.filter((o) => o.stage === "won").length, color: "var(--chart-4)" },
];

// Monthly revenue data (mock)
const monthlyRevenue = [
  { month: "10月", revenue: 320000 },
  { month: "11月", revenue: 480000 },
  { month: "12月", revenue: 520000 },
  { month: "1月", revenue: 380000 },
  { month: "2月", revenue: 680000 },
  { month: "3月", revenue: 850000 },
];

// Recent followups
const recentFollowups = followups.slice(0, 5);

// Recent opportunities
const recentOpportunities = opportunities
  .filter((o) => o.status === "open")
  .slice(0, 5);

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  stage: {
    label: "Stage",
  },
};

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          欢迎回来！以下是您的销售数据概览。
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">客户总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              本月新增 {newCustomersThisMonth}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">商机总数</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpportunities}</div>
            <p className="text-xs text-muted-foreground">
              进行中 {opportunities.filter((o) => o.status === "open").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">合同总数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContracts}</div>
            <p className="text-xs text-muted-foreground">
              执行中 {contracts.filter((c) => c.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月新增客户</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newCustomersThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              占总数 {(newCustomersThisMonth / totalCustomers * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">月度销售额趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
                <ChartTooltipContent
                  formatter={(value) => [`¥${Number(value).toLocaleString()}`, "销售额"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-1)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Opportunity Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">商机阶段分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={stageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} width={80} />
                <ChartTooltipContent />
                <Bar dataKey="value" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Followups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">最近跟进</CardTitle>
            <Link
              to="/followup"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              查看全部 <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFollowups.map((fu) => (
                <div
                  key={fu.id}
                  className="flex items-start justify-between border-b last:border-0 pb-3 last:pb-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: `var(--${getDictColor("dict-followup-type", fu.type)})`,
                          color: `var(--${getDictColor("dict-followup-type", fu.type)})`,
                        }}
                      >
                        {getDictLabel("dict-followup-type", fu.type)}
                      </Badge>
                      <span className="text-sm font-medium">{fu.customerName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {fu.content}
                    </p>
                    <p className="text-xs text-muted-foreground">{fu.followupAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Opportunities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">进行中商机</CardTitle>
            <Link
              to="/opportunity"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              查看全部 <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{opp.name}</span>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: `var(--${getDictColor("dict-opportunity-stage", opp.stage)})`,
                          color: `var(--${getDictColor("dict-opportunity-stage", opp.stage)})`,
                        }}
                      >
                        {getDictLabel("dict-opportunity-stage", opp.stage)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {opp.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ¥{opp.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {opp.expectedCloseDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}