import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { jsxConverter } from '@/utils/richTextConverters';

interface TextBlockProps {
  content: any;
}

export default function TextBlock({ content }: TextBlockProps) {
  return (
    <div className="relative px-4 lg:px-8 text-center">
      <DevIndicator componentName="TextBlock" />

      <RichText
        data={content}
        className="grid gap-3 justify-center"
        converters={jsxConverter}
      />
    </div>
  );
}
