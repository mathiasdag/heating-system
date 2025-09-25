import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev';
import { AppLink } from '@/components/ui';

interface TextBlockProps {
  content: any;
  links?: Array<{
    label: string;
    url: string;
    type?: 'internal' | 'external';
  }>;
}

export default function TextBlock({ content, links = [] }: TextBlockProps) {
  return (
    <div className="py-16 px-4 lg:px-8 2xl:px-16 text-center">
      <DevIndicator componentName="TextBlock" />

      <div className="max-w-10xl mx-auto grid gap-4">
        {/* Content */}
        <div className="">
          <RichText data={content} className="rich-text text-lg" />
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <AppLink
                key={index}
                href={link.url}
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
