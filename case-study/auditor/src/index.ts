import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import {buildSystemPrompt, buildUserPrompt} from './promptBuilder.ts';
import {formatMarkdownReport} from './reportFormatter.ts';
import type {AuditReport, Violation} from './types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({path: path.join(__dirname, '../.env')});

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function auditComponent(componentPath: string): Promise<AuditReport> {
  const componentName = path.basename(componentPath, path.extname(componentPath));
  const componentCode = fs.readFileSync(componentPath, 'utf-8');

  console.log(`🔍 Auditing ${componentName}...`);

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(componentCode, componentName);

console.log('Using model:', process.env.MODEL || 'claude-sonnet-4-20250514');
console.log('API key loaded:', process.env.ANTHROPIC_API_KEY ? 'YES' : 'NO');

  const response = await client.messages.create({
    model: process.env.MODEL || 'claude-sonnet-4-20250514',
    max_tokens: parseInt(process.env.MAX_TOKENS || '4000'),
    system: systemPrompt,
    messages: [{role: 'user', content: userPrompt}],
  });

  const rawResponse = response.content[0].type === 'text' ? response.content[0].text : '';
  
  // Parse JSON response
  const cleanJson = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  // Calculate summary
  const violations: Violation[] = parsed.violations || [];
  const summary = {
    totalViolations: violations.length,
    critical: violations.filter(v => v.severity === 'critical').length,
    high: violations.filter(v => v.severity === 'high').length,
    medium: violations.filter(v => v.severity === 'medium').length,
    low: violations.filter(v => v.severity === 'low').length,
    complianceScore: Math.max(0, 100 - violations.length * 5), // Simple scoring
  };

  return {
    component: componentName,
    timestamp: new Date().toISOString(),
    summary,
    violations,
    recommendations: parsed.recommendations || [],
  };
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: npm run audit <path-to-component>');
    console.error('Example: npm run audit ../subjects/shadcn/button.tsx');
    process.exit(1);
  }

  const componentPath = path.resolve(__dirname, '..', args[0]);
  
  if (!fs.existsSync(componentPath)) {
    console.error(`Error: File not found: ${componentPath}`);
    process.exit(1);
  }

  try {
    const report = await auditComponent(componentPath);
    
    // Console summary
    console.log(`\n✅ Audit complete!`);
    console.log(`   Compliance Score: ${report.summary.complianceScore}/100`);
    console.log(`   Total Violations: ${report.summary.totalViolations}`);
    console.log(`   🚨 Critical: ${report.summary.critical}`);
    console.log(`   ⚠️  High: ${report.summary.high}`);
    console.log(`   ⚡ Medium: ${report.summary.medium}`);
    console.log(`   💡 Low: ${report.summary.low}`);

    // Write markdown report
    const markdown = formatMarkdownReport(report);
    const reportsDir = path.resolve(__dirname, '../../../reports');
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, {recursive: true});
    }
    
    const reportPath = path.join(reportsDir, `${report.component}-audit.md`);
    fs.writeFileSync(reportPath, markdown);
    
    console.log(`\n📄 Report saved: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

main();
