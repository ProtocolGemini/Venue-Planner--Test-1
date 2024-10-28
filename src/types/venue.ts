export interface POI {
  id: string;
  name: string;
  category: POICategory;
  position: [number, number, number];
  description?: string;
}

export type POICategory = 
  | 'entrance'
  | 'stage'
  | 'food'
  | 'restroom'
  | 'emergency'
  | 'custom';

export interface VenueLayout {
  id: string;
  name: string;
  pois: POI[];
  floorPlan?: string;
  lastModified: number;
}