'use client';

import React from 'react';
import { Tag } from '@/components/ui';
import { formatDateForTags, getArticleContent } from './utils';
import type { CardProps } from './types';

export default function ArticleCardWithoutImage({
  item,
  index,
  onClick,
}: Omit<CardProps, 'isHovered' | 'onHoverStart' | 'onHoverEnd'>) {
  const articleContent = getArticleContent(item);

  return (
    <button
      key={`article-${item.id}-${index}`}
      onClick={onClick}
      className="basis-64 sm:basis-72 grow-0 shrink-0 text-left w-full max-w-80 snap-center"
    >
      <div className="relative">
        <div className="relative aspect-[4/6] bg-surface overflow-hidden rounded-md p-6">
          <div className="font-mono flex flex-col gap-3">
            {/* Content */}
            <div className="hyphens-auto">
              {articleContent && (
                <p className="text-sm text-muted-foreground line-clamp-[20]">
                  {articleContent}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="flex gap-0.5 uppercase">
              <Tag name="Article" size="md" />
              {item.publishedDate && (
                <>
                  {(() => {
                    const { year, month } = formatDateForTags(
                      item.publishedDate
                    );
                    return (
                      <>
                        {year && <Tag name={year} size="md" />}
                        {month && <Tag name={month} size="md" />}
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-0.5 pt-1.5 leading-4">
          <div className="uppercase">{item.title}</div>
        </div>
      </div>
    </button>
  );
}
