import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import ListItemBlock from './ListItemBlock';

interface ListItem {
  title: string;
  description: string;
}

interface ListBlockProps {
  header: any;
  items: ListItem[];
}

export default function ListBlock({ header, items }: ListBlockProps) {
  return (
    <div className="mb-36 mt-36 px-4 relative">
      <DevIndicator componentName="ListBlock" />

      {/* Header */}
      <div className="text-center mb-8 list-header">
        <RichText data={header} className="font-mono sans-headlines mb-4" />
      </div>

      {/* List Items */}
      <div className=" gap-1 justify-center flex flex-wrap">
        {items.map((item, index) => (
          <ListItemBlock
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
