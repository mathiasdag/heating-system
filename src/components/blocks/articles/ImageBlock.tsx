import React from 'react';
import Image from 'next/image';
import { DevIndicator } from '../../DevIndicator';

interface ImageBlockProps {
  image: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  caption?: string;
}

export default function ImageBlock({ image, caption }: ImageBlockProps) {
  return (
    <div className="relative max-h-[80vh] mx-auto col-start-1 col-end-13 md:col-start-2 md:col-end-12 my-8 flex items-center justify-center flex-col">
      <DevIndicator componentName="ImageBlock" />
      <Image
        src={image.url}
        alt={image.alt || ''}
        width={image.width || 1200}
        height={image.height || 800}
        className="object-contain max-h-full h-full w-auto rounded-lg object-center"
      />
      {caption && <p className="text-sm mt-1 px-1 w-full">{caption}</p>}
    </div>
  );
}
