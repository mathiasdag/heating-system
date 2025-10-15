'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';
import { cn } from '@/utils/cn';

interface Model3DProps {
  modelPath: string;
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  width?: number | string;
  height?: number | string;
}

// 3D Model component with rotation and responsive scaling
function Model({
  modelPath,
  autoRotate = true,
  autoRotateSpeed = 1,
}: {
  modelPath: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<Group>(null);
  const { viewport } = useThree();

  useFrame(state => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y = state.clock.elapsedTime * autoRotateSpeed;
    }
  });

  // Scale model based on viewport size
  const scale = Math.min(viewport.width, viewport.height) * 0.4;

  return (
    <group ref={modelRef} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
}

// Loading fallback
function ModelLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

// Main 3D Model component
export default function Model3D({
  modelPath,
  className,
  autoRotate = true,
  autoRotateSpeed = 1,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  width = '100%',
  height = '1200px',
}: Model3DProps) {
  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      <Canvas
        camera={{ position: [1, 2, 4], fov: 10 }}
        style={{ width, height }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <Suspense fallback={<ModelLoader />}>
          <Model
            modelPath={modelPath}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </Suspense>

        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableRotate={enableRotate}
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
