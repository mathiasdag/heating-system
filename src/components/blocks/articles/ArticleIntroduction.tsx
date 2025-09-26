import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';

interface ArticleIntroductionProps {
  introduction: any; // RichText content from Payload
}

export default function ArticleIntroduction({
  introduction,
}: ArticleIntroductionProps) {
  if (!introduction) return null;

  return (
    <section className="relative max-w-xl mx-auto px-4 mb-8">
      <DevIndicator componentName="ArticleIntroduction" />

      <div className="text-gray-700 leading-relaxed">
        <RichText data={introduction} className="rich-text grid gap-3" />
      </div>
    </section>
  );
}
