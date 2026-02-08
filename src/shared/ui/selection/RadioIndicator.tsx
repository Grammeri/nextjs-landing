type RadioIndicatorProps = {
  checked: boolean;
  size?: number;
};

export function RadioIndicator({ checked, size = 20 }: RadioIndicatorProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden focusable="false">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      {checked && <circle cx="10" cy="10" r="4" fill="currentColor" />}
    </svg>
  );
}
