/**
 * Oil India HSE Enterprise Chart Theme & Color Palette
 */

export const chartColors = {
  navy: '#102F3E',
  navyBlue: '#17495D',
  steelBlue: '#2F6B84',
  teal: '#1D8278',
  cyanTeal: '#2BA6A0',
  gold: '#C7972B',
  amber: '#D97706',
  highRiskRed: '#C92925',
  deepRed: '#991F1B',
  lowRiskGreen: '#2E7D32',
  slateGray: '#64748B',
  lightGrid: '#E6EAED',
} as const;

export const panelGradients = {
  header: 'linear-gradient(120deg, #082735 0%, #102F3E 55%, #1D5B70 100%)',
  primary: 'linear-gradient(135deg, #FFFFFF 0%, #F4F8F9 100%)',
  blue: 'linear-gradient(135deg, #EAF4F8 0%, #D5E8EF 100%)',
  teal: 'linear-gradient(135deg, #E5F5F2 0%, #CDE9E3 100%)',
  amber: 'linear-gradient(135deg, #FFF5DF 0%, #FBE5B5 100%)',
  red: 'linear-gradient(135deg, #FCE9E8 0%, #F4CBC8 100%)',
  green: 'linear-gradient(135deg, #E8F5EA 0%, #CDE8D1 100%)',
  pageBackground: 'linear-gradient(135deg, #F7F5F0 0%, #EAF0F2 50%, #F7F5F0 100%)',
} as const;

/**
 * Stable predefined color mapping for IOGP Life-Saving Rules
 * Ensures every rule maintains the exact same color across the application.
 */
export const stableLsrColors: Record<string, string> = {
  'Work at Height': '#2F6B84',
  'Working at Height': '#2F6B84',
  'Energy Isolation': '#D97706',
  'Line of Fire': '#C92925',
  'Confined Space': '#7C3AED',
  'Safe Mechanical Lifting': '#2E7D32',
  'Hot Work': '#1D8278',
  'Bypassing Safety Controls': '#64748B',
  'Toxic Gas / Chemical Exposure': '#C92925',
  'Others': '#718096',
};

/**
 * Helper to map raw LSR tags to clean rule titles
 */
export function formatLsrRuleName(rawTag?: string): string {
  if (!rawTag) return 'Others';
  if (rawTag.includes('WORK_AT_HEIGHT')) return 'Work at Height';
  if (rawTag.includes('ENERGY_ISOLATION')) return 'Energy Isolation';
  if (rawTag.includes('CONFINED_SPACE')) return 'Confined Space';
  if (rawTag.includes('LINE_OF_FIRE')) return 'Line of Fire';
  if (rawTag.includes('HOT_WORK')) return 'Hot Work';
  if (rawTag.includes('SAFE_MECHANICAL_LIFTING')) return 'Safe Mechanical Lifting';
  if (rawTag.includes('BYPASSING_SAFETY_CONTROLS')) return 'Bypassing Safety Controls';
  if (rawTag.includes('TOXIC_GAS')) return 'Toxic Gas / Chemical Exposure';
  return rawTag.replace(/^LSR_/, '').replace(/_/g, ' ');
}

export function getLsrColor(ruleName: string): string {
  return stableLsrColors[ruleName] || chartColors.steelBlue;
}
