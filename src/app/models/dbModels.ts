import { FeatureCollection } from "geojson";

export interface GeoData {
  Coordinate: FeatureCollection;
}

export interface MunicipalDbModel extends GeoData {
  ID: number;
  Name: string;
  Code: string;
}

export interface DistrictDbModel extends GeoData {
  ID: number;
  Name: string;
  MunicipalCode: string;
}

export interface PointDbModel {
  ID: number;
  Name: string;
  Address: string;
  MunicipalID: number;
}

export interface RoadDbModel extends GeoData {
  ID: number;
  RoadID: string;
  Type: string;
  Length: number;
  SpeedLimit: string;
  BearingClass: string;
}

export interface RouteDbModel extends GeoData {
  ID: number;
  Distance: number;
  SupplyPointID: number;
  DestiantionPointID: number;
  Roads: string;
}
