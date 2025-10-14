import { wktToGeoJSON } from '@terraformer/wkt';

export function parseWktToGeoJSON(wkt: string): GeoJSON.Geometry {
  return wktToGeoJSON(wkt) as unknown as GeoJSON.Geometry;
}

export function toFeature(
  geometry: GeoJSON.Geometry,
  properties: Record<string, unknown> = {}
): GeoJSON.Feature<GeoJSON.Geometry> {
  return {
    type: 'Feature',
    geometry,
    properties,
  } as GeoJSON.Feature<GeoJSON.Geometry>;
}

