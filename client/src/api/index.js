import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api/" });
//post
export const postExpense = async (payload) => {
  await API.post("/expense", payload);
};
//get
export const getExpense = async () => {
  return await API.get("/expense");
};

export const deleteExpense = async (id) => {
  if (!id) return;
  return await API.delete(`/expense/${id}`);
};

export const fetchExpenseByMonth = async (month) => {
  return await API.get(`/expense/${month}`);
};


export const fetchAllBudgets = async () => {
  return await API.get(`/budget`);
}

export const postBudget = async (payload) => {
  return await API.post(`/budget`, payload)
}
