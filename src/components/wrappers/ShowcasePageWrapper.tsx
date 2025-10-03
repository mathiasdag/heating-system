'use client';

import { useRouter } from 'next/navigation';
import { ShowcaseOverlay } from '@/components/ui/overlays';

interface ShowcasePageWrapperProps {
  showcase: any;
}

const ShowcasePageWrapper: React.FC<ShowcasePageWrapperProps> = ({
  showcase,
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <ShowcaseOverlay showcase={showcase} onClose={handleClose} />;
};

export default ShowcasePageWrapper;
