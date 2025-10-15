import { FeatureCollection } from "geojson";
import Fill from "ol/style/Fill";
import Icon from "ol/style/Icon";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export type GeometryType = {
  data: FeatureCollection | null;
  order: number;
  style: Style;
};

export const geometryData: Map<string, GeometryType> = new Map([
  [
    "ROUTE",
    {
      data: null,
      order: 8,
      style: new Style({
        stroke: new Stroke({
          color: "rgba(0, 255, 51, 1)",
          width: 3,
        }),
      }),
    }, 
  ],
  [
    "SUPPLY POINT",
    {
      data: null,
      order: 7,
      style: new Style({
        image: new Icon({
          src: "icons/simple/water_icon.svg",
          scale: 1.2,
          color: "rgb(0, 55, 255)",
        }),
      }),
    },
  ],
  [
    "DISTRIBUTION POINT",
    {
      data: null,
      order: 6,
      style: new Style({
        image: new Icon({
          src: "icons/simple/distance_icon.svg",
          scale: 1.2,
          color: "rgb(255, 242, 0)",
        }),
      }),
    },
  ],
  [
    "ROAD",
    {
      data: null,
      order: 5,
      style: new Style({
        stroke: new Stroke({
          width: 2,
          color: "rgba(0, 136, 255, 0.75)",
        }),
      }),
    },
  ],
  [
    "PRESCHOOL",
    {
      data: null,
      order: 4,
      style: new Style({
        image: new Icon({
          src: "icons/simple/child_care_icon.svg",
          scale: 1,
          color: "rgba(0, 0, 0, 1)",
        }),
      }),
    },
  ],
  [
    "DISTRICT",
    {
      data: null,
      order: 3,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 184, 0, 0.4)",
        }),
        stroke: new Stroke({}),
      }),
    },
  ],
  [
    "MUNICIPALITY",
    {
      data: null,
      order: 2,
      style: new Style({
        fill: new Fill({
          color: "rgba(0, 153, 255, 0.2)",
        }),
      }),
    },
  ],
]);
