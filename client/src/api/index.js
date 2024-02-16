import axios from "axios";

const API = axios.create({ baseURL: "" });
//post
export const postExpense = async (payload) => {
  await axios.post("/api/expense", payload);
};
//get
export const getExpense = async () => {
  return await axios.get("/api/expense");
};

export const deleteExpense = async (id) => {
  if (!id) return;
  return await axios.delete(`/api/expense/${id}`);
};

export const fetchExpenseByMonth = async (month) => {
  return await axios.get(`/api/expense/${month}`);
};


export const fetchAllBudgets = async () => {
  return await axios.get(`/api/budget`);
}

export const postBudget = async (payload) => {
  return await axios.post(`/api/budget`, payload)
}
