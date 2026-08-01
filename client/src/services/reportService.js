import api from "./api";

export const getDashboardReport = async () => {
  const response = await api.get("/reports/dashboard");
  return response.data;
};

export const getStockReport = async () => {
    const response = await api.get("/reports/stock");
    return response.data;
};