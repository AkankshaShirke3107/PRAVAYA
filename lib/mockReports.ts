export interface AttachmentItem {
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
  confidence: number; // 0-100
  confidenceScore?: number; // 0.0 - 1.0
  status: 'Pending' | 'Confirmed' | 'Rejected';
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

export const mockReportsData: ReportItem[] = [
  {
    "id": "RPT-001",
    "reportType": "UA",
    "date": "2026-05-28",
    "location": "Duliajan CPF Compressor #2",
    "site": "Duliajan CPF Compressor #2",
    "field": "Duliajan",
    "activity": "Work at Height (Derrick & Monkey Board)",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Confirmed",
    "title": "Derrickman unhooked safety lanyard at 24m elevation during pipe-racking cycle",
    "description": "During tripping-out operations on Derrick Rig #4 at Digboi, a derrickman unhooked his twin-leg safety lanyard at an elevation of 24 meters to cross over to the monkey board. He failed to latch the second carabiner hook to the static horizontal lifeline, leaving him unclipped for approximately 45 seconds directly over the open drill floor with no secondary fall protection in place.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Devajit Barua (Drilling Supervisor)",
    "department": "Drilling",
    "recommendedAction": "Suspend elevated work permit; retrofit self-retracting lifeline (SRL) with dual interlocked carabiners.",
    "rootCause": "Operator rushed pipe racking cycle to meet trip schedule; anchor line out of ergonomic reach.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal deceleration trauma resulting from uncontrolled 24m free-fall onto steel drill floor rotary table.",
    "evidenceHighlight": "unhooked his twin-leg safety lanyard at an elevation of 24 meters to cross over to the monkey board",
    "aiExplanation": "Free-fall from 24m elevation represents an unmitigated gravitational hazard capable of fatal trauma. The intentional removal of 100% tie-off violates IOGP Rule #2 and OISD GDN-166. Classified as High SIF Potential due to complete absence of defensive barrier redundancy.",
    "attachments": [
      {
        "name": "rpt-001_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-001_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-001_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-002",
    "reportType": "UA",
    "date": "2026-05-28",
    "location": "Naharkatia Separation Plant",
    "site": "Naharkatia Separation Plant",
    "field": "Naharkatia",
    "activity": "Scaffolding Erection & Inspection",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Pending",
    "title": "Unsecured scaffolding planks shifted during high-level valve servicing",
    "description": "Maintenance technicians accessed an elevated staging platform at 8 meters on Moran Gas Compressor Station A without toe-boards or retaining clamps. Two wooden scaffold boards shifted under load, creating a 40cm gap directly above live high-pressure compressor discharge piping.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bipul Chetia (Integrity Engineer)",
    "department": "Maintenance",
    "recommendedAction": "Dismantle defective bay; enforce scaffold green-tag inspection permit before each work shift.",
    "rootCause": "Scaffold altered by third-party contractor without inspection or re-tagging by scaffold supervisor.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Fall from 8m causing severe vertebral fracture and collateral impact with live compressor piping.",
    "evidenceHighlight": "Two wooden scaffold boards shifted under load, creating a 40cm gap directly above live high-pressure compressor discharge piping",
    "aiExplanation": "Structural instability on temporary access platforms at height presents direct fall and dropped object hazards. OISD STD-166 requires certified green tags and locked toe-boards. The missing plank clamps combined with 8m elevation warrants High SIF classification.",
    "attachments": [
      {
        "name": "rpt-002_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-002_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-002_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-003",
    "reportType": "UC",
    "date": "2026-05-27",
    "location": "Moran Gas Compressor Station A",
    "site": "Moran Gas Compressor Station A",
    "field": "Moran",
    "activity": "Flare Stack Tip Servicing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 97,
    "confidenceScore": 0.97,
    "status": "Confirmed",
    "title": "Dropped 12-inch adjustable spanner narrowly missed technician beneath flare ladder",
    "description": "A contract rigger ascending the vertical ladder on Sadiya Gas Booster flare stack dropped an un-tethered 12-inch adjustable spanner from 18 meters. The tool deflected off an intermediate rest platform and struck the concrete grade just 1 meter away from a junior technician inspecting the ignition pilot.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Manas Pratim Das (Safety Officer)",
    "department": "Maintenance",
    "recommendedAction": "Mandate 100% tool tethering protocol and barricade 15m radius drop zone beneath elevated works.",
    "rootCause": "Failure to utilize tool pouches and tool retention lanyards while climbing vertical caged ladder.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Fatal blunt force craniocerebral trauma caused by 18m dropped metallic object.",
    "evidenceHighlight": "dropped an un-tethered 12-inch adjustable spanner from 18 meters. The tool deflected off an intermediate rest platform and struck the concrete grade just 1 meter away",
    "aiExplanation": "Dropped objects from elevated industrial structures carry lethal kinetic energy (exceeding 120 Joules). The lack of tool lanyards breaches Dropped Object Prevention Scheme (DROPS) standards. Classified as SIF Near Miss due to narrow spatial miss.",
    "attachments": [
      {
        "name": "rpt-003_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-003_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-003_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-004",
    "reportType": "NM",
    "date": "2026-05-27",
    "location": "Jorajan Flow Station #2",
    "site": "Jorajan Flow Station #2",
    "field": "Jorajan",
    "activity": "Well Servicing & Mast Lowering",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Work at Height",
    "confidence": 78,
    "confidenceScore": 0.78,
    "status": "Confirmed",
    "title": "Contractor standing on mast ladder cage without safety harness connected",
    "description": "During mast preparation at Naharkatia Oil Well #41, a roustabout climbed to 4 meters on the exterior ladder cage to untie guy wire turnbuckles without fastening his harness lanyard. He claimed the cage provided adequate collective protection for short-duration tasks.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height"
    ],
    "reportedBy": "Kishore Sarmah (Senior Electrical Engineer)",
    "department": "Workover",
    "recommendedAction": "Provide certified vertical glide cable fall-arresters on all mobile workover rig mast ladders.",
    "rootCause": "Misunderstanding of fall arrest regulations regarding ladder cages versus active tie-off.",
    "severity": 3,
    "probability": 3,
    "potentialConsequence": "Fall from 4m resulting in lower extremity fractures or head concussion on rig sub-base steel.",
    "evidenceHighlight": "climbed to 4 meters on the exterior ladder cage to untie guy wire turnbuckles without fastening his harness lanyard",
    "aiExplanation": "Although enclosed ladder cages provide lateral containment, they do not arrest downward vertical falls. OISD guidelines require positive tie-off above 1.8m. Flagged for review to assess whether fall arrester installation was feasible.",
    "attachments": [
      {
        "name": "rpt-004_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-004_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-005",
    "reportType": "UC",
    "date": "2026-05-26",
    "location": "Digboi Wellhead Rig #4",
    "site": "Digboi Wellhead Rig #4",
    "field": "Digboi",
    "activity": "Energy Isolation (LOTO)",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Energy Isolation",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Pending",
    "title": "Crude booster pump seal overhaul initiated without mechanical slip blinds installed",
    "description": "Maintenance technicians at Moran GGS-1 commenced mechanical seal replacement on crude booster pump P-102B without positive isolation. Although an electrical breaker lockout padlock was applied, the suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation"
    ],
    "reportedBy": "Anupam Gohain (Operations Lead)",
    "department": "Production",
    "recommendedAction": "Enforce mandatory slip blind verification checklist with signature from Area Production In-Charge.",
    "rootCause": "Technicians skipped blinding requirement citing short 2-hour seal replacement duration.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Pressurized hydrocarbon jet spray causing chemical eye burns, vapor cloud flash fire, or flange projectile strike.",
    "evidenceHighlight": "suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing",
    "aiExplanation": "Positive isolation requires double block and bleed with verified mechanical blinding under IOGP Rule #1 and OISD STD-105. Relying on single closed block valves for hydrocarbon envelopes creates severe blowout and fire risks. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-005_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-005_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-006",
    "reportType": "UA",
    "date": "2026-05-26",
    "location": "Sadiya Pipeline Spool 9",
    "site": "Sadiya Pipeline Spool 9",
    "field": "Sadiya",
    "activity": "Electrical Substation Maintenance",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Confirmed",
    "title": "Electrician racked out 6.6kV breaker without verifying de-energized busbar state",
    "description": "At Duliajan Central Gas Gathering Station 6.6kV substation, an electrical technician engaged the manual racking handle to withdraw feeder cubicle breaker CB-04 without using a high-voltage proximity probe to verify zero energy. Subsequent testing revealed the incoming busbar was still energized at 6,600 Volts due to an automated tie-breaker transfer.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Rupjyoti Hazarika (HSE Specialist)",
    "department": "Electrical",
    "recommendedAction": "Retrofit mechanical door interlocks preventing cubicle opening unless busbar earthing switch is made.",
    "rootCause": "Failure to execute live-line proximity voltage test; assumed tie-breaker was in open position.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic 6.6kV arc-flash blast causing fatal thermal incinerations, blast lung injury, and switchgear destruction.",
    "evidenceHighlight": "withdraw feeder cubicle breaker CB-04 without using a high-voltage proximity probe to verify zero energy. Subsequent testing revealed the incoming busbar was still energized at 6,600 Volts",
    "aiExplanation": "Intervention on live medium/high voltage equipment without verified test-before-touch creates catastrophic arc-flash exposure. Arc flash energy at 6.6kV causes severe third-degree thermal burns and fatal blast concussions. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-006_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-006_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-006_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-007",
    "reportType": "NM",
    "date": "2026-05-25",
    "location": "Duliajan Central Gas Gathering Station",
    "site": "Duliajan Central Gas Gathering Station",
    "field": "Duliajan",
    "activity": "Gas Compressor Overhaul",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Confirmed",
    "title": "Gas valve handle nudged open by passing scaffold pole while technicians opened manifold",
    "description": "While fitters were unbolting a spool piece on Duliajan CPF Compressor #2, a scaffolding crew passing through the aisle bumped the lever of an un-locked 4-inch fuel gas ball valve. The valve cracked open 15 degrees, releasing pressurized sweet natural gas directly into the unventilated compressor bay before being hastily closed.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Tapan Phukan (Rigging Superintendent)",
    "department": "Maintenance",
    "recommendedAction": "Install lockable clamshell handle covers on all fuel gas block valves in compressor enclosures.",
    "rootCause": "Valve was tagged with paper card but lacked mechanical cable lockout clamp or handle removal.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Vapor cloud ignition causing enclosed building overpressure explosion and fatal thermal burns.",
    "evidenceHighlight": "bumped the lever of an un-locked 4-inch fuel gas ball valve. The valve cracked open 15 degrees, releasing pressurized sweet natural gas directly into the unventilated compressor bay",
    "aiExplanation": "Unsecured valve handles on hazardous gas lines violate LOTO principles requiring physical locking devices. Gas accumulation in enclosed compressor bays presents immediate deflagration hazard upon finding an ignition source. Classified as SIF Near Miss.",
    "attachments": [
      {
        "name": "rpt-007_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-007_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-007_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-008",
    "reportType": "UC",
    "date": "2026-05-25",
    "location": "Naharkatia Substation 33kV",
    "site": "Naharkatia Substation 33kV",
    "field": "Naharkatia",
    "activity": "Pipeline Pigging Operation",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 91,
    "confidenceScore": 0.91,
    "status": "Pending",
    "title": "Technician loosened pig receiver door clamp screws before opening barrel drain",
    "description": "At Sadiya Pipeline Spool 9, a pipeline operator began loosening the quick-opening closure clamp bolts on an 18-inch crude pig receiver barrel while the barrel pressure gauge still indicated 45 PSI. The interlock vent valve had not been opened, and the operator assumed the zero reading on an upstream skid gauge applied to the barrel.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Pranjal Borah (Field Chemist)",
    "department": "Pipeline",
    "recommendedAction": "Install mechanical key interlock (Trapped Key Interlock) between receiver vent valve and door latch.",
    "rootCause": "Failure to follow step-by-step pig receiver depressurization procedure and check local barrel gauge.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Violent projectile release of 18-inch steel door closure and pressurized crude slug striking operator.",
    "evidenceHighlight": "loosening the quick-opening closure clamp bolts on an 18-inch crude pig receiver barrel while the barrel pressure gauge still indicated 45 PSI",
    "aiExplanation": "Quick-opening closures on pressurized hydrocarbon pipelines have severe history of fatal door blowouts. Under IOGP Rule #1 and ASME Sec VIII, safety warning screws and vent interlocks must be fully verified. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-008_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-008_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-008_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-009",
    "reportType": "UC",
    "date": "2026-05-24",
    "location": "Moran GGS-1 Manifold",
    "site": "Moran GGS-1 Manifold",
    "field": "Moran",
    "activity": "Hydrostatic Pressure Testing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Confirmed",
    "title": "Unrestrained 3000 PSI high-pressure flexible test hose in rig cellar",
    "description": "During a 3000 PSI hydrostatic pressure test of wellhead manifold at Digboi Drill Floor Cellar #9, the high-pressure test hose safety whip-check cable was left disconnected at the cellar pump manifold fitting. Technicians were observing pressure rise within 1.5 meters of the unanchored flexible high-pressure hose.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Diganta Neog (Mechanical Maintenance Lead)",
    "department": "Pipeline",
    "recommendedAction": "Mandate certified continuous steel whip-socks on all hoses >= 1000 PSI and establish 10m exclusion zone.",
    "rootCause": "Whip check cable clip was corroded and discarded without replacing prior to test pressurization.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Lethal whipping hose impact or subcutaneous high-pressure hydrocarbon liquid injection.",
    "evidenceHighlight": "high-pressure test hose safety whip-check cable was left disconnected at the cellar pump manifold fitting. Technicians were observing pressure rise within 1.5 meters",
    "aiExplanation": "High-pressure hose failure without whip restraint generates violent flailing motion capable of fatal blunt force trauma and fluid injection. Positioning personnel within blast radius during active pressure test violates Line of Fire LSR. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-009_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-009_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-009_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-010",
    "reportType": "UA",
    "date": "2026-05-23",
    "location": "Jorajan Gas Turbine Power Hub",
    "site": "Jorajan Gas Turbine Power Hub",
    "field": "Jorajan",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Line of Fire",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Rejected",
    "title": "Rigger positioned directly beneath 4-ton suspended heat exchanger tube bundle",
    "description": "During maintenance overhaul at Naharkatia Separation Plant, a mobile crane was slewing a 4-ton shell-and-tube heat exchanger bundle over the laydown deck. A rigger stepped beneath the suspended load to manually guide the tail into alignment using his bare hands rather than employing tag lines.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire"
    ],
    "reportedBy": "Kaushik Saikia (Process Safety Specialist)",
    "department": "Maintenance",
    "recommendedAction": "Stop-work authority exercised; provide rigid non-conductive tag poles and retrain rigging crew.",
    "rootCause": "Lack of push-pull safety sticks and tag lines on site; rigger took shortcut to save alignment time.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal crushing and traumatic asphyxiation resulting from catastrophic dropped heavy load.",
    "evidenceHighlight": "stepped beneath the suspended load to manually guide the tail into alignment using his bare hands rather than employing tag lines",
    "aiExplanation": "Standing beneath suspended loads constitutes direct violation of IOGP Life-Saving Rule #5. In the event of sling failure or hydraulic brake slip, survivability beneath a 4-ton load is virtually zero. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-010_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-010_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-011",
    "reportType": "NM",
    "date": "2026-05-22",
    "location": "Digboi Historic Production Well #18",
    "site": "Digboi Historic Production Well #18",
    "field": "Digboi",
    "activity": "Drilling & Tripping Pipe",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Line of Fire",
    "confidence": 91,
    "confidenceScore": 0.91,
    "status": "Pending",
    "title": "Rotary tong backup snub line snapped under 12,000 ft-lbs make-up torque",
    "description": "During casing make-up on Moran Wellhead Rig #12, the backup snub line cable parted violently under 12,000 ft-lbs breakout torque on 9-5/8 inch casing. The parted wire rope whip struck the derrick leg steel flange inches from the lead tong operator who had stepped clear into the designated green zone just seconds prior.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire"
    ],
    "reportedBy": "Dipankar Sarmah (Pipeline Integrity Lead)",
    "department": "Drilling",
    "recommendedAction": "Condemn snub line; install load-cell torque limiter and mandate pre-shift magnetic wire inspection.",
    "rootCause": "Snub line was damaged by internal strand corrosion concealed beneath outer grease coating.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Fatal blunt impact and decapitating trauma from severed high-tension rotary tong steel wire cable.",
    "evidenceHighlight": "backup snub line cable parted violently under 12,000 ft-lbs breakout torque on 9-5/8 inch casing. The parted wire rope whip struck the derrick leg steel flange inches from the lead tong operator",
    "aiExplanation": "Parted rotary tong cables release immense stored elastic energy. Personnel inside the rotary sweep circle are exposed to lethal lacerations and blunt trauma. High SIF classification justified due to near-fatal trajectory.",
    "attachments": [
      {
        "name": "rpt-011_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-011_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-012",
    "reportType": "UC",
    "date": "2026-05-21",
    "location": "Sadiya River Crossing Trench B",
    "site": "Sadiya River Crossing Trench B",
    "field": "Sadiya",
    "activity": "Vehicular & Heavy Equipment Transit",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Line of Fire",
    "confidence": 66,
    "confidenceScore": 0.66,
    "status": "Confirmed",
    "title": "Forklift reversing alarm inaudible inside Jorajan warehouse pump bay",
    "description": "During offloading of palletized valve spares at Jorajan Gas Turbine Power Hub, the acoustic back-up beeper on a 3-ton warehouse forklift was observed to be muffled by road mud and inaudible over ambient turbine roar.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire"
    ],
    "reportedBy": "Debananda Phukan (Production Chemist)",
    "department": "Production",
    "recommendedAction": "Clean and test reversing beeper; install blue LED spot projection safety lamps on forklift mast.",
    "rootCause": "Accumulation of dry road mud inside acoustic sounder horn diaphragm.",
    "severity": 2,
    "probability": 2,
    "potentialConsequence": "Foot or ankle contusion caused by low-speed reversing forklift.",
    "evidenceHighlight": "acoustic back-up beeper on a 3-ton warehouse forklift was observed to be muffled by road mud and inaudible over ambient turbine roar",
    "aiExplanation": "While forklift pedestrian collisions can be hazardous, operating speeds in this warehouse zone are restricted to 5 km/h with low pedestrian density and designated walkways. Classified as Non-SIF condition.",
    "attachments": [
      {
        "name": "rpt-012_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-012_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-013",
    "reportType": "UC",
    "date": "2026-05-20",
    "location": "Duliajan Well Pad #104",
    "site": "Duliajan Well Pad #104",
    "field": "Duliajan",
    "activity": "Tank Cleaning & Internal Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 96,
    "confidenceScore": 0.96,
    "status": "Confirmed",
    "title": "Contractor entered crude storage tank without continuous gas detector or standby watch",
    "description": "A contract tank cleaner entered crude storage tank T-104 at Jorajan Crude Storage Battery to inspect sludge accumulation on bottom baffles. Atmospheric testing had only been completed 4 hours prior, the external standby attendant was away fetching floodlights, and the entrant carried no personal four-gas monitor.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bhaskar Jyoti Dutta (Instrumentation Engineer)",
    "department": "Production",
    "recommendedAction": "Revoke contractor permit; institute digital RFID badge gate with interlocking air ventilation sensor.",
    "rootCause": "Attendant left post to expedite lighting setup; entrant proceeded without secondary barrier check.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal acute asphyxiation or H2S toxicity leading to sudden collapse in enclosed vessel.",
    "evidenceHighlight": "entered crude storage tank T-104 at Jorajan Crude Storage Battery to inspect sludge accumulation on bottom baffles. Atmospheric testing had only been completed 4 hours prior, the external standby attendant was away",
    "aiExplanation": "Entering hydrocarbon storage tanks without verified continuous atmosphere testing or standby watch is among the top historical causes of multi-fatality HSE incidents. Heavy volatile gases re-evolve rapidly from disturbed bottom sludge. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-013_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-013_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-013_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-014",
    "reportType": "UA",
    "date": "2026-05-19",
    "location": "Naharkatia Gas Lift Manifold",
    "site": "Naharkatia Gas Lift Manifold",
    "field": "Naharkatia",
    "activity": "Confined Space Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Pending",
    "title": "Air ventilation fan duct slipped out of production separator manway neck",
    "description": "During internal inspection of production separator V-301 at Duliajan Central Gas Gathering Station, the flexible ducting of an electric air mover disconnected from the top manway nozzle. Air exchange inside the 12m vessel dropped to zero while two internal inspectors were scraping internal sand weirs.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Rituraj Gogoi (Electrical Tech)",
    "department": "Maintenance",
    "recommendedAction": "Use heavy-duty steel worm gear clamps to lock air ducts to vessel entry flanges.",
    "rootCause": "Ventilation duct was tied with plastic cable zip-ties which melted against warm vessel shell.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Progressive hypoxia and carbon monoxide/hydrocarbon vapor narcosis inside vessel.",
    "evidenceHighlight": "flexible ducting of an electric air mover disconnected from the top manway nozzle. Air exchange inside the 12m vessel dropped to zero while two internal inspectors were scraping internal sand weirs",
    "aiExplanation": "Loss of forced ventilation in enclosed vessels quickly causes oxygen depletion and toxic gas re-accumulation. OISD-STD-105 mandates positive mechanical duct anchoring and independent continuous extraction monitors. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-014_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-014_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-014_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-015",
    "reportType": "NM",
    "date": "2026-05-18",
    "location": "Moran Early Production Facility",
    "site": "Moran Early Production Facility",
    "field": "Moran",
    "activity": "Culvert & Deep Trench Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 85,
    "confidenceScore": 0.85,
    "status": "Confirmed",
    "title": "Winch cable snapped on tripod rescue harness during emergency drill in valve pit",
    "description": "During a planned emergency response evacuation drill from a 4-meter-deep concrete valve chamber at Sadiya High-Pressure Valve Station, the retrieval wire on the confined space tripod winch snapped under test weight. The dummy mannequin dropped 2.5 meters to the pit floor.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Anup Bordoloi (Rig Mechanic)",
    "department": "Pipeline",
    "recommendedAction": "Quarantine rescue tripod; recertify all rescue winches across field with full proof-load tests.",
    "rootCause": "Winch internal brake mechanism jammed due to neglected bi-annual third-party load proof certification.",
    "severity": 5,
    "probability": 2,
    "potentialConsequence": "Fatal suspension trauma or secondary blunt impact from failure of emergency extraction hoist.",
    "evidenceHighlight": "retrieval wire on the confined space tripod winch snapped under test weight. The dummy mannequin dropped 2.5 meters to the pit floor",
    "aiExplanation": "Failure of emergency retrieval equipment directly breaches survival barriers in confined spaces where self-rescue is impossible. If an unconscious worker had been on the line, secondary impact trauma would have occurred. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-015_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-015_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-015_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-016",
    "reportType": "UA",
    "date": "2026-05-17",
    "location": "Jorajan Well Cluster #7",
    "site": "Jorajan Well Cluster #7",
    "field": "Jorajan",
    "activity": "Underground Drainage Inspection",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Confined Space",
    "confidence": 76,
    "confidenceScore": 0.76,
    "status": "Confirmed",
    "title": "Civil worker lowered head into oily water sump without gas clearance test",
    "description": "At Naharkatia Effluent Pit #3, a civil contractor bent his torso through the grating opening into a 1.5-meter-deep oily water drainage sump to retrieve a fallen measuring tape. The pit receives oily runoff and was not cleared by safety for atmospheric entry.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space"
    ],
    "reportedBy": "Pallab Baruah (Drill Site Manager)",
    "department": "Production",
    "recommendedAction": "Install safety warning stencils on all plant sumps defining them as permit-required confined spaces.",
    "rootCause": "Worker did not recognize shallow sumps < 1.5m depth as legally defined confined spaces.",
    "severity": 3,
    "probability": 3,
    "potentialConsequence": "Loss of consciousness from hydrocarbon vapor inhalation falling into oily water sump.",
    "evidenceHighlight": "bent his torso through the grating opening into a 1.5-meter-deep oily water drainage sump to retrieve a fallen measuring tape",
    "aiExplanation": "Breaking the plane of an un-tested sump exposes personnel to toxic gas pockets (such as H2S and VOCs). Flagged for review to assess whether ambient wind dispersion reduced hazardous exposure.",
    "attachments": [
      {
        "name": "rpt-016_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-016_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-017",
    "reportType": "UC",
    "date": "2026-05-16",
    "location": "Digboi Refinery Unit 3",
    "site": "Digboi Refinery Unit 3",
    "field": "Digboi",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Pending",
    "title": "Mobile crane outrigger pad sank into saturated soil during 14-ton valve lift",
    "description": "A 50-ton hydraulic mobile crane was lifting a 14-ton pig trap valve manifold at Sadiya Heavy Crane Loading Wharf during monsoon rains. The rear-right outrigger timber pad sank 25 cm into uncompacted silty soil, causing the boom angle to tip 6 degrees off-axis towards the active riverbank.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting"
    ],
    "reportedBy": "Sanjib Kalita (HSE Auditor)",
    "department": "Pipeline",
    "recommendedAction": "Mandate engineered crane mats >= 2.5m\u00b2 and dynamic soil penetrometer testing before crane setup.",
    "rootCause": "Ground bearing capacity was not measured following 48 hours of continuous heavy rainfall.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Catastrophic crane overturn resulting in operator fatality and structural damage to river wharf.",
    "evidenceHighlight": "rear-right outrigger timber pad sank 25 cm into uncompacted silty soil, causing the boom angle to tip 6 degrees off-axis towards the active riverbank",
    "aiExplanation": "Loss of crane ground stability during heavy picks introduces severe boom collapse and overturning potential. IOGP Rule #5 requires verified ground bearing capacity and engineered steel outrigger mats. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-017_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-017_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-018",
    "reportType": "NM",
    "date": "2026-05-15",
    "location": "Sadiya Gas Booster Pad #1",
    "site": "Sadiya Gas Booster Pad #1",
    "field": "Sadiya",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 90,
    "confidenceScore": 0.9,
    "status": "Confirmed",
    "title": "Synthetic web sling wrapped around sharp flange edges without corner softeners",
    "description": "Riggers at Duliajan Workshop & Rig Yard rigged an 8-ton compressor cylinder casting using a 10-ton polyester webbing sling. The sling was choked directly against sharp 90-degree machined steel flange corners without wear pads, cut-protection sleeves, or rubber corner softeners.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Mridul Deka (Well Services Supervisor)",
    "department": "Maintenance",
    "recommendedAction": "Destroy frayed synthetic sling; mandate magnetic corner softeners on all machined component picks.",
    "rootCause": "Riggers failed to retrieve magnetic polyurethane softeners from tool container to save time.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Sudden dropped load crushing nearby riggers and destroying 8-ton compressor component.",
    "evidenceHighlight": "sling was choked directly against sharp 90-degree machined steel flange corners without wear pads, cut-protection sleeves, or rubber corner softeners",
    "aiExplanation": "Direct contact between high-tension synthetic webbing and unrounded steel corners causes instantaneous fiber shearing under dynamic load. Rigging failure results in uncontrolled dropped loads. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-018_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-018_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-018_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-019",
    "reportType": "NM",
    "date": "2026-05-14",
    "location": "Duliajan Workshop & Rig Yard",
    "site": "Duliajan Workshop & Rig Yard",
    "field": "Duliajan",
    "activity": "Drilling Mast Hoisting",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 96,
    "confidenceScore": 0.96,
    "status": "Confirmed",
    "title": "Crown block traveling block hook safety latch spring found missing during pipe pickup",
    "description": "During casing running operations on Digboi Wellhead Rig #4, a drill crew attached an elevator link bight to the main 250-ton hook. Upon lifting the 16-ton string, the safety retention latch pin vibrated free because the retention cotter pin had been replaced with an unapproved piece of soft copper wire.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Nabajyoti Nath (Rotating Equipment Lead)",
    "department": "Drilling",
    "recommendedAction": "Immediate stand-down; replace hook latch assembly with OEM certified locking mechanism.",
    "rootCause": "Improvised field repair using soft copper wire instead of hardened stainless steel cotter pin.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic drop of 16-ton casing string into drill wellbore causing derrick failure and fatalities.",
    "evidenceHighlight": "safety retention latch pin vibrated free because the retention cotter pin had been replaced with an unapproved piece of soft copper wire",
    "aiExplanation": "Defeat of primary safety retention latches on main drilling traveling hooks creates extreme risk of elevator disengagement. Dislodging a 16-ton casing string would obliterate the drill floor. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-019_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-019_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-019_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-020",
    "reportType": "UC",
    "date": "2026-05-13",
    "location": "Naharkatia Oil Well #41",
    "site": "Naharkatia Oil Well #41",
    "field": "Naharkatia",
    "activity": "Warehouse Rigging & Storage",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 56,
    "confidenceScore": 0.56,
    "status": "Rejected",
    "title": "1-ton chain hoist hook latch missing safety spring in workshop tool bay",
    "description": "An inspection in Duliajan Workshop & Rig Yard identified a small manual 1-ton chain hoist used for lifting light gearbox covers that had a broken hook latch spring. The hoist was hanging on a storage rack and was not connected to an active load.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting"
    ],
    "reportedBy": "Hemanta Hazarika (Boiler Inspection Officer)",
    "department": "Maintenance",
    "recommendedAction": "Quarantine hoist for repair and replace safety latch kit.",
    "rootCause": "Normal wear and tear of mechanical spring on manual chain block hook.",
    "severity": 2,
    "probability": 2,
    "potentialConsequence": "Minor foot contusion if hook dislodges while positioning light gearbox cover.",
    "evidenceHighlight": "small manual 1-ton chain hoist used for lifting light gearbox covers that had a broken hook latch spring. The hoist was hanging on a storage rack",
    "aiExplanation": "Defect discovered during routine tool rack audit before active rigging operations commenced. Load capacity is low (1 ton) and unit was unassigned. Non-SIF classification.",
    "attachments": [
      {
        "name": "rpt-020_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-020_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-021",
    "reportType": "UA",
    "date": "2026-05-12",
    "location": "Moran Flow Station 3",
    "site": "Moran Flow Station 3",
    "field": "Moran",
    "activity": "Compressor Packing Inspection",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Atmospheric Hazard",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Confirmed",
    "title": "H2S gas detector horn silenced without donning escape SCBA pack",
    "description": "A control room gas alarm sounded for 18 ppm H2S at Moran Gas Compressor Station A rod gland packing. A field technician entered the compressor shed and manually acknowledged the local horn at the panel before putting on his emergency escape self-contained breathing apparatus (SCBA).",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Devajit Barua (Drilling Supervisor)",
    "department": "Workover",
    "recommendedAction": "Recalibrate gas optical sensors; conduct unannounced toxic gas SCBA donning audit.",
    "rootCause": "Complacency due to frequent sensor calibration drift alarms in gas compressor bay.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal acute hydrogen sulfide neurotoxicity and respiratory paralysis.",
    "evidenceHighlight": "entered the compressor shed and manually acknowledged the local horn at the panel before putting on his emergency escape self-contained breathing apparatus",
    "aiExplanation": "H2S concentrations exceeding 10 ppm cause rapid olfactory fatigue and pulmonary edema; at >100 ppm, sudden knockdown and death occur. Entering a confirmed H2S alarm zone without respiratory protection is a critical Life-Saving Rule breach. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-021_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-021_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-021_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-022",
    "reportType": "UA",
    "date": "2026-05-11",
    "location": "Jorajan Crude Storage Battery",
    "site": "Jorajan Crude Storage Battery",
    "field": "Jorajan",
    "activity": "Acid Gas Flare Line Servicing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Atmospheric Hazard",
    "confidence": 90,
    "confidenceScore": 0.9,
    "status": "Confirmed",
    "title": "Pin-hole sour gas condensate leak detected on low-point drain flange",
    "description": "During ultrasonic thickness gauging on Digboi Acid Gas Flare Line, technicians discovered a pin-hole leak spraying an aerosolized mist of sour hydrocarbon condensate containing 350 ppm H2S. The prevailing wind was carrying the vapor plume across the primary personnel muster path.",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bipul Chetia (Integrity Engineer)",
    "department": "Production",
    "recommendedAction": "Depressurize line and install engineered carbon fiber clamp enclosure; replace piping spool with Inconel.",
    "rootCause": "Severe internal microbial and acid gas under-deposit corrosion on carbon steel drain line.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Mass toxic gas exposure and fatal knockdown of personnel navigating muster walkway.",
    "evidenceHighlight": "pin-hole leak spraying an aerosolized mist of sour hydrocarbon condensate containing 350 ppm H2S. The prevailing wind was carrying the vapor plume across the primary personnel muster path",
    "aiExplanation": "Exposure to 350 ppm H2S causes immediate loss of consciousness and permanent neurological impairment within minutes. The proximity to the primary evacuation pathway elevates the risk to plant-wide personnel. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-022_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-022_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-022_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-023",
    "reportType": "UC",
    "date": "2026-05-10",
    "location": "Digboi Acid Gas Flare Line",
    "site": "Digboi Acid Gas Flare Line",
    "field": "Digboi",
    "activity": "Chemical & Mud Handling",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Atmospheric Hazard",
    "confidence": 89,
    "confidenceScore": 0.89,
    "status": "Pending",
    "title": "Caustic soda bag burst above mud mixing hopper with eyewash water frozen",
    "description": "While blending drilling mud chemicals at Duliajan Well Pad #104, a 25kg paper sack of dry caustic soda pellets tore violently against the hopper blade, creating an airborne chemical cloud. The derrickman rushed to the safety eyewash shower only to discover the supply valve was shut off for piping maintenance.",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure"
    ],
    "reportedBy": "Manas Pratim Das (Safety Officer)",
    "department": "Drilling",
    "recommendedAction": "Institute daily physical eyewash flow verification tags; provide full face shield with air hood.",
    "rootCause": "Eyewash supply valve isolated during morning maintenance without safety signage or backup shower.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Permanent bilateral ocular chemical blindness and deep chemical facial burns.",
    "evidenceHighlight": "25kg paper sack of dry caustic soda pellets tore violently against the hopper blade, creating an airborne chemical cloud. The derrickman rushed to the safety eyewash shower only to discover the supply valve was shut off",
    "aiExplanation": "Severe chemical caustic exposure to eyes causes irreversible corneal liquefactive necrosis and permanent blindness within 15 seconds. Inoperable emergency wash showers directly compromise post-incident mitigation barriers. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-023_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-023_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-024",
    "reportType": "UC",
    "date": "2026-05-09",
    "location": "Sadiya High-Pressure Valve Station",
    "site": "Sadiya High-Pressure Valve Station",
    "field": "Sadiya",
    "activity": "Laboratory Testing & Sampling",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Atmospheric Hazard",
    "confidence": 64,
    "confidenceScore": 0.64,
    "status": "Confirmed",
    "title": "Fume hood sash counterweight stuck open 5cm at Jorajan sample lab",
    "description": "A fume hood used for routine Reid Vapor Pressure (RVP) testing at Jorajan Crude Storage Battery lab had a jammed sash pulley, preventing complete closure by 5 cm. Ambient ventilation in the lab maintained face velocity within legal thresholds.",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure"
    ],
    "reportedBy": "Kishore Sarmah (Senior Electrical Engineer)",
    "department": "Production",
    "recommendedAction": "Realign sash counterweight wire rope and service guide tracks.",
    "rootCause": "Fume hood sash wire pulley jumped groove.",
    "severity": 1,
    "probability": 2,
    "potentialConsequence": "Minor hydrocarbon odor nuisance without toxic atmospheric exceedance.",
    "evidenceHighlight": "fume hood used for routine Reid Vapor Pressure (RVP) testing at Jorajan Crude Storage Battery lab had a jammed sash pulley, preventing complete closure by 5 cm",
    "aiExplanation": "Lab exhaust fan was verified running with adequate face velocity (>100 FPM). Petroleum samples handled are small volume (<500ml) with no high-toxicity components. Non-SIF classification.",
    "attachments": [
      {
        "name": "rpt-024_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-024_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-025",
    "reportType": "NM",
    "date": "2026-05-08",
    "location": "Duliajan Oil Dispatch Terminal",
    "site": "Duliajan Oil Dispatch Terminal",
    "field": "Duliajan",
    "activity": "Welding & Hot Work",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Hot Work",
    "confidence": 95,
    "confidenceScore": 0.95,
    "status": "Confirmed",
    "title": "Oxy-acetylene cutting performed within 3 meters of open drain with unsealed water seal",
    "description": "Contract welders at Moran Flow Station 3 initiated oxy-acetylene torch cutting on a structural pipe support directly over a plant hydrocarbon drainage funnel. Molten cutting slag showered onto the drain grating where the liquid flame arrestor water seal was dry and venting combustible crude gas.",
    "lsrViolated": "Hot Work",
    "iogpRules": [
      "Hot Work",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Anupam Gohain (Operations Lead)",
    "department": "Maintenance",
    "recommendedAction": "Stop hot work permit; install fire-resistant neoprene drain covers and flood water seals.",
    "rootCause": "Dry fire watch was not assigned; gas test was conducted 10m away instead of at drain throat.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Flash explosion in underground oily water sewer network erupting through plant manholes.",
    "evidenceHighlight": "torch cutting on a structural pipe support directly over a plant hydrocarbon drainage funnel. Molten cutting slag showered onto the drain grating where the liquid flame arrestor water seal was dry",
    "aiExplanation": "Introducing ignition sources directly over live hydrocarbon drain systems violates IOGP Rule #4 and OISD-STD-105. Underground sewer fires propagate rapidly back into process vessels. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-025_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-025_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-025_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-026",
    "reportType": "UA",
    "date": "2026-05-07",
    "location": "Naharkatia Water Injection Facility",
    "site": "Naharkatia Water Injection Facility",
    "field": "Naharkatia",
    "activity": "Welding & Hot Work",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Hot Work",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Pending",
    "title": "Acetylene cylinder valve stem leaked ignited flare during manifold tie-in",
    "description": "During pipeline tie-in welding at Sadiya River Crossing Trench B, an acetylene gas bottle cylinder valve gland packing caught fire due to a loose valve spindle. The 1-meter jet flame impinged against an adjacent full oxygen cylinder before welders extinguished it with dry chemical powder.",
    "lsrViolated": "Hot Work",
    "iogpRules": [
      "Hot Work",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Rupjyoti Hazarika (HSE Specialist)",
    "department": "Pipeline",
    "recommendedAction": "Inspect and hydrostatic test all gas bottles; install fire-wall divider between oxygen and acetylene carts.",
    "rootCause": "Cylinder was dropped during transport, damaging brass gland nut on acetylene valve.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic oxygen bottle rupture causing supersonic blast wave and fragmentation fatalities.",
    "evidenceHighlight": "acetylene gas bottle cylinder valve gland packing caught fire due to a loose valve spindle. The 1-meter jet flame impinged against an adjacent full oxygen cylinder",
    "aiExplanation": "Direct flame impingement on pressurized high-pressure oxygen cylinders causes BLEVE (Boiling Liquid Expanding Vapor Explosion) and massive metal fragmentation. High SIF classification justified due to extreme escalation potential.",
    "attachments": [
      {
        "name": "rpt-026_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-026_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-026_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-027",
    "reportType": "NM",
    "date": "2026-05-06",
    "location": "Moran Wellhead Rig #12",
    "site": "Moran Wellhead Rig #12",
    "field": "Moran",
    "activity": "Excavation & Trenching",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Confirmed",
    "title": "Excavator bucket tooth struck live 11kV underground electrical feeder",
    "description": "A heavy hydraulic tracked excavator digging a 2-meter pipeline trench at Naharkatia Substation 33kV snagged an armored 11kV electrical feeder cable. The excavator tooth severed the outer PVC armor sheath without penetrating the inner insulation core, avoiding instantaneous electrical detonation.",
    "lsrViolated": "Bypassing Safety Controls",
    "iogpRules": [
      "Bypassing Safety Controls",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Tapan Phukan (Rigging Superintendent)",
    "department": "Pipeline",
    "recommendedAction": "Mandate GPR (Ground Penetrating Radar) survey and hand-digging within 2 meters of underground utilities.",
    "rootCause": "Failure to utilize cable locator tool or dig manual trial trenches prior to mechanized excavation.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal high-voltage electrocution of operator and underground cable explosion.",
    "evidenceHighlight": "tracked excavator digging a 2-meter pipeline trench at Naharkatia Substation 33kV snagged an armored 11kV electrical feeder cable. The excavator tooth severed the outer PVC armor sheath",
    "aiExplanation": "Striking energized high-voltage cables with heavy machinery generates severe electrical explosion, ground fault flashover, and electrocution risks. Operating mechanical excavators without manual trial pits violates OISD GDN-166. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-027_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-027_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-027_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-028",
    "reportType": "UC",
    "date": "2026-05-05",
    "location": "Jorajan Gas Metering Skid",
    "site": "Jorajan Gas Metering Skid",
    "field": "Jorajan",
    "activity": "Work at Height (Derrick & Monkey Board)",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 97,
    "confidenceScore": 0.97,
    "status": "Confirmed",
    "title": "Derrickman unhooked safety lanyard at 24m elevation during pipe-racking cycle",
    "description": "During tripping-out operations on Derrick Rig #4 at Digboi, a derrickman unhooked his twin-leg safety lanyard at an elevation of 24 meters to cross over to the monkey board. He failed to latch the second carabiner hook to the static horizontal lifeline, leaving him unclipped for approximately 45 seconds directly over the open drill floor with no secondary fall protection in place.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Pranjal Borah (Field Chemist)",
    "department": "Drilling",
    "recommendedAction": "Suspend elevated work permit; retrofit self-retracting lifeline (SRL) with dual interlocked carabiners.",
    "rootCause": "Operator rushed pipe racking cycle to meet trip schedule; anchor line out of ergonomic reach.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal deceleration trauma resulting from uncontrolled 24m free-fall onto steel drill floor rotary table.",
    "evidenceHighlight": "unhooked his twin-leg safety lanyard at an elevation of 24 meters to cross over to the monkey board",
    "aiExplanation": "Free-fall from 24m elevation represents an unmitigated gravitational hazard capable of fatal trauma. The intentional removal of 100% tie-off violates IOGP Rule #2 and OISD GDN-166. Classified as High SIF Potential due to complete absence of defensive barrier redundancy.",
    "attachments": [
      {
        "name": "rpt-028_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-028_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-028_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-029",
    "reportType": "UC",
    "date": "2026-05-04",
    "location": "Digboi Drill Floor Cellar #9",
    "site": "Digboi Drill Floor Cellar #9",
    "field": "Digboi",
    "activity": "Scaffolding Erection & Inspection",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Work at Height",
    "confidence": 90,
    "confidenceScore": 0.9,
    "status": "Pending",
    "title": "Unsecured scaffolding planks shifted during high-level valve servicing",
    "description": "Maintenance technicians accessed an elevated staging platform at 8 meters on Moran Gas Compressor Station A without toe-boards or retaining clamps. Two wooden scaffold boards shifted under load, creating a 40cm gap directly above live high-pressure compressor discharge piping.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height"
    ],
    "reportedBy": "Diganta Neog (Mechanical Maintenance Lead)",
    "department": "Maintenance",
    "recommendedAction": "Dismantle defective bay; enforce scaffold green-tag inspection permit before each work shift.",
    "rootCause": "Scaffold altered by third-party contractor without inspection or re-tagging by scaffold supervisor.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Fall from 8m causing severe vertebral fracture and collateral impact with live compressor piping.",
    "evidenceHighlight": "Two wooden scaffold boards shifted under load, creating a 40cm gap directly above live high-pressure compressor discharge piping",
    "aiExplanation": "Structural instability on temporary access platforms at height presents direct fall and dropped object hazards. OISD STD-166 requires certified green tags and locked toe-boards. The missing plank clamps combined with 8m elevation warrants High SIF classification.",
    "attachments": [
      {
        "name": "rpt-029_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-029_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-030",
    "reportType": "UA",
    "date": "2026-05-03",
    "location": "Sadiya Heavy Crane Loading Wharf",
    "site": "Sadiya Heavy Crane Loading Wharf",
    "field": "Sadiya",
    "activity": "Flare Stack Tip Servicing",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Work at Height",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Rejected",
    "title": "Dropped 12-inch adjustable spanner narrowly missed technician beneath flare ladder",
    "description": "A contract rigger ascending the vertical ladder on Sadiya Gas Booster flare stack dropped an un-tethered 12-inch adjustable spanner from 18 meters. The tool deflected off an intermediate rest platform and struck the concrete grade just 1 meter away from a junior technician inspecting the ignition pilot.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height"
    ],
    "reportedBy": "Kaushik Saikia (Process Safety Specialist)",
    "department": "Maintenance",
    "recommendedAction": "Mandate 100% tool tethering protocol and barricade 15m radius drop zone beneath elevated works.",
    "rootCause": "Failure to utilize tool pouches and tool retention lanyards while climbing vertical caged ladder.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Fatal blunt force craniocerebral trauma caused by 18m dropped metallic object.",
    "evidenceHighlight": "dropped an un-tethered 12-inch adjustable spanner from 18 meters. The tool deflected off an intermediate rest platform and struck the concrete grade just 1 meter away",
    "aiExplanation": "Dropped objects from elevated industrial structures carry lethal kinetic energy (exceeding 120 Joules). The lack of tool lanyards breaches Dropped Object Prevention Scheme (DROPS) standards. Classified as SIF Near Miss due to narrow spatial miss.",
    "attachments": [
      {
        "name": "rpt-030_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-030_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-031",
    "reportType": "UA",
    "date": "2026-04-29",
    "location": "Duliajan Crude Distillation Skid",
    "site": "Duliajan Crude Distillation Skid",
    "field": "Duliajan",
    "activity": "Well Servicing & Mast Lowering",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Work at Height",
    "confidence": 82,
    "confidenceScore": 0.82,
    "status": "Confirmed",
    "title": "Contractor standing on mast ladder cage without safety harness connected",
    "description": "During mast preparation at Naharkatia Oil Well #41, a roustabout climbed to 4 meters on the exterior ladder cage to untie guy wire turnbuckles without fastening his harness lanyard. He claimed the cage provided adequate collective protection for short-duration tasks.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height"
    ],
    "reportedBy": "Dipankar Sarmah (Pipeline Integrity Lead)",
    "department": "Workover",
    "recommendedAction": "Provide certified vertical glide cable fall-arresters on all mobile workover rig mast ladders.",
    "rootCause": "Misunderstanding of fall arrest regulations regarding ladder cages versus active tie-off.",
    "severity": 3,
    "probability": 3,
    "potentialConsequence": "Fall from 4m resulting in lower extremity fractures or head concussion on rig sub-base steel.",
    "evidenceHighlight": "climbed to 4 meters on the exterior ladder cage to untie guy wire turnbuckles without fastening his harness lanyard",
    "aiExplanation": "Although enclosed ladder cages provide lateral containment, they do not arrest downward vertical falls. OISD guidelines require positive tie-off above 1.8m. Flagged for review to assess whether fall arrester installation was feasible.",
    "attachments": [
      {
        "name": "rpt-031_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-031_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-032",
    "reportType": "NM",
    "date": "2026-04-28",
    "location": "Naharkatia Effluent Pit #3",
    "site": "Naharkatia Effluent Pit #3",
    "field": "Naharkatia",
    "activity": "Energy Isolation (LOTO)",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 96,
    "confidenceScore": 0.96,
    "status": "Pending",
    "title": "Crude booster pump seal overhaul initiated without mechanical slip blinds installed",
    "description": "Maintenance technicians at Moran GGS-1 commenced mechanical seal replacement on crude booster pump P-102B without positive isolation. Although an electrical breaker lockout padlock was applied, the suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Debananda Phukan (Production Chemist)",
    "department": "Production",
    "recommendedAction": "Enforce mandatory slip blind verification checklist with signature from Area Production In-Charge.",
    "rootCause": "Technicians skipped blinding requirement citing short 2-hour seal replacement duration.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Pressurized hydrocarbon jet spray causing chemical eye burns, vapor cloud flash fire, or flange projectile strike.",
    "evidenceHighlight": "suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing",
    "aiExplanation": "Positive isolation requires double block and bleed with verified mechanical blinding under IOGP Rule #1 and OISD STD-105. Relying on single closed block valves for hydrocarbon envelopes creates severe blowout and fire risks. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-032_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-032_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-032_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-033",
    "reportType": "UC",
    "date": "2026-04-25",
    "location": "Moran High-Pressure Gas Dehydration Unit",
    "site": "Moran High-Pressure Gas Dehydration Unit",
    "field": "Moran",
    "activity": "Electrical Substation Maintenance",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 97,
    "confidenceScore": 0.97,
    "status": "Confirmed",
    "title": "Electrician racked out 6.6kV breaker without verifying de-energized busbar state",
    "description": "At Duliajan Central Gas Gathering Station 6.6kV substation, an electrical technician engaged the manual racking handle to withdraw feeder cubicle breaker CB-04 without using a high-voltage proximity probe to verify zero energy. Subsequent testing revealed the incoming busbar was still energized at 6,600 Volts due to an automated tie-breaker transfer.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bhaskar Jyoti Dutta (Instrumentation Engineer)",
    "department": "Electrical",
    "recommendedAction": "Retrofit mechanical door interlocks preventing cubicle opening unless busbar earthing switch is made.",
    "rootCause": "Failure to execute live-line proximity voltage test; assumed tie-breaker was in open position.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic 6.6kV arc-flash blast causing fatal thermal incinerations, blast lung injury, and switchgear destruction.",
    "evidenceHighlight": "withdraw feeder cubicle breaker CB-04 without using a high-voltage proximity probe to verify zero energy. Subsequent testing revealed the incoming busbar was still energized at 6,600 Volts",
    "aiExplanation": "Intervention on live medium/high voltage equipment without verified test-before-touch creates catastrophic arc-flash exposure. Arc flash energy at 6.6kV causes severe third-degree thermal burns and fatal blast concussions. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-033_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-033_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-033_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-034",
    "reportType": "UA",
    "date": "2026-04-22",
    "location": "Jorajan Pipeline Trunkline Manifold",
    "site": "Jorajan Pipeline Trunkline Manifold",
    "field": "Jorajan",
    "activity": "Gas Compressor Overhaul",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 90,
    "confidenceScore": 0.9,
    "status": "Confirmed",
    "title": "Gas valve handle nudged open by passing scaffold pole while technicians opened manifold",
    "description": "While fitters were unbolting a spool piece on Duliajan CPF Compressor #2, a scaffolding crew passing through the aisle bumped the lever of an un-locked 4-inch fuel gas ball valve. The valve cracked open 15 degrees, releasing pressurized sweet natural gas directly into the unventilated compressor bay before being hastily closed.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Rituraj Gogoi (Electrical Tech)",
    "department": "Maintenance",
    "recommendedAction": "Install lockable clamshell handle covers on all fuel gas block valves in compressor enclosures.",
    "rootCause": "Valve was tagged with paper card but lacked mechanical cable lockout clamp or handle removal.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Vapor cloud ignition causing enclosed building overpressure explosion and fatal thermal burns.",
    "evidenceHighlight": "bumped the lever of an un-locked 4-inch fuel gas ball valve. The valve cracked open 15 degrees, releasing pressurized sweet natural gas directly into the unventilated compressor bay",
    "aiExplanation": "Unsecured valve handles on hazardous gas lines violate LOTO principles requiring physical locking devices. Gas accumulation in enclosed compressor bays presents immediate deflagration hazard upon finding an ignition source. Classified as SIF Near Miss.",
    "attachments": [
      {
        "name": "rpt-034_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-034_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-034_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-035",
    "reportType": "UA",
    "date": "2026-04-20",
    "location": "Digboi Thermal Recovery Boiler",
    "site": "Digboi Thermal Recovery Boiler",
    "field": "Digboi",
    "activity": "Pipeline Pigging Operation",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Energy Isolation",
    "confidence": 95,
    "confidenceScore": 0.95,
    "status": "Pending",
    "title": "Technician loosened pig receiver door clamp screws before opening barrel drain",
    "description": "At Sadiya Pipeline Spool 9, a pipeline operator began loosening the quick-opening closure clamp bolts on an 18-inch crude pig receiver barrel while the barrel pressure gauge still indicated 45 PSI. The interlock vent valve had not been opened, and the operator assumed the zero reading on an upstream skid gauge applied to the barrel.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation"
    ],
    "reportedBy": "Anup Bordoloi (Rig Mechanic)",
    "department": "Pipeline",
    "recommendedAction": "Install mechanical key interlock (Trapped Key Interlock) between receiver vent valve and door latch.",
    "rootCause": "Failure to follow step-by-step pig receiver depressurization procedure and check local barrel gauge.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Violent projectile release of 18-inch steel door closure and pressurized crude slug striking operator.",
    "evidenceHighlight": "loosening the quick-opening closure clamp bolts on an 18-inch crude pig receiver barrel while the barrel pressure gauge still indicated 45 PSI",
    "aiExplanation": "Quick-opening closures on pressurized hydrocarbon pipelines have severe history of fatal door blowouts. Under IOGP Rule #1 and ASME Sec VIII, safety warning screws and vent interlocks must be fully verified. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-035_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-035_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-036",
    "reportType": "UC",
    "date": "2026-04-18",
    "location": "Sadiya Remote Wellhead Cluster 14",
    "site": "Sadiya Remote Wellhead Cluster 14",
    "field": "Sadiya",
    "activity": "Hydrostatic Pressure Testing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 90,
    "confidenceScore": 0.9,
    "status": "Confirmed",
    "title": "Unrestrained 3000 PSI high-pressure flexible test hose in rig cellar",
    "description": "During a 3000 PSI hydrostatic pressure test of wellhead manifold at Digboi Drill Floor Cellar #9, the high-pressure test hose safety whip-check cable was left disconnected at the cellar pump manifold fitting. Technicians were observing pressure rise within 1.5 meters of the unanchored flexible high-pressure hose.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Pallab Baruah (Drill Site Manager)",
    "department": "Pipeline",
    "recommendedAction": "Mandate certified continuous steel whip-socks on all hoses >= 1000 PSI and establish 10m exclusion zone.",
    "rootCause": "Whip check cable clip was corroded and discarded without replacing prior to test pressurization.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Lethal whipping hose impact or subcutaneous high-pressure hydrocarbon liquid injection.",
    "evidenceHighlight": "high-pressure test hose safety whip-check cable was left disconnected at the cellar pump manifold fitting. Technicians were observing pressure rise within 1.5 meters",
    "aiExplanation": "High-pressure hose failure without whip restraint generates violent flailing motion capable of fatal blunt force trauma and fluid injection. Positioning personnel within blast radius during active pressure test violates Line of Fire LSR. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-036_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-036_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-036_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-037",
    "reportType": "UA",
    "date": "2026-04-15",
    "location": "Duliajan CPF Compressor #2",
    "site": "Duliajan CPF Compressor #2",
    "field": "Duliajan",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 91,
    "confidenceScore": 0.91,
    "status": "Confirmed",
    "title": "Rigger positioned directly beneath 4-ton suspended heat exchanger tube bundle",
    "description": "During maintenance overhaul at Naharkatia Separation Plant, a mobile crane was slewing a 4-ton shell-and-tube heat exchanger bundle over the laydown deck. A rigger stepped beneath the suspended load to manually guide the tail into alignment using his bare hands rather than employing tag lines.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Sanjib Kalita (HSE Auditor)",
    "department": "Maintenance",
    "recommendedAction": "Stop-work authority exercised; provide rigid non-conductive tag poles and retrain rigging crew.",
    "rootCause": "Lack of push-pull safety sticks and tag lines on site; rigger took shortcut to save alignment time.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal crushing and traumatic asphyxiation resulting from catastrophic dropped heavy load.",
    "evidenceHighlight": "stepped beneath the suspended load to manually guide the tail into alignment using his bare hands rather than employing tag lines",
    "aiExplanation": "Standing beneath suspended loads constitutes direct violation of IOGP Life-Saving Rule #5. In the event of sling failure or hydraulic brake slip, survivability beneath a 4-ton load is virtually zero. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-037_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-037_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-037_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-038",
    "reportType": "UC",
    "date": "2026-04-12",
    "location": "Naharkatia Separation Plant",
    "site": "Naharkatia Separation Plant",
    "field": "Naharkatia",
    "activity": "Drilling & Tripping Pipe",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 95,
    "confidenceScore": 0.95,
    "status": "Pending",
    "title": "Rotary tong backup snub line snapped under 12,000 ft-lbs make-up torque",
    "description": "During casing make-up on Moran Wellhead Rig #12, the backup snub line cable parted violently under 12,000 ft-lbs breakout torque on 9-5/8 inch casing. The parted wire rope whip struck the derrick leg steel flange inches from the lead tong operator who had stepped clear into the designated green zone just seconds prior.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Mridul Deka (Well Services Supervisor)",
    "department": "Drilling",
    "recommendedAction": "Condemn snub line; install load-cell torque limiter and mandate pre-shift magnetic wire inspection.",
    "rootCause": "Snub line was damaged by internal strand corrosion concealed beneath outer grease coating.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Fatal blunt impact and decapitating trauma from severed high-tension rotary tong steel wire cable.",
    "evidenceHighlight": "backup snub line cable parted violently under 12,000 ft-lbs breakout torque on 9-5/8 inch casing. The parted wire rope whip struck the derrick leg steel flange inches from the lead tong operator",
    "aiExplanation": "Parted rotary tong cables release immense stored elastic energy. Personnel inside the rotary sweep circle are exposed to lethal lacerations and blunt trauma. High SIF classification justified due to near-fatal trajectory.",
    "attachments": [
      {
        "name": "rpt-038_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-038_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-038_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-039",
    "reportType": "NM",
    "date": "2026-04-10",
    "location": "Moran Gas Compressor Station A",
    "site": "Moran Gas Compressor Station A",
    "field": "Moran",
    "activity": "Vehicular & Heavy Equipment Transit",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Line of Fire",
    "confidence": 63,
    "confidenceScore": 0.63,
    "status": "Confirmed",
    "title": "Forklift reversing alarm inaudible inside Jorajan warehouse pump bay",
    "description": "During offloading of palletized valve spares at Jorajan Gas Turbine Power Hub, the acoustic back-up beeper on a 3-ton warehouse forklift was observed to be muffled by road mud and inaudible over ambient turbine roar.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire"
    ],
    "reportedBy": "Nabajyoti Nath (Rotating Equipment Lead)",
    "department": "Production",
    "recommendedAction": "Clean and test reversing beeper; install blue LED spot projection safety lamps on forklift mast.",
    "rootCause": "Accumulation of dry road mud inside acoustic sounder horn diaphragm.",
    "severity": 2,
    "probability": 2,
    "potentialConsequence": "Foot or ankle contusion caused by low-speed reversing forklift.",
    "evidenceHighlight": "acoustic back-up beeper on a 3-ton warehouse forklift was observed to be muffled by road mud and inaudible over ambient turbine roar",
    "aiExplanation": "While forklift pedestrian collisions can be hazardous, operating speeds in this warehouse zone are restricted to 5 km/h with low pedestrian density and designated walkways. Classified as Non-SIF condition.",
    "attachments": [
      {
        "name": "rpt-039_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-039_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-040",
    "reportType": "UA",
    "date": "2026-04-05",
    "location": "Jorajan Flow Station #2",
    "site": "Jorajan Flow Station #2",
    "field": "Jorajan",
    "activity": "Tank Cleaning & Internal Entry",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Confined Space",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Rejected",
    "title": "Contractor entered crude storage tank without continuous gas detector or standby watch",
    "description": "A contract tank cleaner entered crude storage tank T-104 at Jorajan Crude Storage Battery to inspect sludge accumulation on bottom baffles. Atmospheric testing had only been completed 4 hours prior, the external standby attendant was away fetching floodlights, and the entrant carried no personal four-gas monitor.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space"
    ],
    "reportedBy": "Hemanta Hazarika (Boiler Inspection Officer)",
    "department": "Production",
    "recommendedAction": "Revoke contractor permit; institute digital RFID badge gate with interlocking air ventilation sensor.",
    "rootCause": "Attendant left post to expedite lighting setup; entrant proceeded without secondary barrier check.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal acute asphyxiation or H2S toxicity leading to sudden collapse in enclosed vessel.",
    "evidenceHighlight": "entered crude storage tank T-104 at Jorajan Crude Storage Battery to inspect sludge accumulation on bottom baffles. Atmospheric testing had only been completed 4 hours prior, the external standby attendant was away",
    "aiExplanation": "Entering hydrocarbon storage tanks without verified continuous atmosphere testing or standby watch is among the top historical causes of multi-fatality HSE incidents. Heavy volatile gases re-evolve rapidly from disturbed bottom sludge. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-040_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-040_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-041",
    "reportType": "UC",
    "date": "2026-04-02",
    "location": "Digboi Wellhead Rig #4",
    "site": "Digboi Wellhead Rig #4",
    "field": "Digboi",
    "activity": "Confined Space Entry",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Confined Space",
    "confidence": 90,
    "confidenceScore": 0.9,
    "status": "Pending",
    "title": "Air ventilation fan duct slipped out of production separator manway neck",
    "description": "During internal inspection of production separator V-301 at Duliajan Central Gas Gathering Station, the flexible ducting of an electric air mover disconnected from the top manway nozzle. Air exchange inside the 12m vessel dropped to zero while two internal inspectors were scraping internal sand weirs.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space"
    ],
    "reportedBy": "Devajit Barua (Drilling Supervisor)",
    "department": "Maintenance",
    "recommendedAction": "Use heavy-duty steel worm gear clamps to lock air ducts to vessel entry flanges.",
    "rootCause": "Ventilation duct was tied with plastic cable zip-ties which melted against warm vessel shell.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Progressive hypoxia and carbon monoxide/hydrocarbon vapor narcosis inside vessel.",
    "evidenceHighlight": "flexible ducting of an electric air mover disconnected from the top manway nozzle. Air exchange inside the 12m vessel dropped to zero while two internal inspectors were scraping internal sand weirs",
    "aiExplanation": "Loss of forced ventilation in enclosed vessels quickly causes oxygen depletion and toxic gas re-accumulation. OISD-STD-105 mandates positive mechanical duct anchoring and independent continuous extraction monitors. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-041_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-041_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-042",
    "reportType": "UA",
    "date": "2026-03-29",
    "location": "Sadiya Pipeline Spool 9",
    "site": "Sadiya Pipeline Spool 9",
    "field": "Sadiya",
    "activity": "Culvert & Deep Trench Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 89,
    "confidenceScore": 0.89,
    "status": "Confirmed",
    "title": "Winch cable snapped on tripod rescue harness during emergency drill in valve pit",
    "description": "During a planned emergency response evacuation drill from a 4-meter-deep concrete valve chamber at Sadiya High-Pressure Valve Station, the retrieval wire on the confined space tripod winch snapped under test weight. The dummy mannequin dropped 2.5 meters to the pit floor.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bipul Chetia (Integrity Engineer)",
    "department": "Pipeline",
    "recommendedAction": "Quarantine rescue tripod; recertify all rescue winches across field with full proof-load tests.",
    "rootCause": "Winch internal brake mechanism jammed due to neglected bi-annual third-party load proof certification.",
    "severity": 5,
    "probability": 2,
    "potentialConsequence": "Fatal suspension trauma or secondary blunt impact from failure of emergency extraction hoist.",
    "evidenceHighlight": "retrieval wire on the confined space tripod winch snapped under test weight. The dummy mannequin dropped 2.5 meters to the pit floor",
    "aiExplanation": "Failure of emergency retrieval equipment directly breaches survival barriers in confined spaces where self-rescue is impossible. If an unconscious worker had been on the line, secondary impact trauma would have occurred. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-042_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-042_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-042_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-043",
    "reportType": "UC",
    "date": "2026-03-26",
    "location": "Duliajan Central Gas Gathering Station",
    "site": "Duliajan Central Gas Gathering Station",
    "field": "Duliajan",
    "activity": "Underground Drainage Inspection",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Confined Space",
    "confidence": 73,
    "confidenceScore": 0.73,
    "status": "Confirmed",
    "title": "Civil worker lowered head into oily water sump without gas clearance test",
    "description": "At Naharkatia Effluent Pit #3, a civil contractor bent his torso through the grating opening into a 1.5-meter-deep oily water drainage sump to retrieve a fallen measuring tape. The pit receives oily runoff and was not cleared by safety for atmospheric entry.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space"
    ],
    "reportedBy": "Manas Pratim Das (Safety Officer)",
    "department": "Production",
    "recommendedAction": "Install safety warning stencils on all plant sumps defining them as permit-required confined spaces.",
    "rootCause": "Worker did not recognize shallow sumps < 1.5m depth as legally defined confined spaces.",
    "severity": 3,
    "probability": 3,
    "potentialConsequence": "Loss of consciousness from hydrocarbon vapor inhalation falling into oily water sump.",
    "evidenceHighlight": "bent his torso through the grating opening into a 1.5-meter-deep oily water drainage sump to retrieve a fallen measuring tape",
    "aiExplanation": "Breaking the plane of an un-tested sump exposes personnel to toxic gas pockets (such as H2S and VOCs). Flagged for review to assess whether ambient wind dispersion reduced hazardous exposure.",
    "attachments": [
      {
        "name": "rpt-043_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-043_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-044",
    "reportType": "UC",
    "date": "2026-03-22",
    "location": "Naharkatia Substation 33kV",
    "site": "Naharkatia Substation 33kV",
    "field": "Naharkatia",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 96,
    "confidenceScore": 0.96,
    "status": "Pending",
    "title": "Mobile crane outrigger pad sank into saturated soil during 14-ton valve lift",
    "description": "A 50-ton hydraulic mobile crane was lifting a 14-ton pig trap valve manifold at Sadiya Heavy Crane Loading Wharf during monsoon rains. The rear-right outrigger timber pad sank 25 cm into uncompacted silty soil, causing the boom angle to tip 6 degrees off-axis towards the active riverbank.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Kishore Sarmah (Senior Electrical Engineer)",
    "department": "Pipeline",
    "recommendedAction": "Mandate engineered crane mats >= 2.5m\u00b2 and dynamic soil penetrometer testing before crane setup.",
    "rootCause": "Ground bearing capacity was not measured following 48 hours of continuous heavy rainfall.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Catastrophic crane overturn resulting in operator fatality and structural damage to river wharf.",
    "evidenceHighlight": "rear-right outrigger timber pad sank 25 cm into uncompacted silty soil, causing the boom angle to tip 6 degrees off-axis towards the active riverbank",
    "aiExplanation": "Loss of crane ground stability during heavy picks introduces severe boom collapse and overturning potential. IOGP Rule #5 requires verified ground bearing capacity and engineered steel outrigger mats. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-044_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-044_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-044_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-045",
    "reportType": "UA",
    "date": "2026-03-18",
    "location": "Moran GGS-1 Manifold",
    "site": "Moran GGS-1 Manifold",
    "field": "Moran",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Confirmed",
    "title": "Synthetic web sling wrapped around sharp flange edges without corner softeners",
    "description": "Riggers at Duliajan Workshop & Rig Yard rigged an 8-ton compressor cylinder casting using a 10-ton polyester webbing sling. The sling was choked directly against sharp 90-degree machined steel flange corners without wear pads, cut-protection sleeves, or rubber corner softeners.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Anupam Gohain (Operations Lead)",
    "department": "Maintenance",
    "recommendedAction": "Destroy frayed synthetic sling; mandate magnetic corner softeners on all machined component picks.",
    "rootCause": "Riggers failed to retrieve magnetic polyurethane softeners from tool container to save time.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Sudden dropped load crushing nearby riggers and destroying 8-ton compressor component.",
    "evidenceHighlight": "sling was choked directly against sharp 90-degree machined steel flange corners without wear pads, cut-protection sleeves, or rubber corner softeners",
    "aiExplanation": "Direct contact between high-tension synthetic webbing and unrounded steel corners causes instantaneous fiber shearing under dynamic load. Rigging failure results in uncontrolled dropped loads. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-045_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-045_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-045_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-046",
    "reportType": "NM",
    "date": "2026-03-15",
    "location": "Jorajan Gas Turbine Power Hub",
    "site": "Jorajan Gas Turbine Power Hub",
    "field": "Jorajan",
    "activity": "Drilling Mast Hoisting",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Confirmed",
    "title": "Crown block traveling block hook safety latch spring found missing during pipe pickup",
    "description": "During casing running operations on Digboi Wellhead Rig #4, a drill crew attached an elevator link bight to the main 250-ton hook. Upon lifting the 16-ton string, the safety retention latch pin vibrated free because the retention cotter pin had been replaced with an unapproved piece of soft copper wire.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Rupjyoti Hazarika (HSE Specialist)",
    "department": "Drilling",
    "recommendedAction": "Immediate stand-down; replace hook latch assembly with OEM certified locking mechanism.",
    "rootCause": "Improvised field repair using soft copper wire instead of hardened stainless steel cotter pin.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic drop of 16-ton casing string into drill wellbore causing derrick failure and fatalities.",
    "evidenceHighlight": "safety retention latch pin vibrated free because the retention cotter pin had been replaced with an unapproved piece of soft copper wire",
    "aiExplanation": "Defeat of primary safety retention latches on main drilling traveling hooks creates extreme risk of elevator disengagement. Dislodging a 16-ton casing string would obliterate the drill floor. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-046_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-046_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-046_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-047",
    "reportType": "UC",
    "date": "2026-03-10",
    "location": "Digboi Historic Production Well #18",
    "site": "Digboi Historic Production Well #18",
    "field": "Digboi",
    "activity": "Warehouse Rigging & Storage",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 60,
    "confidenceScore": 0.6,
    "status": "Pending",
    "title": "1-ton chain hoist hook latch missing safety spring in workshop tool bay",
    "description": "An inspection in Duliajan Workshop & Rig Yard identified a small manual 1-ton chain hoist used for lifting light gearbox covers that had a broken hook latch spring. The hoist was hanging on a storage rack and was not connected to an active load.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting"
    ],
    "reportedBy": "Tapan Phukan (Rigging Superintendent)",
    "department": "Maintenance",
    "recommendedAction": "Quarantine hoist for repair and replace safety latch kit.",
    "rootCause": "Normal wear and tear of mechanical spring on manual chain block hook.",
    "severity": 2,
    "probability": 2,
    "potentialConsequence": "Minor foot contusion if hook dislodges while positioning light gearbox cover.",
    "evidenceHighlight": "small manual 1-ton chain hoist used for lifting light gearbox covers that had a broken hook latch spring. The hoist was hanging on a storage rack",
    "aiExplanation": "Defect discovered during routine tool rack audit before active rigging operations commenced. Load capacity is low (1 ton) and unit was unassigned. Non-SIF classification.",
    "attachments": [
      {
        "name": "rpt-047_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-047_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-048",
    "reportType": "UC",
    "date": "2026-03-05",
    "location": "Sadiya River Crossing Trench B",
    "site": "Sadiya River Crossing Trench B",
    "field": "Sadiya",
    "activity": "Compressor Packing Inspection",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Atmospheric Hazard",
    "confidence": 95,
    "confidenceScore": 0.95,
    "status": "Confirmed",
    "title": "H2S gas detector horn silenced without donning escape SCBA pack",
    "description": "A control room gas alarm sounded for 18 ppm H2S at Moran Gas Compressor Station A rod gland packing. A field technician entered the compressor shed and manually acknowledged the local horn at the panel before putting on his emergency escape self-contained breathing apparatus (SCBA).",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Pranjal Borah (Field Chemist)",
    "department": "Workover",
    "recommendedAction": "Recalibrate gas optical sensors; conduct unannounced toxic gas SCBA donning audit.",
    "rootCause": "Complacency due to frequent sensor calibration drift alarms in gas compressor bay.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal acute hydrogen sulfide neurotoxicity and respiratory paralysis.",
    "evidenceHighlight": "entered the compressor shed and manually acknowledged the local horn at the panel before putting on his emergency escape self-contained breathing apparatus",
    "aiExplanation": "H2S concentrations exceeding 10 ppm cause rapid olfactory fatigue and pulmonary edema; at >100 ppm, sudden knockdown and death occur. Entering a confirmed H2S alarm zone without respiratory protection is a critical Life-Saving Rule breach. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-048_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-048_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-048_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-049",
    "reportType": "UC",
    "date": "2026-02-27",
    "location": "Duliajan Well Pad #104",
    "site": "Duliajan Well Pad #104",
    "field": "Duliajan",
    "activity": "Acid Gas Flare Line Servicing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Atmospheric Hazard",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Confirmed",
    "title": "Pin-hole sour gas condensate leak detected on low-point drain flange",
    "description": "During ultrasonic thickness gauging on Digboi Acid Gas Flare Line, technicians discovered a pin-hole leak spraying an aerosolized mist of sour hydrocarbon condensate containing 350 ppm H2S. The prevailing wind was carrying the vapor plume across the primary personnel muster path.",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Diganta Neog (Mechanical Maintenance Lead)",
    "department": "Production",
    "recommendedAction": "Depressurize line and install engineered carbon fiber clamp enclosure; replace piping spool with Inconel.",
    "rootCause": "Severe internal microbial and acid gas under-deposit corrosion on carbon steel drain line.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Mass toxic gas exposure and fatal knockdown of personnel navigating muster walkway.",
    "evidenceHighlight": "pin-hole leak spraying an aerosolized mist of sour hydrocarbon condensate containing 350 ppm H2S. The prevailing wind was carrying the vapor plume across the primary personnel muster path",
    "aiExplanation": "Exposure to 350 ppm H2S causes immediate loss of consciousness and permanent neurological impairment within minutes. The proximity to the primary evacuation pathway elevates the risk to plant-wide personnel. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-049_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-049_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-049_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-050",
    "reportType": "UA",
    "date": "2026-02-23",
    "location": "Naharkatia Gas Lift Manifold",
    "site": "Naharkatia Gas Lift Manifold",
    "field": "Naharkatia",
    "activity": "Chemical & Mud Handling",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Atmospheric Hazard",
    "confidence": 86,
    "confidenceScore": 0.86,
    "status": "Rejected",
    "title": "Caustic soda bag burst above mud mixing hopper with eyewash water frozen",
    "description": "While blending drilling mud chemicals at Duliajan Well Pad #104, a 25kg paper sack of dry caustic soda pellets tore violently against the hopper blade, creating an airborne chemical cloud. The derrickman rushed to the safety eyewash shower only to discover the supply valve was shut off for piping maintenance.",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure"
    ],
    "reportedBy": "Kaushik Saikia (Process Safety Specialist)",
    "department": "Drilling",
    "recommendedAction": "Institute daily physical eyewash flow verification tags; provide full face shield with air hood.",
    "rootCause": "Eyewash supply valve isolated during morning maintenance without safety signage or backup shower.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Permanent bilateral ocular chemical blindness and deep chemical facial burns.",
    "evidenceHighlight": "25kg paper sack of dry caustic soda pellets tore violently against the hopper blade, creating an airborne chemical cloud. The derrickman rushed to the safety eyewash shower only to discover the supply valve was shut off",
    "aiExplanation": "Severe chemical caustic exposure to eyes causes irreversible corneal liquefactive necrosis and permanent blindness within 15 seconds. Inoperable emergency wash showers directly compromise post-incident mitigation barriers. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-050_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-050_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-051",
    "reportType": "UC",
    "date": "2026-02-19",
    "location": "Moran Early Production Facility",
    "site": "Moran Early Production Facility",
    "field": "Moran",
    "activity": "Laboratory Testing & Sampling",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Atmospheric Hazard",
    "confidence": 61,
    "confidenceScore": 0.61,
    "status": "Confirmed",
    "title": "Fume hood sash counterweight stuck open 5cm at Jorajan sample lab",
    "description": "A fume hood used for routine Reid Vapor Pressure (RVP) testing at Jorajan Crude Storage Battery lab had a jammed sash pulley, preventing complete closure by 5 cm. Ambient ventilation in the lab maintained face velocity within legal thresholds.",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure"
    ],
    "reportedBy": "Dipankar Sarmah (Pipeline Integrity Lead)",
    "department": "Production",
    "recommendedAction": "Realign sash counterweight wire rope and service guide tracks.",
    "rootCause": "Fume hood sash wire pulley jumped groove.",
    "severity": 1,
    "probability": 2,
    "potentialConsequence": "Minor hydrocarbon odor nuisance without toxic atmospheric exceedance.",
    "evidenceHighlight": "fume hood used for routine Reid Vapor Pressure (RVP) testing at Jorajan Crude Storage Battery lab had a jammed sash pulley, preventing complete closure by 5 cm",
    "aiExplanation": "Lab exhaust fan was verified running with adequate face velocity (>100 FPM). Petroleum samples handled are small volume (<500ml) with no high-toxicity components. Non-SIF classification.",
    "attachments": [
      {
        "name": "rpt-051_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-051_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-052",
    "reportType": "UA",
    "date": "2026-02-15",
    "location": "Jorajan Well Cluster #7",
    "site": "Jorajan Well Cluster #7",
    "field": "Jorajan",
    "activity": "Welding & Hot Work",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Hot Work",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Confirmed",
    "title": "Oxy-acetylene cutting performed within 3 meters of open drain with unsealed water seal",
    "description": "Contract welders at Moran Flow Station 3 initiated oxy-acetylene torch cutting on a structural pipe support directly over a plant hydrocarbon drainage funnel. Molten cutting slag showered onto the drain grating where the liquid flame arrestor water seal was dry and venting combustible crude gas.",
    "lsrViolated": "Hot Work",
    "iogpRules": [
      "Hot Work",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Debananda Phukan (Production Chemist)",
    "department": "Maintenance",
    "recommendedAction": "Stop hot work permit; install fire-resistant neoprene drain covers and flood water seals.",
    "rootCause": "Dry fire watch was not assigned; gas test was conducted 10m away instead of at drain throat.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Flash explosion in underground oily water sewer network erupting through plant manholes.",
    "evidenceHighlight": "torch cutting on a structural pipe support directly over a plant hydrocarbon drainage funnel. Molten cutting slag showered onto the drain grating where the liquid flame arrestor water seal was dry",
    "aiExplanation": "Introducing ignition sources directly over live hydrocarbon drain systems violates IOGP Rule #4 and OISD-STD-105. Underground sewer fires propagate rapidly back into process vessels. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-052_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-052_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-052_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-053",
    "reportType": "NM",
    "date": "2026-02-10",
    "location": "Digboi Refinery Unit 3",
    "site": "Digboi Refinery Unit 3",
    "field": "Digboi",
    "activity": "Welding & Hot Work",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Hot Work",
    "confidence": 91,
    "confidenceScore": 0.91,
    "status": "Pending",
    "title": "Acetylene cylinder valve stem leaked ignited flare during manifold tie-in",
    "description": "During pipeline tie-in welding at Sadiya River Crossing Trench B, an acetylene gas bottle cylinder valve gland packing caught fire due to a loose valve spindle. The 1-meter jet flame impinged against an adjacent full oxygen cylinder before welders extinguished it with dry chemical powder.",
    "lsrViolated": "Hot Work",
    "iogpRules": [
      "Hot Work"
    ],
    "reportedBy": "Bhaskar Jyoti Dutta (Instrumentation Engineer)",
    "department": "Pipeline",
    "recommendedAction": "Inspect and hydrostatic test all gas bottles; install fire-wall divider between oxygen and acetylene carts.",
    "rootCause": "Cylinder was dropped during transport, damaging brass gland nut on acetylene valve.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic oxygen bottle rupture causing supersonic blast wave and fragmentation fatalities.",
    "evidenceHighlight": "acetylene gas bottle cylinder valve gland packing caught fire due to a loose valve spindle. The 1-meter jet flame impinged against an adjacent full oxygen cylinder",
    "aiExplanation": "Direct flame impingement on pressurized high-pressure oxygen cylinders causes BLEVE (Boiling Liquid Expanding Vapor Explosion) and massive metal fragmentation. High SIF classification justified due to extreme escalation potential.",
    "attachments": [
      {
        "name": "rpt-053_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-053_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-054",
    "reportType": "UA",
    "date": "2026-02-05",
    "location": "Sadiya Gas Booster Pad #1",
    "site": "Sadiya Gas Booster Pad #1",
    "field": "Sadiya",
    "activity": "Excavation & Trenching",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 97,
    "confidenceScore": 0.97,
    "status": "Confirmed",
    "title": "Excavator bucket tooth struck live 11kV underground electrical feeder",
    "description": "A heavy hydraulic tracked excavator digging a 2-meter pipeline trench at Naharkatia Substation 33kV snagged an armored 11kV electrical feeder cable. The excavator tooth severed the outer PVC armor sheath without penetrating the inner insulation core, avoiding instantaneous electrical detonation.",
    "lsrViolated": "Bypassing Safety Controls",
    "iogpRules": [
      "Bypassing Safety Controls",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Rituraj Gogoi (Electrical Tech)",
    "department": "Pipeline",
    "recommendedAction": "Mandate GPR (Ground Penetrating Radar) survey and hand-digging within 2 meters of underground utilities.",
    "rootCause": "Failure to utilize cable locator tool or dig manual trial trenches prior to mechanized excavation.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal high-voltage electrocution of operator and underground cable explosion.",
    "evidenceHighlight": "tracked excavator digging a 2-meter pipeline trench at Naharkatia Substation 33kV snagged an armored 11kV electrical feeder cable. The excavator tooth severed the outer PVC armor sheath",
    "aiExplanation": "Striking energized high-voltage cables with heavy machinery generates severe electrical explosion, ground fault flashover, and electrocution risks. Operating mechanical excavators without manual trial pits violates OISD GDN-166. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-054_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-054_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-054_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-055",
    "reportType": "UA",
    "date": "2026-01-28",
    "location": "Duliajan Workshop & Rig Yard",
    "site": "Duliajan Workshop & Rig Yard",
    "field": "Duliajan",
    "activity": "Work at Height (Derrick & Monkey Board)",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Confirmed",
    "title": "Derrickman unhooked safety lanyard at 24m elevation during pipe-racking cycle",
    "description": "During tripping-out operations on Derrick Rig #4 at Digboi, a derrickman unhooked his twin-leg safety lanyard at an elevation of 24 meters to cross over to the monkey board. He failed to latch the second carabiner hook to the static horizontal lifeline, leaving him unclipped for approximately 45 seconds directly over the open drill floor with no secondary fall protection in place.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Anup Bordoloi (Rig Mechanic)",
    "department": "Drilling",
    "recommendedAction": "Suspend elevated work permit; retrofit self-retracting lifeline (SRL) with dual interlocked carabiners.",
    "rootCause": "Operator rushed pipe racking cycle to meet trip schedule; anchor line out of ergonomic reach.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal deceleration trauma resulting from uncontrolled 24m free-fall onto steel drill floor rotary table.",
    "evidenceHighlight": "unhooked his twin-leg safety lanyard at an elevation of 24 meters to cross over to the monkey board",
    "aiExplanation": "Free-fall from 24m elevation represents an unmitigated gravitational hazard capable of fatal trauma. The intentional removal of 100% tie-off violates IOGP Rule #2 and OISD GDN-166. Classified as High SIF Potential due to complete absence of defensive barrier redundancy.",
    "attachments": [
      {
        "name": "rpt-055_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-055_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-055_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-056",
    "reportType": "UC",
    "date": "2026-01-24",
    "location": "Naharkatia Oil Well #41",
    "site": "Naharkatia Oil Well #41",
    "field": "Naharkatia",
    "activity": "Scaffolding Erection & Inspection",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Pending",
    "title": "Unsecured scaffolding planks shifted during high-level valve servicing",
    "description": "Maintenance technicians accessed an elevated staging platform at 8 meters on Moran Gas Compressor Station A without toe-boards or retaining clamps. Two wooden scaffold boards shifted under load, creating a 40cm gap directly above live high-pressure compressor discharge piping.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Pallab Baruah (Drill Site Manager)",
    "department": "Maintenance",
    "recommendedAction": "Dismantle defective bay; enforce scaffold green-tag inspection permit before each work shift.",
    "rootCause": "Scaffold altered by third-party contractor without inspection or re-tagging by scaffold supervisor.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Fall from 8m causing severe vertebral fracture and collateral impact with live compressor piping.",
    "evidenceHighlight": "Two wooden scaffold boards shifted under load, creating a 40cm gap directly above live high-pressure compressor discharge piping",
    "aiExplanation": "Structural instability on temporary access platforms at height presents direct fall and dropped object hazards. OISD STD-166 requires certified green tags and locked toe-boards. The missing plank clamps combined with 8m elevation warrants High SIF classification.",
    "attachments": [
      {
        "name": "rpt-056_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-056_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-056_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-057",
    "reportType": "NM",
    "date": "2026-01-20",
    "location": "Moran Flow Station 3",
    "site": "Moran Flow Station 3",
    "field": "Moran",
    "activity": "Flare Stack Tip Servicing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Work at Height",
    "confidence": 91,
    "confidenceScore": 0.91,
    "status": "Confirmed",
    "title": "Dropped 12-inch adjustable spanner narrowly missed technician beneath flare ladder",
    "description": "A contract rigger ascending the vertical ladder on Sadiya Gas Booster flare stack dropped an un-tethered 12-inch adjustable spanner from 18 meters. The tool deflected off an intermediate rest platform and struck the concrete grade just 1 meter away from a junior technician inspecting the ignition pilot.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Sanjib Kalita (HSE Auditor)",
    "department": "Maintenance",
    "recommendedAction": "Mandate 100% tool tethering protocol and barricade 15m radius drop zone beneath elevated works.",
    "rootCause": "Failure to utilize tool pouches and tool retention lanyards while climbing vertical caged ladder.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Fatal blunt force craniocerebral trauma caused by 18m dropped metallic object.",
    "evidenceHighlight": "dropped an un-tethered 12-inch adjustable spanner from 18 meters. The tool deflected off an intermediate rest platform and struck the concrete grade just 1 meter away",
    "aiExplanation": "Dropped objects from elevated industrial structures carry lethal kinetic energy (exceeding 120 Joules). The lack of tool lanyards breaches Dropped Object Prevention Scheme (DROPS) standards. Classified as SIF Near Miss due to narrow spatial miss.",
    "attachments": [
      {
        "name": "rpt-057_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-057_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-057_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-058",
    "reportType": "UC",
    "date": "2026-01-16",
    "location": "Jorajan Crude Storage Battery",
    "site": "Jorajan Crude Storage Battery",
    "field": "Jorajan",
    "activity": "Well Servicing & Mast Lowering",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Work at Height",
    "confidence": 79,
    "confidenceScore": 0.79,
    "status": "Confirmed",
    "title": "Contractor standing on mast ladder cage without safety harness connected",
    "description": "During mast preparation at Naharkatia Oil Well #41, a roustabout climbed to 4 meters on the exterior ladder cage to untie guy wire turnbuckles without fastening his harness lanyard. He claimed the cage provided adequate collective protection for short-duration tasks.",
    "lsrViolated": "Working at Height",
    "iogpRules": [
      "Working at Height"
    ],
    "reportedBy": "Mridul Deka (Well Services Supervisor)",
    "department": "Workover",
    "recommendedAction": "Provide certified vertical glide cable fall-arresters on all mobile workover rig mast ladders.",
    "rootCause": "Misunderstanding of fall arrest regulations regarding ladder cages versus active tie-off.",
    "severity": 3,
    "probability": 3,
    "potentialConsequence": "Fall from 4m resulting in lower extremity fractures or head concussion on rig sub-base steel.",
    "evidenceHighlight": "climbed to 4 meters on the exterior ladder cage to untie guy wire turnbuckles without fastening his harness lanyard",
    "aiExplanation": "Although enclosed ladder cages provide lateral containment, they do not arrest downward vertical falls. OISD guidelines require positive tie-off above 1.8m. Flagged for review to assess whether fall arrester installation was feasible.",
    "attachments": [
      {
        "name": "rpt-058_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-058_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-059",
    "reportType": "UC",
    "date": "2026-01-12",
    "location": "Digboi Acid Gas Flare Line",
    "site": "Digboi Acid Gas Flare Line",
    "field": "Digboi",
    "activity": "Energy Isolation (LOTO)",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Energy Isolation",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Pending",
    "title": "Crude booster pump seal overhaul initiated without mechanical slip blinds installed",
    "description": "Maintenance technicians at Moran GGS-1 commenced mechanical seal replacement on crude booster pump P-102B without positive isolation. Although an electrical breaker lockout padlock was applied, the suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation"
    ],
    "reportedBy": "Nabajyoti Nath (Rotating Equipment Lead)",
    "department": "Production",
    "recommendedAction": "Enforce mandatory slip blind verification checklist with signature from Area Production In-Charge.",
    "rootCause": "Technicians skipped blinding requirement citing short 2-hour seal replacement duration.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Pressurized hydrocarbon jet spray causing chemical eye burns, vapor cloud flash fire, or flange projectile strike.",
    "evidenceHighlight": "suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing",
    "aiExplanation": "Positive isolation requires double block and bleed with verified mechanical blinding under IOGP Rule #1 and OISD STD-105. Relying on single closed block valves for hydrocarbon envelopes creates severe blowout and fire risks. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-059_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-059_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-060",
    "reportType": "NM",
    "date": "2026-01-08",
    "location": "Sadiya High-Pressure Valve Station",
    "site": "Sadiya High-Pressure Valve Station",
    "field": "Sadiya",
    "activity": "Electrical Substation Maintenance",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Energy Isolation",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Rejected",
    "title": "Electrician racked out 6.6kV breaker without verifying de-energized busbar state",
    "description": "At Duliajan Central Gas Gathering Station 6.6kV substation, an electrical technician engaged the manual racking handle to withdraw feeder cubicle breaker CB-04 without using a high-voltage proximity probe to verify zero energy. Subsequent testing revealed the incoming busbar was still energized at 6,600 Volts due to an automated tie-breaker transfer.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation"
    ],
    "reportedBy": "Hemanta Hazarika (Boiler Inspection Officer)",
    "department": "Electrical",
    "recommendedAction": "Retrofit mechanical door interlocks preventing cubicle opening unless busbar earthing switch is made.",
    "rootCause": "Failure to execute live-line proximity voltage test; assumed tie-breaker was in open position.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic 6.6kV arc-flash blast causing fatal thermal incinerations, blast lung injury, and switchgear destruction.",
    "evidenceHighlight": "withdraw feeder cubicle breaker CB-04 without using a high-voltage proximity probe to verify zero energy. Subsequent testing revealed the incoming busbar was still energized at 6,600 Volts",
    "aiExplanation": "Intervention on live medium/high voltage equipment without verified test-before-touch creates catastrophic arc-flash exposure. Arc flash energy at 6.6kV causes severe third-degree thermal burns and fatal blast concussions. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-060_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-060_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-061",
    "reportType": "NM",
    "date": "2026-05-28",
    "location": "Duliajan Oil Dispatch Terminal",
    "site": "Duliajan Oil Dispatch Terminal",
    "field": "Duliajan",
    "activity": "Gas Compressor Overhaul",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Confirmed",
    "title": "Gas valve handle nudged open by passing scaffold pole while technicians opened manifold",
    "description": "While fitters were unbolting a spool piece on Duliajan CPF Compressor #2, a scaffolding crew passing through the aisle bumped the lever of an un-locked 4-inch fuel gas ball valve. The valve cracked open 15 degrees, releasing pressurized sweet natural gas directly into the unventilated compressor bay before being hastily closed.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Devajit Barua (Drilling Supervisor)",
    "department": "Maintenance",
    "recommendedAction": "Install lockable clamshell handle covers on all fuel gas block valves in compressor enclosures.",
    "rootCause": "Valve was tagged with paper card but lacked mechanical cable lockout clamp or handle removal.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Vapor cloud ignition causing enclosed building overpressure explosion and fatal thermal burns.",
    "evidenceHighlight": "bumped the lever of an un-locked 4-inch fuel gas ball valve. The valve cracked open 15 degrees, releasing pressurized sweet natural gas directly into the unventilated compressor bay",
    "aiExplanation": "Unsecured valve handles on hazardous gas lines violate LOTO principles requiring physical locking devices. Gas accumulation in enclosed compressor bays presents immediate deflagration hazard upon finding an ignition source. Classified as SIF Near Miss.",
    "attachments": [
      {
        "name": "rpt-061_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-061_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-061_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-062",
    "reportType": "UA",
    "date": "2026-05-28",
    "location": "Naharkatia Water Injection Facility",
    "site": "Naharkatia Water Injection Facility",
    "field": "Naharkatia",
    "activity": "Pipeline Pigging Operation",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Energy Isolation",
    "confidence": 92,
    "confidenceScore": 0.92,
    "status": "Pending",
    "title": "Technician loosened pig receiver door clamp screws before opening barrel drain",
    "description": "At Sadiya Pipeline Spool 9, a pipeline operator began loosening the quick-opening closure clamp bolts on an 18-inch crude pig receiver barrel while the barrel pressure gauge still indicated 45 PSI. The interlock vent valve had not been opened, and the operator assumed the zero reading on an upstream skid gauge applied to the barrel.",
    "lsrViolated": "Energy Isolation",
    "iogpRules": [
      "Energy Isolation",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bipul Chetia (Integrity Engineer)",
    "department": "Pipeline",
    "recommendedAction": "Install mechanical key interlock (Trapped Key Interlock) between receiver vent valve and door latch.",
    "rootCause": "Failure to follow step-by-step pig receiver depressurization procedure and check local barrel gauge.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Violent projectile release of 18-inch steel door closure and pressurized crude slug striking operator.",
    "evidenceHighlight": "loosening the quick-opening closure clamp bolts on an 18-inch crude pig receiver barrel while the barrel pressure gauge still indicated 45 PSI",
    "aiExplanation": "Quick-opening closures on pressurized hydrocarbon pipelines have severe history of fatal door blowouts. Under IOGP Rule #1 and ASME Sec VIII, safety warning screws and vent interlocks must be fully verified. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-062_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-062_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-062_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-063",
    "reportType": "UC",
    "date": "2026-05-27",
    "location": "Moran Wellhead Rig #12",
    "site": "Moran Wellhead Rig #12",
    "field": "Moran",
    "activity": "Hydrostatic Pressure Testing",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Confirmed",
    "title": "Unrestrained 3000 PSI high-pressure flexible test hose in rig cellar",
    "description": "During a 3000 PSI hydrostatic pressure test of wellhead manifold at Digboi Drill Floor Cellar #9, the high-pressure test hose safety whip-check cable was left disconnected at the cellar pump manifold fitting. Technicians were observing pressure rise within 1.5 meters of the unanchored flexible high-pressure hose.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Manas Pratim Das (Safety Officer)",
    "department": "Pipeline",
    "recommendedAction": "Mandate certified continuous steel whip-socks on all hoses >= 1000 PSI and establish 10m exclusion zone.",
    "rootCause": "Whip check cable clip was corroded and discarded without replacing prior to test pressurization.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Lethal whipping hose impact or subcutaneous high-pressure hydrocarbon liquid injection.",
    "evidenceHighlight": "high-pressure test hose safety whip-check cable was left disconnected at the cellar pump manifold fitting. Technicians were observing pressure rise within 1.5 meters",
    "aiExplanation": "High-pressure hose failure without whip restraint generates violent flailing motion capable of fatal blunt force trauma and fluid injection. Positioning personnel within blast radius during active pressure test violates Line of Fire LSR. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-063_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-063_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-063_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-064",
    "reportType": "UA",
    "date": "2026-05-27",
    "location": "Jorajan Gas Metering Skid",
    "site": "Jorajan Gas Metering Skid",
    "field": "Jorajan",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Line of Fire",
    "confidence": 88,
    "confidenceScore": 0.88,
    "status": "Confirmed",
    "title": "Rigger positioned directly beneath 4-ton suspended heat exchanger tube bundle",
    "description": "During maintenance overhaul at Naharkatia Separation Plant, a mobile crane was slewing a 4-ton shell-and-tube heat exchanger bundle over the laydown deck. A rigger stepped beneath the suspended load to manually guide the tail into alignment using his bare hands rather than employing tag lines.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Kishore Sarmah (Senior Electrical Engineer)",
    "department": "Maintenance",
    "recommendedAction": "Stop-work authority exercised; provide rigid non-conductive tag poles and retrain rigging crew.",
    "rootCause": "Lack of push-pull safety sticks and tag lines on site; rigger took shortcut to save alignment time.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal crushing and traumatic asphyxiation resulting from catastrophic dropped heavy load.",
    "evidenceHighlight": "stepped beneath the suspended load to manually guide the tail into alignment using his bare hands rather than employing tag lines",
    "aiExplanation": "Standing beneath suspended loads constitutes direct violation of IOGP Life-Saving Rule #5. In the event of sling failure or hydraulic brake slip, survivability beneath a 4-ton load is virtually zero. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-064_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-064_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-064_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-065",
    "reportType": "NM",
    "date": "2026-05-26",
    "location": "Digboi Drill Floor Cellar #9",
    "site": "Digboi Drill Floor Cellar #9",
    "field": "Digboi",
    "activity": "Drilling & Tripping Pipe",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Line of Fire",
    "confidence": 92,
    "confidenceScore": 0.92,
    "status": "Pending",
    "title": "Rotary tong backup snub line snapped under 12,000 ft-lbs make-up torque",
    "description": "During casing make-up on Moran Wellhead Rig #12, the backup snub line cable parted violently under 12,000 ft-lbs breakout torque on 9-5/8 inch casing. The parted wire rope whip struck the derrick leg steel flange inches from the lead tong operator who had stepped clear into the designated green zone just seconds prior.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire"
    ],
    "reportedBy": "Anupam Gohain (Operations Lead)",
    "department": "Drilling",
    "recommendedAction": "Condemn snub line; install load-cell torque limiter and mandate pre-shift magnetic wire inspection.",
    "rootCause": "Snub line was damaged by internal strand corrosion concealed beneath outer grease coating.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Fatal blunt impact and decapitating trauma from severed high-tension rotary tong steel wire cable.",
    "evidenceHighlight": "backup snub line cable parted violently under 12,000 ft-lbs breakout torque on 9-5/8 inch casing. The parted wire rope whip struck the derrick leg steel flange inches from the lead tong operator",
    "aiExplanation": "Parted rotary tong cables release immense stored elastic energy. Personnel inside the rotary sweep circle are exposed to lethal lacerations and blunt trauma. High SIF classification justified due to near-fatal trajectory.",
    "attachments": [
      {
        "name": "rpt-065_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-065_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-066",
    "reportType": "UA",
    "date": "2026-05-26",
    "location": "Sadiya Heavy Crane Loading Wharf",
    "site": "Sadiya Heavy Crane Loading Wharf",
    "field": "Sadiya",
    "activity": "Vehicular & Heavy Equipment Transit",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Line of Fire",
    "confidence": 67,
    "confidenceScore": 0.67,
    "status": "Confirmed",
    "title": "Forklift reversing alarm inaudible inside Jorajan warehouse pump bay",
    "description": "During offloading of palletized valve spares at Jorajan Gas Turbine Power Hub, the acoustic back-up beeper on a 3-ton warehouse forklift was observed to be muffled by road mud and inaudible over ambient turbine roar.",
    "lsrViolated": "Line of Fire",
    "iogpRules": [
      "Line of Fire"
    ],
    "reportedBy": "Rupjyoti Hazarika (HSE Specialist)",
    "department": "Production",
    "recommendedAction": "Clean and test reversing beeper; install blue LED spot projection safety lamps on forklift mast.",
    "rootCause": "Accumulation of dry road mud inside acoustic sounder horn diaphragm.",
    "severity": 2,
    "probability": 2,
    "potentialConsequence": "Foot or ankle contusion caused by low-speed reversing forklift.",
    "evidenceHighlight": "acoustic back-up beeper on a 3-ton warehouse forklift was observed to be muffled by road mud and inaudible over ambient turbine roar",
    "aiExplanation": "While forklift pedestrian collisions can be hazardous, operating speeds in this warehouse zone are restricted to 5 km/h with low pedestrian density and designated walkways. Classified as Non-SIF condition.",
    "attachments": [
      {
        "name": "rpt-066_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-066_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-067",
    "reportType": "NM",
    "date": "2026-05-25",
    "location": "Duliajan Crude Distillation Skid",
    "site": "Duliajan Crude Distillation Skid",
    "field": "Duliajan",
    "activity": "Tank Cleaning & Internal Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 97,
    "confidenceScore": 0.97,
    "status": "Confirmed",
    "title": "Contractor entered crude storage tank without continuous gas detector or standby watch",
    "description": "A contract tank cleaner entered crude storage tank T-104 at Jorajan Crude Storage Battery to inspect sludge accumulation on bottom baffles. Atmospheric testing had only been completed 4 hours prior, the external standby attendant was away fetching floodlights, and the entrant carried no personal four-gas monitor.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Tapan Phukan (Rigging Superintendent)",
    "department": "Production",
    "recommendedAction": "Revoke contractor permit; institute digital RFID badge gate with interlocking air ventilation sensor.",
    "rootCause": "Attendant left post to expedite lighting setup; entrant proceeded without secondary barrier check.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal acute asphyxiation or H2S toxicity leading to sudden collapse in enclosed vessel.",
    "evidenceHighlight": "entered crude storage tank T-104 at Jorajan Crude Storage Battery to inspect sludge accumulation on bottom baffles. Atmospheric testing had only been completed 4 hours prior, the external standby attendant was away",
    "aiExplanation": "Entering hydrocarbon storage tanks without verified continuous atmosphere testing or standby watch is among the top historical causes of multi-fatality HSE incidents. Heavy volatile gases re-evolve rapidly from disturbed bottom sludge. Classified as High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-067_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-067_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-067_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-068",
    "reportType": "UC",
    "date": "2026-05-25",
    "location": "Naharkatia Effluent Pit #3",
    "site": "Naharkatia Effluent Pit #3",
    "field": "Naharkatia",
    "activity": "Confined Space Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 94,
    "confidenceScore": 0.94,
    "status": "Pending",
    "title": "Air ventilation fan duct slipped out of production separator manway neck",
    "description": "During internal inspection of production separator V-301 at Duliajan Central Gas Gathering Station, the flexible ducting of an electric air mover disconnected from the top manway nozzle. Air exchange inside the 12m vessel dropped to zero while two internal inspectors were scraping internal sand weirs.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Pranjal Borah (Field Chemist)",
    "department": "Maintenance",
    "recommendedAction": "Use heavy-duty steel worm gear clamps to lock air ducts to vessel entry flanges.",
    "rootCause": "Ventilation duct was tied with plastic cable zip-ties which melted against warm vessel shell.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Progressive hypoxia and carbon monoxide/hydrocarbon vapor narcosis inside vessel.",
    "evidenceHighlight": "flexible ducting of an electric air mover disconnected from the top manway nozzle. Air exchange inside the 12m vessel dropped to zero while two internal inspectors were scraping internal sand weirs",
    "aiExplanation": "Loss of forced ventilation in enclosed vessels quickly causes oxygen depletion and toxic gas re-accumulation. OISD-STD-105 mandates positive mechanical duct anchoring and independent continuous extraction monitors. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-068_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-068_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-068_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-069",
    "reportType": "NM",
    "date": "2026-05-24",
    "location": "Moran High-Pressure Gas Dehydration Unit",
    "site": "Moran High-Pressure Gas Dehydration Unit",
    "field": "Moran",
    "activity": "Culvert & Deep Trench Entry",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Confined Space",
    "confidence": 86,
    "confidenceScore": 0.86,
    "status": "Confirmed",
    "title": "Winch cable snapped on tripod rescue harness during emergency drill in valve pit",
    "description": "During a planned emergency response evacuation drill from a 4-meter-deep concrete valve chamber at Sadiya High-Pressure Valve Station, the retrieval wire on the confined space tripod winch snapped under test weight. The dummy mannequin dropped 2.5 meters to the pit floor.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Diganta Neog (Mechanical Maintenance Lead)",
    "department": "Pipeline",
    "recommendedAction": "Quarantine rescue tripod; recertify all rescue winches across field with full proof-load tests.",
    "rootCause": "Winch internal brake mechanism jammed due to neglected bi-annual third-party load proof certification.",
    "severity": 5,
    "probability": 2,
    "potentialConsequence": "Fatal suspension trauma or secondary blunt impact from failure of emergency extraction hoist.",
    "evidenceHighlight": "retrieval wire on the confined space tripod winch snapped under test weight. The dummy mannequin dropped 2.5 meters to the pit floor",
    "aiExplanation": "Failure of emergency retrieval equipment directly breaches survival barriers in confined spaces where self-rescue is impossible. If an unconscious worker had been on the line, secondary impact trauma would have occurred. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-069_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-069_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-069_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-070",
    "reportType": "UA",
    "date": "2026-05-23",
    "location": "Jorajan Pipeline Trunkline Manifold",
    "site": "Jorajan Pipeline Trunkline Manifold",
    "field": "Jorajan",
    "activity": "Underground Drainage Inspection",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Confined Space",
    "confidence": 77,
    "confidenceScore": 0.77,
    "status": "Rejected",
    "title": "Civil worker lowered head into oily water sump without gas clearance test",
    "description": "At Naharkatia Effluent Pit #3, a civil contractor bent his torso through the grating opening into a 1.5-meter-deep oily water drainage sump to retrieve a fallen measuring tape. The pit receives oily runoff and was not cleared by safety for atmospheric entry.",
    "lsrViolated": "Confined Space",
    "iogpRules": [
      "Confined Space"
    ],
    "reportedBy": "Kaushik Saikia (Process Safety Specialist)",
    "department": "Production",
    "recommendedAction": "Install safety warning stencils on all plant sumps defining them as permit-required confined spaces.",
    "rootCause": "Worker did not recognize shallow sumps < 1.5m depth as legally defined confined spaces.",
    "severity": 3,
    "probability": 3,
    "potentialConsequence": "Loss of consciousness from hydrocarbon vapor inhalation falling into oily water sump.",
    "evidenceHighlight": "bent his torso through the grating opening into a 1.5-meter-deep oily water drainage sump to retrieve a fallen measuring tape",
    "aiExplanation": "Breaking the plane of an un-tested sump exposes personnel to toxic gas pockets (such as H2S and VOCs). Flagged for review to assess whether ambient wind dispersion reduced hazardous exposure.",
    "attachments": [
      {
        "name": "rpt-070_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-070_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-071",
    "reportType": "UC",
    "date": "2026-05-22",
    "location": "Digboi Thermal Recovery Boiler",
    "site": "Digboi Thermal Recovery Boiler",
    "field": "Digboi",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Review",
    "sifLevel": "Medium",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 93,
    "confidenceScore": 0.93,
    "status": "Pending",
    "title": "Mobile crane outrigger pad sank into saturated soil during 14-ton valve lift",
    "description": "A 50-ton hydraulic mobile crane was lifting a 14-ton pig trap valve manifold at Sadiya Heavy Crane Loading Wharf during monsoon rains. The rear-right outrigger timber pad sank 25 cm into uncompacted silty soil, causing the boom angle to tip 6 degrees off-axis towards the active riverbank.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting"
    ],
    "reportedBy": "Dipankar Sarmah (Pipeline Integrity Lead)",
    "department": "Pipeline",
    "recommendedAction": "Mandate engineered crane mats >= 2.5m\u00b2 and dynamic soil penetrometer testing before crane setup.",
    "rootCause": "Ground bearing capacity was not measured following 48 hours of continuous heavy rainfall.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Catastrophic crane overturn resulting in operator fatality and structural damage to river wharf.",
    "evidenceHighlight": "rear-right outrigger timber pad sank 25 cm into uncompacted silty soil, causing the boom angle to tip 6 degrees off-axis towards the active riverbank",
    "aiExplanation": "Loss of crane ground stability during heavy picks introduces severe boom collapse and overturning potential. IOGP Rule #5 requires verified ground bearing capacity and engineered steel outrigger mats. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-071_incident_photo.jpg",
        "size": "1.2 MB",
        "type": "image"
      },
      {
        "name": "rpt-071_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-072",
    "reportType": "UA",
    "date": "2026-05-21",
    "location": "Sadiya Remote Wellhead Cluster 14",
    "site": "Sadiya Remote Wellhead Cluster 14",
    "field": "Sadiya",
    "activity": "Crane & Rigging Operations",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 91,
    "confidenceScore": 0.91,
    "status": "Confirmed",
    "title": "Synthetic web sling wrapped around sharp flange edges without corner softeners",
    "description": "Riggers at Duliajan Workshop & Rig Yard rigged an 8-ton compressor cylinder casting using a 10-ton polyester webbing sling. The sling was choked directly against sharp 90-degree machined steel flange corners without wear pads, cut-protection sleeves, or rubber corner softeners.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Debananda Phukan (Production Chemist)",
    "department": "Maintenance",
    "recommendedAction": "Destroy frayed synthetic sling; mandate magnetic corner softeners on all machined component picks.",
    "rootCause": "Riggers failed to retrieve magnetic polyurethane softeners from tool container to save time.",
    "severity": 4,
    "probability": 4,
    "potentialConsequence": "Sudden dropped load crushing nearby riggers and destroying 8-ton compressor component.",
    "evidenceHighlight": "sling was choked directly against sharp 90-degree machined steel flange corners without wear pads, cut-protection sleeves, or rubber corner softeners",
    "aiExplanation": "Direct contact between high-tension synthetic webbing and unrounded steel corners causes instantaneous fiber shearing under dynamic load. Rigging failure results in uncontrolled dropped loads. High SIF Potential confirmed.",
    "attachments": [
      {
        "name": "rpt-072_incident_photo.jpg",
        "size": "1.5 MB",
        "type": "image"
      },
      {
        "name": "rpt-072_permit_to_work.pdf",
        "size": "970 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-072_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-073",
    "reportType": "UC",
    "date": "2026-05-20",
    "location": "Duliajan CPF Compressor #2",
    "site": "Duliajan CPF Compressor #2",
    "field": "Duliajan",
    "activity": "Drilling Mast Hoisting",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 97,
    "confidenceScore": 0.97,
    "status": "Confirmed",
    "title": "Crown block traveling block hook safety latch spring found missing during pipe pickup",
    "description": "During casing running operations on Digboi Wellhead Rig #4, a drill crew attached an elevator link bight to the main 250-ton hook. Upon lifting the 16-ton string, the safety retention latch pin vibrated free because the retention cotter pin had been replaced with an unapproved piece of soft copper wire.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Bhaskar Jyoti Dutta (Instrumentation Engineer)",
    "department": "Drilling",
    "recommendedAction": "Immediate stand-down; replace hook latch assembly with OEM certified locking mechanism.",
    "rootCause": "Improvised field repair using soft copper wire instead of hardened stainless steel cotter pin.",
    "severity": 5,
    "probability": 3,
    "potentialConsequence": "Catastrophic drop of 16-ton casing string into drill wellbore causing derrick failure and fatalities.",
    "evidenceHighlight": "safety retention latch pin vibrated free because the retention cotter pin had been replaced with an unapproved piece of soft copper wire",
    "aiExplanation": "Defeat of primary safety retention latches on main drilling traveling hooks creates extreme risk of elevator disengagement. Dislodging a 16-ton casing string would obliterate the drill floor. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-073_incident_photo.jpg",
        "size": "1.8 MB",
        "type": "image"
      },
      {
        "name": "rpt-073_permit_to_work.pdf",
        "size": "640 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-073_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-074",
    "reportType": "NM",
    "date": "2026-05-19",
    "location": "Naharkatia Separation Plant",
    "site": "Naharkatia Separation Plant",
    "field": "Naharkatia",
    "activity": "Warehouse Rigging & Storage",
    "sifPotential": "No",
    "sifLevel": "Low",
    "precursor": "Safe Mechanical Lifting",
    "confidence": 57,
    "confidenceScore": 0.57,
    "status": "Pending",
    "title": "1-ton chain hoist hook latch missing safety spring in workshop tool bay",
    "description": "An inspection in Duliajan Workshop & Rig Yard identified a small manual 1-ton chain hoist used for lifting light gearbox covers that had a broken hook latch spring. The hoist was hanging on a storage rack and was not connected to an active load.",
    "lsrViolated": "Safe Mechanical Lifting",
    "iogpRules": [
      "Safe Mechanical Lifting"
    ],
    "reportedBy": "Rituraj Gogoi (Electrical Tech)",
    "department": "Maintenance",
    "recommendedAction": "Quarantine hoist for repair and replace safety latch kit.",
    "rootCause": "Normal wear and tear of mechanical spring on manual chain block hook.",
    "severity": 2,
    "probability": 2,
    "potentialConsequence": "Minor foot contusion if hook dislodges while positioning light gearbox cover.",
    "evidenceHighlight": "small manual 1-ton chain hoist used for lifting light gearbox covers that had a broken hook latch spring. The hoist was hanging on a storage rack",
    "aiExplanation": "Defect discovered during routine tool rack audit before active rigging operations commenced. Load capacity is low (1 ton) and unit was unassigned. Non-SIF classification.",
    "attachments": [
      {
        "name": "rpt-074_incident_photo.jpg",
        "size": "2.1 MB",
        "type": "image"
      },
      {
        "name": "rpt-074_permit_to_work.pdf",
        "size": "750 KB",
        "type": "pdf"
      }
    ]
  },
  {
    "id": "RPT-075",
    "reportType": "UA",
    "date": "2026-05-18",
    "location": "Moran Gas Compressor Station A",
    "site": "Moran Gas Compressor Station A",
    "field": "Moran",
    "activity": "Compressor Packing Inspection",
    "sifPotential": "Yes",
    "sifLevel": "High",
    "precursor": "Atmospheric Hazard",
    "confidence": 98,
    "confidenceScore": 0.98,
    "status": "Confirmed",
    "title": "H2S gas detector horn silenced without donning escape SCBA pack",
    "description": "A control room gas alarm sounded for 18 ppm H2S at Moran Gas Compressor Station A rod gland packing. A field technician entered the compressor shed and manually acknowledged the local horn at the panel before putting on his emergency escape self-contained breathing apparatus (SCBA).",
    "lsrViolated": "Toxic Gas / Chemical Exposure",
    "iogpRules": [
      "Toxic Gas / Chemical Exposure",
      "Bypassing Safety Controls"
    ],
    "reportedBy": "Anup Bordoloi (Rig Mechanic)",
    "department": "Workover",
    "recommendedAction": "Recalibrate gas optical sensors; conduct unannounced toxic gas SCBA donning audit.",
    "rootCause": "Complacency due to frequent sensor calibration drift alarms in gas compressor bay.",
    "severity": 5,
    "probability": 4,
    "potentialConsequence": "Fatal acute hydrogen sulfide neurotoxicity and respiratory paralysis.",
    "evidenceHighlight": "entered the compressor shed and manually acknowledged the local horn at the panel before putting on his emergency escape self-contained breathing apparatus",
    "aiExplanation": "H2S concentrations exceeding 10 ppm cause rapid olfactory fatigue and pulmonary edema; at >100 ppm, sudden knockdown and death occur. Entering a confirmed H2S alarm zone without respiratory protection is a critical Life-Saving Rule breach. High SIF Potential.",
    "attachments": [
      {
        "name": "rpt-075_incident_photo.jpg",
        "size": "2.4 MB",
        "type": "image"
      },
      {
        "name": "rpt-075_permit_to_work.pdf",
        "size": "860 KB",
        "type": "pdf"
      },
      {
        "name": "rpt-075_barrier_audit.pdf",
        "size": "1.4 MB",
        "type": "pdf"
      }
    ]
  }
];
