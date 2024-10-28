import { useVenueStore } from '../store/venueStore';
import { Trash2 } from 'lucide-react';
import { POIModel } from './POIModels';
import { Canvas } from '@react-three/fiber';

interface POIListProps {
  searchTerm: string;
}

export function POIList({ searchTerm }: POIListProps) {
  const { pois, selectedPoi, setSelectedPoi, deletePoi } = useVenueStore();

  const filteredPOIs = pois.filter((poi) =>
    poi.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto space-y-3 pr-2 -mr-2">
      {filteredPOIs.map((poi) => {
        const Model = POIModel[poi.category];
        
        return (
          <div
            key={poi.id}
            className={`card cursor-pointer flex items-center justify-between group ${
              selectedPoi === poi.id
                ? 'bg-[var(--primary)] bg-opacity-20 border-[var(--primary)]'
                : ''
            }`}
            onClick={() => setSelectedPoi(poi.id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--surface-light)] overflow-hidden">
                <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} />
                  <Model scale={0.3} hover={selectedPoi === poi.id} />
                </Canvas>
              </div>
              <div>
                <h3 className="font-medium text-[15px] leading-tight">{poi.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] capitalize mt-0.5">{poi.category}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePoi(poi.id);
              }}
              className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[var(--surface-lighter)] transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>
        );
      })}
    </div>
  );
}