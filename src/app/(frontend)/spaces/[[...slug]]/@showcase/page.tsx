import { getPayload } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import HighlightOverlay from '@/components/blocks/HighlightOverlay';

interface ShowcaseModalProps {
  params: {
    slug: string[];
  };
  searchParams: {
    showcase?: string;
  };
}

async function ShowcaseModal({ params, searchParams }: ShowcaseModalProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const showcaseSlug = searchParams.showcase;

  if (!showcaseSlug) {
    return null;
  }

  // Fetch the showcase
  const { docs: [showcase] = [] } = await payload.find({
    collection: 'showcases' as any,
    where: { slug: { equals: showcaseSlug } },
    depth: 1,
  });

  if (!showcase) {
    notFound();
  }

  const slug = params.slug ? params.slug.join('/') : '';
  const currentPath = `/spaces/${slug}`;

  return <HighlightOverlay showcase={showcase} currentPath={currentPath} />;
}

export default ShowcaseModal;
