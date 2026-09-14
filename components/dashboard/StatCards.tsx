'use client';

import React from 'react';
import { useSafetyStore } from '@/lib/store';

export function StatCards() {
  const { reports } = useSafetyStore();

  const totalReports = reports.length;

  const sifReports = reports.filter(
    (r) =>
      r.sifPotential === 'Yes' ||
      r.sifPotential === 'High'
  ).length;

  const highPriorityReports = reports.filter(
    (r) =>
      (
        r.sifLevel === 'High' ||
        r.sifPotential === 'High' ||
        (r.confidence && r.confidence >= 90)
      ) &&
      (
        r.sifPotential === 'Yes' ||
        r.sifPotential === 'High'
      )
  ).length;

  const pendingReviewReports = reports.filter(
    (r) => r.status === 'Pending'
  ).length;

  const statCardsData = [
    {
      title: 'REPORTS RECEIVED',
      value: totalReports,
      description:
        'UA/UC/NM observations logged across all operational sites',
      accent: 'panel-accent-navy',
    },
    {
      title: 'SIF-POTENTIAL',
      value: sifReports,
      description:
        'Precursor events with potential for serious injury or fatality',
      accent: 'panel-accent-red',
    },
    {
      title: 'HIGH PRIORITY',
      value: highPriorityReports,
      description:
        'Critical Life-Saving Rule & barrier breakdown incidents',
      accent: 'panel-accent-amber',
    },
    {
      title: 'PENDING REVIEW',
      value: pendingReviewReports,
      description:
        'Observations requiring HSE committee technical sign-off',
      accent: 'panel-accent-teal',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {statCardsData.map((stat) => (
        <div
          key={stat.title}
          className={`panel-card ${stat.accent} flex flex-col p-4`}
        >
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
            {stat.title}
          </span>

          <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-2 font-mono tabular-nums">
            {stat.value.toLocaleString()}
          </span>

          <p className="text-[11px] text-muted-foreground font-normal leading-snug mt-auto">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}