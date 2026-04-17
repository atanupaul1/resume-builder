// frontend/components/ui/Icon.tsx
import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ComponentProps } from 'react';

interface IconProps {
  icon: ComponentProps<typeof HugeiconsIcon>['icon'];
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.5,
  className = '',
}) => {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};
