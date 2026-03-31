// CRM Type Definitions

export type CustomerStatus = "potential" | "active" | "inactive";
export type OpportunityStage = "initial" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
export type ContractStatus = "draft" | "pending" | "active" | "completed" | "terminated";
export type FollowupType = "call" | "email" | "visit" | "meeting";

export interface Customer {
  id: string;
  code: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  industry: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  code: string;
  name: string;
  customerId: string;
  customerName: string;
  amount: number;
  stage: OpportunityStage;
  expectedCloseDate: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  code: string;
  name: string;
  customerId: string;
  customerName: string;
  opportunityId?: string;
  opportunityName?: string;
  amount: number;
  signedDate: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Followup {
  id: string;
  customerId: string;
  customerName: string;
  opportunityId?: string;
  opportunityName?: string;
  type: FollowupType;
  content: string;
  followupBy: string;
  followupAt: string;
  nextFollowupDate?: string;
  createdAt: string;
}

export interface CustomerWithRelations extends Customer {
  opportunities: Opportunity[];
  followups: Followup[];
}

export interface OpportunityWithRelations extends Opportunity {
  customer: Customer;
  followups: Followup[];
}

export interface ContractWithRelations extends Contract {
  customer: Customer;
  opportunity?: Opportunity;
}

export interface DashboardStats {
  totalCustomers: number;
  totalOpportunities: number;
  totalContracts: number;
  newCustomersThisMonth: number;
  opportunitiesByStage: Record<OpportunityStage, number>;
  monthlyRevenue: { month: string; revenue: number }[];
}