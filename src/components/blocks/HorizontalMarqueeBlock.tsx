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
  // Debug: Log the speed value and try different speed calculations
  console.log('HorizontalMarqueeBlock - speed:', speed, 'type:', typeof speed);
  
  // Try different speed calculations to see which one works
  const speedValue = Number(speed);
  const invertedSpeed = 100 - speedValue; // Invert the speed (higher CMS value = slower marquee)
  const scaledSpeed = speedValue * 2; // Scale up the speed
  
  console.log('Speed calculations:', { speedValue, invertedSpeed, scaledSpeed });
  
  if (!userCards || userCards.length === 0) {
    return null;
  }

  return (
    <div className="py-24">
      <DevIndicator componentName="HorizontalMarqueeBlock" />
      <BlockHeader headline={headline} description={description} />

      <div className="overflow-hidden">
        <Marquee
          speed={invertedSpeed}
          direction="left"
          gradient={false}
          className="px-4"
        >
          <div className="flex items-center gap-4 sm:gap-6 ml-4 sm:ml-6">
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
