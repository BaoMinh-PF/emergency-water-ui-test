export function getMunicipal(): string {
  return "SELECT ID, Name, Code, Coordinate.STAsText() AS WKT";
}

export function getDistricts(): string {
  return "SELECT ID, Name, Code Coordinate.STAsText() AS WKT";
}

export function getRoad(): string {
  return "SELECT ID, RoadID, Coordinate.STAsText() AS WKT FROM Road";
}

export function getSupplyPoint(): string {
  return "SELECT ID, Name, Coordinate.STAsText() AS WKT FROM SupplyPoint'";
}

export function getDistributionPoint(): string {
  return "SELECT ID, Name, Coordinate.STAsText() AS WKT FROM DistributionPoint";
}

export function getRoute(): string {
  return "SELECT ID, SupplyPointID, DestinationPointID, Coordinate.STAsText() AS WKT FROM Route";
}
