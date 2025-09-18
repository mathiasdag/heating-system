import React from 'react';
import { Icon, IconProps } from './Icon';

export const PlusIcon: React.FC<IconProps> = ({
  size = 14,
  className = '',
  color = '#EFEDE3',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color }}
    >
      <path
        d="M7.11475 0L7.11475 14M0 6.88525H14"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
    </svg>
  );
};
