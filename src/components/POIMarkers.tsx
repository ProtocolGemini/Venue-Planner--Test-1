import { useVenueStore } from '../store/venueStore';
import { Html } from '@react-three/drei';
import { useState } from 'react';
import { POIModel } from './POIModels';

export function POIMarkers() {
  const { pois, selectedPoi, setSelectedPoi } = useVenueStore();
  const [hoveredPoi, setHoveredPoi] = useState<string | null>(null);

  return (
    <>
      {pois.map((poi) => {
        const isSelected = selectedPoi === poi.id;
        const isHovered = hoveredPoi === poi.id;
        const Model = POIModel[poi.category];

        return (
          <group
            key={poi.id}
            position={poi.position}
            onClick={() => setSelectedPoi(poi.id)}
            onPointerOver={() => setHoveredPoi(poi.id)}
            onPointerOut={() => setHoveredPoi(null)}
          >
            <Model scale={isSelected ? 0.4 : 0.3} hover={isHovered || isSelected} />
            
            {(isHovered || isSelected) && (
              <Html
                center
                style={{
                  transform: 'translateY(-3em)',
                  pointerEvents: 'none',
                }}
              >
                <div className="glass-panel px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
                  {poi.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}