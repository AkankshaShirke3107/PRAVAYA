'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  Sliders,
  Cpu,
  Bell,
  Database,
  Save,
  RotateCcw,
  ShieldCheck,
  Workflow,
  Radio,
  MapPin,
  Users,
  Plus,
  Search,
  Building2,
  UserPlus,
  Shield,
  ExternalLink,
} from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

// ============================================================================
// DEMO MOCK DATA FOR SITES & ASSETS
// ============================================================================

interface SiteAsset {
  id: string;
  name: string;
  code: string;
  department: string;
  location: string;
  reportCount: number;
  highRiskCount: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
}

const DEMO_SITES: SiteAsset[] = [
  {
    id: 'site-1',
    name: 'Duliajan Main Field',
    code: 'OIL-DLJ-01',
    department: 'Drilling & Well Services',
    location: 'Dibrugarh District, Assam',
    reportCount: 28,
    highRiskCount: 6,
    status: 'Active',
  },
  {
    id: 'site-2',
    name: 'Naharkatia Exploration Site',
    code: 'OIL-NHK-02',
    department: 'Exploration & Production',
    location: 'Dibrugarh District, Assam',
    reportCount: 18,
    highRiskCount: 4,
    status: 'Active',
  },
  {
    id: 'site-3',
    name: 'Moran Field & Rig #4',
    code: 'OIL-MRN-04',
    department: 'Rig Maintenance & Safety',
    location: 'Charaideo District, Assam',
    reportCount: 14,
    highRiskCount: 3,
    status: 'Active',
  },
  {
    id: 'site-4',
    name: 'Digboi Refinery & Tank Farm',
    code: 'OIL-DGB-01',
    department: 'Refinery & Storage Operations',
    location: 'Tinsukia District, Assam',
    reportCount: 8,
    highRiskCount: 1,
    status: 'Active',
  },
  {
    id: 'site-5',
    name: 'Jorajan Production Hub',
    code: 'OIL-JRJ-03',
    department: 'Pipeline Operations',
    location: 'Tinsukia District, Assam',
    reportCount: 5,
    highRiskCount: 1,
    status: 'Active',
  },
  {
    id: 'site-6',
    name: 'Sadiya Outer Basin Station',
    code: 'OIL-SDY-01',
    department: 'Offshore & Outer Field Ops',
    location: 'Sadiya, Assam',
    reportCount: 2,
    highRiskCount: 0,
    status: 'Maintenance',
  },
];

// ============================================================================
// DEMO MOCK DATA FOR USERS & ROLES
// ============================================================================

interface UserRole {
  id: string;
  name: string;
  email: string;
  role:
  | 'HSE Officer'
  | 'Safety Analyst'
  | 'Admin'
  | 'Field Inspector';
  department: string;
  assignedSites: string;
  lastActive: string;
  status: 'Active' | 'Pending Invite' | 'Inactive';
}

const DEMO_USERS: UserRole[] = [
  {
    id: 'user-1',
    name: 'Anupam Sharma',
    email: 'anupam.sharma@oilindia.in',
    role: 'HSE Officer',
    department: 'Corporate HSE Safety Cell',
    assignedSites: 'Duliajan Main Field, Naharkatia',
    lastActive: 'Today, 14:32',
    status: 'Active',
  },
  {
    id: 'user-2',
    name: 'Rita Gogoi',
    email: 'rita.gogoi@oilindia.in',
    role: 'Safety Analyst',
    department: 'SIF Screening & Analytics',
    assignedSites: 'All Assam Operating Fields',
    lastActive: 'Today, 12:15',
    status: 'Active',
  },
  {
    id: 'user-3',
    name: 'Manoj Baruah',
    email: 'manoj.baruah@oilindia.in',
    role: 'Field Inspector',
    department: 'Drilling & Well Safety',
    assignedSites: 'Moran Field & Rig #4',
    lastActive: 'Yesterday, 17:40',
    status: 'Active',
  },
  {
    id: 'user-4',
    name: 'Pranjal Das',
    email: 'pranjal.das@oilindia.in',
    role: 'HSE Officer',
    department: 'Refinery Safety Ops',
    assignedSites: 'Digboi Refinery & Storage',
    lastActive: 'Sep 12, 2026',
    status: 'Active',
  },
  {
    id: 'user-5',
    name: 'Devajit Saikia',
    email: 'devajit.saikia@oilindia.in',
    role: 'Admin',
    department: 'IT & Enterprise Systems',
    assignedSites: 'Corporate Headquarters (Duliajan)',
    lastActive: 'Today, 09:10',
    status: 'Active',
  },
  {
    id: 'user-6',
    name: 'Nilakshi Phukan',
    email: 'nilakshi.phukan@oilindia.in',
    role: 'Safety Analyst',
    department: 'Environmental Compliance',
    assignedSites: 'Jorajan & Sadiya Stations',
    lastActive: 'Sep 10, 2026',
    status: 'Pending Invite',
  },
];

// ============================================================================
// VIEW 1: SITES & ASSETS
// ============================================================================

function SitesAssetsView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = DEMO_SITES.filter(
    (site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9DDE0] pb-5">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#102F3E] text-white">
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#17202A] sm:text-2xl">
                Operational Sites &amp; Assets
              </h1>

              <Badge
                variant="outline"
                className="border-[#D9DDE0] text-[#17202A] bg-white text-[10px] font-semibold"
              >
                Oil India Field Register
              </Badge>
            </div>

            <p className="text-xs text-[#667085] mt-1 font-normal">
              Oil India Limited • Production fields, exploration
              installations, refineries, and asset monitoring locations
            </p>
          </div>
        </div>

        <Button
          onClick={() =>
            toast.info('Onboard Operational Site', {
              description:
                'Site onboarding workflow initiated. Contact Asset Safety Admin.',
            })
          }
          className="text-xs h-8 bg-[#102F3E] hover:bg-[#082735] text-white gap-1.5 self-start md:self-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Operational Site
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="panel-card panel-accent-navy bg-white">
          <CardContent className="p-4">
            <span className="text-[11px] font-semibold text-[#667085] block uppercase">
              Monitored Operating Sites
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#102F3E]">
                {DEMO_SITES.length}
              </span>

              <span className="text-[10px] text-[#2E7D32] font-semibold">
                (100% Active Coverage)
              </span>
            </div>

            <p className="text-[11px] text-[#667085] mt-1">
              Assam hydrocarbon corridor
            </p>
          </CardContent>
        </Card>

        <Card className="panel-card panel-accent-teal bg-white">
          <CardContent className="p-4">
            <span className="text-[11px] font-semibold text-[#667085] block uppercase">
              Total Ingested Reports
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#1D8278]">
                75
              </span>

              <span className="text-[10px] text-[#667085]">
                Across 6 sites
              </span>
            </div>

            <p className="text-[11px] text-[#667085] mt-1">
              Demonstration dataset entries
            </p>
          </CardContent>
        </Card>

        <Card className="panel-card panel-accent-red bg-white">
          <CardContent className="p-4">
            <span className="text-[11px] font-semibold text-[#667085] block uppercase">
              High Risk / PSIF Flags
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#C92925]">
                19
              </span>

              <span className="text-[10px] text-[#667085]">
                Precursors detected
              </span>
            </div>

            <p className="text-[11px] text-[#667085] mt-1">
              Requires site officer triage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sites Table */}
      <Card className="panel-card panel-accent-navy bg-white min-w-0">
        <CardHeader className="p-4 border-b border-[#D9DDE0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-bold text-[#102F3E] flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#102F3E]" />
              OIL FIELD INSTALLATIONS &amp; SITES REGISTER
            </CardTitle>

            <CardDescription className="text-xs text-[#667085]">
              Active asset boundaries, assigned safety departments, and report
              volumes
            </CardDescription>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#667085]" />

            <Input
              type="text"
              placeholder="Search site name, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 text-xs pl-8 bg-white border-[#D9DDE0]"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F3F2EE]">
                <TableRow className="text-xs">
                  <TableHead className="w-[160px] font-bold text-[#102F3E]">
                    Site Name &amp; Code
                  </TableHead>

                  <TableHead className="min-w-[200px] font-bold text-[#102F3E]">
                    Associated Department
                  </TableHead>

                  <TableHead className="w-[140px] font-bold text-[#102F3E]">
                    Location / District
                  </TableHead>

                  <TableHead className="w-[120px] font-bold text-[#102F3E]">
                    Report Volume
                  </TableHead>

                  <TableHead className="w-[100px] font-bold text-[#102F3E]">
                    Status
                  </TableHead>

                  <TableHead className="w-[110px] text-right font-bold text-[#102F3E]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-xs">
                {filteredSites.map((site) => (
                  <TableRow
                    key={site.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <TableCell className="py-3 font-semibold text-[#102F3E] whitespace-nowrap">
                      <div className="font-bold text-[#102F3E]">
                        {site.name}
                      </div>

                      <div className="text-[10px] font-mono text-[#667085]">
                        {site.code}
                      </div>
                    </TableCell>

                    <TableCell className="py-3 text-[#17202A]">
                      {site.department}
                    </TableCell>

                    <TableCell className="py-3 text-[#667085] whitespace-nowrap">
                      {site.location}
                    </TableCell>

                    <TableCell className="py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#102F3E]">
                          {site.reportCount}
                        </span>

                        <span className="text-[10px] text-[#667085]">
                          reports
                        </span>

                        {site.highRiskCount > 0 && (
                          <Badge className="bg-[#FEF2F2] text-[#C92925] border border-[#FCA5A5] text-[9px] px-1 py-0 font-bold">
                            {site.highRiskCount} High
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="py-3 whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className={
                          site.status === 'Active'
                            ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7] font-semibold text-[10px]'
                            : 'bg-[#FFF3E0] text-[#D97706] border-[#FFE0B2] font-semibold text-[10px]'
                        }
                      >
                        {site.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-3 text-right whitespace-nowrap">
                      <Link
                        href={`/reports?q=${encodeURIComponent(
                          site.name
                        )}`}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-[#102F3E] hover:text-[#C92925] hover:bg-[#F3F2EE] px-2 gap-1"
                        >
                          Reports
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// VIEW 2: USERS & ROLES
// ============================================================================

function UsersRolesView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = DEMO_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9DDE0] pb-5">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#102F3E] text-white">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#17202A] sm:text-2xl">
                Users &amp; Role Management
              </h1>

              <Badge
                variant="outline"
                className="border-[#D9DDE0] text-[#17202A] bg-white text-[10px] font-semibold"
              >
                HSE Access Control
              </Badge>
            </div>

            <p className="text-xs text-[#667085] mt-1 font-normal">
              Oil India Limited • User access controls, HSE officer
              assignments, and authorization levels
            </p>
          </div>
        </div>

        <Button
          onClick={() =>
            toast.success('Invite User Modal', {
              description:
                'User invitation workflow initiated. Invite link sent to HSE Cell.',
            })
          }
          className="text-xs h-8 bg-[#102F3E] hover:bg-[#082735] text-white gap-1.5 self-start md:self-auto"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Invite / Add User
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="panel-card panel-accent-navy bg-white">
          <CardContent className="p-4">
            <span className="text-[11px] font-semibold text-[#667085] block uppercase">
              Authorized System Users
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#102F3E]">
                {DEMO_USERS.length}
              </span>

              <span className="text-[10px] text-[#2E7D32] font-semibold">
                (5 Active, 1 Pending)
              </span>
            </div>

            <p className="text-[11px] text-[#667085] mt-1">
              Single sign-on active
            </p>
          </CardContent>
        </Card>

        <Card className="panel-card panel-accent-teal bg-white">
          <CardContent className="p-4">
            <span className="text-[11px] font-semibold text-[#667085] block uppercase">
              HSE Officers &amp; Analysts
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#1D8278]">
                4
              </span>

              <span className="text-[10px] text-[#667085]">
                Certified reviewers
              </span>
            </div>

            <p className="text-[11px] text-[#667085] mt-1">
              SIF adjudication rights
            </p>
          </CardContent>
        </Card>

        <Card className="panel-card panel-accent-amber bg-white">
          <CardContent className="p-4">
            <span className="text-[11px] font-semibold text-[#667085] block uppercase">
              Corporate Governance
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#D97706]">
                Dual Signoff
              </span>
            </div>

            <p className="text-[11px] text-[#667085] mt-1">
              High SIF override control
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="panel-card panel-accent-navy bg-white min-w-0">
        <CardHeader className="p-4 border-b border-[#D9DDE0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-bold text-[#102F3E] flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#102F3E]" />
              OIL HSE USER REGISTER &amp; ASSIGNMENTS
            </CardTitle>

            <CardDescription className="text-xs text-[#667085]">
              System access credentials, assigned field sites, and activity
              status
            </CardDescription>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#667085]" />

            <Input
              type="text"
              placeholder="Search user, role, site..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 text-xs pl-8 bg-white border-[#D9DDE0]"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F3F2EE]">
                <TableRow className="text-xs">
                  <TableHead className="min-w-[180px] font-bold text-[#102F3E]">
                    User Name &amp; Email
                  </TableHead>

                  <TableHead className="w-[130px] font-bold text-[#102F3E]">
                    Role
                  </TableHead>

                  <TableHead className="min-w-[200px] font-bold text-[#102F3E]">
                    Assigned Site(s) &amp; Dept
                  </TableHead>

                  <TableHead className="w-[130px] font-bold text-[#102F3E]">
                    Last Active
                  </TableHead>

                  <TableHead className="w-[100px] font-bold text-[#102F3E]">
                    Status
                  </TableHead>

                  <TableHead className="w-[90px] text-right font-bold text-[#102F3E]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-xs">
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <TableCell className="py-3 font-semibold text-[#102F3E] whitespace-nowrap">
                      <div className="font-bold text-[#102F3E]">
                        {user.name}
                      </div>

                      <div className="text-[10px] text-[#667085]">
                        {user.email}
                      </div>
                    </TableCell>

                    <TableCell className="py-3 whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className={
                          user.role === 'HSE Officer'
                            ? 'bg-[#F0F9FF] text-[#2F6B84] border-[#BAE6FD] font-semibold text-[10px]'
                            : user.role === 'Admin'
                              ? 'bg-[#FEF2F2] text-[#C92925] border-[#FCA5A5] font-semibold text-[10px]'
                              : 'bg-[#F3F2EE] text-[#102F3E] border-[#D9DDE0] font-semibold text-[10px]'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-3 text-[#17202A]">
                      <div className="font-medium text-[#102F3E]">
                        {user.assignedSites}
                      </div>

                      <div className="text-[10px] text-[#667085]">
                        {user.department}
                      </div>
                    </TableCell>

                    <TableCell className="py-3 text-[#667085] whitespace-nowrap">
                      {user.lastActive}
                    </TableCell>

                    <TableCell className="py-3 whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className={
                          user.status === 'Active'
                            ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7] font-semibold text-[10px]'
                            : 'bg-[#FFF3E0] text-[#D97706] border-[#FFE0B2] font-semibold text-[10px]'
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-3 text-right whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toast.info(`Edit User ${user.name}`, {
                            description: `Permissions dialog opened for ${user.email}`,
                          })
                        }
                        className="h-7 text-xs text-[#102F3E] hover:text-[#C92925] hover:bg-[#F3F2EE] px-2"
                      >
                        Edit Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// VIEW 3: SYSTEM SETTINGS
// ============================================================================

function SystemSettingsView() {
  // AI / Screening Engine
  const [modelName, setModelName] = useState('deberta-v3-hse');
  const [sifThreshold, setSifThreshold] = useState(75);
  const [autoEscalateLsr, setAutoEscalateLsr] = useState(true);

  const [
    sensitivity,
    setSensitivity,
  ] = useState<'balanced' | 'conservative' | 'aggressive'>('balanced');

  // Evidence confidence
  const [evidenceConfidence, setEvidenceConfidence] = useState(80);

  // SLAs
  const [highSlaHours, setHighSlaHours] = useState(2);
  const [medSlaHours, setMedSlaHours] = useState(24);
  const [requireDualSignoff, setRequireDualSignoff] = useState(true);
  const [autoGenerateCapa, setAutoGenerateCapa] = useState(true);

  // Alerts
  const [enableCriticalAlerts, setEnableCriticalAlerts] = useState(true);
  const [enableDailyDigest, setEnableDailyDigest] = useState(true);

  const [alertRecipients, setAlertRecipients] = useState(
    'hse-officers@oilindia.in, basin-safety@oilindia.in'
  );

  const [webhookUrl, setWebhookUrl] = useState(
    'https://alert.oilindia.in/webhook/hse-sif'
  );

  // Integrations
  const [isTestingOisd, setIsTestingOisd] = useState(false);
  const [isTestingSap, setIsTestingSap] = useState(false);

  // Save
  const handleSaveSettings = () => {
    toast.success('System Settings Saved', {
      description:
        'AI model parameters and risk thresholds updated across all active assets.',
    });
  };

  // Restore defaults
  const handleResetDefaults = () => {
    setModelName('deberta-v3-hse');
    setSifThreshold(75);
    setAutoEscalateLsr(true);
    setSensitivity('balanced');
    setEvidenceConfidence(80);

    setHighSlaHours(2);
    setMedSlaHours(24);
    setRequireDualSignoff(true);
    setAutoGenerateCapa(true);

    setEnableCriticalAlerts(true);
    setEnableDailyDigest(true);

    setAlertRecipients(
      'hse-officers@oilindia.in, basin-safety@oilindia.in'
    );

    setWebhookUrl(
      'https://alert.oilindia.in/webhook/hse-sif'
    );

    toast.info('Factory Defaults Restored', {
      description:
        'All system parameters reset to baseline configuration.',
    });
  };

  const handleTestOisd = () => {
    setIsTestingOisd(true);

    setTimeout(() => {
      setIsTestingOisd(false);

      toast.success('OISD Gateway Connected', {
        description:
          'Ping latency: 42ms • Statutory API endpoint response: 200 OK.',
      });
    }, 700);
  };

  const handleTestSap = () => {
    setIsTestingSap(true);

    setTimeout(() => {
      setIsTestingSap(false);

      toast.success('SAP HSE Connector Verified', {
        description:
          '75 safety records synchronized with OIL SAP ERP system.',
      });
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9DDE0] pb-5">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#102F3E] text-white">
            <Settings className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#17202A] sm:text-2xl">
                System Configuration &amp; Settings
              </h1>

              <Badge
                variant="outline"
                className="border-[#D9DDE0] text-[#17202A] bg-white text-[10px] font-semibold"
              >
                Oil India Enterprise Settings
              </Badge>
            </div>

            <p className="text-xs text-[#667085] mt-1 font-normal">
              Oil India Limited • Configure SIF precursor classification
              thresholds, review SLAs, alerts &amp; SAP/OISD integrations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleResetDefaults}
            variant="outline"
            className="text-xs h-8 border-[#D9DDE0] text-[#17202A] gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restore Defaults
          </Button>

          <Button
            onClick={handleSaveSettings}
            className="text-xs h-8 bg-[#102F3E] hover:bg-[#082735] text-white gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList className="bg-muted/60 p-1 border">
          <TabsTrigger value="ai" className="text-xs gap-1.5">
            <Cpu className="h-3.5 w-3.5" />
            Screening Model &amp; Engine
          </TabsTrigger>

          <TabsTrigger value="sla" className="text-xs gap-1.5">
            <Sliders className="h-3.5 w-3.5" />
            Risk Matrix &amp; SLAs
          </TabsTrigger>

          <TabsTrigger
            value="notifications"
            className="text-xs gap-1.5"
          >
            <Bell className="h-3.5 w-3.5" />
            Alerting &amp; Distribution
          </TabsTrigger>

          <TabsTrigger
            value="integrations"
            className="text-xs gap-1.5"
          >
            <Database className="h-3.5 w-3.5" />
            Enterprise Integrations
          </TabsTrigger>
        </TabsList>

        {/* ================================================================
            TAB 1: SCREENING MODEL & ENGINE
        ================================================================ */}
        <TabsContent value="ai" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#102F3E]" />
                SIF Screening Engine Configuration
              </CardTitle>

              <CardDescription className="text-xs">
                Configure classification weights, detection confidence
                thresholds, and automated Life-Saving Rule escalation
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-5 text-xs">
              {/* Model Selection */}
              <div className="space-y-2">
                <label className="font-semibold text-foreground block">
                  Active SIF Screening Model
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'deberta-v3-hse',
                      name: 'SIF Classification Engine v1.2 (OIL Standard)',
                      tag: 'Active (Recommended)',
                      f1: '94.2% Accuracy',
                      desc: 'Trained on 45,000+ upstream hydrocarbon incident narratives.',
                    },
                    {
                      id: 'roberta-hse',
                      name: 'SIF Lightweight Classifier v1.0',
                      tag: 'Fallback Model',
                      f1: '91.8% Accuracy',
                      desc: 'Optimized for high-speed inference on edge rigs.',
                    },
                    {
                      id: 'ensemble-v3',
                      name: 'OIL HSE Classification Model v1.2',
                      tag: 'Enterprise Core',
                      f1: '95.6% Accuracy',
                      desc: 'Multi-rule model combining statutory compliance with sequence labeling.',
                    },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setModelName(m.id)}
                      className={`p-3 rounded-[2px] border cursor-pointer transition-all ${modelName === m.id
                          ? 'border-[#102F3E] bg-[#102F3E]/10 shadow-none'
                          : 'border-border bg-card hover:bg-muted/40'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">
                          {m.name}
                        </span>

                        <Badge
                          variant="outline"
                          className={
                            modelName === m.id
                              ? 'bg-[#102F3E] text-white border-transparent text-[9px]'
                              : 'text-[9px]'
                          }
                        >
                          {m.tag}
                        </Badge>
                      </div>

                      <span className="text-[11px] font-mono text-[#102F3E] block mt-1">
                        {m.f1}
                      </span>

                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threshold */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold text-foreground block">
                      SIF Potential Confidence Cutoff Threshold
                    </label>

                    <p className="text-[11px] text-muted-foreground">
                      Reports with Model confidence equal to or above this
                      score are flagged as High SIF Potential
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold font-mono text-[#102F3E]">
                      {sifThreshold}%
                    </span>

                    <Badge variant="outline" className="text-[10px]">
                      {sifThreshold >= 80
                        ? 'Conservative'
                        : sifThreshold >= 70
                          ? 'Balanced'
                          : 'Aggressive'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    50%
                  </span>

                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="1"
                    value={sifThreshold}
                    onChange={(e) =>
                      setSifThreshold(Number(e.target.value))
                    }
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-[#102F3E]"
                  />

                  <span className="text-[10px] text-muted-foreground font-mono">
                    95%
                  </span>
                </div>
              </div>

              {/* Evidence Confidence */}
              <div className="space-y-2 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold text-foreground block">
                      Evidence Confidence Threshold
                    </label>

                    <p className="text-[11px] text-muted-foreground">
                      Minimum evidence confidence required before automated
                      screening recommendations are surfaced
                    </p>
                  </div>

                  <span className="text-base font-bold font-mono text-[#102F3E]">
                    {evidenceConfidence}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    50%
                  </span>

                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={evidenceConfidence}
                    onChange={(e) =>
                      setEvidenceConfidence(Number(e.target.value))
                    }
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-[#102F3E]"
                  />

                  <span className="text-[10px] text-muted-foreground font-mono">
                    100%
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Auto-Escalate IOGP Life-Saving Rule Violations
                    </span>

                    <p className="text-[11px] text-muted-foreground">
                      Automatically upgrade report potential to High if
                      narrative contains an unmitigated Life-Saving Rule
                      breach
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setAutoEscalateLsr(!autoEscalateLsr)
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${autoEscalateLsr
                        ? 'bg-[#102F3E]'
                        : 'bg-muted'
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${autoEscalateLsr
                          ? 'translate-x-5'
                          : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Precursor Extraction Sensitivity
                    </span>

                    <p className="text-[11px] text-muted-foreground">
                      Controls threshold for tagging secondary precursor
                      candidates
                    </p>
                  </div>

                  <div className="flex rounded-md border p-0.5 bg-muted/30 shrink-0">
                    {(
                      [
                        'conservative',
                        'balanced',
                        'aggressive',
                      ] as const
                    ).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSensitivity(s)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded capitalize transition-colors ${sensitivity === s
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================================
            TAB 2: RISK MATRIX & SLAS
        ================================================================ */}
        <TabsContent value="sla" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#102F3E]" />
                SIF Review SLAs &amp; Governance Matrix
              </CardTitle>

              <CardDescription className="text-xs">
                Define triage resolution times, mandatory adjudication
                criteria, and peer review signoffs
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground block">
                    High SIF Potential Triage SLA (Hours)
                  </label>

                  <p className="text-[11px] text-muted-foreground">
                    Mandatory deadline for HSE officer to confirm or reject
                    High SIF flags
                  </p>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="48"
                      value={highSlaHours}
                      onChange={(e) =>
                        setHighSlaHours(Number(e.target.value))
                      }
                      className="h-8 text-xs font-mono w-28 bg-background"
                    />

                    <span className="text-[11px] text-muted-foreground">
                      hours from ingestion
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground block">
                    Medium SIF Review SLA (Hours)
                  </label>

                  <p className="text-[11px] text-muted-foreground">
                    Target resolution window for medium-severity precursor
                    reviews
                  </p>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="168"
                      value={medSlaHours}
                      onChange={(e) =>
                        setMedSlaHours(Number(e.target.value))
                      }
                      className="h-8 text-xs font-mono w-28 bg-background"
                    />

                    <span className="text-[11px] text-muted-foreground">
                      hours from ingestion
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Require Dual HSE Signoff to Reject SIF Classification
                    </span>

                    <p className="text-[11px] text-muted-foreground">
                      Downgrading an AI High SIF prediction requires secondary
                      authorization from Asset Safety Head
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setRequireDualSignoff(!requireDualSignoff)
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${requireDualSignoff
                        ? 'bg-[#102F3E]'
                        : 'bg-muted'
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${requireDualSignoff
                          ? 'translate-x-5'
                          : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Auto-Generate Corrective &amp; Preventive Actions (CAPA)
                    </span>

                    <p className="text-[11px] text-muted-foreground">
                      Creates draft engineering and administrative barrier
                      remedies immediately upon confirmation
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setAutoGenerateCapa(!autoGenerateCapa)
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${autoGenerateCapa
                        ? 'bg-[#102F3E]'
                        : 'bg-muted'
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${autoGenerateCapa
                          ? 'translate-x-5'
                          : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================================
            TAB 3: ALERTING & NOTIFICATIONS
        ================================================================ */}
        <TabsContent
          value="notifications"
          className="space-y-4"
        >
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#102F3E]" />
                Alert Routing &amp; Incident Dispatch
              </CardTitle>

              <CardDescription className="text-xs">
                Configure who receives urgent notifications when SIF
                precursors are identified
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-4 text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Immediate Critical Incident Alerts (High SIF &gt; 90%)
                    </span>

                    <p className="text-[11px] text-muted-foreground">
                      Dispatch instant SMS/Email notifications to rig managers
                      upon ingestion of life-threatening events
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setEnableCriticalAlerts(!enableCriticalAlerts)
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${enableCriticalAlerts
                        ? 'bg-[#102F3E]'
                        : 'bg-muted'
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enableCriticalAlerts
                          ? 'translate-x-5'
                          : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Daily Shift-Handover Safety Digest
                    </span>

                    <p className="text-[11px] text-muted-foreground">
                      Automated 06:00 &amp; 18:00 summary email detailing
                      flagged precursors and open adjudications
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setEnableDailyDigest(!enableDailyDigest)
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${enableDailyDigest
                        ? 'bg-[#102F3E]'
                        : 'bg-muted'
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enableDailyDigest
                          ? 'translate-x-5'
                          : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t">
                <label className="font-semibold text-foreground block">
                  Alert Distribution Mailing List
                </label>

                <Input
                  value={alertRecipients}
                  onChange={(e) =>
                    setAlertRecipients(e.target.value)
                  }
                  className="h-8 text-xs font-mono bg-background"
                  placeholder="Enter comma-separated emails"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-semibold text-foreground block">
                  Emergency Webhook Endpoint
                </label>

                <Input
                  value={webhookUrl}
                  onChange={(e) =>
                    setWebhookUrl(e.target.value)
                  }
                  className="h-8 text-xs font-mono bg-background"
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================================
            TAB 4: ENTERPRISE INTEGRATIONS
        ================================================================ */}
        <TabsContent
          value="integrations"
          className="space-y-4"
        >
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Database className="h-4 w-4 text-[#102F3E]" />
                Connected Enterprise Safety Systems
              </CardTitle>

              <CardDescription className="text-xs">
                Manage bi-directional data flow with statutory databases and
                ERP incident registers
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-4 text-xs">
              {/* OISD */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-[2px] border bg-card gap-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-[2px] bg-emerald-500/10 text-emerald-500 shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        OISD National Safety Portal
                      </span>

                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px]">
                        Active • Synced
                      </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Statutory gateway for automated incident reporting and
                      compliance benchmarks
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestOisd}
                  disabled={isTestingOisd}
                  className="h-8 text-xs gap-1.5 shrink-0"
                >
                  {isTestingOisd
                    ? 'Testing...'
                    : 'Test Connection'}
                </Button>
              </div>

              {/* SAP ERP */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-[2px] border bg-card gap-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-[2px] bg-[#102F3E]/10 text-[#102F3E] shrink-0">
                    <Workflow className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        SAP PM / HSE Incident Database
                      </span>

                      <Badge className="bg-[#102F3E]/15 text-[#102F3E] text-[10px]">
                        Connected • 75 Records
                      </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Synchronizes plant maintenance notifications and
                      equipment tag identifiers
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestSap}
                  disabled={isTestingSap}
                  className="h-8 text-xs gap-1.5 shrink-0"
                >
                  {isTestingSap ? 'Syncing...' : 'Verify Sync'}
                </Button>
              </div>

              {/* SCADA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-[2px] border bg-card gap-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-[2px] bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Radio className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        SCADA Rig Telemetry Stream
                      </span>

                      <Badge className="bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-[10px]">
                        Live Feed (14 Rigs)
                      </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Ingests real-time pressure, flow, and H2S gas sensor
                      telemetry for context correlation
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-muted-foreground font-mono self-center">
                  0.4% Packet Loss
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// ADMINISTRATION CONTENT ROUTER
// ============================================================================

function SettingsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  if (tab === 'sites') {
    return <SitesAssetsView />;
  }

  if (tab === 'users') {
    return <UsersRolesView />;
  }

  return <SystemSettingsView />;
}

// ============================================================================
// PAGE
// ============================================================================

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-[#667085]">
          Loading settings &amp; administration views...
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}