'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
import VideoBlock from '@/components/blocks/VideoBlock';
import { FadeIn } from '@/components/ui';
import { Tag } from '@/components/ui';
import { fixImageUrl } from '@/utils/imageUrl';
import { Heading } from '@/components/headings';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface ArticleHeaderStandardProps {
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

export default function ArticleHeaderStandard({
  articleData,
  text,
  assets,
}: ArticleHeaderStandardProps) {
  const ref = useRef(null);

  // Use Framer Motion's scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const assetScale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1]);

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
    const height = asset.image?.height || 600;
    const width = asset.image?.width || 800;
    const className = 'rounded object-cover';

    if (asset.type === 'image' && asset.image?.url) {
      return (
        <Image
          key={key}
          src={fixImageUrl(asset.image.url)}
          alt={asset.image.alt || ''}
          width={width}
          height={height}
          className={className}
        />
      );
    }

    if (asset.type === 'mux' && asset.mux) {
      const videoClassName = 'rounded overflow-hidden';

      return (
        <div key={key} className={videoClassName}>
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
        componentName="ArticleHeaderStandard"
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

        <motion.div
          className="flex items-center justify-center fixed inset-x-0 top-0"
          style={{
            opacity,
            scale,
            y,
          }}
        >
          <FadeIn
            as="div"
            className="px-4 grid gap-4 font-mono"
            timing="slow"
            delay={0.2}
          >
            {/* Add article title as h1 if no h1 is found in RichText */}
            {text && articleData.title && !hasH1(text) && (
              <Heading variant="article-title" as="h1">
                {articleData.title}
              </Heading>
            )}
            {text && <RichText data={text} />}
          </FadeIn>
        </motion.div>

        <div className="flex items-center justify-center opacity-0 pointer-events-none">
          <div className="px-4 grid gap-4 font-mono">
            {text && <RichText data={text} />}
          </div>
        </div>

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

        {/* Render assets after text */}
        {assets.length > 0 && (
          <motion.div
            style={{
              scale: assetScale,
            }}
          >
            <FadeIn
              as="div"
              className="relative z-10 flex justify-center flex-row gap-4 mt-8"
              timing="normal"
              delay={0.6}
            >
              {assets.map((asset, i) => (
                <div key={i} className={assets.length > 1 ? 'flex-1' : ''}>
                  {renderAsset(asset, i)}
                </div>
              ))}
            </FadeIn>
          </motion.div>
        )}
      </div>
    </div>
  );
}
