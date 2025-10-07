'use client';

import React, { useState, useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListItem, AnimatedArrow } from '@/components/ui';
import { extractPlainText } from '@/utils/richTextUtils';

interface QAItem {
  blockType: 'qa';
  question: {
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
  answer: {
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

interface QAGroup {
  blockType: 'qaGroup';
  title: string;
  items: QAItem[];
}

type QAItemOrGroup = QAItem | QAGroup;

interface QAListProps {
  items: QAItemOrGroup[];
  layout: 'accordion' | 'list';
}

// Custom Accordion Item Component with smooth height animation
const AccordionItem: React.FC<{
  qa: QAItem;
  index: number;
  headingLevel: 'h3' | 'h4';
}> = ({ qa }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-text rounded-md overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full pt-4 pb-[.9em] text-left flex items-center justify-between cursor-pointer hover:bg-text/5 transition-colors select-none"
      >
        <div className="flex-shrink-0 px-4">
          <AnimatedArrow isOpen={isOpen} />
        </div>
        <div className="font-sans flex-1 text-center">
          {extractPlainText(qa.question)}
        </div>
        <div className="flex-shrink-0 px-4">
          <AnimatedArrow isOpen={isOpen} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="px-4 pb-4">
              <div className="pt-1 font-mono">
                <RichText data={qa.answer} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QAList: React.FC<QAListProps> = ({ items, layout }) => {
  const renderQAItem = (
    qa: QAItem,
    index: number,
    headingLevel: 'h3' | 'h4' = 'h3'
  ) => {
    if (layout === 'list') {
      const HeadingTag = headingLevel;
      return (
        <ListItem key={index}>
          <HeadingTag className="font-sans mb-2">
            {extractPlainText(qa.question)}
          </HeadingTag>
          <div className="font-mono">
            <RichText data={qa.answer} />
          </div>
        </ListItem>
      );
    }

    // Accordion layout with custom smooth animation
    return (
      <AccordionItem
        key={index}
        qa={qa}
        index={index}
        headingLevel={headingLevel}
      />
    );
  };

  const renderItem = (item: QAItemOrGroup, index: number) => {
    if (item.blockType === 'qa') {
      return renderQAItem(item, index, 'h3');
    }

    if (item.blockType === 'qaGroup') {
      return (
        <div key={index} className="">
          <h3 className="text-md text-center mb-4">{item.title}</h3>
          <div className={'space-y-[-1px]'}>
            {item.items.map((qa, qaIndex) => renderQAItem(qa, qaIndex, 'h4'))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={layout === 'list' ? 'space-y-4' : 'space-y-[-1px]'}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default QAList;
