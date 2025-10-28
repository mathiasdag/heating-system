import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { defaultConverter } from '@/utils/richTextConverters';

interface TextBlockProps {
  content: {
    root: {
      children: Array<{
        type: string;
        children?: Array<{
          text?: string;
          type?: string;
        }>;
      }>;
    };
  };
}

export default function TextBlock({ content }: TextBlockProps) {
  return (
    <div className="relative px-4 lg:px-8 text-center">
      <DevIndicator componentName="TextBlock" />

      <RichText
        data={content}
        className="grid gap-3 justify-center"
        converters={defaultConverter}
      />
    </div>
  );
}
