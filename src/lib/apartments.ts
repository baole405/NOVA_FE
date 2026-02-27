import { Apartment } from "@/types";
import { fetchApi } from "./api-client";

export const getOwnApartment = async (): Promise<Apartment> => {
  const res = await fetchApi<Apartment>("/apartments/my");
  return res;
};
