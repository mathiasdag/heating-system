import React from 'react';
import {
  RichText,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import SignatureBlock from '@/components/blocks/global/SignatureBlock';

interface QABlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any;
}

// JSX Converter for signature blocks in QA content
const qaConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    signature: ({ node }) => <SignatureBlock text={node.fields.text} />,
  },
});

export default function QABlock({ question, answer }: QABlockProps) {
  return (
    <div className="relative max-w-xl mx-auto px-4 grid gap-3 pt-3 first:pt-0">
      <DevIndicator componentName="QABlock" />
      <RichText data={question} className="" converters={qaConverter} />
      <RichText
        data={answer}
        className="text-justify"
        converters={qaConverter}
      />
    </div>
  );
}
