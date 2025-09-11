'use client';

import { useRouter } from 'next/navigation';
import HighlightOverlay from './blocks/HighlightOverlay';

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

  return <HighlightOverlay showcase={showcase} onClose={handleClose} />;
};

export default ShowcasePageWrapper;
