'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { AccordionArrowIcon } from '../icons';

interface QAItem {
  blockType: 'qa';
  question: any;
  answer: any;
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
}> = ({ qa, index, headingLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [qa.answer]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-text rounded-md overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full py-3 text-left flex items-center justify-between cursor-pointer hover:bg-text/5 transition-colors"
      >
        <div className="flex-shrink-0 px-4">
          <AccordionArrowIcon
            size={16}
            className={`transition-transform duration-400 ease-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
        <div className="font-sans flex-1 text-center">
          <RichText data={qa.question} />
        </div>
        <div className="flex-shrink-0 px-4">
          <AccordionArrowIcon
            size={16}
            className={`transition-transform duration-400 ease-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{
          height: isOpen ? `${height}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-4 pb-4">
          <div className="pt-3 font-mono">
            <RichText data={qa.answer} />
          </div>
        </div>
      </div>
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
        <div key={index} className="border-b border-text/20 pb-6">
          <HeadingTag className="font-display mb-3">
            <RichText data={qa.question} />
          </HeadingTag>
          <div className="font-mono">
            <RichText data={qa.answer} />
          </div>
        </div>
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
          <div className={layout === 'list' ? 'space-y-6' : 'space-y-[-1px]'}>
            {item.items.map((qa, qaIndex) => renderQAItem(qa, qaIndex, 'h4'))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={layout === 'list' ? 'space-y-6' : 'space-y-2'}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default QAList;
