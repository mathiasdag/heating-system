'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { AppLink } from '../AppLink';

interface AnimatedFeatureBlockProps {
  headline?: string;
  subheadline?: string;
  description?: any;
  image?: { url: string; alt?: string; width?: number; height?: number };
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any;
  };
}

const AnimatedFeatureBlock: React.FC<AnimatedFeatureBlockProps> = ({
  headline,
  subheadline,
  description,
  image,
  link,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } });
    }
  }, [inView, controls]);

  // Determine the href for the CTA
  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    href = typeof link.reference === 'object' && link.reference?.slug
      ? `/pages/${link.reference.slug}`
      : `/pages/${link.reference}`;
  } else if (link?.type === 'external') {
    href = link.url;
  }

  return (
    <section className="relative grid gap-8 py-16 px-4 text-center">
      {image?.url && (
        <motion.div
          ref={ref}
          initial={{ y: 60, opacity: 0 }}
          animate={controls}
          className="absolute left-1/2 -translate-x-1/2 -top-12 z-10 shadow-xl rounded overflow-hidden"
        >
          <Image
            src={image.url}
            alt={image.alt || ''}
            width={image.width || 320}
            height={image.height || 240}
            className="object-cover rounded"
            style={{ maxWidth: 320, maxHeight: 240 }}
            priority
          />
        </motion.div>
      )}
      <div className="pt-40 mx-auto grid max-w-8xl">
        <h2 className="">
          {headline}
        </h2>
        {subheadline && (
          <div className="h2-style max-w-8xl">
            {subheadline}
          </div>
        )}
          </div>
          <div className="font-mono max-w-5xl mx-auto">
          <RichText data={description} />
        </div>
        <div className="">
        {href && link?.text ? (
          <AppLink href={href} variant="outline">
            {link.text}
          </AppLink>
        ) : null}
        </div>
    </section>
  );
};

export default AnimatedFeatureBlock; 