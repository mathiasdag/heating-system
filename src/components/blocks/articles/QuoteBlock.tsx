import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev';

interface QuoteBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export default function QuoteBlock({ content }: QuoteBlockProps) {
  return (
    <blockquote className="relative grid gap-4 max-w-[65ch] mx-auto px-4 col-start-1 col-end-13 md:col-start-2 md:col-end-12 text-center font-display text-xl py-8">
      <hr className="mx-auto w-16" />
      <DevIndicator componentName="QuoteBlock" />
      <RichText data={content} />
      <hr className="mx-auto w-16 mt-2" />
    </blockquote>
  );
}
