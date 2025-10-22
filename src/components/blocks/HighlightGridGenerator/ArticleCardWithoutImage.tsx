import React from 'react';
import { AppLink } from '@/components/ui';
import { Tag } from '@/components/ui';
import { RichText } from '@payloadcms/richtext-lexical/react';
import clsx from 'clsx';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { Heading } from '@/components/headings';
import { cardConverter } from '@/utils/richTextConverters';
import { formatDateForTags, getArticleContent } from './utils';
import type { CardProps } from './types';

export default function ArticleCardWithoutImage({
  item,
  index,
}: Omit<CardProps, 'isHovered' | 'onHoverStart' | 'onHoverEnd' | 'onClick'>) {
  const articleContent = getArticleContent(item);

  // Create body content for RichText
  const body = articleContent
    ? {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: articleContent,
                },
              ],
            },
          ],
        },
      }
    : undefined;

  return (
    <div
      className={clsx(
        'flex flex-col aspect-[4/6] bg-surface rounded-lg',
        'px-5 relative',
        'h-full justify-between pb-4 pt-10',
        'self-start basis-64 sm:basis-72 grow-0 shrink-0 w-full max-w-80 snap-center'
      )}
    >
      <DevIndicator componentName="ArticleCardWithoutImage" />
      <div className="grid gap-6 mb-4 sm:px-2 text-center hyphens-auto">
        <header>
          <div className="mb-3">
            <div className="flex gap-x-0.5 gap-y-[0.25em] flex-wrap -mx-0.5 justify-center">
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
          <Heading variant="card-title" as="h3">
            {item.title}
          </Heading>
        </header>
        {body && (
          <RichText
            data={body}
            className="text-center font-mono grid gap-3"
            converters={cardConverter}
          />
        )}
      </div>
      <AppLink
        href={`/artikel/${item.slug}`}
        variant="secondary"
        className="mx-auto mt-2 w-full"
      >
        Läs mer
      </AppLink>
    </div>
  );
}
