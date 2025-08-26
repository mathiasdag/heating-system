import Image from 'next/image';
import Link from 'next/link';
import { AppLink } from '../AppLink';

interface FeatureBlockProps {
  image?: { url: string; alt?: string; width?: number; height?: number };
  headline?: string;
  description: string;
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any; // Could be a page object or ID
  };
}

export default function FeatureBlock({
  image,
  description,
  link,
}: FeatureBlockProps) {
  // Determine the href for the CTA
  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    // If populated, reference may be an object with a slug, or just an ID
    href =
      typeof link.reference === 'object' && link.reference?.slug
        ? `/pages/${link.reference.slug}`
        : `/pages/${link.reference}`;
  } else if (link?.type === 'external') {
    href = link.url;
  }

  return (
    <div className="grid grid-cols-16 p-4 my-20 gap-4">
      {image?.url && (
        <div className="col-start-1 col-end-12 md:col-end-9">
          <Image
            src={image.url}
            alt={image.alt || ''}
            width={image.width || 800}
            height={image.height || 600}
            className=""
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>
      )}
      <div className="col-start-1 md:col-start-9 col-end-16">
        <div className="mb-4 whitespace-pre-line font-mono">{description}</div>
        {href && link?.text && link.type === 'internal' ? (
          <Link href={href} className="font-bold underline mt-2 inline-block">
            {link.text} &rarr;
          </Link>
        ) : href && link?.text ? (
          <AppLink href={href} variant="secondary">
            {link.text} &rarr;
          </AppLink>
        ) : null}
      </div>
    </div>
  );
}
