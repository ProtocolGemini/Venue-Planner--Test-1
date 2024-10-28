import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { POICategory } from '../types/venue';

interface ModelProps {
  scale?: number;
  hover?: boolean;
}

function Stage({ scale = 1, hover }: ModelProps) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[2, 0.5, 1.5]} />
        <meshStandardMaterial
          color={hover ? '#3b82f6' : '#2563eb'}
          emissive={hover ? '#3b82f6' : '#2563eb'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.6, -0.6]}>
        <boxGeometry args={[2, 0.2, 0.3]} />
        <meshStandardMaterial
          color={hover ? '#1d4ed8' : '#1e40af'}
          emissive={hover ? '#1d4ed8' : '#1e40af'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Entrance({ scale = 1, hover }: ModelProps) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.5, 6]} />
        <meshStandardMaterial
          color={hover ? '#22c55e' : '#16a34a'}
          emissive={hover ? '#22c55e' : '#16a34a'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.6, 0.5, 6]} />
        <meshStandardMaterial
          color={hover ? '#16a34a' : '#15803d'}
          emissive={hover ? '#16a34a' : '#15803d'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Food({ scale = 1, hover }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={group} scale={scale}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.8, 8]} />
        <meshStandardMaterial
          color={hover ? '#f59e0b' : '#d97706'}
          emissive={hover ? '#f59e0b' : '#d97706'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color={hover ? '#fbbf24' : '#f59e0b'}
          emissive={hover ? '#fbbf24' : '#f59e0b'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Restroom({ scale = 1, hover }: ModelProps) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1, 1.5, 1]} />
        <meshStandardMaterial
          color={hover ? '#8b5cf6' : '#7c3aed'}
          emissive={hover ? '#8b5cf6' : '#7c3aed'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color={hover ? '#a78bfa' : '#8b5cf6'}
          emissive={hover ? '#a78bfa' : '#8b5cf6'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Emergency({ scale = 1, hover }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current && hover) {
      group.current.rotation.y += 0.03;
    }
  });

  return (
    <group ref={group} scale={scale}>
      <mesh position={[0, 0.75, 0]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color={hover ? '#ef4444' : '#dc2626'}
          emissive={hover ? '#ef4444' : '#dc2626'}
          emissiveIntensity={hover ? 1 : 0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Custom({ scale = 1, hover }: ModelProps) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.75, 0]}>
        <dodecahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color={hover ? '#64748b' : '#475569'}
          emissive={hover ? '#64748b' : '#475569'}
          emissiveIntensity={hover ? 0.8 : 0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export const POIModel = {
  stage: Stage,
  entrance: Entrance,
  food: Food,
  restroom: Restroom,
  emergency: Emergency,
  custom: Custom,
} as Record<POICategory, React.ComponentType<ModelProps>>;