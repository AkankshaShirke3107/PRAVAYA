'use client';

import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  Cpu,
  ShieldAlert,
  Bell,
  Database,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Key,
  Radio,
  Share2,
  Workflow,
  Sparkles,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function SettingsPage() {
  // Form State
  const [modelName, setModelName] = useState('deberta-v3-hse');
  const [sifThreshold, setSifThreshold] = useState(75);
  const [autoEscalateLsr, setAutoEscalateLsr] = useState(true);
  const [sensitivity, setSensitivity] = useState<'balanced' | 'conservative' | 'aggressive'>('balanced');
  const [evidenceConfidence, setEvidenceConfidence] = useState(80);

  // SLAs
  const [highSlaHours, setHighSlaHours] = useState(2);
  const [medSlaHours, setMedSlaHours] = useState(24);
  const [requireDualSignoff, setRequireDualSignoff] = useState(true);
  const [autoGenerateCapa, setAutoGenerateCapa] = useState(true);

  // Alerts
  const [enableCriticalAlerts, setEnableCriticalAlerts] = useState(true);
  const [enableDailyDigest, setEnableDailyDigest] = useState(true);
  const [alertRecipients, setAlertRecipients] = useState('hse-officers@oilindia.in, basin-safety@oilindia.in');
  const [webhookUrl, setWebhookUrl] = useState('https://alert.oilindia.in/webhook/hse-sif');

  // Integrations
  const [isTestingOisd, setIsTestingOisd] = useState(false);
  const [isTestingSap, setIsTestingSap] = useState(false);

  // Save Settings Handler
  const handleSaveSettings = () => {
    toast.success('System Settings Saved', {
      description: 'AI model parameters and risk thresholds updated across all active assets.',
    });
  };

  // Restore Defaults Handler
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
    setAlertRecipients('hse-officers@oilindia.in, basin-safety@oilindia.in');
    setWebhookUrl('https://alert.oilindia.in/webhook/hse-sif');

    toast.info('Factory Defaults Restored', {
      description: 'All system parameters reset to baseline configuration.',
    });
  };

  const handleTestOisd = () => {
    setIsTestingOisd(true);
    setTimeout(() => {
      setIsTestingOisd(false);
      toast.success('OISD Gateway Connected', {
        description: 'Ping latency: 42ms • Statutory API endpoint response: 200 OK.',
      });
    }, 700);
  };

  const handleTestSap = () => {
    setIsTestingSap(true);
    setTimeout(() => {
      setIsTestingSap(false);
      toast.success('SAP HSE Connector Verified', {
        description: '75 safety records synchronized with OIL SAP ERP system.',
      });
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 shadow-sm">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                System Configuration &amp; Settings
              </h1>
              <Badge variant="outline" className="bg-sky-500/10 text-sky-500 border-sky-500/30 text-[10px] font-mono">
                Engine v2.4
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Calibrate AI model inference thresholds, adjudication SLAs, notification triggers, and enterprise connectors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleResetDefaults}
            variant="outline"
            className="text-xs h-9 gap-1.5 shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restore Defaults
          </Button>
          <Button
            onClick={handleSaveSettings}
            className="text-xs h-9 bg-sky-600 hover:bg-sky-500 text-white gap-1.5 shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Tabs Layout */}
      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList className="bg-muted/60 p-1 border">
          <TabsTrigger value="ai" className="text-xs gap-1.5">
            <Cpu className="h-3.5 w-3.5" />
            AI &amp; Inference Engine
          </TabsTrigger>
          <TabsTrigger value="sla" className="text-xs gap-1.5">
            <Sliders className="h-3.5 w-3.5" />
            Risk Matrix &amp; SLAs
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Alerting &amp; Distribution
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs gap-1.5">
            <Database className="h-3.5 w-3.5" />
            Enterprise Integrations
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: AI & NLP ENGINE */}
        <TabsContent value="ai" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sky-500" />
                Natural Language Precursor Classifier Configuration
              </CardTitle>
              <CardDescription className="text-xs">
                Configure transformer weights, detection confidence thresholds, and automated Life-Saving Rule escalation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-5 text-xs">
              {/* Model Selection */}
              <div className="space-y-2">
                <label className="font-semibold text-foreground block">
                  Active NLP Classification Model
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'deberta-v3-hse',
                      name: 'DeBERTa-v3 Large (OIL Trained)',
                      tag: 'Active (Recommended)',
                      f1: '94.2% F1 Score',
                      desc: 'Trained on 45,000+ upstream hydrocarbon incident narratives.',
                    },
                    {
                      id: 'roberta-hse',
                      name: 'RoBERTa-Domain-HSE v1.8',
                      tag: 'Fallback Model',
                      f1: '91.8% F1 Score',
                      desc: 'Optimized for high-speed inference on edge rigs.',
                    },
                    {
                      id: 'ensemble-v3',
                      name: 'Antigravity HSE Ensemble v3',
                      tag: 'Experimental',
                      f1: '95.6% F1 Score',
                      desc: 'Ensemble model combining LLM reasoning with sequence labeling.',
                    },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setModelName(m.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        modelName === m.id
                          ? 'border-sky-500 bg-sky-500/10 shadow-sm'
                          : 'border-border bg-card hover:bg-muted/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{m.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            modelName === m.id
                              ? 'bg-sky-500 text-white border-transparent text-[9px]'
                              : 'text-[9px]'
                          }
                        >
                          {m.tag}
                        </Badge>
                      </div>
                      <span className="text-[11px] font-mono text-sky-500 block mt-1">
                        {m.f1}
                      </span>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threshold Slider */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold text-foreground block">
                      SIF Potential Confidence Cutoff Threshold
                    </label>
                    <p className="text-[11px] text-muted-foreground">
                      Reports with AI confidence equal to or above this score are flagged as High SIF Potential
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold font-mono text-sky-500">
                      {sifThreshold}%
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {sifThreshold >= 80 ? 'Conservative' : sifThreshold >= 70 ? 'Balanced' : 'Aggressive'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-mono">50%</span>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="1"
                    value={sifThreshold}
                    onChange={(e) => setSifThreshold(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <span className="text-[10px] text-muted-foreground font-mono">95%</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Auto-Escalate IOGP Life-Saving Rule Violations
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Automatically upgrade report potential to High if narrative contains an unmitigated Life-Saving Rule breach
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoEscalateLsr(!autoEscalateLsr)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      autoEscalateLsr ? 'bg-sky-600' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        autoEscalateLsr ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Precursor Extraction Sensitivity
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Controls threshold for tagging secondary precursor candidates
                    </p>
                  </div>
                  <div className="flex rounded-md border p-0.5 bg-muted/30">
                    {(['conservative', 'balanced', 'aggressive'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSensitivity(s)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded capitalize transition-colors ${
                          sensitivity === s
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

        {/* TAB 2: RISK MATRIX & SLAS */}
        <TabsContent value="sla" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sliders className="h-4 w-4 text-sky-500" />
                SIF Review SLAs &amp; Governance Matrix
              </CardTitle>
              <CardDescription className="text-xs">
                Define triage resolution times, mandatory adjudication criteria, and peer review signoffs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground block">
                    High SIF Potential Triage SLA (Hours)
                  </label>
                  <p className="text-[11px] text-muted-foreground">
                    Mandatory deadline for HSE officer to confirm or reject High SIF flags
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="48"
                      value={highSlaHours}
                      onChange={(e) => setHighSlaHours(Number(e.target.value))}
                      className="h-8 text-xs font-mono w-28 bg-background"
                    />
                    <span className="text-[11px] text-muted-foreground">hours from ingestion</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground block">
                    Medium SIF Review SLA (Hours)
                  </label>
                  <p className="text-[11px] text-muted-foreground">
                    Target resolution window for medium-severity precursor reviews
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="168"
                      value={medSlaHours}
                      onChange={(e) => setMedSlaHours(Number(e.target.value))}
                      className="h-8 text-xs font-mono w-28 bg-background"
                    />
                    <span className="text-[11px] text-muted-foreground">hours from ingestion</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Require Dual HSE Signoff to Reject SIF Classification
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Downgrading an AI High SIF prediction requires secondary authorization from Asset Safety Head
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequireDualSignoff(!requireDualSignoff)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      requireDualSignoff ? 'bg-sky-600' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        requireDualSignoff ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Auto-Generate Corrective &amp; Preventive Actions (CAPA)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Creates draft engineering and administrative barrier remedies immediately upon confirmation
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoGenerateCapa(!autoGenerateCapa)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      autoGenerateCapa ? 'bg-sky-600' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        autoGenerateCapa ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: ALERTING & NOTIFICATIONS */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4 text-sky-500" />
                Alert Routing &amp; Incident Dispatch
              </CardTitle>
              <CardDescription className="text-xs">
                Configure who receives urgent notifications when SIF precursors are identified
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Immediate Critical Incident Alerts (High SIF &gt; 90%)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Dispatch instant SMS/Email notifications to rig managers upon ingestion of life-threatening events
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableCriticalAlerts(!enableCriticalAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      enableCriticalAlerts ? 'bg-sky-600' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        enableCriticalAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">
                      Daily Shift-Handover Safety Digest
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Automated 06:00 &amp; 18:00 summary email detailing flagged precursors and open adjudications
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableDailyDigest(!enableDailyDigest)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      enableDailyDigest ? 'bg-sky-600' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        enableDailyDigest ? 'translate-x-5' : 'translate-x-0'
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
                  onChange={(e) => setAlertRecipients(e.target.value)}
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
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="h-8 text-xs font-mono bg-background"
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: ENTERPRISE INTEGRATIONS */}
        <TabsContent value="integrations" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Database className="h-4 w-4 text-sky-500" />
                Connected Enterprise Safety Systems
              </CardTitle>
              <CardDescription className="text-xs">
                Manage bi-directional data flow with statutory databases and ERP incident registers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              {/* OISD */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border bg-card gap-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">OISD National Safety Portal</span>
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px]">
                        Active • Synced
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Statutory gateway for automated incident reporting and compliance benchmarks
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
                  {isTestingOisd ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>

              {/* SAP ERP */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border bg-card gap-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">SAP PM / HSE Incident Database</span>
                      <Badge className="bg-sky-500/15 text-sky-600 dark:text-sky-400 text-[10px]">
                        Connected • 75 Records
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Synchronizes plant maintenance notifications and equipment tag identifiers
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

              {/* SCADA Stream */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border bg-card gap-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">SCADA Rig Telemetry Stream</span>
                      <Badge className="bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-[10px]">
                        Live Feed (14 Rigs)
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Ingests real-time pressure, flow, and H2S gas sensor telemetry for context correlation
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
