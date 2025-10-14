'use client';
import React from 'react';
import { LogotypeCard } from '@/components/blocks/LogotypeCard';
import { HorizontalScrollContainer } from '@/components/ui/HorizontalScrollContainer';
import clsx from 'clsx';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { BlockHeader } from '@/components/blocks/BlockHeader';

interface Logotype {
  title: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  url?: string;
}

interface LogotypeWallProps {
  headline?: string;
  description?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  logotypes: Logotype[];
}

export const LogotypeWall: React.FC<LogotypeWallProps> = ({
  headline,
  description,
  logotypes,
}) => {
  return (
    <section className={`grid relative`}>
      <DevIndicator componentName="LogotypeWall" />
      <BlockHeader headline={headline} description={description} />
      <hr className="mx-2 my-2" />
      <div className="relative">
        <HorizontalScrollContainer
          className=""
          enableOverflowDetection={true}
          showBorders={true}
        >
          {logotypes.map((logotype, idx) => (
            <LogotypeCard
              key={idx}
              className={clsx(
                'grow-0 shrink-0 w-[60vw] sm:w-[200px] border-r border-text snap-center rounded-none'
              )}
              {...logotype}
            />
          ))}
        </HorizontalScrollContainer>
      </div>
      <hr className="mx-2 my-2" />
    </section>
  );
};

export default LogotypeWall;
