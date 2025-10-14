import { FeatureCollection } from "geojson";

export type GeometryType = {
  data: FeatureCollection | null;
  order: number;
};

export const geometryData: Map<string, GeometryType> = new Map([
  ["ROUTE", { data: null, order: 1 }],
  ["SUPPLY POINT", { data: null, order: 2 }],
  ["DISTRIBUTION POINT", { data: null, order: 3 }],
  ["ROAD", { data: null, order: 4 }],
  ["PRESCHOOL", { data: null, order: 5 }],
  ["DISTRICT", { data: null, order: 6 }],
  ["MUNICIPALITY", { data: null, order: 7 }],
]);
