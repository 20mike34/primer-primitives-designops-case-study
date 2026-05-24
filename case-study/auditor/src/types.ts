export type ViolationSeverity = 'critical' | 'high' | 'medium' | 'low';

export type ViolationCategory =
  | 'raw_values'
  | 'wrong_pairings'
  | 'missing_states'
  | 'motion_violations'
  | 'unknown_tokens';

export interface Violation {
  line: number;
  category: ViolationCategory;
  severity: ViolationSeverity;
  description: string;
  suggestedFix: string;
  codeSnippet?: string;
}

export interface AuditReport {
  component: string;
  timestamp: string;
  summary: {
    totalViolations: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    complianceScore: number; // 0-100
  };
  violations: Violation[];
  recommendations: string[];
}
