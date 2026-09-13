const fs = require('fs');
const path = require('path');

const PRECURSOR_COUNTS = {
  'Working at Height': 42,
  'Energy Isolation': 31,
  'Line of Fire': 23,
  'Confined Space': 15,
  'Mechanical Lifting': 12,
  'Other': 12
};

// Total: 42 + 31 + 23 + 15 + 12 + 12 = 135

const SITES = [
  { field: 'Duliajan', location: 'Duliajan CPF Compressor & Gas Processing', count: 31, sifRatio: 0.50 },
  { field: 'Naharkatia', location: 'Naharkatia Separation Plant & 33kV Substation', count: 27, sifRatio: 0.375 },
  { field: 'Moran', location: 'Moran GGS-1 & Flow Station 3', count: 24, sifRatio: 0.286 },
  { field: 'Digboi', location: 'Digboi Wellhead Rig #4 & Field Unit 3', count: 21, sifRatio: 0.167 },
  { field: 'Jorajan', location: 'Jorajan Power Hub & Storage Battery', count: 17, sifRatio: 0.300 },
  { field: 'Sadiya', location: 'Sadiya Pipeline Spool 9 & Valve Station', count: 15, sifRatio: 0.125 }
];

const CONFIDENCE_SCORES = [93, 87, 91, 76, 82, 68, 94, 79, 85, 72, 88, 95, 81, 77, 89];

const DEPARTMENTS = [
  'Production', 'Maintenance', 'Drilling', 'Pipeline', 'Electrical',
  'Mechanical', 'HSE', 'Projects', 'Transport', 'Operations'
];

const ACTIVITIES = [
  'Maintenance', 'Inspection', 'Drilling', 'Welding', 'Crane Lifting',
  'Tank Cleaning', 'Confined Space Entry', 'Scaffolding', 'Excavation', 'Pipeline Repair'
];

const EVIDENCE_PHRASES = {
  'Working at Height': ['22m elevation', 'no fall protection', 'unhooked lanyard', 'no secondary tie-off', 'scaffold without toe boards', 'harness tag expired'],
  'Energy Isolation': ['LOTO not applied', 'equipment energized', 'isolation not verified', 'zero energy not confirmed', 'lockout padlock missing', 'single valve isolation'],
  'Line of Fire': ['personnel in swing radius', 'no exclusion zone', 'suspended load', 'moving equipment nearby', 'high-pressure line unanchored', 'rotating shaft unguarded'],
  'Confined Space': ['no gas testing', 'no standby person', 'permit not issued', 'ventilation inadequate', 'oxygen level 18.5%', 'entry log incomplete'],
  'Mechanical Lifting': ['unrated rigging', 'crane overload', 'damaged sling', 'no tag line', 'latch safety broken', 'outrigger on soft ground'],
  'Other': ['spill hazard', 'missing guard', 'damaged PPE', 'improper chemical storage', 'emergency stop blocked', 'flammables near heat source']
};

const LSR_MAP = {
  'Working at Height': 'Working at Height',
  'Energy Isolation': 'Energy Isolation',
  'Line of Fire': 'Line of Fire',
  'Confined Space': 'Confined Space',
  'Mechanical Lifting': 'Safe Mechanical Lifting',
  'Other': 'Hot Work'
};

const IOGP_MAP = {
  'Working at Height': ['Working at Height', 'Bypassing Safety Controls'],
  'Energy Isolation': ['Energy Isolation', 'Bypassing Safety Controls'],
  'Line of Fire': ['Line of Fire', 'Bypassing Safety Controls'],
  'Confined Space': ['Confined Space', 'Bypassing Safety Controls'],
  'Mechanical Lifting': ['Safe Mechanical Lifting', 'Line of Fire'],
  'Other': ['Hot Work', 'Bypassing Safety Controls']
};

const REPORTERS = [
  { name: 'P. K. Saikia', dept: 'Production' },
  { name: 'R. Sharma', dept: 'Maintenance' },
  { name: 'B. Baruah', dept: 'Drilling' },
  { name: 'A. Saikia', dept: 'Pipeline' },
  { name: 'T. Chetia', dept: 'Electrical' },
  { name: 'M. Hazarika', dept: 'Mechanical' },
  { name: 'D. Barua', dept: 'HSE' },
  { name: 'S. Gogoi', dept: 'Projects' },
  { name: 'N. Phukan', dept: 'Transport' },
  { name: 'J. Bora', dept: 'Operations' }
];

const DATES = [
  '08 May 2026', '12 May 2026', '18 May 2026', '22 May 2026', '28 May 2026', '30 May 2026',
  '02 Jun 2026', '05 Jun 2026', '09 Jun 2026', '15 Jun 2026', '18 Jun 2026', '24 Jun 2026',
  '03 Jul 2026', '07 Jul 2026', '12 Jul 2026', '17 Jul 2026', '23 Jul 2026', '29 Jul 2026',
  '04 Aug 2026', '09 Aug 2026', '14 Aug 2026', '21 Aug 2026', '25 Aug 2026', '30 Aug 2026'
];

function generateReports() {
  const precursorList = [];
  Object.keys(PRECURSOR_COUNTS).forEach(p => {
    for (let i = 0; i < PRECURSOR_COUNTS[p]; i++) {
      precursorList.push(p);
    }
  });

  const siteList = [];
  SITES.forEach(s => {
    for (let i = 0; i < s.count; i++) {
      siteList.push(s);
    }
  });

  const reports = [];
  const types = ['UA', 'UC', 'NM'];
  const statuses = ['Pending', 'Confirmed', 'Rejected', 'Under Review', 'Escalated', 'Closed'];

  for (let i = 1; i <= 135; i++) {
    const id = `RPT-${String(i).padStart(3, '0')}`;
    const precursor = precursorList[i - 1];
    const siteObj = siteList[i - 1];
    const confidence = CONFIDENCE_SCORES[(i - 1) % CONFIDENCE_SCORES.length];
    const confidenceScore = Number((confidence / 100).toFixed(2));
    const date = DATES[(i - 1) % DATES.length];
    const reportType = types[(i - 1) % types.length];
    const activity = ACTIVITIES[(i - 1) % ACTIVITIES.length];
    const department = DEPARTMENTS[(i - 1) % DEPARTMENTS.length];
    const reporter = REPORTERS[(i - 1) % REPORTERS.length];

    const evidenceList = EVIDENCE_PHRASES[precursor];
    const evidenceHighlight = evidenceList[(i - 1) % evidenceList.length];

    // Determine SIF potential based on precursor and site SIF ratio
    const isSif = (i % 2 === 1) || precursor === 'Working at Height' || precursor === 'Energy Isolation';
    const sifPotential = isSif ? 'Yes' : (i % 3 === 0 ? 'Review' : 'No');
    const sifLevel = isSif ? (confidence >= 85 ? 'High' : 'Medium') : 'Low';
    const status = isSif ? (i % 4 === 0 ? 'Confirmed' : 'Pending') : (i % 5 === 0 ? 'Rejected' : 'Closed');

    const lsrViolated = LSR_MAP[precursor];
    const iogpRules = IOGP_MAP[precursor];

    let titlePrefix = reportType === 'UA' ? 'Unsafe Act' : reportType === 'UC' ? 'Unsafe Condition' : 'Near Miss';
    let title = `${titlePrefix}: ${precursor} issue during ${activity.toLowerCase()} at ${siteObj.field}`;

    let description = '';
    const tempIndex = (i - 1) % 6;
    if (tempIndex === 0) {
      description = `Worker observed executing ${activity.toLowerCase()} at ${siteObj.location} with critical finding: ${evidenceHighlight}. Operations halted immediately for safety audit.`;
    } else if (tempIndex === 1) {
      description = `During ${activity.toLowerCase()} activity at ${siteObj.location}, equipment was found active without proper control. Key evidence: ${evidenceHighlight}.`;
    } else if (tempIndex === 2) {
      description = `Near miss incident involving hazardous exposure at ${siteObj.location}. Investigation noted ${evidenceHighlight} while technician was executing ${activity.toLowerCase()}.`;
    } else if (tempIndex === 3) {
      description = `Unsafe condition identified: ${evidenceHighlight} at ${siteObj.location} during shift ${activity.toLowerCase()}. Supervisor initiated corrective protocol.`;
    } else if (tempIndex === 4) {
      description = `Technician was performing ${activity.toLowerCase()} at ${siteObj.location} when safety observer flagged ${evidenceHighlight}. Stop-work order issued.`;
    } else {
      description = `Inspection revealed ${evidenceHighlight} at ${siteObj.location} during routine ${activity.toLowerCase()}. Incident escalated for barrier review.`;
    }

    reports.push({
      id,
      reportType,
      date,
      location: siteObj.location,
      site: siteObj.location,
      field: siteObj.field,
      activity,
      sifPotential,
      sifLevel,
      precursor,
      confidence,
      confidenceScore,
      status,
      title,
      description,
      lsrViolated,
      iogpRules,
      reportedBy: `${reporter.name} (${department})`,
      department,
      recommendedAction: `Perform immediate safety pause, enforce ${lsrViolated} rule protocol, and update site barrier verification checklist.`,
      rootCause: `Deficient pre-job hazard identification and unverified secondary barrier during shift activity.`,
      severity: isSif ? (confidence >= 85 ? 4 : 3) : 2,
      probability: isSif ? 3 : 2,
      potentialConsequence: `High potential for severe injury or process safety loss if safety control is compromised.`,
      evidenceHighlight,
      aiExplanation: `Automated screening identified phrase "${evidenceHighlight}" mapped to ${lsrViolated} Life-Saving Rule.`
    });
  }

  return reports;
}

const reports = generateReports();
const fileContent = `export interface AttachmentItem {
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
}

export interface ReportItem {
  id: string;
  reportType: 'UA' | 'UC' | 'NM';
  date: string;
  location: string;
  site: string;
  field: string;
  activity: string;
  sifPotential: 'Yes' | 'No' | 'Review';
  sifLevel?: 'High' | 'Medium' | 'Low';
  precursor: string;
  confidence: number;
  confidenceScore?: number;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Under Review' | 'Escalated' | 'Closed';
  title: string;
  description: string;
  lsrViolated: string;
  iogpRules?: string[];
  reportedBy: string;
  department: string;
  recommendedAction: string;
  rootCause: string;
  severity: number;
  probability: number;
  potentialConsequence?: string;
  evidenceHighlight?: string;
  aiExplanation?: string;
  attachments?: AttachmentItem[];
}

export const mockReportsData: ReportItem[] = ${JSON.stringify(reports, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../lib/mockReports.ts'), fileContent, 'utf-8');
console.log('Successfully generated 135 reports in mockReports.ts');
