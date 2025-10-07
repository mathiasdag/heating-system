'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
import VideoBlock from '@/components/blocks/VideoBlock';
import { FadeInUp, FadeInDown } from '@/components/ui/FadeIn';
import { Tag } from '@/components/ui';
import { fixImageUrl } from '@/utils/imageUrl';
import { Heading } from '@/components/headings';

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
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
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

  const renderAsset = (asset: Asset, key: number) => {
    const assetCount = assets.length;
    const height = Math.max(220 - (assetCount - 1) * 40, 120);

    if (asset.type === 'image' && asset.image?.url) {
      const aspectRatio =
        asset.image.width && asset.image.height
          ? asset.image.width / asset.image.height
          : 1;
      const isLandscape = aspectRatio > 1;
      const shouldBeSquare =
        assetCount > 1 || (assetCount === 1 && isLandscape);
      const width = shouldBeSquare ? height : Math.round(height * aspectRatio);
      const className = shouldBeSquare
        ? 'rounded max-w-[50vw] aspect-square object-cover'
        : 'rounded max-w-[50vw]';

      return (
        <Image
          key={key}
          src={fixImageUrl(asset.image.url)}
          alt={asset.image.alt || ''}
          width={width}
          height={height}
          className={className}
          priority
          quality={75}
          sizes="(max-width: 768px) 50vw, 30vw"
        />
      );
    }

    if (asset.type === 'mux' && asset.mux) {
      const shouldBeSquare = assetCount > 1;
      const width = shouldBeSquare ? height : Math.round(height * 1.5);
      const videoClassName = shouldBeSquare
        ? 'rounded overflow-hidden aspect-square'
        : 'rounded overflow-hidden';

      return (
        <div
          key={key}
          style={{ height: `${height}px`, width: `${width}px` }}
          className={videoClassName}
        >
          <VideoBlock
            host="mux"
            sources={[
              {
                playbackId: asset.mux,
                minWidth: 0,
              },
            ]}
            controls={false}
            autoplay={true}
            loop={true}
            adaptiveResolution={true}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div ref={ref} className="relative mb-16">
      <DevIndicator
        componentName="ArticleHeaderAssetsAbove"
        position="top-right"
      />

      <div className="grid gap-8 justify-center pt-32 pb-16 text-center">
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
              <React.Fragment key={i}>{renderAsset(asset, i)}</React.Fragment>
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
        <div className="font-mono">
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
