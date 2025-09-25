import React from 'react';
import Marquee from 'react-fast-marquee';
import { DevIndicator } from '@/components/dev';
import { BlockHeader } from '@/components/blocks/BlockHeader';
import UserCardBlock from '@/components/blocks/UserCardBlock';

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

  // react-fast-marquee typically expects speed in pixels per second
  // Let's try mapping CMS values (10-50) to reasonable pixel speeds (20-200)
  const minCmsSpeed = 10;
  const maxCmsSpeed = 50;
  const minPixelSpeed = 20;
  const maxPixelSpeed = 200;

  const normalizedSpeed =
    (speedValue - minCmsSpeed) / (maxCmsSpeed - minCmsSpeed);
  const pixelSpeed =
    minPixelSpeed + normalizedSpeed * (maxPixelSpeed - minPixelSpeed);

  // Also try inverted (higher CMS = slower)
  const invertedPixelSpeed =
    maxPixelSpeed - normalizedSpeed * (maxPixelSpeed - minPixelSpeed);

  console.log('Speed calculations:', {
    speedValue,
    pixelSpeed: Math.round(pixelSpeed),
    invertedPixelSpeed: Math.round(invertedPixelSpeed),
  });

  if (!userCards || userCards.length === 0) {
    return null;
  }

  return (
    <div className="py-24">
      <DevIndicator componentName="HorizontalMarqueeBlock" />
      <BlockHeader headline={headline} description={description} />

      <div className="overflow-hidden mt-8">
        <Marquee speed={pixelSpeed} direction="left" gradient={false}>
          <div className="flex items-center gap-4 ml-4">
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
