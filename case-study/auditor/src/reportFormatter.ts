import type {AuditReport, Violation} from '../../../case-study/auditor/auditor/src/types.js';

export function formatMarkdownReport(report: AuditReport): string {
  const {component, timestamp, summary, violations, recommendations} = report;

  const severityEmoji = {
    critical: '🚨',
    high: '⚠️',
    medium: '⚡',
    low: '💡',
  };

  let md = `# Compliance Audit Report: ${component}\n\n`;
  md += `**Generated:** ${timestamp}  \n`;
  md += `**Compliance Score:** ${summary.complianceScore}/100\n\n`;

  md += `## Summary\n\n`;
  md += `| Severity | Count |\n`;
  md += `|----------|-------|\n`;
  md += `| 🚨 Critical | ${summary.critical} |\n`;
  md += `| ⚠️ High | ${summary.high} |\n`;
  md += `| ⚡ Medium | ${summary.medium} |\n`;
  md += `| 💡 Low | ${summary.low} |\n`;
  md += `| **Total** | **${summary.totalViolations}** |\n\n`;

  if (violations.length > 0) {
    md += `## Violations\n\n`;
    
    violations.forEach((v, i) => {
      md += `### ${i + 1}. ${severityEmoji[v.severity]} ${v.category.replace(/_/g, ' ').toUpperCase()}\n\n`;
      md += `**Line:** ${v.line}  \n`;
      md += `**Severity:** ${v.severity}  \n`;
      md += `**Description:** ${v.description}\n\n`;
      
      if (v.codeSnippet) {
        md += `**Code:**\n\`\`\`tsx\n${v.codeSnippet}\n\`\`\`\n\n`;
      }
      
      md += `**Suggested Fix:**\n${v.suggestedFix}\n\n`;
      md += `---\n\n`;
    });
  } else {
    md += `## ✅ No violations found\n\nThis component is fully compliant with Primer Design Tokens guidelines.\n\n`;
  }

  if (recommendations.length > 0) {
    md += `## Recommendations\n\n`;
    recommendations.forEach((rec, i) => {
      md += `${i + 1}. ${rec}\n`;
    });
    md += `\n`;
  }

  md += `---\n\n`;
  md += `*Audited against Primer Design Tokens Guide (RFC 2119 rules) and Design Tokens Spec.*\n`;

  return md;
}
