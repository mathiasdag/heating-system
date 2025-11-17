'use client';

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ListItem } from '@/components/ui';
import { extractPlainText } from '@/utils/richTextUtils';
import type { QAItem } from './types';

interface QAListItemProps {
  qa: QAItem;
  index: number;
  headingLevel: 'h3' | 'h4';
}

export const QAListItem: React.FC<QAListItemProps> = ({ qa, headingLevel }) => {
  const HeadingTag = headingLevel;
  return (
    <ListItem>
      <HeadingTag className="font-sans mb-2">
        {extractPlainText(qa.question)}
      </HeadingTag>
      <div className="font-mono">
        <RichText data={qa.answer} />
      </div>
    </ListItem>
  );
};
