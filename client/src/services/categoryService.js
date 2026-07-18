import api from "./api";

// Get All Categories
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};