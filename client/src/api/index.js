import axios from "axios";

let API;
if (process.env.REACT_APP_NODE_ENV == 'development') {
  console.log("http://localhost:4000/")
  API = axios.create({ baseURL: "http://localhost:4000/" });
} else {
  API = axios;
}

//post
export const postExpense = async (payload) => {
  await API.post("/api/expense", payload);
};
//get
export const getExpense = async () => {
  return await API.get("/api/expense");
};

export const deleteExpense = async (id) => {
  if (!id) return;
  return await API.delete(`/api/expense/${id}`);
};

export const fetchExpenseByMonth = async (month) => {
  return await API.get(`/api/expense/${month}`);
};


export const fetchAllBudgets = async () => {
  return await API.get(`/api/budget`);
}

export const postBudget = async (payload) => {
  return await API.post(`/api/budget`, payload)
}
