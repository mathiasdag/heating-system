import React from 'react';
import {
  RichText,
  JSXConvertersFunction,
  JSXConverters,
} from '@payloadcms/richtext-lexical/react';
import { SerializedParagraphNode } from '@payloadcms/richtext-lexical';
import { DevIndicator } from '@/components/dev/DevIndicator';
import SignatureBlock from '@/components/blocks/global/SignatureBlock';

interface QABlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any;
}

// Custom paragraph converter for QA content (filters empty paragraphs)
const qaParagraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    // Check if paragraph is empty (no text content or only whitespace/breaks)
    const isEmpty =
      !text ||
      (typeof text === 'string' && text.trim() === '') ||
      (React.isValidElement(text) && text.props.children === '') ||
      (Array.isArray(text) &&
        text.every(
          child =>
            !child ||
            (typeof child === 'string' && child.trim() === '') ||
            (React.isValidElement(child) && child.props.children === '')
        ));

    // Return null for empty paragraphs to prevent rendering
    if (isEmpty) {
      return null;
    }

    return <p>{text}</p>;
  },
};

// JSX Converter for signature blocks in QA content
const qaConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...qaParagraphConverter,
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
