export type UserRole = 
  | 'District Planner' 
  | 'Curriculum Director' 
  | 'Industry Evaluator' 
  | 'State Admin' 
  | 'Student / Trainee';

export interface UserProfile {
  name: string;
  role: UserRole;
  title: string;
  organization: string;
  email: string;
  avatar?: string;
  district?: string;
}

export interface FeedbackLoopItem {
  id: string;
  stepNumber: string;
  title: string;
  metric: string;
  badge: string;
  badgeVariant: 'teal' | 'blue' | 'amber' | 'rose' | 'emerald' | 'slate';
  targetPath: string;
  description: string;
}

export interface KPICardData {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  sublabel: string;
  sparklineData: number[];
  color: 'teal' | 'blue' | 'amber' | 'rose' | 'emerald' | 'slate';
  targetPath?: string;
}

export interface DemandOutputDataPoint {
  month: string;
  marketVacancies: number;
  certifiedTrainees: number;
  gap: number;
}

export interface UrgentAction {
  id: string;
  category: 'CRITICAL GAP' | 'CAPACITY BOTTLENECK' | 'EMPLOYER CONSENSUS';
  title: string;
  description: string;
  affectedCount: string;
  affectedLabel: string;
  severity: 'critical' | 'warning' | 'info';
  actionLabel: string;
  actionType: 'modal_advisor' | 'modal_budget' | 'drawer_notes';
  metadata?: Record<string, any>;
}

export interface AcceleratingSkill {
  id: string;
  name: string;
  category: string;
  momentum: string;
  momentumVal: number;
  demandPct: number;
  coveragePct: number;
  gapPct: number;
  rolesCount: number;
}

export interface DistrictDeficit {
  id: string;
  name: string;
  hub: string;
  primaryCluster: string;
  capacityDeficit: number;
  trainerDeficit: number;
  equipmentDeficit: number;
  severity: 'Critical Gap' | 'High Demand' | 'Trainer Deficit' | 'Frontier Surge' | 'Moderate';
  action: string;
  polytechnicsCount: number;
  itiCount: number;
  totalSeats: number;
  demandedSeats: number;
  budgetRequired: string;
}

export interface SkillMatrixRow {
  skillId: string;
  skillName: string;
  marketDemand: number;
  curriculumCoverage: number;
  gap: number;
  employerValidation: number;
  status: 'Critical' | 'Warning' | 'Aligned';
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  demandLevel: 'Surging' | 'High' | 'Moderate' | 'Emerging';
  growth: string;
  topSkills: string[];
  locations: string[];
  avgProficiency: string;
  activePostings: number;
  experienceLevel: string;
  industrySectors: string[];
  salaryRange: string;
  description: string;
  skillMatrix: SkillMatrixRow[];
  nsqfAlignment: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  demandPct: number;
  growth: string;
  growthVal: number;
  curriculumCoveragePct: number;
  gapPct: number;
  momentumScore: number;
  bloomLevel: string;
  description: string;
  relatedRoles: { id: string; title: string; matchPct: number }[];
  relatedSkills: string[];
  relatedCourses: { id: string; name: string; instituteType: string; coverage: number }[];
  certifications: string[];
  industryAdoption: { company: string; demandShare: number }[];
}

export interface SkillGapItem {
  id: string;
  roleId: string;
  roleName: string;
  skillName: string;
  category: string;
  industryPct: number;
  curriculumPct: number;
  traineePct: number;
  gapPct: number;
  severity: 'Critical' | 'Severe' | 'Moderate' | 'Mild';
  recommendedAction: string;
  collegesAffected: number;
  nsqfLevel: string;
}

export interface CurriculumRecommendation {
  id: string;
  skillName: string;
  changeType: 'ADD' | 'UPDATE' | 'EXPAND' | 'RESTRUCTURE';
  title: string;
  domain: string;
  marketDemand: number;
  currentCoverage: number;
  skillGap: number;
  employerValidationPct: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'APPROVED' | 'IN_REVIEW' | 'REJECTED';
  nsqfLevel: string;
  affectedCourses: string[];
  affectedColleges: number;
  estimatedHours: number;
  credits: number;
  evidenceText: string;
  rationalePoints: string[];
  suggestedModules: {
    week: string;
    topic: string;
    labExercises: string;
    learningOutcomes: string;
  }[];
  validationNotes: {
    board: string;
    reviewer: string;
    decision: 'Endorsed' | 'Conditional' | 'Pending';
    notes: string;
    date: string;
  }[];
}

export interface EmployerValidationRequest {
  id: string;
  recommendationId: string;
  recommendationTitle: string;
  curriculumDomain: string;
  evidence: string;
  agreementPct: number;
  industrySector: string;
  submissionDate: string;
  dueDate: string;
  status: 'Open' | 'Consensus Reached' | 'Under Review';
  employers: {
    id: string;
    company: string;
    reviewer: string;
    role: string;
    status: 'AGREED' | 'PARTIALLY_AGREED' | 'DISAGREED' | 'PENDING';
    comment?: string;
    timestamp?: string;
  }[];
}

export interface CareerStep {
  stageNumber: number;
  stageName: string;
  duration: string;
  title: string;
  description: string;
  skillsAcquired: string[];
  status: 'completed' | 'in_progress' | 'upcoming';
  certifications: string[];
  labProjects: string[];
}

export interface CareerPathway {
  id: string;
  title: string;
  domain: string;
  matchPct: number;
  demandLevel: 'Surging' | 'High' | 'Moderate';
  avgSalary: string;
  growthRate: string;
  missingSkills: string[];
  acquiredSkills: string[];
  recommendedCourses: string[];
  targetRoles: string[];
  nsqfTarget: string;
  overview: string;
  steps: CareerStep[];
}

export interface EmergingTechItem {
  id: string;
  name: string;
  category: string;
  radarQuadrant: 'Adoption' | 'Trial' | 'Assess' | 'Hold';
  horizon: 'Horizon 1 (0-1 yr)' | 'Horizon 2 (1-3 yrs)' | 'Horizon 3 (3-5 yrs)';
  momentumScore: number;
  growthSignal: string;
  affectedRoles: string[];
  requiredSkills: string[];
  curriculumImpact: string;
  readinessInState: number; // percentage
  topPatentsCount: number;
  hiringSurgeCount: string;
  description: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Labour Market' | 'Curriculum' | 'District Capacity' | 'Skills' | 'Employer Consensus';
  format: 'PDF' | 'XLSX' | 'JSON' | 'CSV';
  generatedDate: string;
  generatedBy: string;
  size: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  description: string;
  downloadCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  category: 'CURRICULUM' | 'EMPLOYER' | 'DEMAND' | 'DISTRICT' | 'TECH';
  severity: 'info' | 'warning' | 'critical' | 'success';
  link?: string;
  badge?: string;
}
