import { getPayload } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import HighlightOverlay from '@/components/blocks/HighlightOverlay';
import SpacesPageWrapper from '@/components/SpacesPageWrapper';

interface ShowcasePageProps {
  params: {
    slug: string[];
    showcaseSlug: string;
  };
}

async function ShowcasePage({ params }: ShowcasePageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const slug = params.slug ? params.slug.join('/') : '';
  const showcaseSlug = params.showcaseSlug;

  if (!slug || !showcaseSlug) {
    notFound();
  }

  // Fetch the space
  const { docs: [space] = [] } = await payload.find({
    collection: 'spaces' as any,
    where: { slug: { equals: slug } },
    depth: 2,
  });

  if (!space) {
    notFound();
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

  const currentPath = `/spaces/${slug}`;

  return (
    <SpacesPageWrapper>
      <div data-content-type="space">
        {/* Render the space content normally */}
        <div className="space-y-16">
          {/* This would render the space content */}
          {/* For now, we'll just show the overlay */}
        </div>

        {/* Show the showcase overlay */}
        <HighlightOverlay showcase={showcase} currentPath={currentPath} />
      </div>
    </SpacesPageWrapper>
  );
}

export default ShowcasePage;
