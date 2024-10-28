import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Stars } from '@react-three/drei';
import { POIMarkers } from './POIMarkers';
import { Blueprint } from './Blueprint';
import { Suspense } from 'react';

export function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 50 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#111213']} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          
          <Blueprint />
          <Grid
            args={[100, 100]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#1e293b"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#334155"
            fadeDistance={50}
            fadeStrength={1}
          />
          <Stars radius={50} depth={50} count={1000} factor={4} />
          <POIMarkers />
          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}