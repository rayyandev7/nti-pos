import api from "./api";

// Get All Customers
export const getCustomers = async () => {
  const { data } = await api.get("/customers");
  return data;
};

// Create Customer
export const createCustomer = async (customerData) => {
  const { data } = await api.post("/customers", customerData);
  return data;
};

// Update Customer
export const updateCustomer = async (id, customerData) => {
  const { data } = await api.put(`/customers/${id}`, customerData);
  return data;
};

// Delete Customer
export const deleteCustomer = async (id) => {
  const { data } = await api.delete(`/customers/${id}`);
  return data;
};