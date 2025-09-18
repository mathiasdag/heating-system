'use client';

import React from 'react';
import { DevIndicator } from '../DevIndicator';
import { BlockHeader } from './BlockHeader';
import ListItem from '@/components/ListItem';

interface ListItem {
  title: string;
  description: string;
}

interface ListBlockProps {
  headline?: string;
  description?: any;
  items: ListItem[];
}

const ListBlock: React.FC<ListBlockProps> = ({
  headline,
  description,
  items,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-24 px-2">
      <DevIndicator componentName="ListBlock" />
      <BlockHeader headline={headline} description={description} />
      <div className="max-w-2xl mx-auto gap-1 justify-center flex flex-wrap">
        {items.map((item, index) => (
          <ListItem key={index} variant="background" size="md">
            <h4 className="font-sans uppercase mb-2">{item.title}</h4>
            <p className="font-mono">{item.description}</p>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default ListBlock;
