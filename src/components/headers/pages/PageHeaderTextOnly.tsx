import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { FadeIn } from '@/components/ui';
import { jsxConverter } from '@/utils/richTextConverters';

interface PageHeaderTextOnlyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
}

export default function PageHeaderTextOnly({ text }: PageHeaderTextOnlyProps) {
  return (
    <div className="px-4 text-center relative pt-36">
      <DevIndicator componentName="PageHeaderTextOnly" position="top-right" />
      <FadeIn as="div" timing="slow">
        <RichText
          data={text}
          className="grid gap-3 justify-center"
          converters={jsxConverter}
        />
      </FadeIn>
    </div>
  );
}
