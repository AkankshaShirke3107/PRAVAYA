export type ReportType = 'UA' | 'UC' | 'NM' | 'Near Miss';

export type SifPotential = 'Yes' | 'No' | 'Review' | 'High' | 'Medium' | 'Low' | 'Non-SIF';

export type ReportStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Rejected'
  | 'New'
  | 'Under Review'
  | 'Escalated'
  | 'Action Taken'
  | 'Closed';

export type LifeSavingRule =
  | 'Energy Isolation'
  | 'Working at Height'
  | 'Line of Fire'
  | 'Confined Space'
  | 'Safe Mechanical Lifting'
  | 'Bypassing Safety Controls'
  | 'Hot Work'
  | 'Driving Safety'
  | 'Toxic Gas / Chemical Exposure';

export type FieldLocation =
  | 'Duliajan'
  | 'Naharkatia'
  | 'Moran'
  | 'Jorajan'
  | 'Digboi'
  | 'Sadiya'
  | 'Jorhat'
  | 'Kumchai'
  | 'Dikom';

export interface AttachmentItem {
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
}

export interface SafetyReport {
  id: string;
  date: string;
  timestamp?: string;
  site: string;
  location?: string;
  field: FieldLocation;
  activity?: string;
  department: string;
  reportType: ReportType;
  title: string;
  description: string;
  precursor: string;
  sifPotential: SifPotential;
  sifLevel?: 'High' | 'Medium' | 'Low';
  confidenceScore?: number;
  confidence?: number;
  lsrViolated: string;
  iogpRules?: string[];
  status: ReportStatus;
  riskRating?: {
    severity: number;
    probability: number;
    score: number;
  };
  severity?: number;
  probability?: number;
  evidenceHighlight?: string;
  aiExplanation?: string;
  potentialConsequence?: string;
  breachedSafetyControls?: string[];
  rootCause?: string;
  recommendedAction?: string;
  standardReference?: string;
  reportedBy: string;
  assignedInvestigator?: string;
  attachments?: AttachmentItem[];
}

export interface KpiSummary {
  totalReports: number;
  totalReportsChangePct: number;
  sifPotentialReports: number;
  sifPotentialPct: number;
  sifPotentialChangePct: number;
  highSifPotential: number;
  highSifPctOfSif: number;
  highSifChangePct: number;
  topHazard: {
    name: string;
    sharePct: number;
  };
  reportsMappedToLsr: number;
  reportsMappedToLsrPct: number;
}

export interface SifDistributionData {
  name: string;
  value: number;
  color: string;
  pct: number;
}

export interface TrendDataPoint {
  date: string;
  totalReports: number;
  sifPotential: number;
  highSifPotential: number;
}

export interface LsrStatistic {
  rule: LifeSavingRule;
  count: number;
  percentage: number;
  iconName: string;
}

export interface HazardStatistic {
  hazard: string;
  percentage: number;
  count: number;
}

export interface SiteRiskSummary {
  field: string;
  siteCount: number;
  highSifCount: number;
  mediumSifCount: number;
  lowSifCount: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  coordinates: { x: number; y: number }; // Relative SVG positions
}

export interface FilterState {
  searchQuery: string;
  site: string;
  department: string;
  reportType: string;
  sifLevel: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface AnalyzerInput {
  title: string;
  description: string;
  site: string;
  department: string;
  reportType: ReportType;
}

export interface AnalyzerResult {
  sifPotential: SifPotential;
  confidenceScore: number;
  detectedPrecursor: string;
  suggestedLsr: LifeSavingRule;
  riskScore: number;
  identifiedHazards: string[];
  breachedControls: string[];
  rootCauseHypothesis: string;
  mitigationRecommendation: string;
  regulatoryStandard: string;
  explanation: string;
}
