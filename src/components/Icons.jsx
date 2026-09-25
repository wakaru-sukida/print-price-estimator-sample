export function RegMark({ size = 30, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true" className={className}>
      <circle cx="15" cy="15" r="8" />
      <path d="M15 2v26M2 15h26" />
      <circle cx="15" cy="15" r="3" fill={color} />
    </svg>
  );
}

export function PathIcon({ d, size = 24, strokeWidth = 1.6, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={d} />
    </svg>
  );
}

export const ICON_PATHS = {
  back: 'M15 5l-7 7 7 7',
  rotL: 'M4 12a8 8 0 1 0 3-6.2M4 4v5h5',
  rotR: 'M20 12a8 8 0 1 1-3-6.2M20 4v5h-5',
  reset: 'M12 3v3M12 18v3M3 12h3M18 12h3M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  check: 'M5 12l5 5 9-10',
};
