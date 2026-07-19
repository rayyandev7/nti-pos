import api from "./api";

// Get All Brands
export const getBrands = async () => {
  const { data } = await api.get("/brands");
  return data;
};

// Create Brand
export const createBrand = async (brandData) => {
  const { data } = await api.post("/brands", brandData);
  return data;
};

// Update Brand
export const updateBrand = async (id, brandData) => {
  const { data } = await api.put(`/brands/${id}`, brandData);
  return data;
};

// Delete Brand
export const deleteBrand = async (id) => {
  const { data } = await api.delete(`/brands/${id}`);
  return data;
};