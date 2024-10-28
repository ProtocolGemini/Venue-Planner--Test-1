import { useEffect } from 'react';
import { useVenueStore } from '../store/venueStore';
import { MoveLeft, MoveRight, MoveUp, MoveDown, ZoomIn, ZoomOut } from 'lucide-react';

export function Controls() {
  const { selectedPoi, pois, updatePoi } = useVenueStore();

  const movePOI = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (!selectedPoi) return;
    const poi = pois.find((p) => p.id === selectedPoi);
    if (!poi) return;

    const newPosition = [...poi.position] as [number, number, number];
    const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
    newPosition[index] += delta;
    updatePoi(poi.id, { position: newPosition });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoi) return;

      const delta = e.shiftKey ? 0.5 : 1;
      switch (e.key) {
        case 'ArrowLeft':
          movePOI('x', -delta);
          break;
        case 'ArrowRight':
          movePOI('x', delta);
          break;
        case 'ArrowUp':
          e.shiftKey ? movePOI('y', delta) : movePOI('z', -delta);
          break;
        case 'ArrowDown':
          e.shiftKey ? movePOI('y', -delta) : movePOI('z', delta);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoi]);

  if (!selectedPoi) return null;

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-panel rounded-2xl p-3">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => movePOI('x', -1)}
          className="btn-secondary p-3"
          title="Move Left (←)"
        >
          <MoveLeft className="w-5 h-5" />
        </button>
        <div className="grid grid-rows-2 gap-2">
          <button
            onClick={() => movePOI('z', -1)}
            className="btn-secondary p-3"
            title="Move Forward (↑)"
          >
            <MoveUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => movePOI('z', 1)}
            className="btn-secondary p-3"
            title="Move Backward (↓)"
          >
            <MoveDown className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => movePOI('x', 1)}
          className="btn-secondary p-3"
          title="Move Right (→)"
        >
          <MoveRight className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          onClick={() => movePOI('y', 1)}
          className="btn-secondary p-3"
          title="Move Up (Shift + ↑)"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => movePOI('y', -1)}
          className="btn-secondary p-3"
          title="Move Down (Shift + ↓)"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}