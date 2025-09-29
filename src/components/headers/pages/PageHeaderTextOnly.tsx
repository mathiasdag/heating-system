import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { jsxConverter } from '@/utils/richTextConverters';

interface PageHeaderTextOnlyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
}

export default function PageHeaderTextOnly({
  text,
}: PageHeaderTextOnlyProps) {
  return (
    <div className="px-4 text-center relative">
      <DevIndicator componentName="PageHeaderTextOnly" position="top-right" />
      <div className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <RichText
            data={text}
            className="rich-text font-mono grid gap-3 hyphens-auto"
            converters={jsxConverter}
          />
        </div>
      </div>
    </div>
  );
}
