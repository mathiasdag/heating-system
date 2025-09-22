'use client';

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import QAList from './QAList';

interface FAQItem {
  blockType: 'qa';
  question: any;
  answer: any;
}

interface QAGroupItem {
  blockType: 'qaGroup';
  title: string;
  items: FAQItem[];
}

type FAQBlockItem = FAQItem | QAGroupItem;

interface FAQBlockProps {
  headline?: string;
  description?: any;
  items: FAQBlockItem[];
  layout?: 'accordion' | 'list';
}

const FAQBlock: React.FC<FAQBlockProps> = ({
  headline,
  description,
  items,
  layout = 'accordion',
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-24 px-2">
      <DevIndicator componentName="FAQBlock" />

      {/* Header */}
      {(headline || description) && (
        <div className="mb-8 text-center">
          {headline && (
            <h2 className="font-display text-xl uppercase mb-4">{headline}</h2>
          )}
          {description && (
            <div className="font-mono mx-autofont-mono text-center px-8 max-w-6xl mx-auto mb-4">
              <RichText data={description} />
            </div>
          )}
        </div>
      )}

      {/* FAQ Items */}
      <div className="max-w-2xl mx-auto">
        <QAList items={items} layout={layout} />
      </div>
    </div>
  );
};

export default FAQBlock;
