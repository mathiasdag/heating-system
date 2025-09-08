import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import clsx from 'clsx';

interface BlockHeaderProps {
  headline?: string;
  description?: any; // Rich text data from Payload CMS
  className?: string;
  headlineClassName?: string;
  descriptionClassName?: string;
}

export const BlockHeader: React.FC<BlockHeaderProps> = ({
  headline,
  description,
  className = '',
  headlineClassName,
  descriptionClassName,
}) => {
  if (!headline && !description) {
    return null;
  }

  return (
    <header className={className}>
      {headline && (
        <h2
          className={clsx(
            'text-center text-md', // Default styles
            !description ? 'mb-8' : 'mb-3',
            headlineClassName // Additional custom styles
          )}
        >
          {headline}
        </h2>
      )}
      {description && (
        <div
          className={clsx(
            'font-mono text-center px-8 max-w-6xl mx-auto mb-4', // Default styles
            descriptionClassName // Additional custom styles
          )}
        >
          <RichText data={description} />
        </div>
      )}
    </header>
  );
};
