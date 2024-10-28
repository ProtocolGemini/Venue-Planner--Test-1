import { useVenueStore } from '../store/venueStore';
import { POICategory } from '../types/venue';
import { X } from 'lucide-react';

interface POIEditorProps {
  onClose: () => void;
}

export function POIEditor({ onClose }: POIEditorProps) {
  const { pois, selectedPoi, updatePoi } = useVenueStore();
  const poi = pois.find((p) => p.id === selectedPoi);

  if (!poi) return null;

  const categories: POICategory[] = ['entrance', 'stage', 'food', 'restroom', 'emergency', 'custom'];

  return (
    <div className="absolute top-6 right-6 w-[320px] glass-panel rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Edit POI</h3>
        <button onClick={onClose} className="btn-secondary p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            Name
          </label>
          <input
            type="text"
            value={poi.name}
            onChange={(e) => updatePoi(poi.id, { name: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            Category
          </label>
          <select
            value={poi.category}
            onChange={(e) => updatePoi(poi.id, { category: e.target.value as POICategory })}
            className="input-field capitalize"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            Position
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['x', 'y', 'z'] as const).map((axis, index) => (
              <div key={axis}>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 uppercase">
                  {axis}
                </label>
                <input
                  type="number"
                  value={poi.position[index]}
                  onChange={(e) => {
                    const newPosition = [...poi.position] as [number, number, number];
                    newPosition[index] = parseFloat(e.target.value) || 0;
                    updatePoi(poi.id, { position: newPosition });
                  }}
                  className="input-field px-2 py-1.5"
                  step="0.5"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            Description
          </label>
          <textarea
            value={poi.description || ''}
            onChange={(e) => updatePoi(poi.id, { description: e.target.value })}
            className="input-field"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}