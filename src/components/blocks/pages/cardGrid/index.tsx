import React from 'react';
import { DefaultCardGrid } from './DefaultCardGrid';
import { OrangeCardGrid } from './OrangeCardGrid';

interface Card {
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  tags?: { id: string; name: string; description?: string }[];
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

interface CardGridBlockProps {
  headline?: string;
  description?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  cards: Card[];
  link?: {
    type: 'internal' | 'external' | 'copy';
    text?: string;
    url?: string;
    reference?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  backgroundColor?: 'default' | 'orange';
}

const CardGridBlock: React.FC<CardGridBlockProps> = ({
  backgroundColor = 'default',
  ...props
}) => {
  if (backgroundColor === 'orange') {
    return <OrangeCardGrid {...props} />;
  }

  return <DefaultCardGrid {...props} />;
};

export default CardGridBlock;
