import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import AppLink from '../AppLink';

interface TextBlockProps {
  headline: string;
  content: any;
  links?: Array<{
    label: string;
    url: string;
    type?: 'internal' | 'external';
  }>;
}

export default function TextBlock({
  headline,
  content,
  links = [],
}: TextBlockProps) {
  return (
    <div className="mb-16 mt-8 px-4">
      <DevIndicator componentName="TextBlock" />

      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {headline}
        </h2>

        {/* Content */}
        <div className="mb-8">
          <RichText
            data={content}
            className="rich-text text-lg leading-relaxed text-center"
          />
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <AppLink
                key={index}
                href={link.url}
                type={link.type || 'internal'}
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </AppLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
