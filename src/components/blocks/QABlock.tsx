import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';

interface QABlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any;
}

export default function QABlock({ question, answer }: QABlockProps) {
  return (
    <div className="relative max-w-[65ch] mx-auto px-4 grid gap-4 col-start-2 col-end-12">
      <DevIndicator componentName="QABlock" />
      <RichText data={question} className="font-mono text-center uppercase" />
      <RichText data={answer} />
    </div>
  );
}
