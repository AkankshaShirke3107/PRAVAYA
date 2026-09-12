'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ReportAnalysisView } from '@/components/reports/ReportAnalysisView';

export default function AnalysisDetailPage() {
  const params = useParams();
  const reportId = (params?.id as string) || 'RPT-001';

  return <ReportAnalysisView reportId={reportId} />;
}
