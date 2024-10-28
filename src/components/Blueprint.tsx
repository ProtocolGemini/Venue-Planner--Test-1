import { useVenueStore } from '../store/venueStore';
import { useTexture } from '@react-three/drei';
import { DoubleSide } from 'three';

export function Blueprint() {
  const blueprint = useVenueStore((state) => state.blueprint);
  
  if (!blueprint) return null;

  const texture = useTexture(blueprint);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={0.7} 
        side={DoubleSide}
      />
    </mesh>
  );
}