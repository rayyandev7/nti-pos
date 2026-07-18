import api from "./api";

export const getCustomers = async () => {
  const { data } = await api.get("/customers");
  return data;
};