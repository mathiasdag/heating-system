import React from 'react';
import Marquee from 'react-fast-marquee';
import { DevIndicator } from '../DevIndicator';
import { BlockHeader } from './BlockHeader';
import UserCardBlock from './UserCardBlock';

interface HorizontalMarqueeBlockProps {
  headline?: string;
  description?: Record<string, unknown>;
  speed: number;
  userCards: Array<{
    blockType: 'userCard';
    variant: 'textOnly' | 'compactCard' | 'mediumCard' | 'largeCard';
    user: Record<string, unknown> | string;
  }>;
}

export default function HorizontalMarqueeBlock({
  headline,
  description,
  speed,
  userCards,
}: HorizontalMarqueeBlockProps) {
  if (!userCards || userCards.length === 0) {
    return null;
  }

  return (
    <div className="py-24">
      <DevIndicator componentName="HorizontalMarqueeBlock" />
      <BlockHeader headline={headline} description={description} />

      <div className="overflow-hidden">
        <Marquee
          speed={speed}
          direction="left"
          gradient={false}
          className="px-4"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            {userCards.map((userCard, index) => (
              <div key={index} className="flex-shrink-0">
                <UserCardBlock
                  variant={userCard.variant}
                  user={userCard.user}
                />
              </div>
            ))}
            {/* Duplicate the cards for seamless loop */}
            {userCards.map((userCard, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0">
                <UserCardBlock
                  variant={userCard.variant}
                  user={userCard.user}
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
