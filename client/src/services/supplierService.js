import api from "./api";

// Get All Suppliers
export const getSuppliers = async () => {
  const { data } = await api.get("/suppliers");
  return data;
};

// Create Supplier
export const createSupplier = async (supplierData) => {
  const { data } = await api.post("/suppliers", supplierData);
  return data;
};

// Update Supplier
export const updateSupplier = async (id, supplierData) => {
  const { data } = await api.put(`/suppliers/${id}`, supplierData);
  return data;
};

// Delete Supplier
export const deleteSupplier = async (id) => {
  const { data } = await api.delete(`/suppliers/${id}`);
  return data;
};