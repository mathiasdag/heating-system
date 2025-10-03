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
      className="self-start basis-64 sm:basis-72 grow-0 shrink-0 text-left w-full max-w-80 snap-center focus:outline-none"
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
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 p-4 font-mono text-bg flex flex-col gap-3 bg-gradient-to-t from-black to-transparent"
          >
            {articleContent && (
              <p className="line-clamp-[3] hyphens-auto">{articleContent}</p>
            )}
          </motion.div>

          <motion.div
            animate={{
              y: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center z-10 p-6 text-center font-display text-[2em] leading-[1em] uppercase mb-8 text-bg"
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
