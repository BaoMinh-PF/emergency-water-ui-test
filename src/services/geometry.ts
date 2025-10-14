import { GeoData } from "@/app/models/dbModels";
import { axiosInstance } from "@/lib/http";

export async function fetchGeoData(): Promise<GeoData[]> {
  const res = await axiosInstance.post<GeoData[]>(`/api/geometry`);
  return res.data;
}