import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';

interface QABlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any;
}

export default function QABlock({ question, answer }: QABlockProps) {
  return (
    <div className="relative max-w-xl mx-auto px-4 grid gap-3 pt-3 first:pt-0">
      <DevIndicator componentName="QABlock" />
      <RichText data={question} className="font-mono text-center uppercase" />
      <RichText data={answer} className="text-justify" />
    </div>
  );
}
