import api from "./api";

// Get All Brands
export const getBrands = async () => {
  const response = await api.get("/brands");
  return response.data;
};