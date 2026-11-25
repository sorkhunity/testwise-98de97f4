export interface TestScenario {
  id: string;
  title: string;
  status: 'passed' | 'failed' | 'active' | 'running';
  date: string;
  author: string;
  stepsCount: number;
  duration: string;
  successRate?: number;
}

export interface BugReport {
  id: string;
  title: string;
  description: string;
  screenshotUrl: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  date: string;
  module?: string;
  service?: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface SelfHealingItem {
  id: string;
  testName?: string;
  elementName?: string;
  originalSelector?: string;
  oldSelector?: string;
  newSelector: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  domSnippet?: string;
  page?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText?: string;
  popular?: boolean;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  description?: string;
}

export interface Scenario {
  id: string;
  title: string;
  category?: string;
  status: string;
  date?: string;
  author?: string;
  stepsCount?: number;
  duration?: string;
  successRate?: number;
}

export interface BugItem {
  id: string;
  title: string;
  description?: string;
  severity: string;
  status: string;
  date?: string;
  module?: string;
}

export interface SelfHealingRule {
  id: string;
  testName?: string;
  elementName?: string;
  originalSelector?: string;
  oldSelector?: string;
  newSelector?: string;
  confidence?: number;
  status?: string;
  date?: string;
  domSnippet?: string;
}
