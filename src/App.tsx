import React, { useState } from 'react';
import { Scene3D } from './components/Scene3D';
import { Sidebar } from './components/Sidebar';
import { Controls } from './components/Controls';
import { POIEditor } from './components/POIEditor';
import { useVenueStore } from './store/venueStore';

export function App() {
  const { selectedPoi, setSelectedPoi } = useVenueStore();
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 relative">
        <Scene3D />
        <Controls />
        {selectedPoi && showEditor && (
          <POIEditor onClose={() => setShowEditor(false)} />
        )}
        {selectedPoi && !showEditor && (
          <button
            onClick={() => setShowEditor(true)}
            className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200 ease-in-out"
          >
            Edit Selected POI
          </button>
        )}
      </main>
    </div>
  );
}

export default App;