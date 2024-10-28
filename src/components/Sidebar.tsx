import { Plus, Search, Download, Upload, Save, Map } from 'lucide-react';
import { useVenueStore } from '../store/venueStore';
import { POIList } from './POIList';
import { useState, useRef } from 'react';

export function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { pois, addPoi, setBlueprint } = useVenueStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPOI = () => {
    addPoi({
      id: crypto.randomUUID(),
      name: 'New POI',
      category: 'custom',
      position: [0, 0, 0],
    });
  };

  const handleBlueprintUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBlueprint(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-[320px] glass-panel h-full p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold neon-glow">Venue Planner</h2>
        <button
          onClick={handleAddPOI}
          className="btn-secondary p-2"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-4 h-4" />
        <input
          type="text"
          placeholder="Search POIs..."
          className="input-field pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <POIList searchTerm={searchTerm} />

      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        <div className="flex gap-2">
          <button className="btn-primary flex-1">
            <Save className="w-4 h-4" />
            Save Layout
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
          </button>
          <button className="btn-secondary">
            <Upload className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          className="btn-secondary w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <Map className="w-4 h-4" />
          Upload Blueprint
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBlueprintUpload}
        />
      </div>
    </div>
  );
}