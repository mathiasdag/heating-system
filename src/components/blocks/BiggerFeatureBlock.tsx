'use client';
import React from 'react';
import Image from 'next/image';
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { AppLink } from '../AppLink';
import { DevIndicator } from '../DevIndicator';

interface BiggerFeatureBlockProps {
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

const BiggerFeatureBlock: React.FC<BiggerFeatureBlockProps> = ({
  headline,
  subheadline,
  description,
  image,
  link,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const travelY = '200vh';
  const y = useTransform(scrollYProgress, [0, 1], [travelY, '-100%']);

  React.useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1.2, ease: 'easeOut' },
      });
    }
  }, [inView, controls]);

  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    href =
      typeof link.reference === 'object' && link.reference?.slug
        ? `/pages/${link.reference.slug}`
        : `/pages/${link.reference}`;
  } else if (link?.type === 'external') {
    href = link.url;
  }

  const isLandscape =
    image && image.width && image.height ? image.width >= image.height : true;
  const imageClass = isLandscape
    ? 'rounded-sm w-full h-auto object-contain max-w-[320px] max-w-[50vw]'
    : 'rounded-sm w-full h-auto object-contain max-w-[240px] max-w-[33vw]';

  return (
    <section ref={ref} className="relative grid gap-8 py-16 px-4 text-center">
      <DevIndicator componentName="BiggerFeatureBlock" />
      {image?.url ? (
        <motion.div style={{ y }} className="mx-auto z-10">
          <Image
            src={image.url}
            alt={image.alt || ''}
            width={image.width || 320}
            height={image.height || 240}
            className={imageClass}
            priority
          />
        </motion.div>
      ) : null}
      <div className="pt-8 mx-auto grid max-w-8xl">
        {headline ? <h2 className="font-display">{headline}</h2> : null}
        {subheadline && <div className="h2-style max-w-8xl">{subheadline}</div>}
      </div>
      <div className="font-mono max-w-5xl mx-auto">
        {typeof description === 'string' || description == null ? (
          <div className="whitespace-pre-line">{description}</div>
        ) : (
          <RichText data={description} />
        )}
      </div>
      <div>
        {href && link?.text ? (
          <AppLink href={href} variant="outline">
            {link.text}
          </AppLink>
        ) : null}
      </div>
    </section>
  );
};

export default BiggerFeatureBlock;
