'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tag } from '@/components/ui';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { fixImageUrl } from '@/utils/imageUrl';
import { formatDateForTags, getArticleContent } from './utils';
import type { CardProps } from './types';

export default function ArticleCardWithImage({
  item,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}: CardProps) {
  const cardId = `article-${item.id}-${index}`;
  const articleContent = getArticleContent(item);

  return (
    <motion.button
      key={cardId}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="self-start basis-64 sm:basis-72 grow-0 shrink-0 text-left w-full max-w-80 snap-center"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <div className="relative w-full h-full">
            <motion.div
              animate={{
                filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-0"
              style={{ transformOrigin: 'center center' }}
            >
              <Image
                src={fixImageUrl(item.featuredImage!.url)}
                alt={item.featuredImage!.alt || item.title || 'Article image'}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Date Tags */}
          <motion.div
            animate={{
              y: isHovered ? 2 : 0,
              x: isHovered ? 2 : 0,
              scale: isHovered ? 1.025 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-2 left-2 flex gap-0.5 text-bg mix-blend-difference z-10"
          >
            {item.publishedDate && (
              <>
                {(() => {
                  const { year, month } = formatDateForTags(item.publishedDate);
                  return (
                    <>
                      {year && <Tag name={year} size="md" />}
                      {month && <Tag name={month} size="md" />}
                    </>
                  );
                })()}
              </>
            )}
          </motion.div>

          {/* Plus Icon */}
          <motion.div
            animate={{
              y: isHovered ? 0 : -2,
              x: isHovered ? 0 : 2,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-[0.75em] right-3 text-bg mix-blend-difference z-10"
          >
            <PlusIcon size={16} />
          </motion.div>

          {/* Article Hover Content */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{
              y: isHovered ? 0 : '100%',
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 bg-bg/90 backdrop-blur-sm p-4"
          >
            <div className="font-mono flex flex-col gap-3">
              {/* Content */}
              <div className="hyphens-auto">
                {articleContent && (
                  <p className="text-sm text-muted-foreground line-clamp-[8]">
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
          </motion.div>
        </div>

        {/* Content */}
        <div className="px-0.5 pt-1.5 leading-4">
          <div className="uppercase">{item.title}</div>
        </div>
      </div>
    </motion.button>
  );
}
