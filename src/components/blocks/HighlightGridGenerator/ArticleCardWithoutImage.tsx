'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Tag } from '@/components/ui';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { formatDateForTags, getArticleContent } from './utils';
import type { CardProps } from './types';

export default function ArticleCardWithoutImage({
  item,
  index,
  onClick,
}: Omit<CardProps, 'isHovered' | 'onHoverStart' | 'onHoverEnd'>) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const articleContent = getArticleContent(item);

  return (
    <motion.button
      key={`article-${item.id}-${index}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="self-start basis-64 sm:basis-72 grow-0 shrink-0 text-left w-full max-w-80 snap-center"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <div className="relative">
        <div
          className={clsx(
            'relative aspect-[4/6] overflow-hidden rounded-md p-6 font-mono z-10 relative',
            {
              'bg-accent': isHomepage,
              'bg-surface': !isHomepage,
            }
          )}
        >
          <motion.div
            className="flex flex-col gap-3"
            animate={{
              y: isHovered ? '1em' : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Content */}
            <div className="hyphens-auto">
              {articleContent && (
                <p className="text-sm text-muted-foreground line-clamp-[20]">
                  {articleContent}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="flex gap-0.5">
              <Tag name="Artikel" size="md" />
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
          </motion.div>
          {/* Plus Icon */}
          <motion.div
            animate={{
              y: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-4 left-4 z-10"
          >
            <PlusIcon size={16} strokeWidth={1.3} />
          </motion.div>

          <motion.div
            animate={{
              y: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center z-10 p-6 text-center font-display text-[2em] leading-[1em] uppercase mb-8"
          >
            {item.title}
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="uppercase px-0.5 pt-1.5"
        >
          {item.title}
        </motion.div>
      </div>
    </motion.button>
  );
}
