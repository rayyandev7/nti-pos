import api from "./api";

// Get Products for POS
export const getProductsForSale = async () => {
  const { data } = await api.get("/products");
  return data;
};

// Create Sale
export const createSale = async (saleData) => {
  const { data } = await api.post("/sales", saleData);
  return data;
};


export const getAllSales = async () => {
  const { data } = await api.get("/sales");
  return data;
};

// Get Sale By ID
export const getSaleById = async (id) => {
  const { data } = await api.get(`/sales/${id}`);
  return data;
};