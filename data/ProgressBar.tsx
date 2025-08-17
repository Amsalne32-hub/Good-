
import React from 'react';

interface ProgressBarProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className, indicatorClassName }) => {
  const progress = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className={`h-full rounded-full bg-primary transition-all duration-500 ${indicatorClassName}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
