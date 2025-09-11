import { getPayload } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import ShowcasePageWrapper from '@/components/ShowcasePageWrapper';

interface ShowcasePageProps {
  params: {
    showcaseSlug: string;
  };
}

async function ShowcasePage({ params }: ShowcasePageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { showcaseSlug } = params;

  if (!showcaseSlug) {
    notFound();
  }

  // Fetch the showcase
  const { docs: [showcase] = [] } = await payload.find({
    collection: 'showcases' as any,
    where: { slug: { equals: showcaseSlug } },
    depth: 2, // Increased depth to populate blocks properly
  });

  if (!showcase) {
    notFound();
  }

  // For now, we'll just show the overlay as a full page
  // In the future, you might want to add a proper layout here
  return (
    <div className="min-h-screen bg-white">
      <ShowcasePageWrapper showcase={showcase} />
    </div>
  );
}

export default ShowcasePage;
