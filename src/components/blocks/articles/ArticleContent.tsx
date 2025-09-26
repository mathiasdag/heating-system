import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { articleConverter } from '@/utils/richTextConverters';
import { DevIndicator } from '@/components/dev/DevIndicator';

interface ArticleContentProps {
  content: any; // RichText content from Payload with inline blocks
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <main className="relative">
      <DevIndicator componentName="ArticleContent" />
      <RichText
        data={content}
        className="grid gap-4 justify-center pb-8"
        converters={articleConverter}
      />
    </main>
  );
}
