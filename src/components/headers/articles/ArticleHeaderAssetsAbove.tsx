'use client';

import React, { useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { FadeInUp, FadeInDown } from '@/components/ui/FadeIn';
import { Tag } from '@/components/ui';
import { Heading } from '@/components/headings';
import MediaAsset from '@/components/common/MediaAsset';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface ArticleHeaderAssetsAboveProps {
  articleData: {
    title?: string;
    tags?: Array<{ id: string; name: string }>;
    author?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      bylineDescription?: string;
    };
    publishedDate?: string;
    lastModifiedDate?: string;
  };
  text?: any;
  assets: Asset[];
}

export default function ArticleHeaderAssetsAbove({
  articleData,
  text,
  assets,
}: ArticleHeaderAssetsAboveProps) {
  const ref = useRef(null);

  // Use Framer Motion's scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Add subtle scale effect for more dynamic feel
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Check if RichText contains an h1 element
  const hasH1 = (richTextData: any): boolean => {
    if (!richTextData?.root?.children) return false;

    const checkChildren = (children: any[]): boolean => {
      return children.some(child => {
        if (child.type === 'heading' && child.tag === 'h1') {
          return true;
        }
        if (child.children) {
          return checkChildren(child.children);
        }
        return false;
      });
    };

    return checkChildren(richTextData.root.children);
  };

  return (
    <div ref={ref} className="relative">
      <DevIndicator
        componentName="ArticleHeaderAssetsAbove"
        position="top-right"
      />

      <div className="grid gap-4 justify-center pt-32 text-center">
        {/* Tags */}
        {articleData.tags && articleData.tags.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {articleData.tags.map((tag, index) => (
              <Tag key={tag.id || index} name={tag.name} size="md" />
            ))}
          </div>
        )}

        {/* Render assets before text */}
        <motion.div
          className="flex items-center justify-center"
          style={{
            scale,
            y,
            willChange: 'transform',
          }}
        >
          <FadeInDown
            as="div"
            className="flex gap-4 justify-center select-none relative z-10"
            timing="fast"
          >
            {assets.map((asset, i) => (
              <MediaAsset
                key={i}
                asset={asset}
                assetCount={assets.length}
                height={Math.max(320 - (assets.length - 1) * 60, 160)}
                priority={true}
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            ))}
          </FadeInDown>
        </motion.div>

        {/* Render rich text with enhanced motion effects */}
        {text && (
          <FadeInUp
            as="div"
            className="px-4 grid gap-4 font-mono"
            timing="fast"
          >
            {/* Add article title as h1 if no h1 is found in RichText */}
            {articleData.title && !hasH1(text) && (
              <Heading variant="article-title" as="h1">
                {articleData.title}
              </Heading>
            )}
            <RichText data={text} />
          </FadeInUp>
        )}

        {/* Fallback: Show title as h1 if no text at all */}
        {!text && articleData.title && (
          <Heading variant="article-title" as="h1">
            {articleData.title}
          </Heading>
        )}

        {/* Author and Date Info */}
        <div className="font-mono mt-4">
          {articleData.author && (
            <div className="">
              Ord:&nbsp;
              {articleData.author.firstName && articleData.author.lastName
                ? `${articleData.author.firstName} ${articleData.author.lastName}`
                : articleData.author.email}
            </div>
          )}
          <div>
            {articleData.lastModifiedDate
              ? `Senast uppdaterad: ${formatDate(articleData.lastModifiedDate)}`
              : `Publicerad: ${formatDate(articleData.publishedDate || '')}`}
          </div>
        </div>
      </div>
    </div>
  );
}
