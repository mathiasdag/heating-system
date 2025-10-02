'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  padding?: string;
  snapType?: 'mandatory' | 'proximity' | 'none';
  justifyWhenOverflowing?: 'start' | 'center' | 'end';
  justifyWhenNotOverflowing?: 'start' | 'center' | 'end';
  enableOverflowDetection?: boolean;
  showBorders?: boolean;
  leftSpacer?: number;
  rightSpacer?: number;
  style?: React.CSSProperties;
}

export const HorizontalScrollContainer: React.FC<
  HorizontalScrollContainerProps
> = ({
  children,
  className = '',
  gap = 'gap-2',
  padding = 'pt-2 pb-2',
  snapType = 'mandatory',
  justifyWhenOverflowing = 'start',
  justifyWhenNotOverflowing = 'center',
  enableOverflowDetection = true,
  showBorders = false,
  leftSpacer = 24,
  rightSpacer = 24,
  style = {},
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!enableOverflowDetection) return;

    function checkOverflow() {
      const currentEl = scrollRef.current;
      if (!currentEl) return;
      setIsOverflowing(currentEl.scrollWidth > currentEl.clientWidth);
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [enableOverflowDetection]);

  const justifyClass = enableOverflowDetection
    ? isOverflowing
      ? `justify-${justifyWhenOverflowing}`
      : `justify-${justifyWhenNotOverflowing}`
    : `justify-${justifyWhenNotOverflowing}`;

  const snapClasses = clsx({
    'snap-x': snapType !== 'none',
    'snap-mandatory': snapType === 'mandatory',
    'snap-proximity': snapType === 'proximity',
  });

  const containerClasses = clsx(
    'flex w-screen scrollbar-none scroll-smooth select-none',
    gap,
    padding,
    snapClasses,
    justifyClass,
    {
      'overflow-x-auto': enableOverflowDetection ? isOverflowing : true,
      'overflow-x-hidden': enableOverflowDetection && !isOverflowing,
    },
    className
  );

  const spacerClasses = clsx('snap-none grow-0 shrink-0', {
    'border-r border-text': showBorders,
  });

  const spacerStyle = {
    width: `${leftSpacer}px`,
  };

  const rightSpacerStyle = {
    width: `${rightSpacer}px`,
  };

  const combinedStyle = {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
    ...style,
  };

  return (
    <div ref={scrollRef} className={containerClasses} style={combinedStyle}>
      <div className={spacerClasses} style={spacerStyle} />
      {children}
      <div className={spacerClasses} style={rightSpacerStyle} />
    </div>
  );
};

export default HorizontalScrollContainer;
