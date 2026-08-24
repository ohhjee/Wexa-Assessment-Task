export interface NearbyPlace {
  name: string;
  type: string;
}

export interface Property {
  id: string;
  name: string;
  price: number;
  bedrooms: number;
  area: string;
  type?: string;
  amenities: string[];
  sharedPlaces: string[];
  nearbyPlaces: string[];
  matchScore?: number;

}

export interface PropertyCardProps {
  property: Property;
}