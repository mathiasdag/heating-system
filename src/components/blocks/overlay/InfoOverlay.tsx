'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { AppLink } from '@/components/AppLink';
import Overlay from '@/components/Overlay';
import { routeLink } from '@/utils/linkRouter';
import OverlayTextBlock from './OverlayTextBlock';
import OverlayListBlock from './OverlayListBlock';

interface InfoOverlayProps {
  overlay: {
    headline: string;
    heroImage?: {
      url?: string;
      alt?: string;
    };
    layout?: unknown[];
    link?: unknown;
  };
  isOpen: boolean;
  onClose: () => void;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({
  overlay,
  isOpen,
  onClose,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // Use the global router to resolve the link
  const linkResult = overlay.link ? routeLink(overlay.link) : null;

  // Check if header is scrollable
  useEffect(() => {
    if (!isOpen) return;

    const checkScrollable = () => {
      if (headerRef.current) {
        const { scrollHeight, clientHeight } = headerRef.current;
        const hasScroll = scrollHeight > clientHeight + 1; // Add small buffer for precision
        setIsScrollable(hasScroll);
      }
    };

    // Multiple checks with increasing delays to ensure layout is stable
    const timeouts = [
      setTimeout(checkScrollable, 50),
      setTimeout(checkScrollable, 200),
      setTimeout(checkScrollable, 500),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [overlay.layout, isOpen]);

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      componentName="OverlayCardOverlay"
      closeOnOutsideClick={true}
      className="flex items-center justify-center p-2"
      backgroundClassName="bg-black/80 backdrop-blur-xl"
    >
      <div
        className="w-full max-w-lg max-h-[calc(100vh-1rem)] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        <div
          ref={headerRef}
          className="relative bg-bg w-full grid gap-y-4 rounded-lg px-8 pt-8 pb-12 overflow-y-auto flex-1 min-h-0"
        >
          <h3 className="font-sans text-base uppercase text-center">
            {overlay.headline}
          </h3>

          {overlay.heroImage?.url && (
            <Image
              src={overlay.heroImage.url}
              alt={overlay.heroImage.alt || overlay.headline}
              width={overlay.heroImage.width || 800}
              height={overlay.heroImage.height || 400}
              className="w-auto h-auto max-h-[300px] rounded-md object-contain mx-auto"
            />
          )}

          {overlay.layout && overlay.layout.length > 0 && (
            <div className="space-y-4">
              {overlay.layout.map((block: any, index: number) => {
                const cleanBlock = JSON.parse(JSON.stringify(block));
                switch (block.blockType) {
                  case 'text':
                    return <OverlayTextBlock key={index} {...cleanBlock} />;
                  case 'list':
                    return <OverlayListBlock key={index} {...cleanBlock} />;
                  default:
                    console.warn(
                      `Unknown block type in overlay: ${block.blockType}`
                    );
                    return null;
                }
              })}
            </div>
          )}

          {isScrollable && (
            <div className="absolute bottom-0 left-4 right-4 h-16 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
          )}
        </div>

        {linkResult?.href && overlay.link && (
          <div className="bg-bg border-t border-gray-200 px-5 py-4 rounded-b-md">
            <AppLink link={overlay.link} variant="primary" className="w-full">
              {(overlay.link as any)?.text || 'Learn More'}
            </AppLink>
          </div>
        )}
      </div>
    </Overlay>
  );
};

export default InfoOverlay;
