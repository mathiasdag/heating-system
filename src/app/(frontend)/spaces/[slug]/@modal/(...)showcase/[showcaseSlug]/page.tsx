import { getPayload } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import HighlightOverlay from '@/components/blocks/HighlightOverlay';

interface ShowcaseModalProps {
  params: {
    slug: string;
    showcaseSlug: string;
  };
}

async function ShowcaseModal({ params }: ShowcaseModalProps) {
  const { slug, showcaseSlug } = params;

  if (!showcaseSlug) {
    return null;
  }

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Fetch the showcase
  const { docs: [showcase] = [] } = await payload.find({
    collection: 'showcases' as any,
    where: { slug: { equals: showcaseSlug } },
    depth: 1,
  });

  if (!showcase) {
    notFound();
  }

  const currentPath = `/spaces/${slug}`;

  return <HighlightOverlay showcase={showcase} currentPath={currentPath} />;
}

export default ShowcaseModal;
