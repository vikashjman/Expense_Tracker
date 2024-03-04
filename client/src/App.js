import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import { UserProvider, useUser } from "./contexts/user.context";
import PrivateRoute from "./utils/PrivateRoute";
import { useContext } from "react";

function App() {
  const {user} = useUser()
  return (
      <Routes>
      <Route index element={user ? <Homepage /> : <Navigate to="/login" />} /> {/* Route for the index page, rendering the Homepage component */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
  );
}

export default App; 
