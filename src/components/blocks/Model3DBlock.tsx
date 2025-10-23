'use client';

import { Model3D } from '@/components/ui';
import { DevIndicator } from '@/components/dev/DevIndicator';

interface Model3DBlockProps {
  model: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  height?: string;
}

export default function Model3DBlock({
  model,
  autoRotate = true,
  autoRotateSpeed = 0.3,
  height = '600px',
}: Model3DBlockProps) {
  return (
    <div className="relative">
      <DevIndicator componentName="Model3DBlock" position="top-center" />

      <Model3D
        modelPath={model.url}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        height={height}
      />
    </div>
  );
}
