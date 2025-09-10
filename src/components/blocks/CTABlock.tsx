'use client';

import React, { useState, useEffect } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import { AppAction } from '../AppLink';

interface CTABlockProps {
  headline: string;
  ctaType: 'default' | 'rotating';
  description?: any; // Lexical RichText type
  link: {
    type: 'internal' | 'external' | 'copy';
    reference?: any;
    url?: string;
    text?: string;
  };
}

const CTABlock: React.FC<CTABlockProps> = ({
  headline,
  ctaType,
  description,
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getLinkHref = () => {
    if (link.type === 'internal' && link.reference?.slug) {
      return `/${link.reference.slug}`;
    }
    if (link.type === 'external') {
      return link.url;
    }
    if (link.type === 'copy') {
      return link.text; // For copy action, use text as the value to copy
    }
    return '#';
  };

  const renderLink = () => {
    const href = getLinkHref();

    return (
      <AppAction
        href={href}
        {...(link.type === 'copy' && { actionType: 'copy' })}
        variant="outline"
        className="w-full hover:bg-white hover:text-black"
      >
        {(link.text || '').toUpperCase()}
      </AppAction>
    );
  };

  if (ctaType === 'rotating') {
    return (
      <div className="mt-32 mb-24 px-4">
        <DevIndicator componentName="CTABlock (Rotating)" />

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-md mb-8">{headline}</h2>

          <div className="flex justify-center">
            <div
              className={`w-auto aspect-square border border-white rounded-full flex items-center justify-center animate-spin cursor-pointer ${
                isHovered
                  ? '[animation-play-state:paused]'
                  : '[animation-play-state:running]'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="text-lg transform -rotate-90 p-24">
                {link.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default type
  return (
    <div className="my-24 px-4 text-center relative sm:px-8 ">
      <DevIndicator componentName="CTABlock (Default)" />

      <div className="max-w-5xl mx-auto">
        <div className="border border-white px-12 py-8 rounded-xl grid gap-6">
          <h2 className="text-md">{headline}</h2>

          {description && <RichText data={description} className="font-mono" />}

          <div className="flex justify-start">{renderLink()}</div>
        </div>
      </div>
    </div>
  );
};

export default CTABlock;
