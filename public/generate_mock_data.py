import json
import random
from datetime import datetime, timedelta

fields = ["Duliajan", "Digboi", "Moran", "Jorhat", "Kumchai", "Dikom"]
site_templates = {
    "Duliajan": [
        "Duliajan Gas Gathering Station #4",
        "Duliajan Central Production Facility",
        "Duliajan Wellhead Cluster 14",
        "Duliajan Compressor Station #2",
        "Duliajan Pipeline Terminal"
    ],
    "Digboi": [
        "Digboi Refinery Distillation Unit 3",
        "Digboi Cracker Furnace Area",
        "Digboi Heavy Crude Storage Tank T-104",
        "Digboi Effluent Treatment Plant",
        "Digboi Boiler House #2"
    ],
    "Moran": [
        "Moran Wellhead Platform #47",
        "Moran Gas Compressor Station A",
        "Moran Workover Rig #6",
        "Moran Group Gathering Station (GGS-3)",
        "Moran Water Injection Plant"
    ],
    "Jorhat": [
        "Jorhat Deep Drilling Rig #12",
        "Jorhat Mud Logging Unit",
        "Jorhat Substation Yard",
        "Jorhat Flare Stack Line #3",
        "Jorhat Chemical Dosing Skid"
    ],
    "Kumchai": [
        "Kumchai Gas Processing Facility",
        "Kumchai High-Pressure Separator Loop",
        "Kumchai Well #09 Wellhead",
        "Kumchai Condensate Loading Rack",
        "Kumchai Hydrocarbon Manifold"
    ],
    "Dikom": [
        "Dikom Early Production System (EPS-1)",
        "Dikom Oil Gathering Manifold",
        "Dikom Gas Lift Compressor B",
        "Dikom Crude Transfer Pump House",
        "Dikom Well Pad #22"
    ]
}

departments = ["Drilling", "Production", "Pipeline", "Maintenance", "Electrical", "Workover"]

scenarios = [
    {
        "title": "Bypassing high-pressure safety interlock on separator bypass valve",
        "desc": "Operator observed placing a mechanical bypass wedge on the high-pressure relief valve pilot line during line cleaning to avoid automated trip.",
        "precursor": "Bypassing Safety Device",
        "sif": "High",
        "conf": 0.94,
        "lsr": "Bypassing Safety Controls",
        "breached": ["SIS Override without approved MoC", "Absence of designated Area Safety Permit", "Lack of independent risk assessment"],
        "root": "Pressure to meet daily production targets; lack of supervisory physical verification during night shift.",
        "action": "Immediate stop-work order; re-validate instrument bypass logs and retrain operators on OISD-STD-152.",
        "std": "OISD-STD-152 / OSHA 1910.119",
        "sev": 5, "prob": 4
    },
    {
        "title": "Scaffolding dismantled without harness tether at 18m height",
        "desc": "Contractor technician spotted working on rig derrick beam at 18 meters with full body harness unclipped from the retractable lifeline.",
        "precursor": "Working at Height",
        "sif": "High",
        "conf": 0.96,
        "lsr": "Working at Height",
        "breached": ["100% Tie-Off Policy violation", "Missing derrick monkey-board safety latch", "Defective lanyard carabiner clip"],
        "root": "Shortage of dual-lanyard shock absorbers; complacency regarding short-duration tasks at elevation.",
        "action": "Confiscate single-lanyards across the rig; mandate daily pre-climb harness inspection sign-off.",
        "std": "OISD-GDN-192 / OSHA 1926.501",
        "sev": 5, "prob": 4
    },
    {
        "title": "Maintenance commenced on crude transfer line without positive mechanical blinding",
        "desc": "Fitter unbolted flange bolts on 8-inch pressurized crude header relying solely on a leaking butterfly valve without slip blind or LOTO lock.",
        "precursor": "Improper Isolation",
        "sif": "High",
        "conf": 0.98,
        "lsr": "Energy Isolation",
        "breached": ["Absence of physical blind / spectacle flange", "Single valve isolation on hydrocarbon line", "Lockout-Tagout (LOTO) missing"],
        "root": "Inadequate PTW cross-check by isolation authority; failure to perform zero-energy atmospheric pressure bleed.",
        "action": "Suspend maintenance permit; enforce mandatory double block and bleed (DBB) protocol for all live hydrocarbon circuits.",
        "std": "OISD-GDN-169 / OSHA 1910.147",
        "sev": 5, "prob": 4
    },
    {
        "title": "Unrestrained high-pressure flexible hose whip during hydrostatic test",
        "desc": "During 3000 PSI pressure test of choke manifold, high-pressure test hose whip-check safety cable was found unfastened at rig cellar.",
        "precursor": "Line of Fire",
        "sif": "High",
        "conf": 0.92,
        "lsr": "Line of Fire",
        "breached": ["Missing whip-check cable on pressurized connection", "Personnel inside barricaded hydrostatic exclusion zone", "Absence of certified high-pressure hobble clamps"],
        "root": "Third-party contractor overlooked securing safety stockings during rapid pressure rig-up.",
        "action": "Install engineered whip-arrestor socks on all hoses >= 1000 PSI; verify exclusion zone integrity before pressure build-up.",
        "std": "OISD-STD-129 / OSHA 1910.106",
        "sev": 4, "prob": 5
    },
    {
        "title": "Confined space entry into slug catcher without multi-gas test",
        "desc": "Two vessel cleaners stepped inside horizontal slug catcher manway before gas testing for H2S, LEL, and Oxygen deficiency was completed.",
        "precursor": "Atmospheric Hazard",
        "sif": "High",
        "conf": 0.95,
        "lsr": "Confined Space",
        "breached": ["Failure to conduct 4-point atmospheric gas test", "No continuous forced air ventilation fan running", "Attendant absent from vessel manway"],
        "root": "Entry permit was pre-signed by supervisor offsite without verifying continuous gas monitoring instrument.",
        "action": "Revoke entry authorization; implement calibrated personal 4-gas detectors for all entrants and install automated entry turnstile.",
        "std": "OISD-STD-114 / OSHA 1910.146",
        "sev": 5, "prob": 3
    },
    {
        "title": "Winch wire rope frayed during 15-ton tubular lifting operation",
        "desc": "Secondary hoisting wire rope showed broken strands and crushing damage near sheave drum while lifting casing pipe bundle over wellhead.",
        "precursor": "Dropped Object",
        "sif": "High",
        "conf": 0.91,
        "lsr": "Safe Mechanical Lifting",
        "breached": ["Pre-lift visual rigging inspection not logged", "Lifting path traversed directly over active Christmas tree", "Exceeded permissible wire rope fatigue criteria"],
        "root": "Preventative maintenance interval overdue by 45 operating days; rigging supervisor failed to inspect spool drum.",
        "action": "Immediate de-reeving and replacement of wire rope; enforce third-party NDT certification for all rig winches.",
        "std": "OISD-STD-110 / ASME B30.5",
        "sev": 5, "prob": 4
    },
    {
        "title": "Hot grinding work conducted within 3 meters of crude oil sampling point",
        "desc": "Fabrication crew using angle grinder near open bleed valve with spark shower drifting towards active crude oil sampling bottle rack.",
        "precursor": "Line of Fire",
        "sif": "High",
        "conf": 0.93,
        "lsr": "Hot Work",
        "breached": ["No flame-retardant spark containment blanket deployed", "Continuous explosive gas detector (LEL) was switched off", "Hot work permit lacked hydrocarbon isolation validation"],
        "root": "Underestimation of flammability radius during minor pipe-support structural touch-up.",
        "action": "Immediate cessation of hot work; deploy portable pressurized welding habitat for any future hot work in Zone 1 / Zone 2.",
        "std": "OISD-STD-105 / OSHA 1910.252",
        "sev": 5, "prob": 4
    },
    {
        "title": "H2S gas detector alarm silenced without donning SCBA apparatus",
        "desc": "Control room alarm sounded for 12 ppm H2S at compressor packing gland; field operator acknowledged horn without donning escape pack.",
        "precursor": "Atmospheric Hazard",
        "sif": "High",
        "conf": 0.97,
        "lsr": "Toxic Gas / Chemical Exposure",
        "breached": ["Mandatory 30-minute SCBA donning violation", "Failure to evacuate downwind personnel to muster point", "Unverified manual override of siren warning"],
        "root": "False alarm complacency due to frequent intermittent sensor drift; lack of routine live muster drills.",
        "action": "Recalibrate all toxic gas optical sensors; conduct unannounced toxic gas leak emergency drill across all shifts.",
        "std": "OISD-GDN-166 / OSHA 1910.134",
        "sev": 5, "prob": 3
    },
    {
        "title": "Excavation near 16-inch high-pressure trunk pipeline without hand digging",
        "desc": "JCB backhoe bucket was operated within 0.8m of underground live hydrocarbon line without exploratory trial pit or pipe locator scan.",
        "precursor": "Mechanical Failure",
        "sif": "High",
        "conf": 0.89,
        "lsr": "Line of Fire",
        "breached": ["Failure to conduct ultrasonic pipe locator sweep", "Mechanical excavation within 1.5m safe buffer zone", "Pipeline right-of-way permit not endorsed by pipeline manager"],
        "root": "Contractor urgency to finish drainage ditch before heavy monsoon rains; lack of pipeline patrol escort.",
        "action": "Mandate hand digging within 2 meters of marked ROW; conduct mandatory pipeline integrity verification.",
        "std": "OISD-STD-141 / ASME B31.4",
        "sev": 5, "prob": 3
    },
    {
        "title": "Unauthorized personnel inside crane tail-swing radius during skid offloading",
        "desc": "Two rig helpers walked directly behind 50-ton mobile crane counterweight while slewing heavy generator package onto concrete plinth.",
        "precursor": "Line of Fire",
        "sif": "Medium",
        "conf": 0.87,
        "lsr": "Safe Mechanical Lifting",
        "breached": ["Absence of barricade tape around crane slewing perimeter", "Banksman diverted attention to phone call", "Failure to maintain eye contact with crane operator"],
        "root": "Inadequate barricading materials deployed at temporary offloading site; helper inattention.",
        "action": "Deploy magnetic barrier posts around all active slewing cranes; retrain banksmen on non-distraction protocol.",
        "std": "OISD-STD-110 / OSHA 1926.1424",
        "sev": 4, "prob": 3
    },
    {
        "title": "Defective earth continuity bond on fuel dispensing nozzle",
        "desc": "Static grounding wire on diesel transfer nozzle found snapped at terminal lug during tanker refuelling operation.",
        "precursor": "Electrical Hazard",
        "sif": "Medium",
        "conf": 0.85,
        "lsr": "Bypassing Safety Controls",
        "breached": ["Failure of bonding continuity test (< 10 ohms)", "Refueling continued without verified static earthing", "Daily tanker grounding checklist not verified"],
        "root": "Mechanical fatigue of grounding clamp cable caused by vehicle roll-over; poor daily inspection routine.",
        "action": "Replace all static grounding clamps with retractable spring-loaded reels with integrated continuity indicator LEDs.",
        "std": "OISD-STD-110 / NFPA 77",
        "sev": 4, "prob": 3
    },
    {
        "title": "Improper chemical drum stacking in hazardous store warehouse",
        "desc": "Barrels of corrosion inhibitor and demulsifier stacked three tiers high without interlocking pallet dividers on uneven concrete surface.",
        "precursor": "Dropped Object",
        "sif": "Medium",
        "conf": 0.82,
        "lsr": "Toxic Gas / Chemical Exposure",
        "breached": ["Exceeded maximum safe two-tier drum stacking limit", "Absence of spill containment bund integrity", "Incompatible chemicals stored adjacent without barrier"],
        "root": "Warehouse space constraint caused by delayed chemical requisition dispatch.",
        "action": "Re-palletize into two-tier racking systems; inspect epoxy coating of spill containment sump.",
        "std": "OISD-STD-114 / OSHA 1910.120",
        "sev": 3, "prob": 3
    },
    {
        "title": "Loose grating on cellar deck walking platform",
        "desc": "Section of galvanized floor grating on well cellar walkway shifted when stepped upon due to missing clamping saddle clips.",
        "precursor": "Working at Height",
        "sif": "Medium",
        "conf": 0.84,
        "lsr": "Working at Height",
        "breached": ["Missing mechanical hold-down clips", "Pre-shift walkway walkthrough checklist missed loose section", "Absence of high-visibility warning ribbon"],
        "root": "Grating removed during piping bolt inspection and re-laid without securing fastener bolts.",
        "action": "Conduct 100% bolt audit of all rig cellars and elevated platforms; implement paint mark torque verification.",
        "std": "OISD-GDN-192 / OSHA 1910.28",
        "sev": 3, "prob": 4
    },
    {
        "title": "Overdue hydro-test date on breathing air cascade cylinders",
        "desc": "Cascade cylinder bank supplying breathing air to mask manifold had expired 5-year hydraulic pressure stamp by 3 months.",
        "precursor": "Atmospheric Hazard",
        "sif": "Medium",
        "conf": 0.86,
        "lsr": "Toxic Gas / Chemical Exposure",
        "breached": ["Use of out-of-certification pressurized vessel", "Breathing air quality test certificate not displayed", "Inventory management tracking oversight"],
        "root": "Discrepancy in supplier calibration register; logistics delay in cylinder rotation.",
        "action": "Tag out expired cascade bank immediately; mobilize certified mobile hydrostatic testing unit to base.",
        "std": "Gas Cylinder Rules 2016 / OISD-166",
        "sev": 4, "prob": 2
    },
    {
        "title": "Corroded firewater monitor valve handle difficult to operate",
        "desc": "Fire monitor #6 at tank farm perimeter required pipe wrench to rotate due to salt crust and lack of lubrication on swivel joint.",
        "precursor": "Mechanical Failure",
        "sif": "Low",
        "conf": 0.81,
        "lsr": "Bypassing Safety Controls",
        "breached": ["Weekly fire protection equipment operational test neglected", "Swivel joint greasing nipples clogged", "Delayed maintenance work order"],
        "root": "Monsoon weathering and inadequate preventative lubrication PM scheduling.",
        "action": "Service and grease all monitor swivel joints; conduct full flow throw test during Sunday fire drill.",
        "std": "OISD-STD-117",
        "sev": 2, "prob": 3
    },
    {
        "title": "Emergency eyewash station water discolored and low pressure",
        "desc": "Routine audit discovered emergency eyewash station at chemical mixing skid had reddish sediment in first 30 seconds of discharge.",
        "precursor": "Atmospheric Hazard",
        "sif": "Low",
        "conf": 0.78,
        "lsr": "Toxic Gas / Chemical Exposure",
        "breached": ["Weekly eyewash flush inspection skipped for 3 weeks", "In-line strainer clogged with rust particles"],
        "root": "Stagnant potable water dead-leg line; lack of custodial maintenance check.",
        "action": "Flush line completely; install stainless steel filtration mesh and establish digital QR code weekly inspection logging.",
        "std": "ANSI Z358.1 / OISD-114",
        "sev": 2, "prob": 2
    }
]

officers = [
    ("Pranjal Baruah", "Senior Safety Inspector"),
    ("Debojit Gogoi", "HSE Engineer"),
    ("Anamika Saikia", "Process Safety Lead"),
    ("Manoj Kalita", "Drilling HSE Specialist"),
    ("Bikash Sharma", "Senior Rig Safety Officer"),
    ("Rupak Senapati", "Production Safety Coordinator"),
    ("Bipul Chetia", "Pipeline Integrity Engineer"),
    ("Nayan Hazarika", "Field Safety Supervisor")
]

investigators = [
    "Dr. P. K. Saikia (Lead Process Safety Specialist)",
    "Arunav Phukan (Deputy General Manager - HSE)",
    "Kabir Dutta (Principal Pipeline Safety Auditor)",
    "Nilotpal Bora (Head of Drilling Operations & Safety)",
    "Smt. Smita Kakoti (Chief HSE Investigator - Oil India)"
]

report_types = ["UA", "UC", "Near Miss"]
statuses = ["New", "Under Review", "Escalated", "Action Taken", "Closed"]

start_date = datetime(2026, 5, 1)
reports = []

# Generate 78 realistic reports
random.seed(42)

for i in range(1, 79):
    scen = random.choice(scenarios)
    field = random.choice(fields)
    site = random.choice(site_templates[field])
    dept = random.choice(departments)
    rtype = random.choice(report_types)
    officer_name, officer_role = random.choice(officers)
    investigator = random.choice(investigators) if scen["sif"] in ["High", "Medium"] else None
    
    # Days offset within May 2026 (0 to 27)
    day_offset = random.randint(0, 27)
    report_dt = start_date + timedelta(days=day_offset, hours=random.randint(6, 21), minutes=random.randint(0, 59))
    date_str = report_dt.strftime("%Y-%m-%d")
    iso_ts = report_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    
    # Prefix
    type_code = "UA" if rtype == "UA" else ("UC" if rtype == "UC" else "NM")
    report_id = f"OIL-{type_code}-2026-{1000 + i}"
    
    # Status distribution
    if i in [1, 3, 4, 7]:
        status = "New"
    elif i in [2, 5, 8, 9, 12]:
        status = "Under Review"
    elif i in [6, 11, 15] and scen["sif"] == "High":
        status = "Escalated"
    elif i % 3 == 0:
        status = "Action Taken"
    else:
        status = "Closed"
        
    rep = {
        "id": report_id,
        "date": date_str,
        "timestamp": iso_ts,
        "site": site,
        "field": field,
        "department": dept,
        "reportType": rtype,
        "title": scen["title"],
        "description": scen["desc"],
        "precursor": scen["precursor"],
        "sifPotential": scen["sif"],
        "confidenceScore": scen["conf"],
        "lsrViolated": scen["lsr"],
        "status": status,
        "riskRating": {
            "severity": scen["sev"],
            "probability": scen["prob"],
            "score": scen["sev"] * scen["prob"]
        },
        "breachedSafetyControls": scen["breached"],
        "rootCause": scen["root"],
        "recommendedAction": scen["action"],
        "standardReference": scen["std"],
        "reportedBy": f"{officer_name} ({officer_role})",
        "assignedInvestigator": investigator
    }
    reports.append(rep)

# Ensure the exact report from the screenshot OIL-UA-2026-1042 exists with the exact details
for r in reports:
    if r["id"] == "OIL-UA-2026-1042":
        r["site"] = "Moran Wellhead Platform #47"
        r["field"] = "Moran"
        r["department"] = "Production"
        r["reportType"] = "UA"
        r["title"] = "Bypassing high-pressure safety interlock on separator bypass valve"
        r["description"] = "Operator was observed attempting to wire around the high-pressure shutoff interlock on the 3-phase separator test loop to prevent nuisance trips during high flow rate well testing."
        r["precursor"] = "Bypassing Safety Device"
        r["sifPotential"] = "High"
        r["confidenceScore"] = 0.88
        r["lsrViolated"] = "Bypassing Safety Controls"
        r["status"] = "Under Review"
        r["riskRating"] = {"severity": 5, "probability": 4, "score": 20}
        r["breachedSafetyControls"] = [
            "Bypassing Safety Device without formal Management of Change (MoC)",
            "Absence of designated Fire Watch and isolation approval",
            "Permit to Work (PTW) cross-verification lapsed"
        ]
        r["rootCause"] = "Pressure to complete wellhead flow tests before shift handover led operator to implement unauthorized temporary jumper wire."
        r["recommendedAction"] = "Immediately remove temporary bypass; log safety interlock defect in SAP PM; issue safety stand-down across Moran field."
        r["standardReference"] = "OISD-STD-152 / OSHA 1910.119 (PSM)"
        r["reportedBy"] = "Tapan Borah (Senior HSE Officer)"
        r["assignedInvestigator"] = "Dr. P. K. Saikia (Lead Process Safety Specialist)"

# Sort reports descending by date
reports.sort(key=lambda x: x["timestamp"], reverse=True)

with open("public/mock-data.json", "w", encoding="utf-8") as f:
    json.dump(reports, f, indent=2)

print(f"Successfully generated {len(reports)} mock safety reports in public/mock-data.json")
