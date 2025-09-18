import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface OverlayTextBlockProps {
  content: any;
}

export default function OverlayTextBlock({ content }: OverlayTextBlockProps) {
  return (
    <div className="text-center">
      <RichText data={content} className="text-base" />
    </div>
  );
}
