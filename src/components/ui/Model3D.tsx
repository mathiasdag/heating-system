'use client';

import React, { Suspense, useRef } from 'react';
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
  interactive?: boolean; // New prop to disable all interactions
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
  const { viewport, size } = useThree();

  useFrame(state => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y = state.clock.elapsedTime * autoRotateSpeed;
    }
  });

  // Calculate responsive scale based on viewport and screen size
  const minDimension = Math.min(viewport.width, viewport.height);

  // More conservative scaling for better responsiveness
  const baseScale = minDimension * 0.3;
  const maxScale = Math.min(size.width, size.height) * 0.25;
  const scale = Math.min(baseScale, maxScale, 2); // Cap at 2 to prevent huge models

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
  interactive = true, // Default to interactive
  width = '100%',
  height = '600px',
}: Model3DProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{
        width,
        height,
        maxWidth: '100%',
      }}
    >
      <Canvas
        camera={{ position: [1, 1, 4], fov: 50 }}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
        }}
        gl={{
          antialias: false, // Disable antialiasing for better performance
          alpha: true, // Keep alpha for transparency
          powerPreference: 'high-performance', // Use dedicated GPU if available
          stencil: false, // Disable stencil buffer
          depth: true, // Keep depth buffer for 3D
        }}
        dpr={[1, 2]} // Limit device pixel ratio for performance
        performance={{
          min: 0.5, // Reduce quality when performance is low
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        <Suspense fallback={<ModelLoader />}>
          <Model
            modelPath={modelPath}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </Suspense>

        {interactive && (
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={enablePan}
            enableRotate={enableRotate}
            maxPolarAngle={Math.PI / 1.8} // Limit vertical rotation
            minPolarAngle={Math.PI / 6} // Prevent flipping
            enableDamping={true}
            dampingFactor={0.05}
            // Disable scroll hijacking
            touches={{
              ONE: 2, // Only allow one finger for rotation
              TWO: 0, // Disable two finger gestures (pinch/pan)
            }}
          />
        )}

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
