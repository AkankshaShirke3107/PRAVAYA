import React from 'react';

interface GeometricAccentProps {
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Enterprise industrial geometric square accent in Navy, Red, and White.
 * Added to major header areas only (maximum of two accent groups per page).
 */
export function GeometricAccent({ className = '', size = 'md' }: GeometricAccentProps) {
  const squareSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <div
      className={`inline-flex items-center gap-1 shrink-0 ${className}`}
      aria-hidden="true"
      title="Oil India Enterprise Safety Identity"
    >
      <span className={`${squareSize} bg-[#102F3E] inline-block`} />
      <span className={`${squareSize} bg-[#C92925] inline-block`} />
      <span className={`${squareSize} bg-[#FFFFFF] border border-[#D9DDE0] inline-block`} />
    </div>
  );
}
