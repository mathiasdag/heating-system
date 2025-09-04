'use client';
import React, { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import type { MinResolutionValue } from '@mux/playback-core';
import { DevIndicator } from '../DevIndicator';

interface VideoSource {
  playbackId: string;
  minWidth?: number; // Minimum screen width for this source (e.g., 0 for mobile, 768 for tablet, 1024 for desktop)
  label?: string; // Optional label for quality (e.g., '360p', '720p', '1080p')
}

interface VideoBlockProps {
  host: 'mux';
  // Remove playbackId from props
  sources?: VideoSource[]; // for multiple sources
  autoplay?: boolean;
  controls?: boolean;
  adaptiveResolution?: boolean; // default true
}

const DEFAULT_ASPECT_RATIO = 16 / 9;

const VideoBlock: React.FC<VideoBlockProps> = ({
  host,
  // Remove playbackId from props
  sources = [],
  autoplay = false,
  controls = false,
  adaptiveResolution = true,
}) => {
  const [aspectRatio, setAspectRatio] = useState<number>(DEFAULT_ASPECT_RATIO);
  const [currentSource, setCurrentSource] = useState<VideoSource | undefined>(
    undefined
  );

  // Determine the best source for the current screen size
  useEffect(() => {
    if (sources.length > 0) {
      const width = window.innerWidth;
      // Sort sources by minWidth descending, pick the first where minWidth <= width
      const sorted = [...sources].sort(
        (a, b) => (b.minWidth || 0) - (a.minWidth || 0)
      );
      const best =
        sorted.find(src => (src.minWidth || 0) <= width) ||
        sorted[sorted.length - 1];
      setCurrentSource(best);
    } else {
      setCurrentSource(undefined);
    }
  }, [sources]);

  // Update aspect ratio when source changes
  useEffect(() => {
    if (host === 'mux' && currentSource?.playbackId) {
      const img = new window.Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }
      };
      img.src = `https://image.mux.com/${currentSource.playbackId}/thumbnail.jpg?time=1`;
    }
  }, [host, currentSource]);

  if (host === 'mux' && currentSource?.playbackId) {
    return (
      <div className="relative">
        <DevIndicator componentName="VideoBlock" />
        <MuxPlayer
          playbackId={currentSource.playbackId}
          autoPlay={autoplay}
          muted={autoplay}
          loop={autoplay}
          className="object-cover w-full h-full"
          style={{
            aspectRatio,
            ...(controls === false ? { ['--controls' as any]: 'none' } : {}),
          }}
          {...(!adaptiveResolution ? { playbackEngine: 'mse' } : {})}
        />
      </div>
    );
  }

  return null;
};

export default VideoBlock;
