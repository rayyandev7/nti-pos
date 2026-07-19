import api from "./api";

// Create Purchase
export const createPurchase = async (purchaseData) => {
  const { data } = await api.post("/purchases", purchaseData);
  return data;
};

// Get All Purchases
export const getPurchases = async () => {
  const { data } = await api.get("/purchases");
  return data;
};

// Get Purchase By ID
export const getPurchaseById = async (id) => {
  const { data } = await api.get(`/purchases/${id}`);
  return data;
};

// Delete Purchase
export const deletePurchase = async (id) => {
  const { data } = await api.delete(`/purchases/${id}`);
  return data;
};