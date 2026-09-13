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
        'Logged safety observations (UA/UC/NM) across operational sites',
    },
    {
      title: 'SIF-POTENTIAL',
      value: sifReports,
      description:
        'Precursor events with potential for serious injury or fatality',
    },
    {
      title: 'HIGH PRIORITY',
      value: highPriorityReports,
      description:
        'Critical Life-Saving Rule & barrier breakdown incidents',
    },
    {
      title: 'PENDING REVIEW',
      value: pendingReviewReports,
      description:
        'Observations requiring HSE committee technical sign-off',
    },
  ];

  const cardStyles = [
    {
      accent: 'panel-accent-navy',
      grad: 'panel-grad-blue',
    },
    {
      accent: 'panel-accent-red',
      grad: 'panel-grad-red',
    },
    {
      accent: 'panel-accent-amber',
      grad: 'panel-grad-amber',
    },
    {
      accent: 'panel-accent-teal',
      grad: 'panel-grad-teal',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCardsData.map((stat, idx) => {
        const style = cardStyles[idx % cardStyles.length];

        return (
          <div
            key={stat.title}
            className={`relative flex flex-col p-4 sm:p-5 panel-card ${style.accent} ${style.grad}`}
          >
            <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-2">
              {stat.title}
            </span>

            <span className="text-2xl sm:text-3xl font-extrabold text-[#102F3E] tracking-tight mb-2 font-mono">
              {stat.value.toLocaleString()}
            </span>

            <p className="text-xs text-[#667085] font-normal leading-relaxed mt-auto">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}