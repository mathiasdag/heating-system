'use client';

import React, { useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import clsx from 'clsx';

interface FAQItem {
  blockType: 'qa';
  question: any; // RichText content
  answer: any; // RichText content
}

interface FAQBlockProps {
  headline?: string;
  description?: any;
  qas: FAQItem[];
  layout?: 'accordion' | 'list';
}

const FAQBlock: React.FC<FAQBlockProps> = ({
  headline,
  description,
  qas,
  layout = 'accordion',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  if (!qas || qas.length === 0) return null;

  // QAs are already in the order they were added
  const sortedQAs = qas;

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const isOpen = (id: string) => openItems.has(id);

  if (layout === 'list') {
    return (
      <div className="py-8 px-4">
        <DevIndicator componentName="FAQBlock" />

        {/* Header */}
        {(headline || description) && (
          <div className="mb-8 text-center">
            {headline && <h2 className="font-display mb-4">{headline}</h2>}
            {description && (
              <div className="font-mono">
                <RichText data={description} />
              </div>
            )}
          </div>
        )}

        {/* Q&A List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {sortedQAs.map((qa, index) => {
            if (!qa) return null;

            return (
              <div key={index} className="border-b border-text/20 pb-6">
                <h3 className="font-display mb-3">
                  <RichText data={qa.question} />
                </h3>
                <div className="font-mono">
                  <RichText data={qa.answer} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Accordion layout (default)
  return (
    <div className="py-8 px-4">
      <DevIndicator componentName="FAQBlock" />

      {/* Header */}
      {(headline || description) && (
        <div className="mb-8 text-center">
          {headline && <h2 className="font-display mb-4">{headline}</h2>}
          {description && (
            <div className="font-mono">
              <RichText data={description} />
            </div>
          )}
        </div>
      )}

      {/* Q&A Accordion */}
      <div className="max-w-4xl mx-auto space-y-2">
        {sortedQAs.map((qa, index) => {
          if (!qa) return null;

          const itemId = `faq-${index}`;
          const isItemOpen = isOpen(itemId);

          return (
            <div key={index} className="border border-text/20 rounded-sm">
              <button
                onClick={() => toggleItem(itemId)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-text/5 transition-colors"
              >
                <div className="font-display flex-1">
                  <RichText data={qa.question} />
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={clsx(
                      'text-2xl transition-transform duration-200',
                      isItemOpen ? 'rotate-45' : 'rotate-0'
                    )}
                  >
                    +
                  </span>
                </div>
              </button>

              {isItemOpen && (
                <div className="px-4 pb-4 border-t border-text/10">
                  <div className="pt-3 font-mono">
                    <RichText data={qa.answer} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQBlock;
